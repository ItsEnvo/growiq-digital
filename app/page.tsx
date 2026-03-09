'use client';

import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section - matching growiq-site orbital HUD style */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '110px 24px 60px',
      }}>
        {/* Background glows */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,232,123,.06) 0%, transparent 55%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,180,216,.04) 0%, transparent 50%)'
        }} />

        <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }} className="hero-grid">
            
            {/* Left Content */}
            <div>
              <div className="growiq-pill" style={{ marginBottom: 28 }}>
                <span className="growiq-pill-dot" />
                Precision • Performance • Predictability
              </div>

              <h1 className="serif" style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                letterSpacing: '-.02em',
              }}>
                Systems that Sell.<br />
                <span className="gradient-text">Built for Your Business.</span>
              </h1>

              <p className="text-secondary" style={{ 
                fontSize: 15, 
                maxWidth: 420, 
                lineHeight: 1.85, 
                marginBottom: 16 
              }}>
                Done-for-you marketing systems that turn traffic into clients — using funnels, ads, and AI automation. No more leaks.
              </p>

              <p className="text-muted" style={{ 
                fontSize: 13, 
                maxWidth: 420, 
                lineHeight: 1.8, 
                marginBottom: 32 
              }}>
                Automate qualification. Never miss follow-up. Scale predictably. Track everything. Replace the guesswork with a real machine.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <Link href="/contact?mode=audit" className="growiq-btn">
                  Get Free Audit
                </Link>
                <Link href="/contact?mode=call" className="growiq-btn growiq-btn--secondary">
                  Book a Call
                </Link>
              </div>

              <div style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(199,214,255,.3)' }}>
                Automate • Optimize • Scale
              </div>
            </div>

            {/* Right Content - Services Grid */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 16, 
                position: 'relative',
                zIndex: 2 
              }}>
                {[
                  { icon: '🎯', title: 'Funnels + GHL', desc: 'Landing pages, intake, routing, pipelines, reminders.' },
                  { icon: '📊', title: 'Google Ads', desc: 'Launch, iterate, scale with clean tracking + conversion pages.' },
                  { icon: '🤖', title: 'AI Systems', desc: 'Automate follow-up, ops, and reporting. Keep humans on high-leverage.' },
                  { icon: '🔧', title: 'Conversion Cleanup', desc: 'Fix the leaks: speed, copy, forms, follow-up, handoff.' },
                ].map((service, i) => (
                  <div key={i} className="growiq-card" style={{ 
                    padding: 20, 
                    textAlign: 'center',
                    transition: 'all .3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,232,123,.2)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0,232,123,.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,232,123,.1)'
                    e.currentTarget.style.boxShadow = '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)'
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{service.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{service.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(199,214,255,.4)', lineHeight: 1.5 }}>{service.desc}</div>
                  </div>
                ))}
              </div>

              {/* Center glow effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,232,123,.03) 0%, transparent 70%)',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-divider" style={{ marginBottom: 40 }} />
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="growiq-pill" style={{ marginBottom: 16 }}>
              <span className="growiq-pill-dot" />
              How it works
            </div>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
              From <span className="gradient-text">Leaks to Machine</span>
            </h2>
            <p className="text-secondary" style={{ fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Three-step system that turns chaos into predictable growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { 
                num: '01', 
                title: 'Diagnose', 
                desc: 'Audit your current flow. Find where leads leak. Identify the fastest fixes.',
                icon: '🔍'
              },
              { 
                num: '02', 
                title: 'Build', 
                desc: 'Deploy the funnel + ads + automation foundation. Track everything.',
                icon: '⚙️'
              },
              { 
                num: '03', 
                title: 'Optimize', 
                desc: 'Test, iterate, scale. Weekly improvements that compound into real growth.',
                icon: '📈'
              },
            ].map((step, i) => (
              <div key={i} className="growiq-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 48, 
                  marginBottom: 16,
                  opacity: 0.7
                }}>{step.icon}</div>
                <div style={{ 
                  fontSize: 12, 
                  fontWeight: 900, 
                  letterSpacing: '.15em', 
                  color: 'rgba(0,232,123,.6)', 
                  marginBottom: 12 
                }}>{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{step.title}</h3>
                <p className="text-secondary" style={{ fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="growiq-pill" style={{ marginBottom: 16 }}>
              <span className="growiq-pill-dot" />
              Pricing
            </div>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
              Investment in Your <span className="gradient-text">Growth Machine</span>
            </h2>
            <p className="text-secondary" style={{ fontSize: 15, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Month-to-month. No long contracts. Real results or we fix it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
            {[
              {
                name: 'Starter',
                price: '$1,500',
                period: '/mo',
                setup: '$1,000 setup',
                desc: 'Foundation system: funnel + pipeline + automation.',
                features: [
                  'Landing page + intake forms',
                  'GHL pipeline setup',
                  'Basic Google Ads launch',
                  'Lead routing & follow-up automation',
                  'Weekly optimization',
                  'Email + Slack support'
                ],
                featured: false
              },
              {
                name: 'Growth',
                price: '$2,500',
                period: '/mo',
                setup: '$1,500 setup',
                desc: 'Complete system: everything + advanced automation.',
                features: [
                  'Everything in Starter',
                  'Advanced funnel sequences',
                  'Multi-channel ad campaigns',
                  'AI-powered follow-up',
                  'No-show recovery automation',
                  'Conversion rate optimization',
                  'Monthly strategy calls',
                  'Priority support + phone access'
                ],
                featured: true
              }
            ].map((plan, i) => (
              <div key={i} className={`growiq-card ${plan.featured ? 'growiq-card--featured' : ''}`} style={{
                padding: 32,
                position: 'relative',
                transform: plan.featured ? 'scale(1.02)' : 'none',
              }}>
                {plan.featured && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '5px 18px',
                    borderRadius: 99,
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: '.15em',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #00e87b, #00b4d8)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(0,232,123,.3)',
                  }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{plan.name}</h3>
                <p className="text-secondary" style={{ fontSize: 13, marginBottom: 20 }}>{plan.desc}</p>

                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900 }}>{plan.price}</span>
                  <span className="text-muted" style={{ fontSize: 14 }}>{plan.period}</span>
                </div>
                <div className="text-muted" style={{ fontSize: 12, marginBottom: 24 }}>+ {plan.setup}</div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '6px 0',
                      fontSize: 13,
                      color: 'rgba(199,214,255,.6)'
                    }}>
                      <span style={{ color: plan.featured ? '#00e87b' : 'rgba(199,214,255,.3)', fontSize: 16, marginTop: -2 }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/contact?mode=audit" className="growiq-btn" style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  background: plan.featured ? 'linear-gradient(135deg, rgba(0,232,123,.12), rgba(0,180,216,.12))' : 'rgba(255,255,255,.03)',
                  border: plan.featured ? '1px solid rgba(0,232,123,.35)' : '1px solid rgba(255,255,255,.08)',
                  boxShadow: plan.featured ? '0 0 20px rgba(0,232,123,.1)' : 'none'
                }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: 'rgba(199,214,255,.3)' }}>
            Ad spend is separate and paid directly to Google. Enterprise pricing available for multi-location businesses.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="growiq-card" style={{ padding: 48 }}>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              Ready to Stop <span className="gradient-text">Leaking Leads?</span>
            </h2>
            <p className="text-secondary" style={{ fontSize: 15, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.8 }}>
              Get a free audit of your current flow. We'll show you exactly where leads are leaking and the fastest path to fix it.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact?mode=audit" className="growiq-btn">
                Get Free Audit
              </Link>
              <Link href="/contact?mode=call" className="growiq-btn growiq-btn--secondary">
                Book Strategy Call
              </Link>
            </div>

            <div style={{ marginTop: 24, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(199,214,255,.3)' }}>
              No pitch. Just clear next steps.
            </div>
          </div>
        </div>
      </section>


    </>
  );
}