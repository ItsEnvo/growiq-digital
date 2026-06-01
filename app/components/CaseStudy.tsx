'use client'

import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const CASE = {
  client: 'All On Deck Crew',
  industry: 'Recruitment',
  url: 'https://allondeckcrew.com',
  headline: 'From scattered to operational',
  sub: 'A recruitment business needed credibility online and a real way to handle applicants. We built the foundation.',
  problem:
    'All On Deck Crew was running recruitment without the digital infrastructure to support it. No real website to send candidates or clients to. Applications were coming in through fragmented channels with no central place to review, sort, or follow up. The business looked older than it was, and operations slowed down every time an applicant batch hit.',
  built: [
    'Custom website built around recruitment and credibility',
    'Applicant intake system tied directly to the business',
    'Admin dashboard for managing candidates in one place',
    'Google Workspace setup so the team operates on a real domain',
    'Domain and infrastructure handled end-to-end',
  ],
  outcome: [
    'A professional online presence that matches the business they are actually running',
    'Streamlined applicant management — every candidate lands in one system',
    'Centralized operations: website, intake, admin, and email all on one foundation',
    'Room to grow: the infrastructure is ready for the next layer of automation when needed',
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
            {CASE.client} — <span className="gradient-text">{CASE.headline}.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
            {CASE.sub}
          </p>
        </div>

        {/* Problem block */}
        <div style={{
          padding: 28, borderRadius: 20, marginBottom: 20,
          background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
          border: '1px solid rgba(255,255,255,.05)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(239,68,68,.7)', fontWeight: 800, marginBottom: 12 }}>
            The problem
          </div>
          <p style={{ fontSize: 14, color: 'rgba(199,214,255,.65)', lineHeight: 1.75, margin: 0 }}>
            {CASE.problem}
          </p>
        </div>

        {/* Built / Outcome */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="cs-grid">
          <div style={{
            padding: 28, borderRadius: 20,
            background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
            border: '1px solid rgba(255,255,255,.05)',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,180,216,.8)', fontWeight: 800, marginBottom: 14 }}>
              What we built
            </div>
            {CASE.built.map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < CASE.built.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                fontSize: 14, color: 'rgba(199,214,255,.65)', lineHeight: 1.65,
              }}>
                <span style={{ color: 'rgba(0,180,216,.7)', fontSize: 14, lineHeight: 1.4 }}>—</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div style={{
            padding: 28, borderRadius: 20,
            background: 'linear-gradient(180deg, rgba(10,16,38,.7), rgba(5,8,16,.5))',
            border: '1px solid rgba(0,232,123,.15)',
            boxShadow: '0 0 50px rgba(0,232,123,.04)',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.8)', fontWeight: 800, marginBottom: 14 }}>
              Outcome
            </div>
            {CASE.outcome.map((o, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
                borderBottom: i < CASE.outcome.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                fontSize: 14, color: 'rgba(199,214,255,.7)', lineHeight: 1.65,
              }}>
                <span style={{ color: '#00e87b', fontSize: 14, lineHeight: 1.4 }}>—</span>
                <span>{o}</span>
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
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'rgba(199,214,255,.7)', fontWeight: 600 }}>
              Want the same foundation for your business?
            </span>
            <Link href="/contact?mode=call" style={{
              padding: '13px 22px', borderRadius: 12, fontSize: 13, fontWeight: 800, color: '#fff',
              background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
              border: '1px solid rgba(0,232,123,.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
            }}>
              Book a discovery call <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .cs-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  )
}
