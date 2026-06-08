'use client'
import { useEffect, useState, useRef } from 'react'

// ── Constants ──────────────────────────────────────────────────────────────
const W = 760, H = 440, CX = 380, CY = 220, R = 148

const AGENTS = [
  { name: 'IRIS',  label: 'Reception & Intake',  color: '#00e87b', rgb: '0,232,123',   angle: 0   },
  { name: 'ATLAS', label: 'Lead & Sales',         color: '#00b4d8', rgb: '0,180,216',   angle: 36  },
  { name: 'PULSE', label: 'Follow-Up Engine',     color: '#f59e0b', rgb: '245,158,11',  angle: 72  },
  { name: 'SYNC',  label: 'Scheduling',           color: '#a855f7', rgb: '168,85,247',  angle: 108 },
  { name: 'AEGIS', label: 'Customer Care',        color: '#06b6d4', rgb: '6,182,212',   angle: 144 },
  { name: 'PRISM', label: 'Reputation',           color: '#ef4444', rgb: '239,68,68',   angle: 180 },
  { name: 'MUSE',  label: 'Creative & Brand',     color: '#f472b6', rgb: '244,114,182', angle: 216 },
  { name: 'WAVE',  label: 'Social Publishing',    color: '#818cf8', rgb: '129,140,248', angle: 252 },
  { name: 'RADAR', label: 'Analytics',            color: '#22c55e', rgb: '34,197,94',   angle: 288 },
  { name: 'SCOUT', label: 'Research & Discovery', color: '#fbbf24', rgb: '251,191,36',  angle: 324 },
]

const ACTIVITY = [
  { agent: 'IRIS',  text: 'Inbound handled — roofing prospect, Brooklyn NY',         type: 'in'  },
  { agent: 'ATLAS', text: 'Lead reached in 48s — flooring company, Queens',          type: 'out' },
  { agent: 'PULSE', text: 'Day-7 sequence triggered — HVAC lead re-engaged',         type: 'out' },
  { agent: 'SYNC',  text: 'Discovery call booked — Friday 10am confirmed',           type: 'in'  },
  { agent: 'PRISM', text: 'Review request sent — job #4821 complete',                type: 'out' },
  { agent: 'AEGIS', text: 'Support ticket closed — customer satisfaction confirmed', type: 'in'  },
  { agent: 'RADAR', text: 'Insight: +23% conversion improvement this month',        type: 'in'  },
  { agent: 'SCOUT', text: 'Opportunity flagged — landscaping co., $72K pipeline',   type: 'in'  },
  { agent: 'MUSE',  text: 'Brand assets generated — summer campaign graphics',       type: 'out' },
  { agent: 'WAVE',  text: 'Content published — 4 platforms, 1,240 reach',           type: 'out' },
]

// ── Geometry helpers ───────────────────────────────────────────────────────
function nodePos(angleDeg: number, radius = R) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

function curvePath(from: { x: number; y: number }) {
  const mx = (from.x + CX) / 2 + (from.y - CY) * 0.15
  const my = (from.y + CY) / 2 - (from.x - CX) * 0.15
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${CX} ${CY}`
}

function bezierPt(from: { x: number; y: number }, t: number) {
  const mx = (from.x + CX) / 2 + (from.y - CY) * 0.15
  const my = (from.y + CY) / 2 - (from.x - CX) * 0.15
  return {
    x: (1-t)*(1-t)*from.x + 2*(1-t)*t*mx + t*t*CX,
    y: (1-t)*(1-t)*from.y + 2*(1-t)*t*my + t*t*CY,
  }
}

function labelAnchor(x: number) {
  if (x < CX - 25) return 'end'
  if (x > CX + 25) return 'start'
  return 'middle'
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AgentNetwork() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [log, setLog] = useState([ACTIVITY[0]])
  const [particles, setParticles] = useState<Record<string, number>>({})
  const raf = useRef<number>(0)
  const speeds = useRef<Record<string, number>>({})
  const offsets = useRef<Record<string, number>>({})

  // Seed per-agent particle speeds/offsets once
  useEffect(() => {
    AGENTS.forEach(a => {
      speeds.current[a.name]  = 0.0035 + Math.random() * 0.003
      offsets.current[a.name] = Math.random()
    })
  }, [])

  // Animate particles
  useEffect(() => {
    function tick() {
      setParticles(prev => {
        const next: Record<string, number> = {}
        AGENTS.forEach(a => {
          next[a.name] = ((prev[a.name] ?? offsets.current[a.name] ?? 0) + speeds.current[a.name]) % 1
        })
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  // Cycle activity log
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx(i => {
        const next = (i + 1) % ACTIVITY.length
        setLog(prev => [ACTIVITY[next], ...prev].slice(0, 5))
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const activeAgent = AGENTS.find(a => a.name === ACTIVITY[activeIdx].agent)!

  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow behind map */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,232,123,0.04) 0%, rgba(0,180,216,0.03) 40%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase',
            color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12,
          }}>
            Live Infrastructure
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Your AI Network,{' '}
            <span className="gradient-text">Always Operating</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}>
            Every agent runs continuously — feeding intelligence into a central core and acting across
            your entire business simultaneously, around the clock.
          </p>
        </div>

        {/* Map + feed */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0,
          borderRadius: 24, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.06)',
          background: 'linear-gradient(180deg, rgba(8,14,34,.9), rgba(4,8,18,.8))',
          boxShadow: '0 0 80px rgba(0,232,123,.03), 0 30px 80px rgba(0,0,0,.5)',
        }} className="agent-network-grid">

          {/* SVG map */}
          <div style={{ position: 'relative', padding: '12px 0' }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            >
              <defs>
                <filter id="gn-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="gn-glow-lg">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="gn-core">
                  <stop offset="0%" stopColor="#00e87b" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#00b4d8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#065f46" stopOpacity="0.6" />
                </radialGradient>
              </defs>

              {/* Faint orbit rings */}
              {[R + 35, R - 30].map(r => (
                <circle key={r} cx={CX} cy={CY} r={r}
                  fill="none" stroke="rgba(255,255,255,.03)" strokeWidth={1} />
              ))}

              {/* Connection lines */}
              {AGENTS.map(agent => {
                const from = nodePos(agent.angle)
                const isActive = agent.name === activeAgent.name
                return (
                  <path
                    key={`line-${agent.name}`}
                    d={curvePath(from)}
                    fill="none"
                    stroke={isActive ? agent.color : `rgba(${agent.rgb},.18)`}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    strokeDasharray="4 7"
                    opacity={isActive ? 1 : 0.6}
                    style={{ transition: 'all 0.5s ease' }}
                  />
                )
              })}

              {/* Particles */}
              {AGENTS.map(agent => {
                const from = nodePos(agent.angle)
                const t = particles[agent.name] ?? 0
                const pt = bezierPt(from, t)
                const isActive = agent.name === activeAgent.name
                return (
                  <circle
                    key={`p-${agent.name}`}
                    cx={pt.x} cy={pt.y}
                    r={isActive ? 4 : 2.2}
                    fill={agent.color}
                    opacity={isActive ? 1 : 0.45}
                    filter={isActive ? 'url(#gn-glow)' : undefined}
                  />
                )
              })}

              {/* Center core */}
              <circle cx={CX} cy={CY} r={58}
                fill={`rgba(${activeAgent.rgb},.06)`}
                stroke={`rgba(${activeAgent.rgb},.25)`}
                strokeWidth={1}
                filter="url(#gn-glow)"
                style={{ transition: 'all 0.6s ease' }}
              />
              <circle cx={CX} cy={CY} r={42} fill="url(#gn-core)" filter="url(#gn-glow-lg)">
                <animate attributeName="r" values="40;44;40" dur="3.5s" repeatCount="indefinite" />
              </circle>
              {/* Rotating orbit */}
              <circle cx={CX} cy={CY} r={52} fill="none"
                stroke="rgba(0,232,123,.2)" strokeWidth={1} strokeDasharray="6 14">
                <animateTransform attributeName="transform" type="rotate"
                  from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="14s" repeatCount="indefinite" />
              </circle>
              <text x={CX} y={CY - 9} textAnchor="middle"
                fill="white" fontSize={8.5} fontWeight={800} letterSpacing={1.5}>
                GROWIQ
              </text>
              <text x={CX} y={CY + 5} textAnchor="middle"
                fill="rgba(199,214,255,.5)" fontSize={6.5} letterSpacing={1}>
                AI CORE
              </text>
              <text x={CX} y={CY + 17} textAnchor="middle"
                fill={activeAgent.color} fontSize={6} letterSpacing={0.5}
                style={{ transition: 'fill 0.5s ease' }}>
                {activeAgent.name} active
              </text>

              {/* Agent nodes */}
              {AGENTS.map(agent => {
                const p = nodePos(agent.angle)
                const lp = nodePos(agent.angle, R + 62)
                const isActive = agent.name === activeAgent.name
                const anchor = labelAnchor(lp.x)

                return (
                  <g key={agent.name}>
                    {/* Active pulse ring */}
                    {isActive && (
                      <circle cx={p.x} cy={p.y} r={28}
                        fill={`rgba(${agent.rgb},.1)`}
                        stroke={`rgba(${agent.rgb},.5)`}
                        strokeWidth={1}>
                        <animate attributeName="r" values="22;32;22" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Node bg */}
                    <circle cx={p.x} cy={p.y} r={20}
                      fill={isActive ? `rgba(${agent.rgb},.85)` : `rgba(${agent.rgb},.1)`}
                      stroke={`rgba(${agent.rgb},${isActive ? '.9' : '.35'})`}
                      strokeWidth={isActive ? 1.5 : 1}
                      filter={isActive ? 'url(#gn-glow)' : undefined}
                      style={{ transition: 'all 0.5s ease' }}
                    />

                    {/* Agent initials */}
                    <text x={p.x} y={p.y + 4} textAnchor="middle"
                      fill={isActive ? 'white' : agent.color}
                      fontSize={isActive ? 8 : 7}
                      fontWeight={800}
                      letterSpacing={0.5}
                      style={{ transition: 'all 0.5s ease' }}
                    >
                      {agent.name}
                    </text>

                    {/* Label */}
                    <text x={lp.x} y={lp.y - 4} textAnchor={anchor}
                      fill={isActive ? agent.color : 'rgba(199,214,255,.45)'}
                      fontSize={7.5} fontWeight={isActive ? 700 : 500}
                      style={{ transition: 'fill 0.5s ease' }}
                    >
                      {agent.name}
                    </text>
                    <text x={lp.x} y={lp.y + 7} textAnchor={anchor}
                      fill="rgba(199,214,255,.2)" fontSize={6}
                    >
                      {agent.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Activity feed */}
          <div style={{
            borderLeft: '1px solid rgba(255,255,255,.05)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Feed header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,.05)',
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,.015)',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: '#00e87b',
                boxShadow: '0 0 8px rgba(0,232,123,.8)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(199,214,255,.4)' }}>
                Live Feed
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(0,232,123,.5)', fontWeight: 600 }}>
                {AGENTS.length} agents online
              </span>
            </div>

            {/* Events */}
            <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
              {log.map((item, i) => {
                const agent = AGENTS.find(a => a.name === item.agent)!
                return (
                  <div key={`${item.text}-${i}`} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    opacity: 1 - i * 0.18,
                    transition: 'opacity 0.4s ease',
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: `rgba(${agent.rgb},.12)`,
                      border: `1px solid rgba(${agent.rgb},.3)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 800, color: agent.color, letterSpacing: 0.5,
                    }}>
                      {agent.name}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(199,214,255,.7)', lineHeight: 1.5 }}>
                        {item.text}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(199,214,255,.25)', marginTop: 2 }}>
                        just now
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Stats strip */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,.05)',
              padding: '14px 20px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            }}>
              {[
                { label: 'Actions / hr',  value: '247',    color: '#00e87b' },
                { label: 'Leads handled', value: '1,840',  color: '#00b4d8' },
                { label: 'Uptime',        value: '99.97%', color: '#a855f7' },
                { label: 'Avg response',  value: '< 60s',  color: '#f59e0b' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  padding: '10px 12px', borderRadius: 10,
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.05)',
                }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color, marginBottom: 2 }}>{value}</div>
                  <div style={{ fontSize: 9, color: 'rgba(199,214,255,.3)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent color legend */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 28,
        }}>
          {AGENTS.map(agent => (
            <div key={agent.name} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 100,
              background: `rgba(${agent.rgb},.06)`,
              border: `1px solid rgba(${agent.rgb},.2)`,
              fontSize: 11, color: 'rgba(199,214,255,.6)',
              cursor: 'default',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: agent.color, flexShrink: 0 }} />
              <span style={{ fontWeight: 700, color: agent.color }}>{agent.name}</span>
              <span>{agent.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .agent-network-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
