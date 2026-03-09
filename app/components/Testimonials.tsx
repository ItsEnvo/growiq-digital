'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Sarah L.',
    role: 'Med Spa Owner',
    text: "We went from 15 appointments a month to over 40 in the first 60 days. The AI follow-up agent alone recovered a dozen no-shows we would have lost.",
  },
  {
    name: 'James P.',
    role: 'HVAC Business Owner',
    text: "I used to lose leads because we couldn't answer the phone fast enough. Now the AI handles everything and books directly to our calendar. Game changer.",
  },
  {
    name: 'Maria G.',
    role: 'Dental Practice Manager',
    text: "The dashboard is incredible — I can see every lead, every call, every appointment. And the team at GrowIQ actually cares about our results.",
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,180,216,.12), transparent)',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Testimonials
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800 }}>
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 20,
              background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
              border: '1px solid rgba(255,255,255,.05)',
              backdropFilter: 'blur(20px)',
              transition: 'border-color .3s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,232,123,.12)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="#d4a44a" style={{ color: '#d4a44a' }} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(199,214,255,.6)', lineHeight: 1.8, marginBottom: 20 }}>"{t.text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(199,214,255,.35)' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}