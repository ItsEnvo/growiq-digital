import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const user = getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { plan } = body;

    // Validate plan
    if (!plan || !['growth', 'scale'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "growth" or "scale"' },
        { status: 400 }
      );
    }

    // Get the domain from request for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/checkout/cancel`;

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      plan,
      clientEmail: user.email,
      clientId: user.id,
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Checkout error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}