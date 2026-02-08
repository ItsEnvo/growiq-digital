import Link from "next/link";

const SERVICES = [
  {
    t: "Funnels + GHL",
    bullets: [
      "Landing pages + intake forms",
      "Routing: qualify → book call → follow-up",
      "Pipelines + stages + tags",
      "Reminders + confirmations + no-show recovery",
    ],
  },
  {
    t: "Ads",
    bullets: [
      "Campaign setup + tracking",
      "Conversion-first pages",
      "Creative + offer testing",
      "Weekly iteration system",
    ],
  },
  {
    t: "AI Systems + Automation",
    bullets: [
      "AI-assisted ops + dashboards",
      "Automated lead follow-up (approval-gated)",
      "Internal tools + reporting",
      "Pipeline hygiene automations",
    ],
  },
  {
    t: "Conversion Cleanup",
    bullets: [
      "Speed, copy, form friction",
      "Lead handling + response time",
      "Handoff into sales",
      "Measurement + iteration cadence",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Services</div>
        <h1 className="mt-3 hud-title">Systems that turn clicks into clients.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          General for now. Once we lock an ICP, we’ll tailor the offer stack and case studies to match.
        </p>
        <div className="mt-6 flex gap-2">
          <Link className="hud-btn hud-btn--primary" href="/contact?mode=audit">
            Free Audit
          </Link>
          <Link className="hud-btn" href="/contact?mode=call">
            Book a Call
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.t} className="hud-card p-6">
            <div className="text-lg font-semibold">{s.t}</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200/80">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
