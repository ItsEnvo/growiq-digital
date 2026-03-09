'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What industries do you work with?', a: 'We specialize in local service businesses — med spas, dental, HVAC, legal, real estate, auto, fitness, roofing, and more. If you book appointments or generate leads, we can help.' },
  { q: 'How quickly can we get started?', a: 'Most clients are fully launched within 5-7 business days. That includes ad campaigns, website, CRM setup, and AI agents — all configured and live.' },
  { q: 'Do I need to be tech-savvy?', a: 'Not at all. We handle everything. You get a simple dashboard to see your results, and we manage all the technical work behind the scenes.' },
  { q: 'What if it doesn\'t work?', a: 'We offer a performance guarantee. If we don\'t deliver a minimum number of booked appointments in your first month, the next month is free. We only win when you win.' },
  { q: 'How are the AI agents different from a chatbot?', a: 'Our agents are managed specialists, not generic chatbots. They\'re trained on your specific business, offer, and brand voice. They handle calls, texts, and emails — not just web chat. And we monitor and optimize them continuously.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Month-to-month, no long-term contracts. We earn your business every month.' },
  { q: 'What about ad spend?', a: 'Ad spend is separate and paid directly to Google. We recommend starting at $1,500-$3,000/month depending on your market and goals. We manage the campaigns — you control the budget.' },
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