'use client'

const agentData = [
  { emoji: '📞', name: 'IRIS', role: 'Reception', color: '#00e87b', activity: 'Answered 47 calls today · 3 in queue', metric: '0 missed' },
  { emoji: '💼', name: 'ATLAS', role: 'Sales', color: '#00b4d8', activity: 'Engaged 23 leads · 14 responded', metric: '61% response' },
  { emoji: '🔄', name: 'PULSE', role: 'Follow-Up', color: '#f59e0b', activity: 'Recovered 4 no-shows · 12 sequences active', metric: '33% recovery' },
  { emoji: '📅', name: 'SYNC', role: 'Scheduling', color: '#a855f7', activity: '12 booked today · 3 rescheduled', metric: '2 reminders sent' },
  { emoji: '🛡️', name: 'AEGIS', role: 'Support', color: '#06b6d4', activity: 'Handled 31 inquiries · 2 escalated', metric: '94% resolved' },
  { emoji: '⭐', name: 'PRISM', role: 'Reviews', color: '#ef4444', activity: '6 review requests sent · 3 completed', metric: '4.8★ avg' },
  { emoji: '🎨', name: 'MUSE', role: 'Content', color: '#f472b6', activity: '3 posts designed · 1 awaiting approval', metric: '2 approved' },
  { emoji: '📱', name: 'WAVE', role: 'Social', color: '#818cf8', activity: 'Published 2 posts · 4 scheduled this week', metric: '1.2K reach' },
  { emoji: '📊', name: 'RADAR', role: 'Intel', color: '#22c55e', activity: 'Daily brief compiled · 3 alerts triggered', metric: 'Report ready' },
  { emoji: '🎯', name: 'SCOUT', role: 'Marketing', color: '#e879f9', activity: 'CPC optimized · A/B test running', metric: '$4.20 CPL' },
]

const activityFeed = [
  { agent: 'IRIS', color: '#00e87b', text: 'Answered call — new patient inquiry from Google Ads, qualified and booked', time: '2m ago' },
  { agent: 'ATLAS', color: '#00b4d8', text: 'Lead #308 engaged — sent Botox intro offer, awaiting reply', time: '5m ago' },
  { agent: 'PULSE', color: '#f59e0b', text: 'No-show recovery — Maria K. replied "yes" — rebooked Friday 3pm', time: '8m ago' },
  { agent: 'PRISM', color: '#ef4444', text: 'New review! James P. left 5★ on Google: "Amazing experience"', time: '12m ago' },
  { agent: 'MUSE', color: '#f472b6', text: 'Created "Spring Glow-Up" promo graphic — pending approval', time: '18m ago' },
  { agent: 'WAVE', color: '#818cf8', text: 'Published to Instagram + Google Business — "Before/After" post', time: '25m ago' },
  { agent: 'SYNC', color: '#a855f7', text: 'Sent 24hr reminder to 5 tomorrow appointments', time: '30m ago' },
  { agent: 'SCOUT', color: '#e879f9', text: 'Paused underperforming ad group — reallocated $12/day to top performer', time: '45m ago' },
  { agent: 'AEGIS', color: '#06b6d4', text: 'Handled pricing inquiry via website chat — sent treatment menu PDF', time: '52m ago' },
  { agent: 'RADAR', color: '#22c55e', text: 'Alert: Lead volume up 22% vs last week — Google Ads driving spike', time: '1h ago' },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Good evening 👋</h1>
      <p style={{ fontSize: 13, color: 'rgba(199,214,255,.4)', marginBottom: 28 }}>Here's what your AI team has been up to today.</p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { label: 'Leads Today', val: '23', change: '+18%', up: true, color: '#00e87b' },
          { label: 'Calls Answered', val: '47', change: '0 missed', up: true, color: '#00b4d8' },
          { label: 'Appointments', val: '12', change: '+3 vs yesterday', up: true, color: '#a855f7' },
          { label: 'Revenue Influenced', val: '$8,400', change: 'This week', up: true, color: '#f59e0b' },
          { label: 'Reviews', val: '3 new', change: '4.8★ avg', up: true, color: '#ef4444' },
          { label: 'Posts Published', val: '2', change: '4 scheduled', up: true, color: '#818cf8' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '18px 16px', borderRadius: 16,
            background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
            border: '1px solid rgba(255,255,255,.05)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(199,214,255,.3)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 11, color: 'rgba(199,214,255,.35)', marginTop: 2 }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="overview-cols">
        {/* Live Agent Feed */}
        <div style={{
          padding: 20, borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
          border: '1px solid rgba(255,255,255,.05)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(199,214,255,.5)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            Live Agent Feed
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activityFeed.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
                borderBottom: i < activityFeed.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
              }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: e.color, minWidth: 42, marginTop: 1 }}>{e.agent}</span>
                <span style={{ fontSize: 12, color: 'rgba(199,214,255,.5)', lineHeight: 1.6, flex: 1 }}>{e.text}</span>
                <span style={{ fontSize: 10, color: 'rgba(199,214,255,.2)', whiteSpace: 'nowrap', marginTop: 1 }}>{e.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div style={{
          padding: 20, borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
          border: '1px solid rgba(255,255,255,.05)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(199,214,255,.5)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            Agent Status
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {agentData.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 10, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.03)',
              }}>
                <span style={{ fontSize: 18 }}>{a.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: a.color }}>{a.name}</span>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: 10, color: 'rgba(199,214,255,.25)' }}>{a.role}</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(199,214,255,.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.activity}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: a.color, whiteSpace: 'nowrap' }}>{a.metric}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.overview-cols{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}