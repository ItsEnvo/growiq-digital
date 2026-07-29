'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    slug: 'vsnyvanlines',
    name: 'VSNY Van Lines',
    tag: 'Moving & Logistics',
    url: 'https://vsnyvanlines.com',
  },
  {
    slug: 'pluggedworldwide',
    name: 'Plugged Worldwide',
    tag: 'Retail & E-Commerce',
    url: 'https://pluggedworldwide.com',
  },
  {
    slug: 'allondeckcrew',
    name: 'All On Deck Crew',
    tag: 'Staffing & Events',
    url: 'https://allondeckcrew.com',
  },
  {
    slug: 'angiesaesthetic',
    name: "Angie's Aesthetic",
    tag: 'Beauty & Wellness',
    url: 'https://angiesaesthetic.com',
  },
  {
    slug: 'aurapexrentals',
    name: 'Aurapex Rentals',
    tag: 'Luxury Rentals',
    url: 'https://aurapexrentals.com',
  },
  {
    slug: 'phantomlabsai',
    name: 'PhantomLabs AI',
    tag: 'AI Platform',
    url: 'https://phantomlabsai.com',
  },
  {
    slug: 'itsenvo',
    name: 'itsenvo',
    tag: 'Personal Brand',
    url: 'https://itsenvo.com',
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', borderRadius: 20, overflow: 'hidden', position: 'relative',
        border: hovered ? '1px solid rgba(0,232,123,.2)' : '1px solid rgba(255,255,255,.06)',
        boxShadow: hovered ? '0 0 50px rgba(0,232,123,.08), 0 20px 60px rgba(0,0,0,.5)' : '0 4px 30px rgba(0,0,0,.3)',
        transition: 'all .35s cubic-bezier(.16,1,.3,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        textDecoration: 'none',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'rgba(10,16,38,.8)' }}>
        <Image
          src={`/portfolio/${project.slug}.png`}
          alt={project.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform .5s cubic-bezier(.16,1,.3,1)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(0,0,0,.3)' : 'rgba(0,0,0,.1)',
          transition: 'background .35s',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.85})`,
          opacity: hovered ? 1 : 0,
          transition: 'all .3s cubic-bezier(.16,1,.3,1)',
          padding: '10px 20px', borderRadius: 12,
          background: 'rgba(0,232,123,.12)', border: '1px solid rgba(0,232,123,.3)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' as const,
        }}>
          View Live <ArrowUpRight size={14} />
        </div>
      </div>

      <div style={{
        padding: '18px 20px',
        background: 'linear-gradient(180deg, rgba(10,16,38,.9), rgba(5,8,16,.8))',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{project.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(0,232,123,.6)', fontWeight: 700, letterSpacing: '.06em' }}>{project.tag}</div>
        </div>
        <ArrowUpRight size={16} style={{ color: hovered ? 'rgba(0,232,123,.8)' : 'rgba(199,214,255,.2)', transition: 'color .3s', flexShrink: 0 }} />
      </div>
    </a>
  )
}

export default function Work() {
  return (
    <section id="work" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,232,123,.12), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%', width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(0,180,216,.03)', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            Our Work
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Built for businesses that take their <span className="gradient-text">digital presence seriously.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Every site is custom-designed and built from scratch — no templates, no shortcuts.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="work-grid">
          {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.work-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:560px){.work-grid{grid-template-columns:1fr !important}}
      `}</style>
    </section>
  )
}
