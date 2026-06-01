import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Navigation from '../../components/Navigation'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'
import Particles from '../../components/Particles'

export const metadata = {
  title: 'All On Deck Crew — GrowIQ Case Study',
  description:
    'From scattered to operational. How GrowIQ built the digital foundation for a recruitment business — custom website, applicant intake, admin dashboard, and Google Workspace.',
}

const BUILT = [
  {
    title: 'Custom website built around recruitment and credibility',
    body: 'A site that looks like the operation the team is actually running — built to convert candidates and earn trust from clients on first visit.',
  },
  {
    title: 'Applicant intake system tied directly to the business',
    body: 'One front door for applications. Candidates submit through the site and land in a single, structured pipeline instead of scattered DMs and inboxes.',
  },
  {
    title: 'Admin dashboard for managing candidates in one place',
    body: 'Owner-facing dashboard to review, sort, and follow up on applicants without juggling spreadsheets or external tools.',
  },
  {
    title: 'Google Workspace setup on a real domain',
    body: 'Team email moved off personal accounts and onto a branded domain. Looks the part, runs cleanly, scales with hiring.',
  },
  {
    title: 'Domain and infrastructure handled end-to-end',
    body: 'Domain, hosting, DNS, email — set up and handed over working. No loose ends.',
  },
]

const OUTCOMES = [
  {
    title: 'A professional online presence that matches the business they are actually running',
    body: 'The brand finally looks like the caliber of work the team delivers. Credibility on day one for candidates and clients.',
  },
  {
    title: 'Streamlined applicant management — every candidate lands in one system',
    body: 'No more fragmented channels. Applications flow through a single intake path the team can actually operate against.',
  },
  {
    title: 'Centralized operations: website, intake, admin, and email all on one foundation',
    body: 'Everything sits on the same foundation. One place to log in, one source of truth, one operating posture.',
  },
  {
    title: 'Room to grow: ready for the next layer of automation when needed',
    body: 'The base is in place. When the business is ready, AI agents and deeper automation plug into infrastructure that already exists.',
  },
]

export default function AllOnDeckCrewCaseStudy() {
  return (
    <>
      <Particles />
      <Navigation />
      <main style={{ paddingTop: 100, paddingBottom: 60 }}>
        <article style={{ padding: '40px 24px', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '20%', right: -250, width: 600, height: 600, borderRadius: '50%',
            background: 'rgba(0,180,216,.04)', filter: 'blur(100px)', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative', zIndex: 2 }}>

            {/* Breadcrumb */}
            <div style={{ marginBottom: 24, fontSize: 12, color: 'rgba(199,214,255,.4)' }}>
              <Link href="/" style={{ color: 'rgba(199,214,255,.4)', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <Link href="/#case-study" style={{ color: 'rgba(199,214,255,.4)', textDecoration: 'none' }}>Case studies</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: 'rgba(199,214,255,.7)' }}>All On Deck Crew</span>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 14 }}>
                Case Study · Recruitment
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 18, letterSpacing: '-.02em' }}>
                All On Deck Crew — <span className="gradient-text">From scattered to operational.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(199,214,255,.65)', lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
                A recruitment business needed credibility online and a real way to handle applicants. We built the foundation.
              </p>
            </div>

            {/* Meta bar */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 44,
            }} className="cs-meta">
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Industry</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(199,214,255,.9)' }}>Recruitment</div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Engagement</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(199,214,255,.9)' }}>Foundation build</div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Live at</div>
                <a href="https://allondeckcrew.com" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 15, fontWeight: 700, color: '#00e87b', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  allondeckcrew.com <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* The problem */}
            <section style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(239,68,68,.75)', fontWeight: 800, marginBottom: 14 }}>
                The problem
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
                A working business operating without the digital infrastructure to support it.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(199,214,255,.7)', lineHeight: 1.85, margin: 0 }}>
                All On Deck Crew was running recruitment without the digital infrastructure to support it. No real website to send candidates or clients to. Applications were coming in through fragmented channels with no central place to review, sort, or follow up. The business looked older than it was, and operations slowed down every time an applicant batch hit.
              </p>
            </section>

            {/* What we built */}
            <section style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,180,216,.85)', fontWeight: 800, marginBottom: 14 }}>
                What we built
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 20 }}>
                One foundation. Wired end to end.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                {BUILT.map((b, i) => (
                  <div key={i} style={{
                    padding: '22px 22px', borderRadius: 18,
                    background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
                    border: '1px solid rgba(0,180,216,.12)',
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(199,214,255,.92)', marginBottom: 8, lineHeight: 1.35 }}>
                      {b.title}
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(199,214,255,.55)', lineHeight: 1.7, margin: 0 }}>
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcome */}
            <section style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.85)', fontWeight: 800, marginBottom: 14 }}>
                Outcome
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 20 }}>
                The business now matches the work.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                {OUTCOMES.map((o, i) => (
                  <div key={i} style={{
                    padding: '22px 22px', borderRadius: 18,
                    background: 'linear-gradient(180deg, rgba(10,16,38,.7), rgba(5,8,16,.5))',
                    border: '1px solid rgba(0,232,123,.18)',
                    boxShadow: '0 0 40px rgba(0,232,123,.03)',
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(199,214,255,.95)', marginBottom: 8, lineHeight: 1.35 }}>
                      {o.title}
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(199,214,255,.6)', lineHeight: 1.7, margin: 0 }}>
                      {o.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section CTA */}
            <div style={{
              padding: '32px 32px', borderRadius: 22,
              background: 'linear-gradient(135deg, rgba(0,232,123,.05), rgba(0,180,216,.04))',
              border: '1px solid rgba(0,232,123,.15)',
              display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: 18,
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,232,123,.7)', letterSpacing: '.12em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
                  Next step
                </div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 800, color: 'rgba(199,214,255,.95)', lineHeight: 1.35 }}>
                  Want the same foundation for your business?
                </div>
              </div>
              <Link href="/contact?mode=call" style={{
                padding: '15px 26px', borderRadius: 12, fontSize: 14, fontWeight: 800, color: '#fff',
                background: 'linear-gradient(135deg, rgba(0,232,123,.18), rgba(0,180,216,.18))',
                border: '1px solid rgba(0,232,123,.45)',
                boxShadow: '0 0 30px rgba(0,232,123,.15)',
                display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
              }}>
                Book a discovery call <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <style>{`
            @media(max-width:768px){
              .cs-meta{grid-template-columns:1fr !important}
            }
          `}</style>
        </article>
      </main>
      <CTA />
      <Footer />
    </>
  )
}
