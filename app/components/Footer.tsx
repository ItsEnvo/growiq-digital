'use client'

export default function Footer() {
  return (
    <footer style={{
      padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,.04)', background: '#030508',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
              border: '1px solid rgba(0,232,123,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 900,
            }}>
              <span className="gradient-text">G</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'rgba(199,214,255,.5)' }}>Grow<span className="gradient-text">IQ</span> Digital</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" style={{ fontSize: 12, color: 'rgba(199,214,255,.3)' }}>Privacy</a>
            <a href="#" style={{ fontSize: 12, color: 'rgba(199,214,255,.3)' }}>Terms</a>
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(199,214,255,.15)', textAlign: 'center' as const }}>
          © 2026 GrowIQ Digital. All rights reserved.
        </p>
      </div>
    </footer>
  )
}