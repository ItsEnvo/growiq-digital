'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  id: number;
  plan: string;
  status: string;
  current_period_end?: string;
  setup_fee_paid: boolean;
  created_at: string;
}

interface User {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  plan: string;
}

const PLAN_DETAILS = {
  growth: {
    name: 'Growth',
    monthlyPrice: '$2,500',
    setupFee: '$2,500',
    agents: ['IRIS', 'ATLAS', 'PULSE', 'SYNC', 'WAVE', 'RADAR'],
  },
  scale: {
    name: 'Scale',
    monthlyPrice: '$4,500',
    setupFee: '$3,500',
    agents: ['All 10 agents'],
  }
};

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, subRes] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/subscription')
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscription(subData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    setCancelling(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
      });

      if (response.ok) {
        // Refresh data
        await fetchData();
        setShowCancelConfirm(false);
      } else {
        alert('Failed to cancel subscription. Please contact support.');
      }
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel subscription. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'trialing':
        return 'text-blue-400';
      case 'past_due':
        return 'text-yellow-400';
      case 'cancelled':
      case 'canceled':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'trialing':
        return 'Trial';
      case 'past_due':
        return 'Past Due';
      case 'cancelled':
      case 'canceled':
        return 'Cancelled';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="hud-card p-8">
        <div className="text-center">Loading billing information...</div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="space-y-6">
        <div className="hud-card p-6">
          <div className="hud-kicker">No Active Subscription</div>
          <h1 className="mt-3 hud-title">Get started with GrowIQ</h1>
          <p className="mt-4 text-zinc-200/85">
            Choose a plan to deploy your AI team and start automating your business.
          </p>
          <div className="mt-6">
            <Link href="/pricing" className="hud-btn hud-btn--primary">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const planDetails = PLAN_DETAILS[subscription.plan as keyof typeof PLAN_DETAILS];
  const isActive = ['active', 'trialing'].includes(subscription.status);

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="hud-card p-6">
        <div className="hud-kicker">Current Plan</div>
        <h1 className="mt-3 hud-title">{planDetails?.name || subscription.plan}</h1>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-zinc-400">Status</div>
            <div className={`font-medium ${getStatusColor(subscription.status)}`}>
              {getStatusDisplay(subscription.status)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-zinc-400">Monthly Price</div>
            <div className="font-medium">{planDetails?.monthlyPrice || 'N/A'}</div>
          </div>
          
          <div>
            <div className="text-sm text-zinc-400">Next Billing</div>
            <div className="font-medium">{formatDate(subscription.current_period_end)}</div>
          </div>
        </div>

        {planDetails && (
          <div className="mt-4">
            <div className="text-sm text-zinc-400 mb-2">Included Agents</div>
            <div className="text-sm text-zinc-200/80">
              {planDetails.agents.join(', ')}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-zinc-700">
          <div className="text-sm text-zinc-400">Setup Fee</div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{planDetails?.setupFee || 'N/A'}</span>
            {subscription.setup_fee_paid ? (
              <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                Paid
              </span>
            ) : (
              <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded">
                Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="hud-card p-6">
        <div className="hud-kicker">Manage Subscription</div>
        <h2 className="mt-3 text-lg font-semibold">Actions</h2>
        
        <div className="mt-4 space-y-3">
          {/* Upgrade option */}
          {subscription.plan === 'growth' && isActive && (
            <div className="flex items-center justify-between p-4 bg-[rgba(var(--mint),0.05)] border border-[rgba(var(--mint),0.2)] rounded-lg">
              <div>
                <div className="font-medium">Upgrade to Scale</div>
                <div className="text-sm text-zinc-400">
                  Get all 10 agents for $4,500/mo
                </div>
              </div>
              <button 
                onClick={() => alert('Upgrade functionality coming soon. Please contact support.')}
                className="hud-btn hud-btn--sm"
              >
                Upgrade
              </button>
            </div>
          )}

          {/* Cancel subscription */}
          {isActive && !showCancelConfirm && (
            <div className="flex items-center justify-between p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
              <div>
                <div className="font-medium">Cancel Subscription</div>
                <div className="text-sm text-zinc-400">
                  Cancel at the end of current billing period
                </div>
              </div>
              <button 
                onClick={() => setShowCancelConfirm(true)}
                className="hud-btn hud-btn--sm text-red-400 hover:bg-red-900/20"
              >
                Cancel Plan
              </button>
            </div>
          )}

          {/* Cancel confirmation */}
          {showCancelConfirm && (
            <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
              <div className="font-medium mb-2">Confirm Cancellation</div>
              <p className="text-sm text-zinc-400 mb-4">
                Are you sure you want to cancel your subscription? You'll lose access to your AI agents at the end of the current billing period.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                  className="hud-btn hud-btn--sm bg-red-600 hover:bg-red-700"
                >
                  {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="hud-btn hud-btn--sm"
                >
                  Keep Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="hud-card p-6">
        <div className="hud-kicker">Billing History</div>
        <h2 className="mt-3 text-lg font-semibold">Recent Activity</h2>
        
        <div className="mt-4">
          <div className="text-sm text-zinc-400 mb-4">
            For detailed billing history and invoices, please contact support.
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded">
              <div>
                <div className="font-medium">Subscription Created</div>
                <div className="text-sm text-zinc-400">{formatDate(subscription.created_at)}</div>
              </div>
              <div className="text-green-400">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="hud-card p-6">
        <div className="hud-kicker">Need Help?</div>
        <h2 className="mt-3 text-lg font-semibold">Support</h2>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/book" className="hud-btn">
            Book Support Call
          </Link>
          <Link href="/contact" className="hud-btn">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}