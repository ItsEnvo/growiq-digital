import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

function readLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_PATH)) return [];
    const raw = fs.readFileSync(LEADS_PATH, "utf8");
    const j = JSON.parse(raw);
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: any[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2) + "\n", "utf8");
}

export async function GET() {
  const leads = readLeads();
  return NextResponse.json({ ok: true, count: leads.length, leads }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body: any = await req.json();
    const lead = {
      id: `lead_${Math.random().toString(16).slice(2)}`,
      kind: String(body?.kind || "audit"),
      name: String(body?.name || "").trim(),
      email: String(body?.email || "").trim(),
      website: String(body?.website || "").trim(),
      message: String(body?.message || "").trim(),
      createdAtMs: Number(body?.createdAtMs || Date.now()),
    };

    if (!lead.name || !lead.email || !lead.message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 200 });
    }

    const leads = readLeads();
    leads.unshift(lead);
    writeLeads(leads.slice(0, 2000));

    return NextResponse.json({ ok: true, id: lead.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "failed" }, { status: 200 });
  }
}
