import Link from "next/link";
import type { Lead } from "@/lib/leads";
import { isLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

async function getLeads() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/leads`, { cache: "no-store" });
  return res.json();
}

function asExternalUrl(v: unknown) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export default async function LeadsAdminPage() {
  const data: unknown = await getLeads();
  const d = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const leads: Lead[] = Array.isArray(d.leads) ? d.leads.filter(isLead) : [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Admin</div>
        <h1 className="mt-3 hud-title">Leads</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          Local-first intake stored in <span className="text-zinc-100">data/leads.json</span>. No outbound sends.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a className="hud-btn hud-btn--primary" href="/api/leads/export" target="_blank" rel="noreferrer">
            Download CSV
          </a>
          <Link className="hud-btn" href="/contact?mode=audit">
            Test intake
          </Link>
        </div>
      </section>

      <section className="mt-6 hud-card p-6">
        <div className="hud-kicker">Count</div>
        <div className="mt-3 text-3xl font-semibold">{leads.length}</div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4">
        {leads.slice(0, 50).map((l) => (
          <div key={l.id} className="hud-card p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-lg font-semibold">{l.name}</div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-200/80">
                  <a className="hover:underline" href={`mailto:${l.email}`}>{l.email}</a>
                  {l.website ? (
                    <a className="hover:underline" href={asExternalUrl(l.website)} target="_blank" rel="noreferrer">
                      {l.website}
                    </a>
                  ) : null}
                </div>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className="hud-chip">
                    <span className="hud-dot" /> {String(l.kind || "audit").toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-xs tracking-widest text-zinc-400">
                {typeof l.createdAtMs === "number" ? new Date(l.createdAtMs).toLocaleString() : ""}
              </div>
            </div>
            <div className="mt-4 whitespace-pre-wrap text-sm text-zinc-200/85">{l.message}</div>
          </div>
        ))}
        {leads.length === 0 ? <div className="text-sm text-zinc-400">No leads yet.</div> : null}
      </section>

      <div className="mt-10 hud-sub">Tip: keep this URL private. It’s an admin view.</div>
    </main>
  );
}
