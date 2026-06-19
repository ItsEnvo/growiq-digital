import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Lead } from "@/lib/leads";
import { isLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_PATH)) return [];
    const raw = fs.readFileSync(LEADS_PATH, "utf8");
    const j: unknown = JSON.parse(raw);
    if (!Array.isArray(j)) return [];
    return j.filter(isLead);
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2) + "\n", "utf8");
}

export async function GET() {
  const leads = readLeads();
  return NextResponse.json({ ok: true, count: leads.length, leads }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const b = (body && typeof body === "object" ? (body as Record<string, unknown>) : {}) as Record<string, unknown>;

    const name = String(b.name || "").trim();
    const email = String(b.email || "").trim();
    const website = String(b.website || "").trim();
    const phone = String(b.phone || "").trim();
    const company = String(b.company || "").trim();
    const message = String(b.message || "").trim();
    const kind = String(b.kind || b.mode || "audit");

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    // Lightweight validation (keeps bots + obvious junk down; not strict).
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    // Forward into the CRM pipeline (the source of truth). Falls back to local
    // persistence if the CRM intake isn't configured yet, so a misconfig never
    // loses a lead worse than the prior file-only behavior.
    const crmUrl = process.env.CRM_INTAKE_URL;
    const secret = process.env.INTAKE_SECRET;
    if (crmUrl && secret) {
      try {
        const res = await fetch(crmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-intake-secret": secret },
          body: JSON.stringify({ kind, name, email, website, phone, company, message }),
        });
        if (res.ok) {
          const j = (await res.json().catch(() => ({}))) as { id?: string };
          return NextResponse.json({ ok: true, id: j.id ?? null }, { status: 200 });
        }
        console.error("CRM intake returned non-OK:", res.status);
      } catch (err) {
        console.error("CRM intake forward failed:", err);
      }
    }

    // Fallback when the CRM forward didn't succeed. Local disk is read-only on
    // serverless (writeLeads throws EROFS), so the file write is best-effort: if
    // it fails we still log the full lead so it's recoverable from logs and the
    // visitor never sees a broken form. Never 500, never silently dropped.
    const lead: Lead = {
      id: `lead_${globalThis.crypto?.randomUUID?.() || Math.random().toString(16).slice(2)}`,
      kind,
      name,
      email,
      website,
      message,
      createdAtMs: Date.now(),
    };
    try {
      const leads = readLeads();
      leads.unshift(lead);
      writeLeads(leads.slice(0, 2000));
      return NextResponse.json({ ok: true, id: lead.id, fallback: true }, { status: 200 });
    } catch (writeErr) {
      console.error(
        "LEAD CAPTURE FALLBACK — CRM unreachable and local write failed; lead below:",
        writeErr,
        JSON.stringify({ kind, name, email, website, phone, company, message }),
      );
      return NextResponse.json({ ok: true, id: lead.id, fallback: "logged" }, { status: 200 });
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
