"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactClient() {
  const sp = useSearchParams();
  const mode = (sp.get("mode") || "audit").toLowerCase();

  const title = useMemo(() => {
    if (mode === "call") return "Book a Call";
    return "Free Audit";
  }, [mode]);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      kind: mode,
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      createdAtMs: Date.now(),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!j?.ok) throw new Error(j?.error || "failed");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (e: unknown) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "failed");
    }
  }

  return (
    <>
      <section className="hud-card p-7">
        <div className="hud-kicker">Contact</div>
        <h1 className="mt-3 hud-title">{title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          This is local-first capture (stored in the repo). No outbound sending happens automatically.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="hud-card p-6">
          <div className="hud-kicker">What happens next</div>
          <div className="mt-4 space-y-2 text-sm text-zinc-200/80">
            <div>• We review your intake.</div>
            <div>• We reply with the fastest next step.</div>
            <div>• If it’s a fit, we book a call and build.</div>
          </div>
        </div>

        <div className="hud-card p-6">
          <form className="space-y-3" onSubmit={onSubmit}>
            <input className="hud-input" name="name" placeholder="Name" required />
            <input className="hud-input" name="email" placeholder="Email" required />
            <input className="hud-input" name="website" placeholder="Website / IG" />
            <textarea className="hud-input h-28" name="message" placeholder="What are you trying to grow?" required />
            <button className="hud-btn hud-btn--primary w-full" disabled={status === "sending"}>
              {status === "sending" ? "Submitting…" : "Submit"}
            </button>
            {status === "sent" ? <div className="text-sm text-[rgba(var(--mint),0.9)]">Submitted.</div> : null}
            {status === "error" ? <div className="text-sm text-amber-200">Error: {err}</div> : null}
          </form>
        </div>
      </section>
    </>
  );
}
