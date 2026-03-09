'use client'

import { Users, Wrench, Headphones, BarChart3 } from 'lucide-react'

const pillars = [
  {
    icon: Users, title: 'Full AI Team Deployment',
    desc: 'We don\'t give you one chatbot. We deploy an entire team — receptionist, sales rep, follow-up specialist, support agent, review manager, and reporting analyst. Each one trained specifically on your business.',
    tag: 'Core Product',
    highlights: ['Custom-trained on your services & pricing', 'Knows your brand voice and policies', 'Handles calls, texts, emails, and chat', 'Works 24/7/365 — no exceptions'],
  },
  {
    icon: Wrench, title: 'Complete Infrastructure Build',
    desc: 'We don\'t just drop agents in and leave. We build the entire system — your website, CRM pipeline, ad campaigns, booking flow, and automations. Everything connected, everything working together.',
    tag: 'Infrastructure',
    highlights: ['High-converting website or landing pages', 'CRM with lead tracking & pipeline stages', 'Google Ads setup & ongoing management', 'Automated booking & calendar integration'],
  },
  {
    icon: Headphones, title: 'Managed & Optimized For You',
    desc: 'Think of us as your AI department. We monitor your agents, optimize their performance, retrain them when your services change, and give you clear reports on what\'s working.',
    tag: 'Managed Service',
    highlights: ['Weekly performance optimization', 'Agent retraining as your business evolves', 'Escalation rules — humans loop in when needed', 'Dedicated account manager'],
  },
  {
    icon: BarChart3, title: 'Live Dashboard & Transparency',
    desc: 'See everything your AI team is doing in real-time. Every call, every lead, every booked appointment, every follow-up. Full audit trail. Nothing hidden.',
    tag: 'Visibility',
    highlights: ['Real-time agent activity feed', 'Lead source tracking & attribution', 'Revenue influenced reporting', 'Client portal — your business, your data'],
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
            What You Get
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Not a Tool. A Full <span className="gradient-text">AI Department.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', maxWidth: 550, margin: '0 auto', lineHeight: 1.8 }}>
            We build, deploy, train, and manage your AI workforce — so you can run your business, not babysit software.
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
                <p style={{ fontSize: 14, color: 'rgba(199,214,255,.5)', lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
              </div>

              <div style={{ order: i % 2 === 1 ? 1 : 2 }} className="pillar-list">
                <div style={{
                  padding: 24, borderRadius: 16,
                  background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)',
                }}>
                  {p.highlights.map((h, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 0',
                      borderBottom: j < p.highlights.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                      fontSize: 13, color: 'rgba(199,214,255,.6)',
                    }}>
                      <span style={{ color: '#00e87b', fontSize: 14 }}>✓</span>
                      {h}
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