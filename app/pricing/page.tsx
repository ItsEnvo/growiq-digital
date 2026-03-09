'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface PricingTier {
  id: 'growth' | 'scale';
  name: string;
  monthlyPrice: string;
  setupFee: string;
  agents: string[];
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: '$2,500/mo',
    setupFee: '$2,500 setup',
    agents: ['IRIS', 'ATLAS', 'PULSE', 'SYNC', 'WAVE', 'RADAR'],
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: '$4,500/mo',
    setupFee: '$3,500 setup',
    agents: ['All 10 agents'],
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
    if (!user) return 'Get Started';
    
    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      if (subscription.plan === tier.id) {
        return 'Current Plan';
      } else if (subscription.plan === 'growth' && tier.id === 'scale') {
        return 'Upgrade';
      }
    }
    
    return 'Get Started';
  };

  const isButtonDisabled = (tier: PricingTier) => {
    if (!user) return false;
    
    if (subscription && ['active', 'trialing'].includes(subscription.status)) {
      return subscription.plan === tier.id;
    }
    
    return false;
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="hud-card p-7">
        <div className="hud-kicker">Pricing</div>
        <h1 className="mt-3 hud-title">Choose your AI team.</h1>
        <p className="mt-4 max-w-2xl text-zinc-200/85">
          Pre-trained OpenClaw agents ready to deploy. From lead capture to customer success — your AI workforce is here.
        </p>
        <div className="mt-6 flex gap-2">
          <Link className="hud-btn hud-btn--primary" href="/book">
            Book a Call
          </Link>
          <Link className="hud-btn" href="/contact?mode=audit">
            Free Audit
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`hud-card p-6 ${tier.highlight ? "ring-1 ring-[rgba(var(--mint),0.25)]" : ""}`}
          >
            <div className="hud-kicker">{tier.name}</div>
            <div className="mt-3 text-2xl font-semibold">{tier.monthlyPrice}</div>
            <div className="mt-1 text-sm text-zinc-200/80">{tier.setupFee}</div>
            
            <ul className="mt-4 space-y-2 text-sm text-zinc-200/80">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                <span>{tier.agents.join(', ')}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                <span>Full workspace setup</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                <span>Deployment automation</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(var(--mint),0.9)]" />
                <span>Premium support</span>
              </li>
            </ul>

            <button
              onClick={() => handleGetStarted(tier.id)}
              disabled={isButtonDisabled(tier) || loading}
              className={`mt-5 hud-btn w-full ${
                tier.highlight ? 'hud-btn--primary' : ''
              } ${
                isButtonDisabled(tier) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {checkoutLoading === tier.id ? 'Processing...' : getButtonText(tier)}
            </button>
            
            <div className="mt-3 text-xs tracking-widest text-zinc-400 text-center">
              Cancel anytime • No setup lock-ins
            </div>
          </div>
        ))}
      </section>

      {!user && (
        <section className="mt-6 hud-card p-6 text-center">
          <p className="text-zinc-200/80">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-mint hover:underline">
              Sign in
            </Link>
          </p>
        </section>
      )}
    </main>
  );
}