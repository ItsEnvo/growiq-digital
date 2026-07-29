'use client'

export default function Results() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,180,216,.12), transparent)',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Why It Works
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            The old stack vs. <span className="gradient-text">a real foundation.</span>
          </h2>
        </div>

        {/* Comparison grid */}
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(10,16,38,.6), rgba(5,8,16,.4))',
          border: '1px solid rgba(255,255,255,.05)',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 0,
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}>
            <div style={{ padding: '16px 24px' }} />
            <div style={{ padding: '16px 20px', textAlign: 'center' as const, borderLeft: '1px solid rgba(255,255,255,.04)' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(199,214,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase' as const }}>Traditional</span>
            </div>
            <div style={{ padding: '16px 20px', textAlign: 'center' as const, borderLeft: '1px solid rgba(255,255,255,.04)', background: 'rgba(0,232,123,.02)' }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' as const }} className="gradient-text">GrowIQ AI</span>
            </div>
          </div>

          {[
            { label: 'Response Time', old: '4-24 hours', new: '< 5 seconds' },
            { label: 'Availability', old: '40 hrs/week', new: '24/7/365' },
            { label: 'Follow-Up Rate', old: '~30%', new: 'Every lead' },
            { label: 'Missed Calls', old: '30-50%', new: 'Texted back in seconds' },
            { label: 'Training Time', old: '2-4 weeks', new: 'Same day' },
            { label: 'Monthly Cost', old: '$12K+ (salaries)', new: 'From $197/mo' },
            { label: 'Scalability', old: 'Hire more people', new: 'Instant' },
            { label: 'Consistency', old: 'Varies by person', new: 'Same every time' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 0,
              borderBottom: i < 7 ? '1px solid rgba(255,255,255,.04)' : 'none',
            }}>
              <div style={{ padding: '14px 24px', fontSize: 13, fontWeight: 600, color: 'rgba(199,214,255,.6)' }}>{row.label}</div>
              <div style={{ padding: '14px 20px', textAlign: 'center' as const, fontSize: 13, color: 'rgba(199,214,255,.3)', borderLeft: '1px solid rgba(255,255,255,.04)' }}>{row.old}</div>
              <div style={{ padding: '14px 20px', textAlign: 'center' as const, fontSize: 13, fontWeight: 700, color: '#00e87b', borderLeft: '1px solid rgba(255,255,255,.04)', background: 'rgba(0,232,123,.02)' }}>{row.new}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40, padding: '28px 32px', borderRadius: 20,
          border: '1px solid rgba(0,232,123,.12)',
          background: 'linear-gradient(135deg, rgba(0,232,123,.04), rgba(0,180,216,.03))',
          textAlign: 'center' as const,
        }}>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.7)', margin: 0, lineHeight: 1.8 }}>
            <strong style={{ color: '#fff' }}>Honest standard:</strong> we ship a working foundation, hand over every account, and stay around on a retainer only if it earns its keep month over month.
          </p>
        </div>
      </div>
    </section>
  )
}