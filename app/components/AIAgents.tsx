'use client'

const tiers = [
  {
    label: 'Revenue Agents',
    sublabel: 'Directly make you money',
    color: '#00e87b', rgb: '0,232,123',
    agents: [
      {
        emoji: '📞', name: 'IRIS', fullName: 'Intelligent Reception & Intake System', color: '#00e87b', rgb: '0,232,123',
        role: 'Your 24/7 front desk',
        desc: 'Answers every call within 2 rings. Qualifies callers, books appointments, handles FAQs, transfers to humans when needed. Trained on your brand voice.',
        channels: ['Phone', 'SMS', 'Chat', 'Social DMs'],
      },
      {
        emoji: '💼', name: 'ATLAS', fullName: 'Automated Lead & Sales System', color: '#00b4d8', rgb: '0,180,216',
        role: 'Your tireless closer',
        desc: 'Reaches every new lead within 60 seconds. Personalized outreach, objection handling, offer presentation — pushes toward booking with zero hesitation.',
        channels: ['SMS', 'Email', 'Chat'],
      },
      {
        emoji: '🔄', name: 'PULSE', fullName: 'Persistent Unified Lead Salvage Engine', color: '#f59e0b', rgb: '245,158,11',
        role: 'Your follow-up machine',
        desc: 'No lead left behind. Recovers no-shows in 15 minutes. Re-engages cold leads on day 1, 3, 7, 14, 30. Reactivates past customers for repeat bookings.',
        channels: ['SMS', 'Email'],
      },
    ]
  },
  {
    label: 'Operations Agents',
    sublabel: 'Keep your business running',
    color: '#a855f7', rgb: '168,85,247',
    agents: [
      {
        emoji: '📅', name: 'SYNC', fullName: 'Smart Scheduling & Calendar System', color: '#a855f7', rgb: '168,85,247',
        role: 'Your scheduling specialist',
        desc: 'Books, reschedules, manages your calendar in real-time. Automated reminders (24hr + 2hr). Waitlist management. Zero double-bookings, ever.',
        channels: ['SMS', 'Email', 'Calendar'],
      },
      {
        emoji: '🛡️', name: 'AEGIS', fullName: 'Automated Engagement & General Inquiry System', color: '#06b6d4', rgb: '6,182,212',
        role: 'Your customer care team',
        desc: '24/7 support for routine questions — hours, pricing, insurance, prep instructions. Collects intake. Routes complex issues to humans. Multilingual.',
        channels: ['Phone', 'SMS', 'Chat', 'Social DMs'],
      },
      {
        emoji: '⭐', name: 'PRISM', fullName: 'Proactive Review & Reputation Intelligence', color: '#ef4444', rgb: '239,68,68',
        role: 'Your reputation engine',
        desc: 'Requests reviews 1 hour after service. Routes happy clients to Google. Catches negative sentiment before it goes public. Tracks your rating over time.',
        channels: ['SMS', 'Email'],
      },
    ]
  },
  {
    label: 'Content & Social Agents',
    sublabel: 'Grow your brand on autopilot',
    color: '#f472b6', rgb: '244,114,182',
    agents: [
      {
        emoji: '🎨', name: 'MUSE', fullName: 'Media, Uploads & Social Engine', color: '#f472b6', rgb: '244,114,182',
        role: 'Your in-house creative team',
        desc: 'Generates branded social posts, promo graphics, thumbnails, before/afters, team spotlights, and seasonal content. Maintains your colors, fonts, and brand voice across everything.',
        channels: ['Command Center', 'Approval Queue'],
      },
      {
        emoji: '📱', name: 'WAVE', fullName: 'Web & Automated Visual Engagement', color: '#818cf8', rgb: '129,140,248',
        role: 'Your social media manager',
        desc: 'Schedules and publishes across Instagram, Facebook, TikTok, Google Business, LinkedIn, and X. Optimal timing, platform-specific formatting. Nothing posts without your approval.',
        channels: ['IG', 'FB', 'TikTok', 'Google', 'LinkedIn', 'X'],
      },
    ]
  },
  {
    label: 'Intelligence Agents',
    sublabel: 'Give you superpowers',
    color: '#22c55e', rgb: '34,197,94',
    agents: [
      {
        emoji: '📊', name: 'RADAR', fullName: 'Reporting, Analytics & Decision Automation', color: '#22c55e', rgb: '34,197,94',
        role: 'Your business analyst',
        desc: 'Daily briefings. Weekly reports. Source attribution. Agent performance scoring. Anomaly alerts when something\'s off. You always know what\'s working.',
        channels: ['Dashboard', 'SMS Alerts', 'Email'],
      },
      {
        emoji: '🎯', name: 'SCOUT', fullName: 'Smart Campaign Optimization & Targeting', color: '#e879f9', rgb: '232,121,249',
        role: 'Your marketing strategist',
        desc: 'Manages Google Ads. Optimizes based on which leads actually convert — not just click. A/B tests ad copy, tracks cost-per-booking, and gives budget recommendations.',
        channels: ['Dashboard', 'Monthly Report'],
      },
    ]
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
            10 Specialists. <span className="gradient-text">One Mission.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Each agent is a specialist — custom-trained on your business, your brand, and your rules. Together they run your entire operation.
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
              <span style={{ fontSize: 12, color: 'rgba(199,214,255,.25)' }}>{tier.sublabel}</span>
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
                    <span style={{ fontSize: 28 }}>{a.emoji}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: a.color, letterSpacing: '.05em' }}>{a.name}</span>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, animation: 'pulse 2s infinite' }} />
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(199,214,255,.3)', letterSpacing: '.02em' }}>{a.fullName}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(199,214,255,.6)', marginBottom: 8, marginTop: 8 }}>{a.role}</div>
                  <p style={{ fontSize: 12, color: 'rgba(199,214,255,.4)', lineHeight: 1.75, margin: '0 0 14px' }}>{a.desc}</p>

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

        {/* Cost comparison */}
        <div style={{
          marginTop: 48, padding: '32px 36px', borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(0,232,123,.03), rgba(0,180,216,.02))',
          border: '1px solid rgba(0,232,123,.08)',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center',
        }} className="compare-box">
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(199,214,255,.25)', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '.12em' }}>Hiring 10 Employees</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(199,214,255,.4)' }}>$200K+<span style={{ fontSize: 13 }}>/yr</span></div>
            <div style={{ fontSize: 10, color: 'rgba(199,214,255,.2)', marginTop: 4 }}>Training · Turnover · Benefits · Sick days</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: 'rgba(199,214,255,.1)' }}>vs</div>
          <div style={{ textAlign: 'center' as const }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,232,123,.6)', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '.12em' }}>GrowIQ AI Team</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}><span className="gradient-text">$4,500</span><span style={{ fontSize: 13, color: 'rgba(199,214,255,.35)' }}>/mo</span></div>
            <div style={{ fontSize: 10, color: 'rgba(199,214,255,.3)', marginTop: 4 }}>24/7 · Instant training · Zero turnover · Gets smarter</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @media(max-width:768px){.compare-box{grid-template-columns:1fr !important;text-align:center}}
      `}</style>
    </section>
  )
}