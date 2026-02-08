import { Suspense } from "react";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Suspense fallback={<div className="hud-card p-7">Loading…</div>}>
        <ContactClient />
      </Suspense>
    </main>
  );
}
