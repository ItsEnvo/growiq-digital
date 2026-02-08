import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Lead } from "@/lib/leads";
import { isLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

function csvEscape(v: unknown) {
  const s = String(v ?? "");
  if (/[\n\r",]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export async function GET() {
  let leads: Lead[] = [];
  try {
    if (fs.existsSync(LEADS_PATH)) {
      const raw = fs.readFileSync(LEADS_PATH, "utf8");
      const j: unknown = JSON.parse(raw);
      if (Array.isArray(j)) leads = j.filter(isLead);
    }
  } catch {
    leads = [];
  }

  const header = ["id", "kind", "name", "email", "website", "message", "createdAt"].join(",");
  const rows = leads.map((l) => {
    const createdAt = typeof l.createdAtMs === "number" ? new Date(l.createdAtMs).toISOString() : "";
    return [l.id, l.kind, l.name, l.email, l.website, l.message, createdAt].map(csvEscape).join(",");
  });

  // Include UTF-8 BOM for Excel compatibility.
  const csv = "\uFEFF" + [header, ...rows].join("\n") + "\n";

  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "cache-control": "no-store",
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="leads_${date}.csv"`,
    },
  });
}
