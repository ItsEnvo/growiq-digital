'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type NavLink =
  | { label: string; kind: 'anchor'; id: string }
  | { label: string; kind: 'route'; href: string }

const links: NavLink[] = [
  { label: 'Services', kind: 'anchor', id: 'services' },
  { label: 'AI Agents', kind: 'anchor', id: 'agents' },
  { label: 'Case Study', kind: 'anchor', id: 'case-study' },
  { label: 'Pricing', kind: 'anchor', id: 'pricing' },
  { label: 'FAQ', kind: 'anchor', id: 'faq' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const onHome = pathname === '/'

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const goAnchor = (id: string) => {
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all .3s',
      background: scrolled ? 'rgba(5,8,16,.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,.05)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(0,232,123,.15), rgba(0,180,216,.15))',
            border: '1px solid rgba(0,232,123,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900,
          }}>
            <span className="gradient-text">G</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Grow<span className="gradient-text">IQ</span></span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
          {links.map(l => (
            <button key={l.label} onClick={() => l.kind === 'anchor' ? goAnchor(l.id) : router.push(l.href)} style={{
              fontSize: 13, fontWeight: 600, color: 'rgba(199,214,255,.55)',
              transition: 'color .2s', background: 'none', border: 'none', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,214,255,.55)'}
            >{l.label}</button>
          ))}
          <Link href="/contact?mode=call" style={{
            padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg, rgba(0,232,123,.12), rgba(0,180,216,.12))',
            border: '1px solid rgba(0,232,123,.35)',
            transition: 'all .2s', textDecoration: 'none',
          }}>Book a call</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ display: 'none', padding: 8, color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }} className="mobile-toggle">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          padding: '8px 24px 24px', background: 'rgba(8,12,28,.97)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }} className="mobile-menu">
          {links.map(l => (
            <button key={l.label} onClick={() => l.kind === 'anchor' ? goAnchor(l.id) : router.push(l.href)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '12px 0',
              fontSize: 14, fontWeight: 600, color: '#fff', background: 'none', border: 'none', cursor: 'pointer',
            }}>{l.label}</button>
          ))}
          <Link href="/contact?mode=call" onClick={() => setOpen(false)} style={{
            display: 'block', textAlign: 'center' as const,
            marginTop: 12, width: '100%', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 800, color: '#fff',
            background: 'linear-gradient(135deg, rgba(0,232,123,.12), rgba(0,180,216,.12))',
            border: '1px solid rgba(0,232,123,.35)', textDecoration: 'none',
          }}>Book a call</Link>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none !important}
          .mobile-toggle{display:block !important}
        }
      `}</style>
    </nav>
  )
}
