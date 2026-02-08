import Link from "next/link";

export const metadata = {
  title: "Docs • GrowIQ Digital",
  description: "Operator docs + playbook.",
};

export default function DocsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Docs</div>
        <h1 className="mt-3 hud-title">Operator Playbook</h1>
        <p className="mt-4 max-w-3xl text-zinc-200/85">
          This section is for running the GrowIQ site + intake like an operator. It’s intentionally simple,
          local-first, and approval-gated. <span className="text-zinc-100">No outbound messaging</span> is enabled.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="hud-btn hud-btn--primary" href="/docs/operator-playbook">
            Open playbook
          </Link>
          <Link className="hud-btn" href="/admin/leads">
            Leads admin
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="hud-card p-6">
          <div className="hud-kicker">Scope</div>
          <div className="mt-4 hud-prose">
            <ul>
              <li>How leads are captured + where they are stored</li>
              <li>How to export leads to CSV</li>
              <li>How to test intake safely (audit mode)</li>
              <li>How to ship changes without breaking the funnel</li>
            </ul>
          </div>
        </div>
        <div className="hud-card p-6">
          <div className="hud-kicker">Principles</div>
          <div className="mt-4 hud-prose">
            <ul>
              <li>Keep it fast: fewer pages, higher clarity.</li>
              <li>One primary CTA per page.</li>
              <li>Make the next step obvious (especially on mobile).</li>
              <li>Local-first data. Manual follow-up is deliberate.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
