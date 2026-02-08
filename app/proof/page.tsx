import Link from "next/link";

export default function ProofPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Proof</div>
        <h1 className="mt-3 hud-title">Evidence, not vibes.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          This page is a scaffold for your results, screenshots, and short case studies.
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

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {["Funnels", "Ads", "Automation"].map((x) => (
          <div key={x} className="hud-card p-6">
            <div className="hud-kicker">{x}</div>
            <div className="mt-3 text-lg font-semibold">Add 2–3 wins here</div>
            <div className="mt-2 text-sm text-zinc-200/80">
              Screenshot + 2 sentences: what changed, how fast, and what improved.
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
