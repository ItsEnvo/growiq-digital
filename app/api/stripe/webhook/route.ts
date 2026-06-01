import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { 
  createSubscription, 
  updateSubscriptionStatus, 
  getClientSubscription 
} from '@/lib/db';

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
  }
  return secret;
}

function verifyStripeSignature(rawBody: string, signature: string): boolean {
  try {
    const elements = signature.split(',');
    const signatureElements = elements.reduce((acc, element) => {
      const [key, value] = element.split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const timestamp = signatureElements.t;
    const v1 = signatureElements.v1;

    if (!timestamp || !v1) {
      return false;
    }

    const payload = `${timestamp}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', getWebhookSecret())
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(v1, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    if (!verifyStripeSignature(rawBody, signature)) {
      console.error('Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    
    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const clientId = parseInt(session.metadata?.client_id);
        const plan = session.metadata?.plan;
        
        if (!clientId || !plan) {
          console.error('Missing client_id or plan in session metadata');
          break;
        }

        // Get the subscription ID from the session
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        if (!subscriptionId) {
          console.error('No subscription ID found in checkout session');
          break;
        }

        // Create subscription record in database
        try {
          await createSubscription(clientId, plan, customerId, subscriptionId);
          console.log(`Created subscription record for client ${clientId}, plan: ${plan}`);
        } catch (error) {
          console.error('Error creating subscription record:', error);
        }
        
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        const status = subscription.status;
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();

        try {
          await updateSubscriptionStatus(subscriptionId, status, currentPeriodEnd);
          console.log(`Updated subscription ${subscriptionId} status to ${status}`);
        } catch (error) {
          console.error('Error updating subscription status:', error);
        }
        
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const subscriptionId = subscription.id;

        try {
          await updateSubscriptionStatus(subscriptionId, 'cancelled');
          console.log(`Marked subscription ${subscriptionId} as cancelled`);
        } catch (error) {
          console.error('Error updating subscription status:', error);
        }
        
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        
        if (subscriptionId) {
          try {
            // Check if this is the first payment (setup fee + first month)
            const subscription = event.data.object.subscription;
            if (subscription) {
              // Mark setup fee as paid
              await updateSubscriptionStatus(subscriptionId, 'active', undefined, true);
              console.log(`Payment succeeded for subscription ${subscriptionId}`);
            }
          } catch (error) {
            console.error('Error processing successful payment:', error);
          }
        }
        
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;
        
        if (subscriptionId) {
          try {
            await updateSubscriptionStatus(subscriptionId, 'past_due');
            console.log(`Payment failed for subscription ${subscriptionId}`);
            
            // TODO: Send notification to client about failed payment
          } catch (error) {
            console.error('Error processing failed payment:', error);
          }
        }
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}