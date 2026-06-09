'use client'

import { ArrowRight, Headphones, Briefcase, RefreshCw, Calendar, Shield, Star, Palette, Share2, BarChart3, Telescope, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type HeroAgent = {
  Icon: LucideIcon
  name: string
  role: string
  status: string
  detail: string
  color: string
}

const agents: HeroAgent[] = [
  { Icon: Headphones, name: 'IRIS',  role: 'Reception',  status: 'Answering call',         detail: 'New inbound inquiry — qualifying',           color: '#00e87b' },
  { Icon: Briefcase,  name: 'ATLAS', role: 'Sales',      status: 'Engaging lead #312',     detail: 'Personalized offer sent — 47s response',     color: '#00b4d8' },
  { Icon: RefreshCw,  name: 'PULSE', role: 'Follow-Up',  status: 'Recovering no-show',     detail: 'Re-engagement text — client replied',         color: '#f59e0b' },
  { Icon: Calendar,   name: 'SYNC',  role: 'Scheduling', status: 'Appointment confirmed',  detail: 'Sarah M. — Thursday 2:00 PM',                color: '#a855f7' },
  { Icon: Shield,     name: 'AEGIS', role: 'Support',    status: 'Handling inquiry',       detail: 'Insurance question — resolved',              color: '#06b6d4' },
  { Icon: Star,       name: 'PRISM', role: 'Reviews',    status: 'Review secured',         detail: 'Mike R. — 5-star on Google',                 color: '#ef4444' },
  { Icon: Palette,    name: 'MUSE',  role: 'Content',    status: 'Designing post',         detail: 'Spring promo graphic — ready for approval',  color: '#f472b6' },
  { Icon: Share2,     name: 'WAVE',  role: 'Social',     status: 'Posting to Instagram',   detail: '4 posts scheduled — 2 published',            color: '#818cf8' },
  { Icon: BarChart3,  name: 'RADAR', role: 'Intel',      status: 'Compiling report',       detail: '42 leads · 28 booked · $31K influenced',     color: '#22c55e' },
  { Icon: Telescope,  name: 'SCOUT', role: 'Research',   status: 'Surfacing opportunity',  detail: 'New lead source identified — competitor gap',color: '#fbbf24' },
]

function getPos(i: number, count: number, radius: number, center: number) {
  const angle = (i / count) * Math.PI * 2 - Math.PI / 2
  return {
    x: Math.cos(angle) * radius + center,
    y: Math.sin(angle) * radius + center,
    cx: center, cy: center,
  }
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [size, setSize] = useState(580)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % agents.length), 2200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1400) setSize(640)
      else if (w >= 1100) setSize(580)
      else if (w >= 960) setSize(500)
      else if (w >= 600) setSize(380)
      else setSize(310)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const radius = size * 0.42
  const center = size / 2
  const nodeSize = size >= 500 ? 80 : size >= 380 ? 60 : 50
  const hubSize = size >= 500 ? 120 : size >= 380 ? 90 : 75
  const ActiveIcon = agents[activeIdx].Icon

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative',
      overflow: 'hidden', padding: '110px 24px 60px',
    }}>
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 800, height: 800, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,232,123,.06) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,180,216,.04) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 24, alignItems: 'center' }} className="hero-grid">

          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99,
              fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const,
              color: 'rgba(0,232,123,.8)', border: '1px solid rgba(0,232,123,.12)',
              background: 'rgba(0,232,123,.04)', marginBottom: 28,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00e87b', animation: 'pulse 2s infinite' }} />
              Digital infrastructure · Premium websites · AI systems
            </div>

            <h1 className="serif" style={{
              fontSize: 'clamp(30px, 3.8vw, 50px)', fontWeight: 800, lineHeight: 1.08,
              marginBottom: 20, letterSpacing: '-.02em',
            }}>
              Your business has outgrown<br />its current setup.<br />
              <span className="gradient-text">We build the infrastructure to match.</span>
            </h1>

            <p style={{ fontSize: 15, color: 'rgba(199,214,255,.55)', maxWidth: 460, lineHeight: 1.85, marginBottom: 16 }}>
              GrowIQ builds premium websites, custom dashboards, and AI systems for established businesses that are still running on outdated digital infrastructure.
            </p>

            <p style={{ fontSize: 13, color: 'rgba(199,214,255,.35)', maxWidth: 460, lineHeight: 1.8, marginBottom: 32 }}>
              A website is the front door. The dashboard is the back office. AI is the workforce. We build all three.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
              <Link href="/contact?mode=call" style={{
                padding: '15px 26px', borderRadius: 12, fontSize: 14, fontWeight: 800, color: '#fff',
                background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
                border: '1px solid rgba(0,232,123,.4)',
                boxShadow: '0 0 30px rgba(0,232,123,.15), 0 0 60px rgba(0,180,216,.08)',
                display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all .3s', textDecoration: 'none',
              }}>
                Book a discovery call <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" style={{
                padding: '15px 26px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: 'rgba(199,214,255,.85)',
                background: 'rgba(255,255,255,.02)',
                border: '1px solid rgba(255,255,255,.08)',
                display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all .3s', textDecoration: 'none',
              }}>
                See pricing
              </Link>
            </div>
          </div>

          {/* ORBITAL HUD */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-right">
            <div style={{ position: 'relative', width: size, height: size }}>

              <div style={{
                position: 'absolute', inset: -40, borderRadius: '50%',
                border: '1px solid rgba(0,232,123,.04)',
                animation: 'ring-pulse 4s ease-in-out infinite',
              }} />

              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(0,232,123,.07)', animation: 'orbit 45s linear infinite' }} />
              <div style={{ position: 'absolute', inset: size * 0.09, borderRadius: '50%', border: '1px dashed rgba(0,180,216,.06)', animation: 'orbit 30s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: size * 0.2, borderRadius: '50%', border: '1px solid rgba(168,85,247,.05)', animation: 'orbit 55s linear infinite' }} />

              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: hubSize * 2, height: hubSize * 2, borderRadius: '50%', pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(0,232,123,.07) 0%, transparent 70%)',
              }} />

              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: hubSize, height: hubSize, borderRadius: '50%', zIndex: 5,
                background: 'radial-gradient(circle, rgba(8,12,28,1) 50%, rgba(0,232,123,.06) 100%)',
                border: '2px solid rgba(0,232,123,.25)',
                boxShadow: '0 0 50px rgba(0,232,123,.12), 0 0 100px rgba(0,180,216,.06)',
                display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,232,123,.35) 20%, transparent 40%, rgba(0,180,216,.35) 60%, transparent 80%, rgba(168,85,247,.25) 100%)',
                  animation: 'orbit 3.5s linear infinite', zIndex: -1,
                  mask: `radial-gradient(circle, transparent ${hubSize/2 - 4}px, black ${hubSize/2 - 3}px)`,
                  WebkitMask: `radial-gradient(circle, transparent ${hubSize/2 - 4}px, black ${hubSize/2 - 3}px)`,
                }} />
                <span style={{ fontSize: hubSize >= 100 ? 13 : 10, fontWeight: 900, letterSpacing: '.12em', color: 'rgba(0,232,123,.8)' }}>GROWIQ</span>
                <span style={{ fontSize: hubSize >= 100 ? 8 : 6, letterSpacing: '.18em', color: 'rgba(199,214,255,.35)', marginTop: 2 }}>COMMAND CENTER</span>
              </div>

              {agents.map((a, i) => {
                const { x, y, cx, cy } = getPos(i, agents.length, radius, center)
                const isActive = i === activeIdx
                const half = nodeSize / 2
                const Icon = a.Icon

                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: x - half, top: y - half,
                    width: nodeSize, height: nodeSize,
                    borderRadius: nodeSize >= 70 ? 18 : 14,
                    background: isActive ? 'rgba(8,12,28,.95)' : 'rgba(10,16,38,.75)',
                    border: `1px solid ${isActive ? a.color + '60' : 'rgba(255,255,255,.06)'}`,
                    boxShadow: isActive ? `0 0 30px ${a.color}30, 0 0 60px ${a.color}10` : '0 4px 20px rgba(0,0,0,.3)',
                    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
                    transition: 'all .5s cubic-bezier(.16,1,.3,1)',
                    backdropFilter: 'blur(12px)', zIndex: isActive ? 10 : 3,
                    transform: isActive ? 'scale(1.12)' : 'scale(1)',
                  }}>
                    <Icon
                      size={nodeSize >= 70 ? 22 : nodeSize >= 56 ? 16 : 14}
                      style={{ color: isActive ? a.color : 'rgba(199,214,255,.55)', marginBottom: 4, transition: 'color .4s' }}
                    />
                    <span style={{
                      fontSize: nodeSize >= 70 ? 9 : 7, fontWeight: 800, letterSpacing: '.08em',
                      color: isActive ? a.color : 'rgba(199,214,255,.4)', transition: 'color .4s',
                    }}>{a.name}</span>
                    {nodeSize >= 70 && (
                      <span style={{ fontSize: 7, color: 'rgba(199,214,255,.2)', letterSpacing: '.04em' }}>{a.role}</span>
                    )}

                    <svg style={{ position: 'absolute', top: half, left: half, width: 1, height: 1, overflow: 'visible', zIndex: -1, pointerEvents: 'none' }}>
                      <line x1="0" y1="0" x2={cx - x} y2={cy - y}
                        stroke={isActive ? a.color : 'rgba(255,255,255,.04)'} strokeWidth={isActive ? 1.5 : 0.5}
                        strokeDasharray={isActive ? 'none' : '3 6'} style={{ transition: 'stroke .5s, stroke-width .5s' }}
                      />
                    </svg>
                  </div>
                )
              })}

              <div style={{
                position: 'absolute', bottom: size >= 500 ? -70 : -56, left: '50%', transform: 'translateX(-50%)',
                padding: size >= 500 ? '12px 24px' : '9px 16px', borderRadius: 14, whiteSpace: 'nowrap' as const,
                background: 'rgba(8,12,28,.95)', border: `1px solid ${agents[activeIdx].color}35`,
                backdropFilter: 'blur(20px)', boxShadow: `0 0 30px ${agents[activeIdx].color}15, 0 8px 30px rgba(0,0,0,.4)`,
                transition: 'all .5s cubic-bezier(.16,1,.3,1)', zIndex: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ActiveIcon size={12} style={{ color: agents[activeIdx].color }} />
                  <span style={{ fontSize: size >= 500 ? 12 : 10, fontWeight: 800, color: agents[activeIdx].color }}>{agents[activeIdx].name}</span>
                  <span style={{ fontSize: size >= 500 ? 11 : 9, color: 'rgba(199,214,255,.35)' }}>— {agents[activeIdx].status}</span>
                </div>
                <div style={{ fontSize: size >= 500 ? 11 : 9, color: 'rgba(199,214,255,.4)', marginTop: 3, paddingLeft: 20 }}>{agents[activeIdx].detail}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes orbit{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ring-pulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.04);opacity:.15}}
        @media(max-width:960px){
          .hero-grid{grid-template-columns:1fr !important}
          .hero-right{margin-top:32px}
        }
        @media(max-width:600px){
          .hero-right{margin-top:24px}
        }
      `}</style>
    </section>
  )
}
