const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_BASE_URL = 'https://api.stripe.com/v1';

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

interface PlanConfig {
  setupPrice: number;
  recurringPrice: number;
  currency: string;
  interval: string;
}

const PLANS: Record<'growth' | 'scale', PlanConfig> = {
  growth: {
    setupPrice: 250000, // $2,500 in cents
    recurringPrice: 250000, // $2,500 in cents
    currency: 'usd',
    interval: 'month'
  },
  scale: {
    setupPrice: 350000, // $3,500 in cents
    recurringPrice: 450000, // $4,500 in cents
    currency: 'usd',
    interval: 'month'
  }
};

interface CreateCheckoutSessionParams {
  plan: 'growth' | 'scale';
  clientEmail: string;
  clientId: number;
  successUrl: string;
  cancelUrl: string;
}

interface StripeApiError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

async function stripeApiRequest(endpoint: string, data: Record<string, any>) {
  const body = new URLSearchParams();
  
  // Flatten nested objects for Stripe API
  const flattenObject = (obj: Record<string, any>, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}[${key}]` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        flattenObject(value, fullKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            flattenObject(item, `${fullKey}[${index}]`);
          } else {
            body.append(`${fullKey}[${index}]`, String(item));
          }
        });
      } else {
        body.append(fullKey, String(value));
      }
    }
  };
  
  flattenObject(data);

  const response = await fetch(`${STRIPE_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData as StripeApiError;
    throw new Error(error.error?.message || 'Stripe API error');
  }

  return responseData;
}

export async function createCheckoutSession({
  plan,
  clientEmail,
  clientId,
  successUrl,
  cancelUrl,
}: CreateCheckoutSessionParams) {
  const planConfig = PLANS[plan];
  
  if (!planConfig) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  // Create customer first
  const customer = await stripeApiRequest('/customers', {
    email: clientEmail,
    metadata: {
      client_id: clientId.toString(),
      plan: plan,
    },
  });

  // Create checkout session with setup fee as one-time payment and subscription
  const session = await stripeApiRequest('/checkout/sessions', {
    customer: customer.id,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      // Setup fee as one-time payment
      {
        price_data: {
          currency: planConfig.currency,
          product_data: {
            name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Setup Fee`,
            description: 'One-time setup fee for your AI agent deployment',
          },
          unit_amount: planConfig.setupPrice,
        },
        quantity: 1,
      },
      // Recurring subscription
      {
        price_data: {
          currency: planConfig.currency,
          product_data: {
            name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
            description: `Monthly subscription for ${plan} plan AI agents`,
          },
          unit_amount: planConfig.recurringPrice,
          recurring: {
            interval: planConfig.interval,
          },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      client_id: clientId.toString(),
      plan: plan,
    },
    subscription_data: {
      metadata: {
        client_id: clientId.toString(),
        plan: plan,
      },
    },
  });

  return session;
}

export async function getSubscriptionStatus(subscriptionId: string) {
  const response = await fetch(`${STRIPE_BASE_URL}/subscriptions/${subscriptionId}`, {
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subscription status');
  }

  const subscription = await response.json();
  
  return {
    id: subscription.id,
    status: subscription.status,
    current_period_start: subscription.current_period_start,
    current_period_end: subscription.current_period_end,
    canceled_at: subscription.canceled_at,
    cancel_at_period_end: subscription.cancel_at_period_end,
    metadata: subscription.metadata,
  };
}

export async function cancelSubscription(subscriptionId: string) {
  const canceledSubscription = await stripeApiRequest(`/subscriptions/${subscriptionId}`, {
    cancel_at_period_end: true,
  });

  return {
    id: canceledSubscription.id,
    status: canceledSubscription.status,
    cancel_at_period_end: canceledSubscription.cancel_at_period_end,
    canceled_at: canceledSubscription.canceled_at,
  };
}

export async function getCustomerSubscriptions(customerId: string) {
  const response = await fetch(`${STRIPE_BASE_URL}/subscriptions?customer=${customerId}&limit=10`, {
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customer subscriptions');
  }

  const data = await response.json();
  return data.data;
}