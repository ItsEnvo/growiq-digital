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

    const lead: Lead = {
      id: `lead_${globalThis.crypto?.randomUUID?.() || Math.random().toString(16).slice(2)}`,
      kind: String(b.kind || "audit"),
      name: String(b.name || "").trim(),
      email: String(b.email || "").trim(),
      website: String(b.website || "").trim(),
      message: String(b.message || "").trim(),
      createdAtMs: Number(b.createdAtMs || Date.now()),
    };

    if (!lead.name || !lead.email || !lead.message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // Lightweight validation (keeps bots + obvious junk down; not strict).
    if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const leads = readLeads();
    leads.unshift(lead);
    writeLeads(leads.slice(0, 2000));

    return NextResponse.json({ ok: true, id: lead.id }, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
