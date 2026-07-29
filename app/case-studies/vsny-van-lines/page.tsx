import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Navigation from '../../components/Navigation'
import CTA from '../../components/CTA'
import Footer from '../../components/Footer'
import Particles from '../../components/Particles'

export const metadata = {
  title: 'VSNY Van Lines — GrowIQ Case Study',
  description:
    'Migrating a moving company off an aging WordPress site onto a fast, mobile-correct build — with quote requests wired straight into the CRM their sales team already works from.',
}

const BUILT = [
  {
    title: 'Full rebuild, replacing an aging WordPress site',
    body: 'A fast, mobile-correct site covering services, service areas, credentials and quote capture — built to be read on a phone, which is where most moving searches happen.',
  },
  {
    title: 'Quote requests wired directly into their existing CRM',
    body: 'The quote form posts straight into the lead gateway their sales team already works from. No inbox to watch, no copying details between systems, no lead sitting unseen.',
  },
  {
    title: 'Live migration with zero email downtime',
    body: 'We moved the domain to the new build at the DNS level and deliberately left their mail records untouched, so company email kept flowing through the cutover.',
  },
  {
    title: 'Every indexed old page preserved',
    body: 'Years of pages already ranking in Google would have started returning errors after the switch. Each one now redirects to the live site instead of dead-ending a visitor.',
  },
  {
    title: 'Assets brought in-house',
    body: 'Images were being hot-linked from the old host and would have gone blank the moment it went away. All of it is now self-hosted, along with a reprocessed logo and favicon.',
  },
  {
    title: 'Licensing and contact details corrected site-wide',
    body: 'US DOT and ICC/MC numbers, addresses and phone lines audited and corrected everywhere they appear — the details a customer checks before trusting a mover with their house.',
  },
]

const OUTCOMES = [
  {
    title: 'Quote requests arrive where the team already works',
    body: 'A form submission becomes a lead in their system automatically. Nothing waits on someone checking an inbox and retyping it.',
  },
  {
    title: 'A site that holds up on a phone',
    body: 'Most people looking for a mover are on mobile. The build was tested and corrected for it rather than shrunk down from a desktop layout.',
  },
  {
    title: 'Search visibility carried over, not lost',
    body: 'The pages Google already knew about still resolve. A rebuild that quietly breaks existing rankings costs more than it delivers.',
  },
  {
    title: 'Live on their own domain, running',
    body: 'Delivered, migrated and handed over working — with the infrastructure in place for lead automation when they want it.',
  },
]

export default function VsnyVanLinesCaseStudy() {
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
              <span style={{ color: 'rgba(199,214,255,.7)' }}>VSNY Van Lines</span>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 14 }}>
                Case Study · Moving & Logistics
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 18, letterSpacing: '-.02em' }}>
                VSNY Van Lines — <span className="gradient-text">Rebuilt, migrated, and wired to their CRM.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(199,214,255,.65)', lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
                A moving company on an aging WordPress site needed a rebuild that would not cost them their email, their rankings, or a single quote request.
              </p>
            </div>

            {/* Meta bar */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 44,
            }} className="cs-meta">
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Industry</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(199,214,255,.9)' }}>Moving & Logistics</div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Engagement</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(199,214,255,.9)' }}>Rebuild + lead pipeline</div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(10,16,38,.5)', border: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: 'rgba(199,214,255,.4)', fontWeight: 700, marginBottom: 6 }}>Live at</div>
                <a href="https://vsnyvanlines.com" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 15, fontWeight: 700, color: '#00e87b', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  vsnyvanlines.com <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* The problem */}
            <section style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(239,68,68,.75)', fontWeight: 800, marginBottom: 14 }}>
                The problem
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
                An established mover whose website was working against them.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(199,214,255,.7)', lineHeight: 1.85, margin: 0 }}>
                VSNY Van Lines had thousands of moves behind them and a website that did not reflect it. The site sat on aging WordPress, several of its images were hot-linked from a host that could disappear at any time, and the licensing details customers check before hiring a mover were out of date in places. Quote requests had no reliable path into the system their sales team actually used. And any rebuild carried real risk: cut the domain over carelessly and they lose company email, or every page Google already ranked starts returning errors.
              </p>
            </section>

            {/* What we built */}
            <section style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(0,180,216,.85)', fontWeight: 800, marginBottom: 14 }}>
                What we built
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 800, lineHeight: 1.25, marginBottom: 20 }}>
                A rebuild that could not afford to break anything.
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
