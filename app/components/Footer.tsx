'use client'

import Link from 'next/link'

const cols = [
  {
    label: 'Services',
    links: [
      { label: 'Digital Infrastructure', href: '/services' },
      { label: 'Premium Websites', href: '/services' },
      { label: 'Business Dashboards', href: '/services' },
      { label: 'Custom AI Systems', href: '/services' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Case Study', href: '/case-studies/all-on-deck-crew' },
      { label: 'Book a call', href: '/contact?mode=call' },
      { label: 'Sign in', href: '/auth/login' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{
      padding: '60px 24px 32px', borderTop: '1px solid rgba(255,255,255,.04)', background: '#030508',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="footer-grid">
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
                border: '1px solid rgba(0,232,123,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900,
              }}>
                <span className="gradient-text">G</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Grow<span className="gradient-text">IQ</span></span>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(199,214,255,.5)', lineHeight: 1.75, margin: 0, maxWidth: 360 }}>
              Digital infrastructure for modern businesses. Websites, dashboards, and AI systems — built to look and run premium.
            </p>
          </div>

          {cols.map(col => (
            <div key={col.label}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(199,214,255,.4)', letterSpacing: '.18em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                {col.label}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ fontSize: 13, color: 'rgba(199,214,255,.6)', textDecoration: 'none' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.04)',
          display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: 11, color: 'rgba(199,214,255,.3)', margin: 0 }}>
            © 2026 GrowIQ Digital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 11, color: 'rgba(199,214,255,.3)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: 11, color: 'rgba(199,214,255,.3)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr !important;gap:32px !important}
        }
      `}</style>
    </footer>
  )
}
