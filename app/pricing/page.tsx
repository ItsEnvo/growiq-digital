'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface PricingTier {
  id: 'growth' | 'scale';
  name: string;
  monthlyPrice: string;
  setupFee: string;
  agents: string;
  agentList: string;
  features: string[];
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: '$2,500',
    setupFee: '$2,500 setup',
    agents: '6 AI Agents',
    agentList: 'IRIS · ATLAS · PULSE · SYNC · WAVE · RADAR',
    features: [
      '6 AI agents (Reception, Sales, Follow-Up, Scheduling, Social Publishing, Reporting)',
      'Command Center dashboard access',
      'Landing page build',
      'Google Ads setup & management',
      'CRM pipeline configuration',
      'Automated booking flow',
      'Social media scheduling & publishing',
      'Daily briefings + weekly reports',
      'Email support',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: '$4,500',
    setupFee: '$3,500 setup',
    agents: 'All 10 AI Agents',
    agentList: 'IRIS · ATLAS · PULSE · SYNC · AEGIS · PRISM · MUSE · WAVE · RADAR · SCOUT',
    features: [
      'All 10 AI agents deployed',
      'Full Command Center with all dashboards',
      'Full website design & build',
      'Branded content creation (MUSE)',
      'Social media management across all platforms',
      'Advanced Google Ads + SCOUT optimization',
      'Complete CRM & pipeline automation',
      'Multi-channel (phone, SMS, email, chat, social)',
      'Call transcripts & conversation history',
      'Agent retraining as your business evolves',
      'Monthly strategy call',
      'Slack/Telegram direct access',
      'Priority support',
    ],
    highlight: true,
  },
];

interface User {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  plan: string;
}

interface Subscription {
  plan: string;
  status: string;
}

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [userResponse, subscriptionResponse] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/subscription')
      ]);

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }

      if (subscriptionResponse.ok) {
        const subscriptionData = await subscriptionResponse.json();
        setSubscription(subscriptionData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = async (plan: 'growth' | 'scale') => {
    if (!user) {
      router.push('/auth/signup');
      return;
    }

    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      if (subscription.plan === plan) {
        // Already on this plan
        return;
      } else if (subscription.plan === 'growth' && plan === 'scale') {
        // Upgrade flow (TODO: implement upgrade endpoint)
        alert('Upgrade functionality coming soon. Please contact support.');
        return;
      }
    }

    setCheckoutLoading(plan);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getButtonText = (tier: PricingTier) => {
    if (!user) return 'Book a Strategy Call';
    
    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      if (subscription.plan === tier.id) {
        return 'Current Plan';
      } else if (subscription.plan === 'growth' && tier.id === 'scale') {
        return 'Upgrade to Scale';
      }
    }
    
    return 'Book a Strategy Call';
  };

  const isButtonDisabled = (tier: PricingTier) => {
    if (!user) return false;
    
    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      return subscription.plan === tier.id;
    }
    
    return false;
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{ padding: '120px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-divider" style={{ marginBottom: 40 }} />
          
          <div className="growiq-pill" style={{ marginBottom: 16 }}>
            <span className="growiq-pill-dot" />
            Pricing
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>
            Invest in Your <span className="gradient-text">AI Team</span>
          </h1>
          <p className="text-secondary" style={{ fontSize: 15, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.8 }}>
            Month-to-month. No long-term contracts. Cancel anytime.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/contact?mode=call" className="growiq-btn">
              Book Strategy Call
            </Link>
            <Link href="/contact?mode=audit" className="growiq-btn growiq-btn--secondary">
              Free Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20, alignItems: 'start' }}>
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={tier.highlight ? 'growiq-card--featured' : 'growiq-card'}
                style={{
                  position: 'relative',
                  borderRadius: 24,
                  padding: 32,
                  transform: tier.highlight ? 'scale(1.03)' : 'none',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {tier.highlight && (
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
                    Full Team
                  </div>
                )}

                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{tier.name}</h3>
                <p className="text-secondary" style={{ fontSize: 13, marginBottom: 20 }}>
                  {tier.id === 'growth' 
                    ? 'Essential AI infrastructure for businesses ready to stop missing leads.'
                    : 'The full AI workforce. Every agent, every system, fully managed.'
                  }
                </p>

                {/* Agent count badge */}
                <div style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  marginBottom: 20,
                  background: tier.highlight ? 'rgba(0,232,123,.06)' : 'rgba(255,255,255,.02)',
                  border: tier.highlight ? '1px solid rgba(0,232,123,.12)' : '1px solid rgba(255,255,255,.04)',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: tier.highlight ? '#00e87b' : '#fff', marginBottom: 2 }}>
                    {tier.agents}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(199,214,255,.35)' }}>
                    {tier.agentList}
                  </div>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: '#fff' }}>{tier.monthlyPrice}</span>
                  <span className="text-muted" style={{ fontSize: 14 }}>/mo</span>
                </div>
                <div className="text-muted" style={{ fontSize: 12, marginBottom: 28 }}>+ {tier.setupFee}</div>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                  {tier.features.map((feature, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '7px 0',
                      fontSize: 13,
                      color: 'rgba(199,214,255,.6)',
                    }}>
                      <span style={{ 
                        color: tier.highlight ? '#00e87b' : 'rgba(199,214,255,.3)', 
                        fontSize: 15, 
                        flexShrink: 0 
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(tier.id)}
                  disabled={isButtonDisabled(tier) || loading}
                  className="growiq-btn"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: tier.highlight ? 'linear-gradient(135deg, rgba(0,232,123,.12), rgba(0,180,216,.12))' : 'rgba(255,255,255,.03)',
                    border: tier.highlight ? '1px solid rgba(0,232,123,.35)' : '1px solid rgba(255,255,255,.08)',
                    boxShadow: tier.highlight ? '0 0 20px rgba(0,232,123,.1)' : 'none',
                    opacity: isButtonDisabled(tier) ? 0.5 : 1,
                    cursor: isButtonDisabled(tier) ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!isButtonDisabled(tier)) {
                      e.currentTarget.style.borderColor = tier.highlight ? 'rgba(0,232,123,.5)' : 'rgba(255,255,255,.15)'
                      if (tier.highlight) e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.2)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isButtonDisabled(tier)) {
                      e.currentTarget.style.borderColor = tier.highlight ? 'rgba(0,232,123,.35)' : 'rgba(255,255,255,.08)'
                      if (tier.highlight) e.currentTarget.style.boxShadow = '0 0 20px rgba(0,232,123,.1)'
                    }
                  }}
                >
                  {checkoutLoading === tier.id ? 'Processing...' : getButtonText(tier)}
                </button>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'rgba(199,214,255,.3)' }}>
            Ad spend is separate and paid directly to Google. Custom enterprise plans available for multi-location businesses.
          </p>

          {/* Elite Custom section */}
          <div className="growiq-card" style={{ 
            marginTop: 40, 
            padding: 32, 
            textAlign: 'center',
            background: 'rgba(8,12,28,.95)'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Elite Custom</h3>
            <p className="text-secondary" style={{ fontSize: 14, marginBottom: 16 }}>
              Multi-location businesses, enterprise integrations, custom AI agents
            </p>
            <Link href="/contact?mode=call" className="growiq-btn">
              Contact for Pricing
            </Link>
          </div>

          {!user && (
            <div style={{
              marginTop: 40,
              padding: 24,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: 18,
              background: 'rgba(8,12,28,.5)'
            }}>
              <p className="text-secondary">
                Already have an account?{' '}
                <Link 
                  href="/auth/login" 
                  style={{ color: '#00e87b', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00b4d8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#00e87b'}
                >
                  Sign in to manage your plan
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}