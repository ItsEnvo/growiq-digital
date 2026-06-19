'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section id="cta" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,232,123,.06) 0%, rgba(0,180,216,.03) 40%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' as const, position: 'relative', zIndex: 2 }}>
        <h2 className="serif" style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.15 }}>
          Build the foundation your <span className="gradient-text">business deserves.</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(199,214,255,.55)', marginBottom: 36, lineHeight: 1.8 }}>
          A 20-minute discovery call. We look at where you are, what needs to be built, and whether GrowIQ is the right partner. No pitch.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, justifyContent: 'center' }}>
          <Link href="/contact?mode=call" style={{
            padding: '17px 32px', borderRadius: 14, fontSize: 15, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
            border: '1px solid rgba(0,232,123,.4)',
            boxShadow: '0 0 40px rgba(0,232,123,.15), 0 0 80px rgba(0,180,216,.08)',
            display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none',
          }}>
            Book a discovery call <ArrowRight size={17} />
          </Link>
          <Link href="/pricing" style={{
            padding: '17px 32px', borderRadius: 14, fontSize: 15, fontWeight: 700, color: 'rgba(199,214,255,.85)',
            background: 'rgba(255,255,255,.02)',
            border: '1px solid rgba(255,255,255,.08)',
            display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none',
          }}>
            See pricing
          </Link>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: 'rgba(199,214,255,.3)' }}>
          Foundation engagements start at $3,500. Retainers from $200/mo.
        </p>
      </div>
    </section>
  )
}
