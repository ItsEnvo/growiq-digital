'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Who is GrowIQ for?', a: 'Small to medium-sized businesses that already have revenue and need a real digital foundation — better websites, dashboards, systems, and AI. We work horizontally across industries; we are not a single-vertical agency.' },
  { q: 'What does the website build include?', a: 'A premium conversion-focused website, lead capture and inquiry routing, domain, DNS, hosting setup, a connection into your GrowIQ platform, and 30 days of post-launch support. The Standard Website is $1,500 one-time; Premium Builds with custom design and advanced integrations run $3,000 to $5,000.' },
  { q: 'How long does it take?', a: 'Most websites are live within 5 to 7 business days from kickoff. Advanced automations and AI systems are configured in parallel or as a follow-on.' },
  { q: 'What do the monthly plans include?', a: 'Foundation ($197/mo) covers hosting, maintenance, your branded platform with CRM, pipeline and calendar, lead capture in one inbox, and email support. Growth ($497/mo) adds missed-call text-back, AI lead follow-up, automated review requests, email and SMS campaigns, online booking, and a monthly performance report. Scale ($997/mo) adds an AI voice agent, advanced automations, and done-with-you growth planning.' },
  { q: 'What is the Dedicated AI Workforce?', a: 'Your own team of AI employees — reception, sales, follow-up, and operations — deployed on secure, private infrastructure built for your business and trained on your brand, services, and workflows. They work across phone, SMS, email, chat, and social, around the clock, and hand off to your team when a human is needed. Setup starts at $2,500, then a custom monthly scoped to the agents you need.' },
  { q: 'What counts as a custom AI system?', a: 'A custom AI system is an AI employee or workflow built specifically for your business — sales assistants, content engines, support assistants, executive assistants, operations agents, knowledge bases, and more. Scoped and priced per build.' },
  { q: 'Do I have to be technical?', a: 'No. The foundation is built, configured, and handed over. The dashboard is designed for the owner, not the developer. We handle the underlying work.' },
  { q: 'Can I cancel anytime?', a: 'Monthly plans are month to month. No long-term contracts. The website build is a one-time engagement and the work, accounts, and assets stay with you.' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' as const, color: 'rgba(0,232,123,.6)', fontWeight: 700, marginBottom: 12 }}>
            FAQ
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800 }}>
            Common <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.05)',
              background: openIdx === i ? 'rgba(255,255,255,.02)' : 'transparent',
              transition: 'background .2s',
            }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 20px', textAlign: 'left' as const,
                  fontSize: 14, fontWeight: 700, color: '#fff', background: 'none', border: 'none',
                }}
              >
                <span style={{ paddingRight: 16 }}>{faq.q}</span>
                <ChevronDown size={16} style={{
                  color: 'rgba(199,214,255,.3)', flexShrink: 0,
                  transition: 'transform .2s',
                  transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0)',
                }} />
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontSize: 14, color: 'rgba(199,214,255,.5)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}