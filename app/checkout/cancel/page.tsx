import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="hud-card p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">💭</div>
          <h1 className="hud-title">No worries!</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-zinc-200/90 mb-6">
            Your payment was cancelled. Your AI team will be here when you're ready.
          </p>
          
          <div className="hud-card bg-zinc-800/50 border-zinc-700 p-6 mb-8">
            <div className="hud-kicker">Still interested?</div>
            <div className="mt-3 text-zinc-200/80">
              <p className="mb-4">
                Our AI agents are ready to transform your business operations. 
                From lead capture to customer success — everything automated.
              </p>
              <p className="text-sm">
                Questions about pricing or features? We're here to help.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="hud-btn hud-btn--primary">
              View Pricing Again
            </Link>
            <Link href="/book" className="hud-btn">
              Book a Call
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-700">
            <p className="text-sm text-zinc-400 mb-4">
              Or explore more about what we offer
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/proof" className="hud-btn hud-btn--sm">
                See Proof
              </Link>
              <Link href="/contact?mode=audit" className="hud-btn hud-btn--sm">
                Free Audit
              </Link>
              <Link href="/docs" className="hud-btn hud-btn--sm">
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}