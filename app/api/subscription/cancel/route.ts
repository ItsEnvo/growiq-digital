import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getClientSubscription } from '@/lib/db';
import { cancelSubscription } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const user = getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the user's subscription
    const subscription = getClientSubscription(user.id);
    
    if (!subscription || !subscription.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Only allow cancellation of active subscriptions
    if (!['active', 'trialing'].includes(subscription.status)) {
      return NextResponse.json(
        { error: 'Can only cancel active subscriptions' },
        { status: 400 }
      );
    }

    // Cancel the subscription in Stripe
    const cancelledSubscription = await cancelSubscription(subscription.stripe_subscription_id);

    return NextResponse.json({
      success: true,
      subscription: {
        id: cancelledSubscription.id,
        status: cancelledSubscription.status,
        cancel_at_period_end: cancelledSubscription.cancel_at_period_end,
      }
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}