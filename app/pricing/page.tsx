import Link from "next/link";
import { TIERS } from "@/lib/offers";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Pricing</div>
        <h1 className="mt-3 hud-title">Choose your lane.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          Targets: $10k/mo → $20k/mo → $50k/mo. We start with clean fundamentals, then scale the machine.
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
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`hud-card p-6 ${t.highlight ? "ring-1 ring-[rgba(var(--mint),0.25)]" : ""}`}
          >
            <div className="hud-kicker">{t.name}</div>
            <div className="mt-3 text-2xl font-semibold">{t.price}</div>
            <div className="mt-2 text-sm text-zinc-200/80">{t.sub}</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200/80">
              {t.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 text-xs tracking-widest text-zinc-400">
              No income promises. Just systems + iteration.
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
