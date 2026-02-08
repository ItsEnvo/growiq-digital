export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="hud-card p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="hud-kicker">Grow IQ Digital</div>
              <h1 className="mt-3 hud-title">AI-Native Growth Systems</h1>
              <p className="mt-4 max-w-2xl text-zinc-200/90">
                We build futuristic marketing ops: offer → funnel → automation → outreach — designed for speed, clarity, and
                conversion.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="hud-chip">
                  <span className="hud-dot" /> Funnels + GHL
                </span>
                <span className="hud-chip">
                  <span className="hud-dot" /> Outreach Automation
                </span>
                <span className="hud-chip">
                  <span className="hud-dot" /> AI Systems
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a className="hud-btn hud-btn--primary" href="#contact">
                Get a Free Audit
              </a>
              <a className="hud-btn" href="#services">
                View Services
              </a>
            </div>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="hud-card p-5">
            <div className="hud-kicker">Outcome</div>
            <div className="mt-3 text-xl font-semibold">More booked calls</div>
            <div className="mt-2 text-sm text-zinc-300/80">Tight qualification + follow-up that doesn’t leak leads.</div>
          </div>
          <div className="hud-card p-5">
            <div className="hud-kicker">System</div>
            <div className="mt-3 text-xl font-semibold">One pipeline</div>
            <div className="mt-2 text-sm text-zinc-300/80">Everything tracked. Automations run the boring parts.</div>
          </div>
          <div className="hud-card p-5">
            <div className="hud-kicker">Speed</div>
            <div className="mt-3 text-xl font-semibold">Ship weekly</div>
            <div className="mt-2 text-sm text-zinc-300/80">Small milestones that compound into a real machine.</div>
          </div>
        </div>

        <section id="services" className="mt-10">
          <div className="hud-kicker">Services</div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                t: "Offer + Funnel Build",
                d: "Landing pages, forms, routing, and conversion-first UX.",
              },
              {
                t: "GHL Automations",
                d: "Pipelines, reminders, confirmations, no-show recovery, reactivation.",
              },
              {
                t: "Outbound Engine",
                d: "Lead lists → sequences → tracking → follow-up → booked calls.",
              },
              {
                t: "AI Ops Layer",
                d: "Assistants, scripts, internal tools, and dashboards (mission control style).",
              },
            ].map((x) => (
              <div key={x.t} className="hud-card p-5">
                <div className="text-lg font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-zinc-300/80">{x.d}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-10">
          <div className="hud-kicker">Contact</div>
          <div className="mt-4 hud-card p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-lg font-semibold">Free Audit Intake</div>
                <div className="mt-2 text-sm text-zinc-300/80">
                  Drop your info and what you’re trying to build. We’ll reply with a clear next step.
                </div>
                <div className="mt-4 text-sm text-zinc-300/80">
                  (Form wiring comes next: save → CSV + optional GHL push.)
                </div>
              </div>
              <form className="space-y-3">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-300/40"
                  placeholder="Name"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-300/40"
                  placeholder="Email"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-300/40"
                  placeholder="Website / IG"
                />
                <textarea
                  className="h-28 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-300/40"
                  placeholder="What are you trying to grow?"
                />
                <button type="button" className="hud-btn hud-btn--primary w-full">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="mt-10 pb-10">
          <div className="hud-sub">Local-first • GitHub source-of-truth • Approval-gated shipping</div>
        </footer>
      </div>
    </div>
  );
}
