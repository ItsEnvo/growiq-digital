import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

function csvEscape(v: any) {
  const s = String(v ?? "");
  if (/[\n\r",]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export async function GET() {
  let leads: any[] = [];
  try {
    if (fs.existsSync(LEADS_PATH)) {
      const raw = fs.readFileSync(LEADS_PATH, "utf8");
      const j = JSON.parse(raw);
      leads = Array.isArray(j) ? j : [];
    }
  } catch {
    leads = [];
  }

  const header = ["id", "kind", "name", "email", "website", "message", "createdAt"].join(",");
  const rows = leads.map((l) => {
    const createdAt = typeof l.createdAtMs === "number" ? new Date(l.createdAtMs).toISOString() : "";
    return [l.id, l.kind, l.name, l.email, l.website, l.message, createdAt].map(csvEscape).join(",");
  });

  const csv = [header, ...rows].join("\n") + "\n";

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename=leads.csv`,
    },
  });
}
