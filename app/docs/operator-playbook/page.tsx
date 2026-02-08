import Link from "next/link";

export const metadata = {
  title: "Operator Playbook • GrowIQ Digital",
};

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="hud-card p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="hud-kicker">Step {n}</div>
          <div className="mt-2 text-xl font-semibold">{title}</div>
        </div>
      </div>
      <div className="mt-4 hud-prose">{children}</div>
    </div>
  );
}

export default function OperatorPlaybookPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Docs</div>
        <h1 className="mt-3 hud-title">Operator Playbook</h1>
        <p className="mt-4 max-w-3xl text-zinc-200/85">
          Run the site, capture leads, export data, and ship changes. This repo intentionally does not
          auto-send emails/SMS/DMs. Follow-up is manual.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="hud-btn" href="/docs">
            Back to docs
          </Link>
          <a className="hud-btn hud-btn--primary" href="/api/leads/export" target="_blank" rel="noreferrer">
            Download leads CSV
          </a>
          <Link className="hud-btn" href="/contact?mode=audit">
            Test intake
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4">
        <Step n="1" title="Lead capture (local-first)">
          <p>
            The contact form posts to <code>/api/leads</code>. Leads are stored in
            <code> data/leads.json</code> at the project root (created on first submission).
          </p>
          <ul>
            <li>
              View recent leads at <Link href="/admin/leads">/admin/leads</Link>.
            </li>
            <li>Export CSV at <code>/api/leads/export</code>.</li>
            <li>
              No outbound messaging: there are <em>no</em> email/SMS integrations and no webhooks.
            </li>
          </ul>
        </Step>

        <Step n="2" title="Quality checks before shipping">
          <ul>
            <li>Mobile first: verify the sticky CTA appears on non-contact pages.</li>
            <li>One primary CTA per page (Free Audit).</li>
            <li>Proof + services pages: ensure scannability (short paragraphs, clear headers).</li>
            <li>Forms: required fields block empty submissions.</li>
          </ul>
        </Step>

        <Step n="3" title="Release checklist">
          <ol>
            <li>Run <code>npm run lint</code> and <code>npm run build</code>.</li>
            <li>Preview key routes: <code>/</code>, <code>/services</code>, <code>/pricing</code>, <code>/proof</code>, <code>/contact</code>.</li>
            <li>Test lead intake (audit mode) and confirm it appears in admin.</li>
            <li>Export CSV and open in Sheets/Excel to confirm formatting.</li>
          </ol>
        </Step>

        <Step n="4" title="Operational notes">
          <ul>
            <li>Keep <code>/admin/leads</code> private.</li>
            <li>Leads are capped (oldest dropped) to avoid repo bloat.</li>
            <li>
              If you later add notifications, keep them behind an explicit feature flag + approvals.
            </li>
          </ul>
        </Step>
      </section>

      <div className="mt-10 hud-sub">Operator docs • Keep it simple • Ship weekly</div>
    </main>
  );
}
