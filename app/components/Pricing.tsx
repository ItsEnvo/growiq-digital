'use client'

import { Check, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Plan = {
  name: string
  kind: 'engagement' | 'retainer' | 'addon'
  price: string
  priceNote: string
  desc: string
  features: string[]
  cta: string
  ctaHref: string
  flagship?: boolean
  badge?: string
  kindLabel?: string
}

const builds: Plan[] = [
  {
    name: 'Standard Website',
    kind: 'engagement',
    price: '$1,500',
    priceNote: 'one-time',
    desc: 'A clean, fast, conversion-focused website wired into your lead system. Your front door, built to convert.',
    features: [
      'Premium conversion-focused website',
      'Lead capture and inquiry routing',
      'Domain, DNS, and hosting setup',
      'Connected to your GrowIQ platform',
      'Live in 7 days from kickoff',
      '30 days of post-launch support',
    ],
    cta: 'Start Your Build',
    ctaHref: '/contact?mode=foundation',
  },
  {
    name: 'Premium Build',
    kind: 'engagement',
    price: '$3,000 – $5,000',
    priceNote: 'one-time',
    desc: 'Custom design, additional pages, and advanced integrations for businesses that need more.',
    features: [
      'Fully custom design',
      'Additional pages and funnels',
      'Advanced integrations',
      'Everything in Standard Website',
      'Priority build timeline',
      '30 days of post-launch support',
    ],
    cta: 'Scope a Premium Build',
    ctaHref: '/contact?mode=premium-build',
  },
]

const aiWorkforce: Plan = {
  name: 'Dedicated AI Workforce',
  kind: 'engagement',
  price: 'From $2,500',
  priceNote: 'setup, then custom monthly',
  desc: 'Your own team of AI employees — reception, sales, follow-up, and operations — deployed on secure, private infrastructure, trained on your business, and running every hour of every day.',
  features: [
    'A private, dedicated, secure environment built for your business',
    'AI agents chosen for your needs: reception, sales, follow-up, operations',
    'Trained on your brand voice, services, and workflows',
    'Works across phone, SMS, email, chat, and social',
    'Seamless handoff to your team when a human is needed',
    'Ongoing tuning, monitoring, and priority support',
  ],
  cta: 'Book a Scoping Call',
  ctaHref: '/contact?mode=ai-workforce',
  badge: 'Premium',
  kindLabel: 'Private AI Infrastructure',
}

const addons: Plan[] = [
  {
    name: 'Google Review Removal',
    kind: 'addon',
    price: '$250',
    priceNote: 'per review',
    desc: 'We dispute and remove damaging or fake Google reviews that are hurting your star rating and costing you customers.',
    features: [
      'Review audit and eligibility check',
      'Formal Google dispute filing',
      'Policy violation documentation',
      'Removal confirmation',
    ],
    cta: 'Remove Google Reviews',
    ctaHref: '/contact?mode=google-review-removal',
  },
  {
    name: 'Yelp Account Removal',
    kind: 'addon',
    price: 'Call for Quote',
    priceNote: '',
    desc: 'We handle the process of removing or suppressing a Yelp business account that is damaging your brand or operating without your consent.',
    features: [
      'Account audit and eligibility review',
      'Formal Yelp removal request',
      'Documentation and policy filing',
      'Confirmation and follow-through',
    ],
    cta: 'Remove Yelp Account',
    ctaHref: '/contact?mode=yelp-account-removal',
  },
]

const plans: Plan[] = [
  {
    name: 'Foundation',
    kind: 'retainer',
    price: '$197',
    priceNote: '/mo',
    desc: 'Your site stays fast, current, and found. No contract.',
    features: [
      'Website hosting, security, and backups',
      'Unlimited content and page updates',
      'Google Business Profile kept current',
      'Every enquiry in one place, nothing lost',
      'Email support',
      'Cancel any time — no contract, no cancellation fee',
    ],
    cta: 'Start with Foundation',
    ctaHref: '/contact?mode=foundation-care',
  },
  {
    name: 'Growth',
    kind: 'retainer',
    price: '$497',
    priceNote: '/mo',
    desc: 'Stop losing the customers who already called you.',
    features: [
      'Everything in Foundation',
      'Missed a call? They get a text back in seconds — and can book right there',
      'Form filled at 11pm? Answered instantly, not tomorrow morning',
      'Automatic review requests after every job',
      'Online booking that works while you sleep',
      'A monthly report showing exactly what was recovered',
      'Cancel any time — no contract, no cancellation fee',
    ],
    cta: 'Choose Growth',
    ctaHref: '/contact?mode=growth-partner',
    flagship: true,
  },
  {
    name: 'Scale',
    kind: 'retainer',
    price: '$997',
    priceNote: '/mo',
    desc: 'For multi-location operators and higher-value work.',
    features: [
      'Everything in Growth',
      'Multiple locations and phone lines covered',
      'Advanced automation built around your workflow',
      'Campaign and content planning with you, not at you',
      'Direct line to us — priority on everything',
      'Cancel any time — no contract, no cancellation fee',
    ],
    cta: 'Scale Up',
    ctaHref: '/contact?mode=scale',
  },
]

function PlanCard({ plan, onCta }: { plan: Plan; onCta: (p: Plan) => void }) {
  const accent = plan.flagship
  const isQuote = plan.price === 'Call for Quote'
  const longPrice = plan.price.length > 8
  return (
    <div style={{
      position: 'relative', borderRadius: 24, padding: 32,
      background: 'linear-gradient(180deg, rgba(10,16,38,.7), rgba(5,8,16,.5))',
      border: accent ? '1px solid rgba(0,232,123,.2)' : '1px solid rgba(255,255,255,.06)',
      boxShadow: accent ? '0 0 50px rgba(0,232,123,.06), 0 0 100px rgba(0,180,216,.03)' : 'none',
      backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column' as const,
    }}>
      {accent && (
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          padding: '5px 18px', borderRadius: 99, fontSize: 10, fontWeight: 900,
          letterSpacing: '.15em', textTransform: 'uppercase' as const,
          background: 'linear-gradient(135deg, #00e87b, #00b4d8)', color: '#fff',
          boxShadow: '0 0 20px rgba(0,232,123,.3)',
        }}>
          Most Popular
        </div>
      )}
      {plan.badge && (
        <div style={{
          position: 'absolute', top: -12, right: 20,
          padding: '5px 18px', borderRadius: 99, fontSize: 10, fontWeight: 900,
          letterSpacing: '.15em', textTransform: 'uppercase' as const,
          background: 'linear-gradient(135deg, #7c3aed, #00b4d8)', color: '#fff',
          boxShadow: '0 0 20px rgba(124,58,237,.3)',
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{
        fontSize: 10, fontWeight: 800, letterSpacing: '.18em',
        color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const, marginBottom: 10,
      }}>
        {plan.kindLabel ?? (plan.kind === 'engagement' ? 'One-Time Build' : plan.kind === 'retainer' ? 'Monthly Plan' : 'Add-On')}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{plan.name}</h3>
      <p style={{ fontSize: 13, color: 'rgba(199,214,255,.5)', lineHeight: 1.7, marginBottom: 22 }}>{plan.desc}</p>

      <div style={{ marginBottom: 4 }}>
        <span style={{
          fontSize: longPrice ? 22 : 38,
          fontWeight: 900, color: isQuote ? 'rgba(0,232,123,.8)' : '#fff',
        }}>{plan.price}</span>
        {plan.priceNote && (
          <span style={{ fontSize: 14, color: 'rgba(199,214,255,.4)', marginLeft: 6 }}>{plan.priceNote}</span>
        )}
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,.05)', margin: '22px 0' }} />

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28, flexGrow: 1 }}>
        {plan.features.map((f, j) => (
          <li key={j} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0',
            fontSize: 13, color: 'rgba(199,214,255,.65)',
          }}>
            <Check size={15} style={{ color: accent ? '#00e87b' : 'rgba(199,214,255,.4)', flexShrink: 0, marginTop: 3 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button onClick={() => onCta(plan)} style={{
        width: '100%', padding: '15px', borderRadius: 14, fontSize: 13, fontWeight: 800, color: '#fff',
        background: accent ? 'linear-gradient(135deg, rgba(0,232,123,.14), rgba(0,180,216,.14))' : 'rgba(255,255,255,.03)',
        border: accent ? '1px solid rgba(0,232,123,.35)' : '1px solid rgba(255,255,255,.08)',
        boxShadow: accent ? '0 0 20px rgba(0,232,123,.1)' : 'none',
        transition: 'all .3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: 'pointer',
      }}>
        {plan.cta} <ArrowRight size={15} />
      </button>
    </div>
  )
}

export default function Pricing() {
  const router = useRouter()
  const handleCta = (p: Plan) => router.push(p.ctaHref)

  return (
    <section id="pricing" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,232,123,.12), transparent)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Pricing
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Build it once. Then <span className="gradient-text">grow on it.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            A one-time build to launch your foundation, then a simple monthly plan for the platform, automation, and support that turn visitors into booked customers.
          </p>
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18,
        }}>
          One-Time Build
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20, alignItems: 'stretch', marginBottom: 48,
        }}>
          {builds.map(p => <PlanCard key={p.name} plan={p} onCta={handleCta} />)}
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18,
        }}>
          Monthly Plans
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20, alignItems: 'stretch',
        }}>
          {plans.map(p => <PlanCard key={p.name} plan={p} onCta={handleCta} />)}
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18, marginTop: 64,
        }}>
          Premium Engagement
        </div>

        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <PlanCard plan={aiWorkforce} onCta={handleCta} />
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18, marginTop: 64,
        }}>
          Reputation Protection
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20, alignItems: 'stretch',
        }}>
          {addons.map(p => <PlanCard key={p.name} plan={p} onCta={handleCta} />)}
        </div>

        <p style={{ textAlign: 'center' as const, marginTop: 36, fontSize: 13, color: 'rgba(199,214,255,.4)', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          The build is a one-time engagement. Monthly plans are month to month with no long-term contract. Launch offer: build fee reduced by half when you start on an annual plan.
        </p>
      </div>
    </section>
  )
}
