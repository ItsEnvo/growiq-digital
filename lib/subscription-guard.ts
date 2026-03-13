import { getClientSubscription } from './db';

export async function requireSubscription(clientId: number): Promise<{ allowed: boolean; plan?: string }> {
  const subscription = await getClientSubscription(clientId);
  
  if (!subscription) {
    return { allowed: false };
  }

  // Check if subscription is active or trialing
  const activeStatuses = ['active', 'trialing'];
  const isActive = activeStatuses.includes(subscription.status);

  if (!isActive) {
    return { allowed: false };
  }

  return {
    allowed: true,
    plan: subscription.plan
  };
}

export async function hasActiveSubscription(clientId: number): Promise<boolean> {
  const result = await requireSubscription(clientId);
  return result.allowed;
}

export async function getClientPlan(clientId: number): Promise<string | null> {
  const result = await requireSubscription(clientId);
  return result.plan || null;
}