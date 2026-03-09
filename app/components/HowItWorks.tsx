'use client'

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We learn everything about your business — services, pricing, brand voice, policies, pain points, and goals. This is how we train your agents to sound like you.' },
  { num: '02', title: 'Build Your Infrastructure', desc: 'We set up everything — website, CRM, ad campaigns, booking flows, automations. Your entire growth engine, built from scratch and connected.' },
  { num: '03', title: 'Deploy & Train Your AI Team', desc: 'We deploy all 6 agents, trained on your specific business. They know your services, your hours, your FAQ, your pricing, and your rules. We test everything before they go live.' },
  { num: '04', title: 'Launch & Manage', desc: 'Your AI team goes live. Leads flow in. Agents handle them. You watch it happen from your dashboard. We optimize weekly — better performance, month over month.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,232,123,.12), transparent)',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            The Process
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Live in <span className="gradient-text">7 Days</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(199,214,255,.4)', lineHeight: 1.8 }}>From first call to a fully operational AI team — in one week.</p>
        </div>

        <div style={{ position: 'relative', paddingLeft: 44 }}>
          <div style={{
            position: 'absolute', left: 13, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(180deg, #00e87b, #00b4d8, rgba(0,180,216,.1))',
          }} />

          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < 3 ? 48 : 0 }}>
              <div style={{
                position: 'absolute', left: -40, top: 2, width: 18, height: 18, borderRadius: '50%',
                background: '#050810', border: '2px solid #00e87b',
                boxShadow: '0 0 12px rgba(0,232,123,.3)',
              }}>
                <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#00e87b', opacity: .4 }} />
              </div>

              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '.15em', color: '#00e87b',
                marginBottom: 4, textTransform: 'uppercase' as const,
              }}>Step {s.num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(199,214,255,.45)', lineHeight: 1.85, margin: 0, maxWidth: 600 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}