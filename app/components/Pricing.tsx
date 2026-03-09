'use client'

import { Check, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: 'Growth',
    price: '$2,500',
    setup: '$2,500 setup',
    period: '/mo',
    desc: 'Essential AI infrastructure for businesses ready to stop missing leads.',
    agents: '6 AI Agents',
    agentList: 'IRIS · ATLAS · PULSE · SYNC · WAVE · RADAR',
    features: [
      '6 AI agents (Reception, Sales, Follow-Up, Scheduling, Social Publishing, Reporting)',
      'Command Center dashboard access',
      'Landing page build',
      'Google Ads setup & management',
      'CRM pipeline configuration',
      'Automated booking flow',
      'Social media scheduling & publishing',
      'Daily briefings + weekly reports',
      'Email support',
    ],
    flagship: false,
  },
  {
    name: 'Scale',
    price: '$4,500',
    setup: '$3,500 setup',
    period: '/mo',
    desc: 'The full AI workforce. Every agent, every system, fully managed.',
    agents: 'All 10 AI Agents',
    agentList: 'IRIS · ATLAS · PULSE · SYNC · AEGIS · PRISM · MUSE · WAVE · RADAR · SCOUT',
    features: [
      'All 10 AI agents deployed',
      'Full Command Center with all dashboards',
      'Full website design & build',
      'Branded content creation (MUSE)',
      'Social media management across all platforms',
      'Advanced Google Ads + SCOUT optimization',
      'Complete CRM & pipeline automation',
      'Multi-channel (phone, SMS, email, chat, social)',
      'Call transcripts & conversation history',
      'Agent retraining as your business evolves',
      'Monthly strategy call',
      'Slack/Telegram direct access',
      'Priority support',
    ],
    flagship: true,
  },
]

export default function Pricing() {
  const router = useRouter()

  const handleGetStarted = (plan: string) => {
    router.push(`/auth/signup?plan=${plan.toLowerCase()}`)
  }

  return (
    <section id="pricing" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,232,123,.12), transparent)',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Pricing
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Invest in Your <span className="gradient-text">AI Team</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            Month-to-month. No long-term contracts. Cancel anytime.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              position: 'relative', borderRadius: 24, padding: 32,
              background: 'linear-gradient(180deg, rgba(10,16,38,.7), rgba(5,8,16,.5))',
              border: plan.flagship ? '1px solid rgba(0,232,123,.2)' : '1px solid rgba(255,255,255,.06)',
              boxShadow: plan.flagship ? '0 0 50px rgba(0,232,123,.06), 0 0 100px rgba(0,180,216,.03)' : 'none',
              transform: plan.flagship ? 'scale(1.03)' : 'none',
              backdropFilter: 'blur(20px)',
            }}>
              {plan.flagship && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  padding: '5px 18px', borderRadius: 99, fontSize: 10, fontWeight: 900,
                  letterSpacing: '.15em', textTransform: 'uppercase' as const,
                  background: 'linear-gradient(135deg, #00e87b, #00b4d8)', color: '#fff',
                  boxShadow: '0 0 20px rgba(0,232,123,.3)',
                }}>
                  Full Team
                </div>
              )}

              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{plan.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(199,214,255,.4)', marginBottom: 20 }}>{plan.desc}</p>

              {/* Agent count badge */}
              <div style={{
                padding: '10px 16px', borderRadius: 12, marginBottom: 20,
                background: plan.flagship ? 'rgba(0,232,123,.06)' : 'rgba(255,255,255,.02)',
                border: plan.flagship ? '1px solid rgba(0,232,123,.12)' : '1px solid rgba(255,255,255,.04)',
              }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: plan.flagship ? '#00e87b' : '#fff', marginBottom: 2 }}>{plan.agents}</div>
                <div style={{ fontSize: 11, color: 'rgba(199,214,255,.35)' }}>{plan.agentList}</div>
              </div>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 900, color: '#fff' }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'rgba(199,214,255,.35)' }}>{plan.period}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(199,214,255,.35)', marginBottom: 28 }}>+ {plan.setup}</div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
                    fontSize: 13, color: 'rgba(199,214,255,.6)',
                  }}>
                    <Check size={15} style={{ color: plan.flagship ? '#00e87b' : 'rgba(199,214,255,.3)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => handleGetStarted(plan.name)} style={{
                width: '100%', padding: '16px', borderRadius: 14, fontSize: 14, fontWeight: 800, color: '#fff',
                background: plan.flagship ? 'linear-gradient(135deg, rgba(0,232,123,.12), rgba(0,180,216,.12))' : 'rgba(255,255,255,.03)',
                border: plan.flagship ? '1px solid rgba(0,232,123,.35)' : '1px solid rgba(255,255,255,.08)',
                boxShadow: plan.flagship ? '0 0 20px rgba(0,232,123,.1)' : 'none',
                transition: 'all .3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = plan.flagship ? 'rgba(0,232,123,.5)' : 'rgba(255,255,255,.15)'
                if (plan.flagship) e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = plan.flagship ? 'rgba(0,232,123,.35)' : 'rgba(255,255,255,.08)'
                if (plan.flagship) e.currentTarget.style.boxShadow = '0 0 20px rgba(0,232,123,.1)'
              }}
              >
                Get Started <ArrowRight size={16} />
              </button>

              <button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} style={{
                width: '100%', padding: '12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                color: 'rgba(199,214,255,.4)', background: 'transparent', border: 'none',
                marginTop: 8, transition: 'color .3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(199,214,255,.7)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(199,214,255,.4)' }}
              >
                or book a free strategy call
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center' as const, marginTop: 28, fontSize: 13, color: 'rgba(199,214,255,.3)' }}>
          Ad spend is separate and paid directly to Google. Custom enterprise plans available for multi-location businesses.
        </p>
      </div>
    </section>
  )
}