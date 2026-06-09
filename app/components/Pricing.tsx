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
}

const engagements: Plan[] = [
  {
    name: 'Foundation',
    kind: 'engagement',
    price: 'Call for Quote',
    priceNote: '',
    desc: 'The complete digital foundation. Premium website, admin dashboard, lead capture, and the infrastructure to run on top of.',
    features: [
      'Premium luxury website',
      'Lead capture and inquiry routing',
      'Admin dashboard',
      'Google Workspace setup',
      'Domain, DNS, and hosting',
      'Business infrastructure setup',
      '30 days of post-launch support',
    ],
    cta: 'Start a Foundation',
    ctaHref: '/contact?mode=foundation',
    flagship: true,
  },
  {
    name: 'Custom AI Systems',
    kind: 'engagement',
    price: 'Call for Quote',
    priceNote: 'scoped to your business',
    desc: 'Custom AI employees and agent teams built to run your business operations — sales, support, content, and more.',
    features: [
      'AI Sales Assistant',
      'AI Support Assistant',
      'AI Content Engine',
      'AI Operations Manager',
      'Custom multi-agent system design',
      'Full integration with your existing tools',
      '30-day onboarding and training',
    ],
    cta: 'Scope an AI System',
    ctaHref: '/contact?mode=ai-systems',
    badge: 'Enterprise',
  },
]

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

const retainers: Plan[] = [
  {
    name: 'Foundation Care',
    kind: 'retainer',
    price: '$500',
    priceNote: '/mo',
    desc: 'Hands-off operations for your live foundation. Hosting, updates, and support handled for you.',
    features: [
      'Hosting and infrastructure',
      'Maintenance and updates',
      'Email and standard support',
      'Monthly status check-in',
    ],
    cta: 'Add Foundation Care',
    ctaHref: '/contact?mode=foundation-care',
  },
  {
    name: 'Growth Partner',
    kind: 'retainer',
    price: '$1,500',
    priceNote: '/mo',
    desc: 'Everything in Foundation Care, plus a partner working on the business with you each month.',
    features: [
      'Everything in Foundation Care',
      'AI optimization and tuning',
      'Dashboard improvements',
      'Strategy support',
      'Priority support',
    ],
    cta: 'Become a Growth Partner',
    ctaHref: '/contact?mode=growth-partner',
  },
]

function PlanCard({ plan, onCta }: { plan: Plan; onCta: (p: Plan) => void }) {
  const accent = plan.flagship
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
          Start Here
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
        {plan.kind === 'engagement' ? 'Engagement' : plan.kind === 'retainer' ? 'Retainer' : 'Add-On'}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{plan.name}</h3>
      <p style={{ fontSize: 13, color: 'rgba(199,214,255,.5)', lineHeight: 1.7, marginBottom: 22 }}>{plan.desc}</p>

      <div style={{ marginBottom: 4 }}>
        <span style={{
          fontSize: plan.price === 'Call for Quote' ? 22 : 38,
          fontWeight: 900, color: plan.price === 'Call for Quote' ? 'rgba(0,232,123,.8)' : '#fff',
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
            A foundation, then a <span className="gradient-text">partner.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Start with the Foundation. Layer in Custom AI Systems and a retainer when you are ready.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20, alignItems: 'stretch', marginBottom: 32,
        }}>
          {engagements.map(p => <PlanCard key={p.name} plan={p} onCta={handleCta} />)}
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18,
        }}>
          Ongoing Partnership
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20, alignItems: 'stretch',
        }}>
          {retainers.map(p => <PlanCard key={p.name} plan={p} onCta={handleCta} />)}
        </div>

        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '.25em',
          color: 'rgba(199,214,255,.35)', textTransform: 'uppercase' as const,
          textAlign: 'center' as const, marginBottom: 18, marginTop: 48,
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
          Foundation is a one-time engagement. Retainers are month to month, no long-term contract. Custom AI Systems are scoped per build.
        </p>
      </div>
    </section>
  )
}
