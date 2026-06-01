'use client'

import {
  Headphones, Briefcase, RefreshCw, Calendar, Shield, Star,
  Palette, Share2, BarChart3, Telescope,
  type LucideIcon,
} from 'lucide-react'

type Agent = {
  Icon: LucideIcon
  name: string
  fullName: string
  color: string
  rgb: string
  role: string
  desc: string
  channels: string[]
}

type Tier = {
  label: string
  sublabel: string
  color: string
  rgb: string
  agents: Agent[]
}

const tiers: Tier[] = [
  {
    label: 'Revenue Agents',
    sublabel: 'Win the work',
    color: '#00e87b', rgb: '0,232,123',
    agents: [
      {
        Icon: Headphones, name: 'IRIS', fullName: 'Intelligent Reception & Intake System',
        color: '#00e87b', rgb: '0,232,123',
        role: 'Front desk that never sleeps',
        desc: 'Answers every inbound — phone, SMS, chat, social — within seconds. Qualifies callers, books appointments, handles FAQs, transfers to a human when it matters. Trained on your brand voice.',
        channels: ['Phone', 'SMS', 'Chat', 'Social DMs'],
      },
      {
        Icon: Briefcase, name: 'ATLAS', fullName: 'Automated Lead & Sales System',
        color: '#00b4d8', rgb: '0,180,216',
        role: 'Always-on closer',
        desc: 'Reaches every new lead inside 60 seconds. Personalized outreach, objection handling, offer presentation. Hands warm bookings to the team.',
        channels: ['SMS', 'Email', 'Chat'],
      },
      {
        Icon: RefreshCw, name: 'PULSE', fullName: 'Persistent Unified Lead Salvage Engine',
        color: '#f59e0b', rgb: '245,158,11',
        role: 'Follow-up engine',
        desc: 'No lead left behind. Recovers no-shows in 15 minutes. Re-engages cold leads on day 1, 3, 7, 14, 30. Reactivates past customers for repeat work.',
        channels: ['SMS', 'Email'],
      },
    ],
  },
  {
    label: 'Operations Agents',
    sublabel: 'Run the business',
    color: '#a855f7', rgb: '168,85,247',
    agents: [
      {
        Icon: Calendar, name: 'SYNC', fullName: 'Smart Scheduling & Calendar System',
        color: '#a855f7', rgb: '168,85,247',
        role: 'Scheduling specialist',
        desc: 'Books, reschedules, and manages your calendar in real time. Automated reminders, waitlist management, zero double-bookings.',
        channels: ['SMS', 'Email', 'Calendar'],
      },
      {
        Icon: Shield, name: 'AEGIS', fullName: 'Automated Engagement & General Inquiry System',
        color: '#06b6d4', rgb: '6,182,212',
        role: 'Customer care',
        desc: '24/7 support for routine questions — hours, pricing, insurance, prep. Collects intake. Routes anything complex to a human. Multilingual.',
        channels: ['Phone', 'SMS', 'Chat', 'Social DMs'],
      },
      {
        Icon: Star, name: 'PRISM', fullName: 'Proactive Review & Reputation Intelligence',
        color: '#ef4444', rgb: '239,68,68',
        role: 'Reputation engine',
        desc: 'Requests reviews one hour after service. Routes happy clients to Google. Catches negative sentiment before it goes public. Tracks your rating over time.',
        channels: ['SMS', 'Email'],
      },
    ],
  },
  {
    label: 'Content & Social Agents',
    sublabel: 'Build the brand',
    color: '#f472b6', rgb: '244,114,182',
    agents: [
      {
        Icon: Palette, name: 'MUSE', fullName: 'Media, Uploads & Social Engine',
        color: '#f472b6', rgb: '244,114,182',
        role: 'In-house creative team',
        desc: 'Generates branded social posts, promo graphics, thumbnails, before-and-afters, and seasonal content. Maintains your colors, fonts, and voice across everything.',
        channels: ['Command Center', 'Approval Queue'],
      },
      {
        Icon: Share2, name: 'WAVE', fullName: 'Web & Automated Visual Engagement',
        color: '#818cf8', rgb: '129,140,248',
        role: 'Social media manager',
        desc: 'Schedules and publishes across Instagram, Facebook, TikTok, Google Business, LinkedIn, and X. Optimal timing, platform-specific formatting. Nothing posts without approval.',
        channels: ['IG', 'FB', 'TikTok', 'Google', 'LinkedIn', 'X'],
      },
    ],
  },
  {
    label: 'Intelligence Agents',
    sublabel: 'See what is working',
    color: '#22c55e', rgb: '34,197,94',
    agents: [
      {
        Icon: BarChart3, name: 'RADAR', fullName: 'Reporting, Analytics & Decision Automation',
        color: '#22c55e', rgb: '34,197,94',
        role: 'Business analyst',
        desc: 'Daily briefings. Weekly reports. Source attribution. Agent performance scoring. Anomaly alerts when something is off. You always know what is working.',
        channels: ['Dashboard', 'SMS Alerts', 'Email'],
      },
      {
        Icon: Telescope, name: 'SCOUT', fullName: 'Strategic Competitive & Opportunity Unit',
        color: '#fbbf24', rgb: '251,191,36',
        role: 'Research & lead discovery',
        desc: 'Research, intelligence gathering, lead discovery, competitive analysis, opportunity identification. Watches the market so you do not have to.',
        channels: ['Dashboard', 'Email Digest'],
      },
    ],
  },
]

export default function AIAgents() {
  return (
    <section id="agents" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '40%', left: -300, width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(0,180,216,.03)', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            The Agent Roster
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Ten specialists. <span className="gradient-text">One business.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.45)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Each agent is a specialist — trained on your services, your voice, and your rules. Deploy the ones you need. Skip the ones you do not.
          </p>
        </div>

        {tiers.map((tier, ti) => (
          <div key={ti} style={{ marginBottom: ti < tiers.length - 1 ? 48 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                padding: '4px 12px', borderRadius: 8, fontSize: 10, fontWeight: 800,
                letterSpacing: '.1em', textTransform: 'uppercase' as const,
                color: tier.color, background: `rgba(${tier.rgb},.06)`,
                border: `1px solid rgba(${tier.rgb},.12)`,
              }}>{tier.label}</div>
              <span style={{ fontSize: 12, color: 'rgba(199,214,255,.3)' }}>{tier.sublabel}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`, gap: 14 }}>
              {tier.agents.map((a, i) => (
                <div key={i} style={{
                  padding: 24, borderRadius: 20,
                  background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
                  border: '1px solid rgba(255,255,255,.05)',
                  backdropFilter: 'blur(20px)', transition: 'all .3s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${a.rgb},.2)`; e.currentTarget.style.boxShadow = `0 0 40px rgba(${a.rgb},.05)` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, rgba(${a.rgb},.25), transparent)` }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `rgba(${a.rgb},.08)`, border: `1px solid rgba(${a.rgb},.18)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <a.Icon size={18} style={{ color: a.color }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: a.color, letterSpacing: '.05em' }}>{a.name}</span>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, animation: 'pulse 2s infinite' }} />
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(199,214,255,.35)', letterSpacing: '.02em' }}>{a.fullName}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(199,214,255,.6)', marginBottom: 8, marginTop: 12 }}>{a.role}</div>
                  <p style={{ fontSize: 12, color: 'rgba(199,214,255,.45)', lineHeight: 1.75, margin: '0 0 14px' }}>{a.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>
                    {a.channels.map((c, j) => (
                      <span key={j} style={{
                        padding: '3px 8px', borderRadius: 6, fontSize: 9, fontWeight: 700,
                        color: `rgba(${a.rgb},.7)`, background: `rgba(${a.rgb},.06)`, letterSpacing: '.03em',
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 56, padding: '28px 32px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(0,232,123,.03), rgba(0,180,216,.02))',
          border: '1px solid rgba(0,232,123,.08)',
          textAlign: 'center' as const,
        }}>
          <div style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 10 }}>
            Custom builds
          </div>
          <p style={{ fontSize: 14, color: 'rgba(199,214,255,.6)', lineHeight: 1.8, maxWidth: 620, margin: '0 auto' }}>
            The agents above are common deployments. We also build custom AI agents — executive assistants, operations managers, recruiters, research, knowledge bases — trained on your specific workflow. Scoped per business.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
      `}</style>
    </section>
  )
}
