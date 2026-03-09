import { getClientSubscription } from './db';

export function requireSubscription(clientId: number): { allowed: boolean; plan?: string } {
  const subscription = getClientSubscription(clientId);
  
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

export function hasActiveSubscription(clientId: number): boolean {
  const result = requireSubscription(clientId);
  return result.allowed;
}

export function getClientPlan(clientId: number): string | null {
  const result = requireSubscription(clientId);
  return result.plan || null;
}