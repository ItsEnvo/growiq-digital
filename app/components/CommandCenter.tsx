'use client'

export default function CommandCenter() {
  return (
    <section id="platform" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '50%', right: -200, width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,232,123,.04)', filter: 'blur(80px)', pointerEvents: 'none', transform: 'translateY(-50%)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            The Platform
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Your <span className="gradient-text">Command Center</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            See everything your AI team is doing — in real time. Every call, every lead, every booking, every dollar.
          </p>
        </div>

        {/* Mock dashboard */}
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(10,16,38,.8), rgba(5,8,16,.6))',
          border: '1px solid rgba(0,232,123,.1)',
          boxShadow: '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)',
        }}>
          {/* Title bar */}
          <div style={{
            padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,.06)',
            background: 'rgba(255,255,255,.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(199,214,255,.3)', marginLeft: 8 }}>command-center.growiq.ai</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} /> 10 Agents Online
            </span>
          </div>

          <div style={{ padding: 24 }}>
            {/* Top stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }} className="cc-stats">
              {[
                { label: 'Leads Today', val: '23', change: '+18%', color: '#00e87b' },
                { label: 'Calls Answered', val: '47', change: '0 missed', color: '#00b4d8' },
                { label: 'Booked Today', val: '12', change: '+3 vs yesterday', color: '#a855f7' },
                { label: 'Revenue Influenced', val: '$8,400', change: 'This week', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '16px 14px', borderRadius: 14,
                  background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(199,214,255,.3)', letterSpacing: '.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'rgba(199,214,255,.3)', marginTop: 2 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Two columns: agent feed + pipeline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="cc-cols">
              {/* Agent activity feed */}
              <div style={{
                padding: 16, borderRadius: 14,
                background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)',
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(199,214,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Live Agent Feed</div>
                {[
                  { agent: 'IRIS', color: '#00e87b', text: 'Answered call — new patient inquiry from Google Ads', time: '12s ago' },
                  { agent: 'ATLAS', color: '#00b4d8', text: 'Lead #308 engaged — sent personalized treatment offer', time: '2m ago' },
                  { agent: 'PULSE', color: '#f59e0b', text: 'No-show recovery — Maria K. rebooked for Friday', time: '5m ago' },
                  { agent: 'PRISM', color: '#ef4444', text: 'Review secured — James P. left 5-star on Google', time: '8m ago' },
                  { agent: 'MUSE', color: '#f472b6', text: 'New post designed — "Spring Special" promo graphic', time: '11m ago' },
                  { agent: 'WAVE', color: '#818cf8', text: 'Published to Instagram + Google Business', time: '12m ago' },
                  { agent: 'SYNC', color: '#a855f7', text: 'Reminder sent — 3 appointments tomorrow', time: '15m ago' },
                ].map((e, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0',
                    borderBottom: i < 4 ? '1px solid rgba(255,255,255,.03)' : 'none',
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 900, color: e.color, minWidth: 38, marginTop: 1 }}>{e.agent}</span>
                    <span style={{ fontSize: 11, color: 'rgba(199,214,255,.45)', lineHeight: 1.5, flex: 1 }}>{e.text}</span>
                    <span style={{ fontSize: 9, color: 'rgba(199,214,255,.2)', whiteSpace: 'nowrap' as const, marginTop: 1 }}>{e.time}</span>
                  </div>
                ))}
              </div>

              {/* Pipeline */}
              <div style={{
                padding: 16, borderRadius: 14,
                background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)',
              }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(199,214,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Lead Pipeline</div>
                {[
                  { stage: 'New', count: 8, color: '#00e87b', width: '80%' },
                  { stage: 'Contacted', count: 14, color: '#00b4d8', width: '100%' },
                  { stage: 'Qualified', count: 11, color: '#a855f7', width: '78%' },
                  { stage: 'Booked', count: 9, color: '#f59e0b', width: '64%' },
                  { stage: 'Showed', count: 7, color: '#22c55e', width: '50%' },
                  { stage: 'Converted', count: 5, color: '#00e87b', width: '36%' },
                ].map((s, i) => (
                  <div key={i} style={{ marginBottom: i < 5 ? 10 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(199,214,255,.5)' }}>{s.stage}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: s.color }}>{s.count}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.04)' }}>
                      <div style={{ height: '100%', borderRadius: 2, width: s.width, background: `${s.color}40`, transition: 'width 1s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills below */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: 10, marginTop: 32 }}>
          {['Real-Time Agent Feed', 'Lead Pipeline', 'Call Transcripts', 'Unified Inbox', 'Calendar View', 'Review Tracker', 'Content Calendar', 'Social Analytics', 'Daily Briefings', 'Revenue Reports'].map((f, i) => (
            <span key={i} style={{
              padding: '7px 16px', borderRadius: 99, fontSize: 11, fontWeight: 600,
              color: 'rgba(199,214,255,.4)', border: '1px solid rgba(255,255,255,.06)',
              background: 'rgba(255,255,255,.02)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .cc-stats{grid-template-columns:repeat(2,1fr) !important}
          .cc-cols{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  )
}