'use client'

export default function LogoBar() {
  const stats = [
    { val: '10', label: 'AI Agents Deployed', color: '#00e87b' },
    { val: '24/7', label: 'Always Online', color: '#00b4d8' },
    { val: '<5s', label: 'Response Time', color: '#a855f7' },
    { val: '0', label: 'Missed Calls', color: '#f59e0b' },
  ]

  return (
    <section style={{
      padding: '32px 24px',
      borderTop: '1px solid rgba(255,255,255,.04)',
      borderBottom: '1px solid rgba(255,255,255,.04)',
      background: 'rgba(0,232,123,.01)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' as const }} className="stats-bar">
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color, textShadow: `0 0 20px ${s.color}20` }}>{s.val}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(199,214,255,.3)', letterSpacing: '.08em', textTransform: 'uppercase' as const }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){.stats-bar{grid-template-columns:repeat(2,1fr) !important;gap:20px !important}}`}</style>
    </section>
  )
}