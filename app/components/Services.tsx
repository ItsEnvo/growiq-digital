'use client'

import { Layers, LayoutDashboard, Globe, Bot } from 'lucide-react'

const pillars = [
  {
    icon: Layers,
    tag: 'Digital Infrastructure',
    title: 'The foundation your business runs on.',
    desc: 'Domain, hosting, Google Workspace, lead capture, inquiry routing, and the back-end plumbing that makes everything work. Set up once. Owned by you.',
    highlights: [
      'Domain, DNS, and managed hosting',
      'Google Workspace and business email',
      'Lead capture, intake forms, inquiry routing',
      'Standard analytics and tracking',
    ],
  },
  {
    icon: Globe,
    tag: 'Premium Websites',
    title: 'Sites that look like the business you want to be.',
    desc: 'Custom-built, fast, mobile-first websites. Designed to convert visitors into leads and to make your business look as credible as the work you do.',
    highlights: [
      'Custom design — not template fatigue',
      'Mobile-first and responsive',
      'Built to convert: clear CTAs, fast load',
      'SEO basics, Open Graph, social previews',
    ],
  },
  {
    icon: LayoutDashboard,
    tag: 'Business Dashboards',
    title: 'A back office that finally tells you what is happening.',
    desc: 'Custom admin dashboards that surface leads, bookings, customers, and revenue in one place. Built for the owner who runs the business, not for the developer who built it.',
    highlights: [
      'Lead and inquiry inbox',
      'Customer and booking views',
      'Revenue and pipeline visibility',
      'Role-based access for your team',
    ],
  },
  {
    icon: Bot,
    tag: 'Custom AI Systems',
    title: 'AI employees and systems, scoped to your business.',
    desc: 'We build the AI workforce your business actually needs. Sales, content, support, operations, or anything else — trained on your work, integrated with your stack.',
    highlights: [
      'AI Sales Assistant — qualify leads, book calls',
      'AI Content Engine — drafts and creative on demand',
      'AI Support Assistant — FAQs and intake, 24/7',
      'Custom agents trained for your workflow',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: -100, right: -200, width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,232,123,.04)', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            What We Build
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Digital infrastructure for <span className="gradient-text">modern businesses.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            A website is the front door. The dashboard is the back office. AI is the workforce. We build all three.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
              padding: 36, borderRadius: 24,
              background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
              border: '1px solid rgba(255,255,255,.05)',
              backdropFilter: 'blur(20px)',
              transition: 'all .3s',
            }}
            className="pillar-card"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,232,123,.12)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,232,123,.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ order: i % 2 === 1 ? 2 : 1 }} className="pillar-text">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(0,232,123,.06)', border: '1px solid rgba(0,232,123,.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <p.icon size={18} style={{ color: '#00e87b' }} />
                  </div>
                  <span style={{
                    padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                    color: 'rgba(0,232,123,.7)', background: 'rgba(0,232,123,.06)',
                    letterSpacing: '.05em', textTransform: 'uppercase' as const,
                  }}>{p.tag}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(199,214,255,.55)', lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
              </div>

              <div style={{ order: i % 2 === 1 ? 1 : 2 }} className="pillar-list">
                <div style={{
                  padding: 24, borderRadius: 16,
                  background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)',
                }}>
                  {p.highlights.map((h, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '10px 0',
                      borderBottom: j < p.highlights.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                      fontSize: 13, color: 'rgba(199,214,255,.65)',
                    }}>
                      <span style={{ color: '#00e87b', fontSize: 14, lineHeight: 1.4 }}>—</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .pillar-card{grid-template-columns:1fr !important}
          .pillar-text,.pillar-list{order:unset !important}
        }
      `}</style>
    </section>
  )
}
