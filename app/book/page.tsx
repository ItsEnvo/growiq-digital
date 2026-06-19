'use client';

import { useState } from 'react';

export default function BookPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Only iframe a real booking URL; otherwise fall through to the working form.
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          kind: 'booking',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7 mb-6">
        <div className="hud-kicker">Book a Call</div>
        <h1 className="mt-3 hud-title">Let's discuss your AI automation needs.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          Schedule a strategy session to explore how our AI agents can transform your business operations.
          We'll discuss your specific needs and create a custom deployment plan.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main booking widget */}
        <div className="lg:col-span-2">
          <div className="hud-card p-6">
            {calendlyUrl && calendlyUrl.includes('calendly.com') ? (
              <div>
                <div className="hud-kicker mb-4">Schedule Online</div>
                <div className="relative">
                  <iframe
                    src={calendlyUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    className="rounded-lg"
                    title="Schedule a meeting"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="hud-kicker mb-4">Contact Form</div>
                <p className="text-zinc-200/80 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours to schedule your consultation.
                </p>
                <div className="max-w-md">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-mint"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-mint"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-mint"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-mint"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Tell us about your business
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="What challenges are you facing? What processes would you like to automate?"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-mint resize-vertical"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="hud-btn hud-btn--primary w-full"
                      >
                        {submitting ? 'Sending...' : 'Request Callback'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-4">✅</div>
                      <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                      <p className="text-zinc-200/80">
                        We'll get back to you within 24 hours to schedule your consultation.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', company: '', phone: '', message: '' });
                        }}
                        className="hud-btn mt-4"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* What to expect */}
          <div className="hud-card p-6">
            <div className="hud-kicker">What to Expect</div>
            <h3 className="mt-3 font-semibold">30-Minute Strategy Session</h3>
            
            <div className="mt-4 space-y-3 text-sm text-zinc-200/80">
              <div className="flex gap-3">
                <span className="text-mint">•</span>
                <span>Review your current business processes</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">•</span>
                <span>Identify automation opportunities</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">•</span>
                <span>Design your custom AI team</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">•</span>
                <span>Create deployment roadmap</span>
              </div>
              <div className="flex gap-3">
                <span className="text-mint">•</span>
                <span>Discuss pricing and timeline</span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="hud-card p-6">
            <div className="hud-kicker">Prefer Email?</div>
            <h3 className="mt-3 font-semibold">Get in Touch</h3>
            
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-zinc-400">Email</div>
                <div className="text-zinc-200">support@growiqdigital.com</div>
              </div>
              <div>
                <div className="text-zinc-400">Response Time</div>
                <div className="text-zinc-200">Within 4 hours</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-700">
              <div className="text-xs text-zinc-400">
                We respect your time and privacy. No spam, no pushy sales calls.
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="hud-card p-6">
            <div className="hud-kicker">Client Success</div>
            <blockquote className="mt-3 text-sm text-zinc-200/80">
              "The strategy call was incredibly valuable. They understood our business immediately and proposed solutions we hadn't even thought of."
            </blockquote>
            <div className="mt-3 text-xs text-zinc-400">
              — Sarah M., Marketing Agency Owner
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}