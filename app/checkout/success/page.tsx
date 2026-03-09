'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Give some time for webhooks to process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="hud-card p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="hud-title">Welcome to GrowIQ!</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-zinc-200/90 mb-6">
            Your payment was successful and your AI team is being prepared.
          </p>
          
          <div className="hud-card bg-[rgba(var(--mint),0.05)] border-[rgba(var(--mint),0.2)] p-6 mb-8">
            <div className="hud-kicker text-mint">Next Steps</div>
            <div className="mt-3 text-left space-y-3 text-zinc-200/80">
              <div className="flex gap-3">
                <span className="text-mint">1.</span>
                <span>Complete your onboarding to customize your agents</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">2.</span>
                <span>Deploy your AI team to your infrastructure</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">3.</span>
                <span>Start automating your business operations</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="hud-btn hud-btn--primary">
              Go to Dashboard
            </Link>
            <Link href="/onboard" className="hud-btn">
              Start Onboarding
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-700">
            <p className="text-sm text-zinc-400 mb-4">
              Need help getting started?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/book" className="hud-btn hud-btn--sm">
                Book Setup Call
              </Link>
              <Link href="/docs" className="hud-btn hud-btn--sm">
                View Documentation
              </Link>
            </div>
          </div>

          {loading && (
            <div className="mt-6 text-sm text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-mint border-t-transparent rounded-full"></div>
                Setting up your account...
              </div>
            </div>
          )}

          {sessionId && (
            <div className="mt-6 text-xs text-zinc-500">
              Session: {sessionId}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="hud-card p-8 text-center">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}