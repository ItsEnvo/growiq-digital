import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="hud-kicker">Precision. Performance. Predictability.</div>
            <h1 className="mt-3 hud-title">We build systems that sell for you.</h1>
            <p className="mt-4 max-w-2xl text-zinc-200/85">
              Done-for-you marketing systems that turn traffic into clients — using funnels, ads, and AI automation.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="hud-chip">
                <span className="hud-dot" /> Funnels / GHL
              </span>
              <span className="hud-chip">
                <span className="hud-dot" /> Ads
              </span>
              <span className="hud-chip">
                <span className="hud-dot" /> AI Systems + Automation
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="hud-btn hud-btn--primary" href="/contact?mode=audit">
                Free Audit
              </Link>
              <Link className="hud-btn hud-btn--ghost" href="/contact?mode=call">
                Book a Call
              </Link>
            </div>

            <div className="mt-5 text-xs tracking-widest text-zinc-400">
              Automate. Optimize. Scale.
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="hud-card p-6">
              <div className="hud-kicker">How it works</div>
              <div className="mt-4 space-y-3 text-sm text-zinc-200/85">
                <div>
                  <span className="text-zinc-100 font-semibold">1) Diagnose</span> — what’s leaking leads?
                </div>
                <div>
                  <span className="text-zinc-100 font-semibold">2) Build</span> — funnel + ads + automation.
                </div>
                <div>
                  <span className="text-zinc-100 font-semibold">3) Optimize</span> — track, iterate, scale.
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <Link className="hud-btn hud-btn--primary" href="/services">
                  Services
                </Link>
                <Link className="hud-btn" href="/proof">
                  Proof
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="hud-card p-5">
          <div className="hud-kicker">Outcome</div>
          <div className="mt-3 text-xl font-semibold">More booked calls</div>
          <div className="mt-2 text-sm text-zinc-300/80">Qualification + follow-up that doesn’t leak leads.</div>
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
      </section>

      <section className="mt-10">
        <div className="hud-kicker">Services</div>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              t: "Funnels + GHL",
              d: "Landing pages, intake, routing, pipelines, reminders, no-show recovery.",
            },
            {
              t: "Ads",
              d: "Launch, iterate, and scale campaigns with clean tracking + conversion-first pages.",
            },
            {
              t: "AI Systems + Automation",
              d: "Automate follow-up, ops, and reporting — keep humans on the high-leverage parts.",
            },
            {
              t: "Conversion Cleanup",
              d: "Fix the leaks: speed, copy, forms, follow-up, and handoff into sales.",
            },
          ].map((x) => (
            <div key={x.t} className="hud-card p-5">
              <div className="text-lg font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-zinc-300/80">{x.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Link className="hud-btn hud-btn--primary" href="/services">
            View full services
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="hud-kicker">Next step</div>
        <div className="mt-3 hud-card p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-lg font-semibold">Get a Free Audit</div>
              <div className="mt-2 text-sm text-zinc-300/80">
                Tell us what you’re building and what’s stuck. We’ll reply with a clear plan and the fastest next move.
              </div>
              <div className="mt-4 flex gap-2">
                <Link className="hud-btn hud-btn--primary" href="/contact?mode=audit">
                  Free Audit
                </Link>
                <Link className="hud-btn" href="/contact?mode=call">
                  Book a Call
                </Link>
              </div>
            </div>
            <div className="text-sm text-zinc-200/80">
              <div className="font-semibold text-zinc-100">General niche (for now)</div>
              <div className="mt-2">Once we pick a single ICP, the entire site + outbound engine gets sharper overnight.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
