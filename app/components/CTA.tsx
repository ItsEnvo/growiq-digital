'use client'

import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" style={{ padding: '120px 24px', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,232,123,.06) 0%, rgba(0,180,216,.03) 40%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center' as const, position: 'relative', zIndex: 2 }}>
        <h2 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
          Ready to <span className="gradient-text">Grow?</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(199,214,255,.5)', marginBottom: 40, lineHeight: 1.8 }}>
          Book a free strategy call. We'll audit your current setup, identify quick wins, and show you exactly how GrowIQ can grow your business.
        </p>

        <button style={{
          padding: '18px 40px', borderRadius: 14, fontSize: 16, fontWeight: 800, color: '#fff',
          background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
          border: '1px solid rgba(0,232,123,.4)',
          boxShadow: '0 0 40px rgba(0,232,123,.15), 0 0 80px rgba(0,180,216,.08)',
          display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all .3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(0,232,123,.3), 0 0 120px rgba(0,180,216,.15)'; e.currentTarget.style.borderColor = 'rgba(0,232,123,.6)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,232,123,.15), 0 0 80px rgba(0,180,216,.08)'; e.currentTarget.style.borderColor = 'rgba(0,232,123,.4)' }}
        >
          Book Your Free Strategy Call <ArrowRight size={18} />
        </button>

        <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(199,214,255,.25)' }}>
          No commitment. No pitch. Just clarity.
        </p>
      </div>
    </section>
  )
}