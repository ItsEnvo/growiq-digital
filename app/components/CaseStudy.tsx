'use client'

import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// HERO COPY / OUTCOMES: interim placeholder. Theo to deliver final copy.
const CASE = {
  client: 'All On Deck Crew',
  industry: 'Hospitality crew agency',
  url: 'https://allondeckcrew.com',
  headline: 'A premium website and an admin dashboard, built in days, not months.',
  problem: [
    'Operating without a real digital foundation — leads came through DMs and spreadsheets.',
    'No central admin layer to see inquiries, crew, or bookings in one place.',
    'Brand presence did not match the caliber of the work or the rooms they wanted to be in.',
  ],
  solution: [
    'Custom premium website that reflects the level of the operation.',
    'Lead capture and inquiry routing wired directly to the team.',
    'Admin dashboard for inquiries, crew, and bookings.',
    'Domain, hosting, Google Workspace, and infrastructure all set up and handed over.',
  ],
  outcomes: [
    { stat: 'Live', label: 'Premium site shipped' },
    { stat: '1', label: 'Admin dashboard, owner-ready' },
    { stat: '$2,500', label: 'Total engagement value' },
  ],
}

export default function CaseStudy() {
  return (
    <section id="case-study" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '30%', right: -250, width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(0,180,216,.04)', filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Case Study #1
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            {CASE.client} — <span className="gradient-text">a foundation in days.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {CASE.headline}
          </p>
        </div>

        {/* Outcome strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${CASE.outcomes.length}, 1fr)`, gap: 14, marginBottom: 32,
        }} className="cs-outcomes">
          {CASE.outcomes.map((o, i) => (
            <div key={i} style={{
              padding: '24px 20px', borderRadius: 18, textAlign: 'center' as const,
              background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
              border: '1px solid rgba(0,232,123,.1)',
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#00e87b', marginBottom: 4 }}>{o.stat}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(199,214,255,.5)', letterSpacing: '.04em' }}>{o.label}</div>
            </div>
          ))}
        </div>

        {/* Problem / Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="cs-grid">
          <div style={{
            padding: 32, borderRadius: 20,
            background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
            border: '1px solid rgba(255,255,255,.05)',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(239,68,68,.7)', fontWeight: 800, marginBottom: 14 }}>
              The problem
            </div>
            {CASE.problem.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < CASE.problem.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                fontSize: 14, color: 'rgba(199,214,255,.65)', lineHeight: 1.65,
              }}>
                <span style={{ color: 'rgba(239,68,68,.7)', fontSize: 14, lineHeight: 1.4 }}>—</span>
                <span>{p}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: 32, borderRadius: 20,
            background: 'linear-gradient(180deg, rgba(10,16,38,.7), rgba(5,8,16,.5))',
            border: '1px solid rgba(0,232,123,.15)',
            boxShadow: '0 0 50px rgba(0,232,123,.04)',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.8)', fontWeight: 800, marginBottom: 14 }}>
              What GrowIQ built
            </div>
            {CASE.solution.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < CASE.solution.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                fontSize: 14, color: 'rgba(199,214,255,.7)', lineHeight: 1.65,
              }}>
                <span style={{ color: '#00e87b', fontSize: 14, lineHeight: 1.4 }}>—</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div style={{
          marginTop: 32, padding: '24px 32px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(0,232,123,.04), rgba(0,180,216,.03))',
          border: '1px solid rgba(0,232,123,.1)',
          display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(199,214,255,.4)', marginBottom: 4, letterSpacing: '.06em', textTransform: 'uppercase' as const }}>
              Industry · {CASE.industry}
            </div>
            <a href={CASE.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700,
              color: 'rgba(199,214,255,.85)', textDecoration: 'none',
            }}>
              Visit allondeckcrew.com <ExternalLink size={14} />
            </a>
          </div>
          <Link href="/contact?mode=call" style={{
            padding: '13px 22px', borderRadius: 12, fontSize: 13, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
            border: '1px solid rgba(0,232,123,.4)',
            display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
          }}>
            Start your foundation <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .cs-grid{grid-template-columns:1fr !important}
          .cs-outcomes{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  )
}
