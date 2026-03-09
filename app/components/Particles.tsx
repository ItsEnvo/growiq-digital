'use client'

import { useEffect, useRef } from 'react'

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 2 + 1
      Object.assign(p.style, {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: Math.random() > 0.5 ? 'rgba(0,232,123,.35)' : 'rgba(0,180,216,.35)',
        animation: `float ${Math.random() * 15 + 12}s linear infinite`,
        animationDelay: `${Math.random() * 15}s`,
        opacity: '0',
      })
      el.appendChild(p)
    }
  }, [])

  return (
    <>
      <style>{`@keyframes float{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-20vh) scale(1);opacity:0}}`}</style>
      <div ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} />
    </>
  )
}