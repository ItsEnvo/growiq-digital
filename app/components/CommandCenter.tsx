'use client'

const KPIS = [
  { label: 'Leads Today', val: '23', change: '+18%', color: '#00e87b', spark: [30, 45, 38, 60, 52, 74, 90] },
  { label: 'Calls Answered', val: '47', change: '0 missed', color: '#00b4d8', spark: [60, 55, 70, 65, 80, 78, 92] },
  { label: 'Booked Today', val: '12', change: '+3 vs yest.', color: '#a855f7', spark: [20, 35, 30, 48, 44, 58, 70] },
  { label: 'Revenue Influenced', val: '$8.4K', change: 'This week', color: '#f59e0b', spark: [40, 38, 52, 50, 66, 72, 88] },
]

const FEED = [
  { agent: 'IRIS', color: '#00e87b', text: 'Answered call — new patient inquiry from Google Ads', time: 'now' },
  { agent: 'ATLAS', color: '#00b4d8', text: 'Lead #308 engaged — sent personalized treatment offer', time: '2m' },
  { agent: 'PULSE', color: '#f59e0b', text: 'No-show recovery — Maria K. rebooked for Friday', time: '5m' },
  { agent: 'PRISM', color: '#ef4444', text: 'Review secured — James P. left 5-star on Google', time: '8m' },
  { agent: 'MUSE', color: '#f472b6', text: 'New post designed — "Spring Special" promo graphic', time: '11m' },
  { agent: 'WAVE', color: '#818cf8', text: 'Published to Instagram + Google Business', time: '12m' },
  { agent: 'SYNC', color: '#a855f7', text: 'Reminder sent — 3 appointments tomorrow', time: '15m' },
]

const PIPELINE = [
  { stage: 'New', count: 8, color: '#00e87b', width: '80%' },
  { stage: 'Contacted', count: 14, color: '#00b4d8', width: '100%' },
  { stage: 'Qualified', count: 11, color: '#a855f7', width: '78%' },
  { stage: 'Booked', count: 9, color: '#f59e0b', width: '64%' },
  { stage: 'Showed', count: 7, color: '#22c55e', width: '50%' },
  { stage: 'Converted', count: 5, color: '#00e87b', width: '36%' },
]

const VITALS = [
  { label: 'Avg. Response', val: '0.4s' },
  { label: 'Automation', val: '98%' },
  { label: 'Uptime', val: '99.99%' },
  { label: 'Tasks / Day', val: '1,200+' },
]

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = { position: 'absolute' as const, width: 18, height: 18, pointerEvents: 'none' as const, zIndex: 4 }
  const b = '1px solid rgba(0,232,123,.5)'
  const map: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: b, borderLeft: b, borderTopLeftRadius: 6 },
    tr: { top: -1, right: -1, borderTop: b, borderRight: b, borderTopRightRadius: 6 },
    bl: { bottom: -1, left: -1, borderBottom: b, borderLeft: b, borderBottomLeftRadius: 6 },
    br: { bottom: -1, right: -1, borderBottom: b, borderRight: b, borderBottomRightRadius: 6 },
  }
  return <span style={{ ...base, ...map[pos] }} />
}

export default function CommandCenter() {
  return (
    <section id="platform" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '50%', right: -200, width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,232,123,.04)', filter: 'blur(80px)', pointerEvents: 'none', transform: 'translateY(-50%)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
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

        {/* HUD console */}
        <div className="cc-console" style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(8,14,32,.92), rgba(4,7,16,.92))',
          border: '1px solid rgba(0,232,123,.18)',
          boxShadow: '0 0 0 1px rgba(0,232,123,.05), 0 0 90px rgba(0,232,123,.07), 0 40px 90px rgba(0,0,0,.55)',
        }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

          {/* Animated grid + scanline overlay */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .5,
            backgroundImage: 'linear-gradient(rgba(0,232,123,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,123,.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 80%)',
          }} />
          <div aria-hidden className="cc-scan" style={{
            position: 'absolute', left: 0, right: 0, height: 2, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(0,232,123,.5), transparent)',
          }} />

          {/* Header bar */}
          <div style={{
            position: 'relative', zIndex: 2,
            padding: '15px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0,232,123,.1)',
            background: 'linear-gradient(90deg, rgba(0,232,123,.05), transparent)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="cc-pulse" style={{ width: 9, height: 9, borderRadius: '50%', background: '#00e87b', boxShadow: '0 0 12px #00e87b' }} />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.22em', color: '#dbe6ff', textTransform: 'uppercase' as const }}>
                GrowIQ <span style={{ color: 'rgba(199,214,255,.35)' }}>// Command Center</span>
              </span>
              <span style={{
                fontSize: 9, fontWeight: 900, letterSpacing: '.18em', padding: '3px 8px', borderRadius: 5,
                color: '#00e87b', border: '1px solid rgba(0,232,123,.35)', background: 'rgba(0,232,123,.06)',
              }}>● LIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 16 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <span key={i} className="cc-eq" style={{ width: 3, borderRadius: 2, background: '#00e87b', animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(199,214,255,.45)', letterSpacing: '.12em', textTransform: 'uppercase' as const }}>
                10 Agents Online
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, padding: 22 }}>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }} className="cc-stats">
              {KPIS.map((s, i) => (
                <div key={i} style={{
                  position: 'relative', overflow: 'hidden', padding: '15px 14px 13px', borderRadius: 12,
                  background: 'linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.01))',
                  border: '1px solid rgba(255,255,255,.06)',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(199,214,255,.35)', letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: 7 }}>{s.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
                    <div style={{ fontSize: 25, fontWeight: 900, color: s.color, lineHeight: 1, textShadow: `0 0 22px ${s.color}40` }}>{s.val}</div>
                    {/* sparkline */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 22 }}>
                      {s.spark.map((h, j) => (
                        <span key={j} style={{
                          width: 3, height: `${h}%`, borderRadius: 1,
                          background: j === s.spark.length - 1 ? s.color : `${s.color}40`,
                        }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(199,214,255,.3)', marginTop: 8 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 12 }} className="cc-cols">
              {/* Agent feed */}
              <div style={{
                padding: 16, borderRadius: 12,
                background: 'rgba(255,255,255,.018)', border: '1px solid rgba(255,255,255,.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(199,214,255,.45)', letterSpacing: '.12em', textTransform: 'uppercase' as const }}>Live Agent Feed</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,232,123,.6)', letterSpacing: '.1em' }}>STREAMING</span>
                </div>
                {FEED.map((e, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 0',
                    borderBottom: i < FEED.length - 1 ? '1px solid rgba(255,255,255,.03)' : 'none',
                  }}>
                    <span className={i === 0 ? 'cc-pulse' : ''} style={{ width: 6, height: 6, borderRadius: '50%', background: e.color, marginTop: 5, boxShadow: `0 0 8px ${e.color}` }} />
                    <span style={{
                      fontSize: 9, fontWeight: 900, color: e.color, minWidth: 42, marginTop: 1, letterSpacing: '.06em',
                      padding: '2px 0',
                    }}>{e.agent}</span>
                    <span style={{ fontSize: 11.5, color: 'rgba(199,214,255,.5)', lineHeight: 1.5, flex: 1 }}>{e.text}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: i === 0 ? '#00e87b' : 'rgba(199,214,255,.22)', whiteSpace: 'nowrap' as const, marginTop: 1, textTransform: 'uppercase' as const }}>{e.time}</span>
                  </div>
                ))}
              </div>

              {/* Pipeline */}
              <div style={{
                padding: 16, borderRadius: 12,
                background: 'rgba(255,255,255,.018)', border: '1px solid rgba(255,255,255,.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(199,214,255,.45)', letterSpacing: '.12em', textTransform: 'uppercase' as const }}>Lead Pipeline</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(199,214,255,.3)' }}>54 active</span>
                </div>
                {PIPELINE.map((s, i) => (
                  <div key={i} style={{ marginBottom: i < PIPELINE.length - 1 ? 11 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(199,214,255,.55)' }}>{s.stage}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: s.color }}>{s.count}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.04)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3, width: s.width,
                        background: `linear-gradient(90deg, ${s.color}55, ${s.color})`,
                        boxShadow: `0 0 10px ${s.color}80`, transition: 'width 1s',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System vitals strip */}
            <div style={{
              marginTop: 14, padding: '12px 6px', borderRadius: 12,
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              background: 'linear-gradient(90deg, rgba(0,232,123,.04), rgba(0,180,216,.03))',
              border: '1px solid rgba(255,255,255,.05)',
            }} className="cc-vitals">
              {VITALS.map((v, i) => (
                <div key={i} style={{
                  textAlign: 'center' as const,
                  borderRight: i < VITALS.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none',
                }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#dbe6ff' }}>{v.val}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(199,214,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase' as const, marginTop: 3 }}>{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: 10, marginTop: 32 }}>
          {['Real-Time Agent Feed', 'Lead Pipeline', 'Call Transcripts', 'Unified Inbox', 'Calendar View', 'Review Tracker', 'Content Calendar', 'Social Analytics', 'Daily Briefings', 'Revenue Reports'].map((f, i) => (
            <span key={i} style={{
              padding: '7px 16px', borderRadius: 99, fontSize: 11, fontWeight: 600,
              color: 'rgba(199,214,255,.45)', border: '1px solid rgba(0,232,123,.1)',
              background: 'rgba(0,232,123,.02)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ccPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.82)} }
        .cc-pulse { animation: ccPulse 1.6s ease-in-out infinite; }
        @keyframes ccScan { 0%{top:0;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{top:100%;opacity:0} }
        .cc-scan { animation: ccScan 5.5s linear infinite; }
        @keyframes ccEq { 0%,100%{height:5px;opacity:.5} 50%{height:15px;opacity:1} }
        .cc-eq { animation: ccEq 1s ease-in-out infinite; }
        @media(max-width:768px){
          .cc-stats{grid-template-columns:repeat(2,1fr) !important}
          .cc-cols{grid-template-columns:1fr !important}
          .cc-vitals{grid-template-columns:repeat(2,1fr) !important; row-gap:14px}
          .cc-vitals > div:nth-child(2){border-right:none !important}
        }
      `}</style>
    </section>
  )
}
