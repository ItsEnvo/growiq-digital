'use client'

import { useEffect, useState } from 'react'

const GREEN = '#00e87b'
const CYAN = '#00b4d8'

export default function Preloader() {
  const [mounted, setMounted] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Only show once per browser session — never on client-side route changes.
    if (typeof window !== 'undefined' && sessionStorage.getItem('gq_loaded')) {
      setMounted(false)
      return
    }

    // Lock scroll while the loader is up.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const start = Date.now()
    const MIN_MS = 2100

    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 70 ? 4 + Math.random() * 6 : 2 + Math.random() * 3)
        return next >= 99 ? 99 : next
      })
    }, 90)

    const finish = () => {
      const elapsed = Date.now() - start
      const wait = Math.max(0, MIN_MS - elapsed)
      setTimeout(() => {
        clearInterval(tick)
        setProgress(100)
        setExiting(true)
        sessionStorage.setItem('gq_loaded', '1')
        setTimeout(() => {
          document.body.style.overflow = prevOverflow
          setMounted(false)
        }, 850)
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish)

    return () => {
      clearInterval(tick)
      window.removeEventListener('load', finish)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      className={exiting ? 'gq-preloader-exit' : ''}
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background:
          'radial-gradient(1200px 600px at 50% 18%, rgba(0,180,216,.10), transparent 60%),' +
          'radial-gradient(900px 500px at 50% 100%, rgba(0,232,123,.08), transparent 55%),' +
          'linear-gradient(180deg, #04060c, #02030a 60%, #04060c)',
      }}
    >
      {/* Drifting grid */}
      <div className="gq-anim" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .5,
        backgroundImage:
          'linear-gradient(rgba(0,232,123,.06) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(0,180,216,.06) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(circle at 50% 45%, #000 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 45%, #000 30%, transparent 75%)',
        animation: 'gq-grid-drift 6s linear infinite',
      }} />

      {/* Sweeping scanline */}
      <div className="gq-anim" style={{
        position: 'absolute', left: 0, right: 0, height: 180, pointerEvents: 'none',
        background: `linear-gradient(180deg, transparent, ${GREEN}14, transparent)`,
        animation: 'gq-scan-sweep 3.2s ease-in-out infinite',
      }} />

      {/* Emblem */}
      <div style={{ position: 'relative', width: 168, height: 168, display: 'grid', placeItems: 'center' }}>
        {/* Outer ring */}
        <div className="gq-anim" style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(0,180,216,.18)',
          borderTopColor: CYAN, borderRightColor: 'rgba(0,232,123,.5)',
          animation: 'gq-spin 2.6s linear infinite',
        }} />
        {/* Inner ring */}
        <div className="gq-anim" style={{
          position: 'absolute', inset: 22, borderRadius: '50%',
          border: '1px solid rgba(0,232,123,.16)',
          borderBottomColor: GREEN, borderLeftColor: 'rgba(0,180,216,.5)',
          animation: 'gq-spin-rev 3.4s linear infinite',
        }} />
        {/* Glow halo */}
        <div className="gq-anim" style={{
          position: 'absolute', inset: 40, borderRadius: '50%',
          background: `radial-gradient(circle, ${GREEN}22, transparent 70%)`,
          filter: 'blur(8px)', animation: 'gq-pulse-glow 2.4s ease-in-out infinite',
        }} />
        {/* Logo mark */}
        <div style={{
          width: 84, height: 84, borderRadius: 22,
          background: `linear-gradient(135deg, ${GREEN}, ${CYAN})`,
          display: 'grid', placeItems: 'center',
          color: '#04060c', fontWeight: 900, fontSize: 44, letterSpacing: '-1px',
          fontFamily: 'Inter, sans-serif',
          boxShadow: `0 0 40px ${GREEN}55, inset 0 0 24px rgba(255,255,255,.25)`,
        }}>
          G
        </div>
      </div>

      {/* Wordmark */}
      <div style={{ marginTop: 30, animation: 'gq-fade-up .8s ease both' }}>
        <div style={{
          fontSize: 30, fontWeight: 800, letterSpacing: '.06em',
          fontFamily: 'Inter, sans-serif',
          background: `linear-gradient(90deg, #cfe9ff 0%, #ffffff 40%, ${GREEN} 50%, #ffffff 60%, #cfe9ff 100%)`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gq-shimmer 3.5s linear infinite',
        }}>
          Grow<span style={{ fontWeight: 900 }}>IQ</span>
        </div>
      </div>

      {/* Status line */}
      <div style={{
        marginTop: 10, fontSize: 10.5, letterSpacing: '.34em', textTransform: 'uppercase',
        color: 'rgba(199,214,255,.45)', fontWeight: 600,
        animation: 'gq-fade-up 1s .15s ease both',
      }}>
        Initializing your infrastructure
      </div>

      {/* Progress bar */}
      <div style={{
        marginTop: 26, width: 240, height: 2, borderRadius: 2,
        background: 'rgba(255,255,255,.07)', overflow: 'hidden',
        animation: 'gq-fade-up 1s .25s ease both',
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: `linear-gradient(90deg, ${CYAN}, ${GREEN})`,
          boxShadow: `0 0 12px ${GREEN}aa`,
          transition: 'width .25s ease',
        }} />
      </div>
      <div style={{
        marginTop: 10, fontSize: 11, fontWeight: 700, letterSpacing: '.2em',
        color: 'rgba(199,214,255,.55)', fontVariantNumeric: 'tabular-nums',
        animation: 'gq-fade-up 1s .25s ease both',
      }}>
        {String(Math.floor(progress)).padStart(3, '0')}%
      </div>
    </div>
  )
}
