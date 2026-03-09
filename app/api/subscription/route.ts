import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getClientSubscription } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const subscription = getClientSubscription(user.id);
    
    if (!subscription) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: subscription.id,
      plan: subscription.plan,
      status: subscription.status,
      current_period_end: subscription.current_period_end,
      setup_fee_paid: subscription.setup_fee_paid,
      created_at: subscription.created_at,
    });

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription data' },
      { status: 500 }
    );
  }
}