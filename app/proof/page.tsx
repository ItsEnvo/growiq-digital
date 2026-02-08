import Link from "next/link";

type ProofCard = {
  title: string;
  metric: string;
  detail: string;
  notes: string;
};

const CARDS: ProofCard[] = [
  {
    title: "Funnels",
    metric: "+ booked calls",
    detail: "Tighter qualification + faster follow-up",
    notes: "Drop 1 screenshot + 2 sentences (before/after).",
  },
  {
    title: "Ads",
    metric: "lower CAC",
    detail: "Cleaner tracking + better landing experience",
    notes: "Add results when ready.",
  },
  {
    title: "Automation",
    metric: "higher show rate",
    detail: "Confirmations + reminders + no-show recovery",
    notes: "Add a quick workflow overview.",
  },
];

export default function ProofPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Proof</div>
        <h1 className="mt-3 hud-title">Evidence, not vibes.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          This page is built to showcase quick wins as clean cards. Send me 3 results and I’ll plug them in.
        </p>
        <div className="mt-6 flex gap-2">
          <Link className="hud-btn hud-btn--primary" href="/contact?mode=audit">
            Free Audit
          </Link>
          <Link className="hud-btn" href="/pricing">
            Pricing
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="hud-card p-6">
            <div className="hud-kicker">{c.title}</div>
            <div className="mt-3 text-2xl font-semibold">{c.metric}</div>
            <div className="mt-2 text-sm text-zinc-200/80">{c.detail}</div>
            <div className="mt-4 text-xs tracking-widest text-zinc-400">{c.notes}</div>
          </div>
        ))}
      </section>

      <section className="mt-6 hud-card p-6">
        <div className="hud-kicker">Case study format</div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="text-sm text-zinc-200/80">
            <div className="font-semibold text-zinc-100">Before</div>
            <div className="mt-1">What was broken / slow / leaking leads?</div>
          </div>
          <div className="text-sm text-zinc-200/80">
            <div className="font-semibold text-zinc-100">After</div>
            <div className="mt-1">What changed and what improved?</div>
          </div>
          <div className="text-sm text-zinc-200/80">
            <div className="font-semibold text-zinc-100">System</div>
            <div className="mt-1">Funnel + ads + automation + follow-up cadence.</div>
          </div>
          <div className="text-sm text-zinc-200/80">
            <div className="font-semibold text-zinc-100">Timeline</div>
            <div className="mt-1">How fast did it move? (days/weeks)</div>
          </div>
        </div>
      </section>
    </main>
  );
}
