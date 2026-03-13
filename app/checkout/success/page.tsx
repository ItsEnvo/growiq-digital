'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || '/book';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{
        background: 'linear-gradient(180deg, rgba(10,16,38,.8), rgba(5,8,16,.6))',
        border: '1px solid rgba(0,232,123,.2)',
        borderRadius: 24,
        padding: 48,
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(0,232,123,.06)',
      }}>
        {/* Success icon */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
          border: '2px solid rgba(0,232,123,.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: 36,
        }}>
          ✓
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          Payment Confirmed
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', marginBottom: 36 }}>
          Welcome to GrowIQ. Your AI team is ready to be built.
        </p>

        {/* Primary CTA - Book Setup Call */}
        <div style={{
          background: 'rgba(0,232,123,.06)',
          border: '1px solid rgba(0,232,123,.15)',
          borderRadius: 16, padding: 28, marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            STEP 1 OF 2
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Book Your Setup Call
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(199,214,255,.5)', marginBottom: 20, lineHeight: 1.7 }}>
            In this 60-minute call, we'll learn your business inside out and configure your AI team — receptionist, sales, follow-ups, scheduling, and more.
          </p>
          <a
            href={CAL_LINK}
            target={CAL_LINK.startsWith('http') ? '_blank' : undefined}
            rel={CAL_LINK.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 32px', borderRadius: 14, fontSize: 15, fontWeight: 800,
              color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
              border: '1px solid rgba(0,232,123,.4)',
              boxShadow: '0 0 20px rgba(0,232,123,.15)',
              transition: 'all .3s',
            }}
          >
            📞 Book Setup Call →
          </a>
        </div>

        {/* Step 2 */}
        <div style={{
          background: 'rgba(255,255,255,.02)',
          border: '1px solid rgba(255,255,255,.06)',
          borderRadius: 16, padding: 24, marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(199,214,255,.3)', fontWeight: 700, marginBottom: 12 }}>
            STEP 2 OF 2
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(199,214,255,.6)', marginBottom: 6 }}>
            Complete Your Onboarding
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(199,214,255,.35)', marginBottom: 16, lineHeight: 1.7 }}>
            Fill in your business details so we can pre-configure your agents before the call.
          </p>
          <Link href="/onboard" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            color: 'rgba(199,214,255,.6)', textDecoration: 'none',
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.08)',
            transition: 'all .3s',
          }}>
            Start Onboarding →
          </Link>
        </div>

        {/* Dashboard link */}
        <Link href="/dashboard" style={{
          fontSize: 13, color: 'rgba(199,214,255,.35)', textDecoration: 'none',
        }}>
          or go to your dashboard →
        </Link>

        {loading && (
          <div style={{ marginTop: 24, fontSize: 13, color: 'rgba(199,214,255,.3)' }}>
            Setting up your account...
          </div>
        )}

        {sessionId && (
          <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(199,214,255,.15)' }}>
            Ref: {sessionId}
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px', textAlign: 'center', color: 'rgba(199,214,255,.4)' }}>
        Loading...
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
