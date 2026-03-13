import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

function sql() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required. Create a free Neon database at https://neon.tech');
  }
  return neon(DATABASE_URL);
}

// ── Schema ──────────────────────────────────────────────────

export async function initializeDatabase() {
  const db = sql();

  await db`CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    business_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    plan TEXT DEFAULT 'starter',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS client_agents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    config_json TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS onboarding (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    step INTEGER NOT NULL,
    data_json TEXT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS approvals (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS agent_configs (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    tools_config TEXT,
    twilio_number TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    contact_phone TEXT,
    contact_email TEXT,
    contact_name TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id),
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    channel TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS scheduled_tasks (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    agent_type TEXT NOT NULL,
    contact_id INTEGER,
    contact_phone TEXT,
    contact_email TEXT,
    contact_name TEXT,
    task_type TEXT NOT NULL,
    scheduled_for TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    name TEXT,
    phone TEXT,
    email TEXT,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS generated_workspaces (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    workspace_json TEXT NOT NULL,
    setup_guide TEXT NOT NULL,
    openclaw_config TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;

  await db`CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    setup_fee_paid BOOLEAN DEFAULT false,
    current_period_end TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
}

// ── Types ───────────────────────────────────────────────────

export interface Client {
  id: number;
  email: string;
  password_hash: string;
  business_name: string;
  industry: string;
  plan: string;
  created_at: string;
}

export interface AuthClient {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  plan: string;
}

export interface ClientAgent {
  id: number;
  client_id: number;
  agent_type: string;
  status: string;
  config_json?: string;
  created_at: string;
}

export interface OnboardingData {
  id: number;
  client_id: number;
  step: number;
  data_json: string;
  completed_at: string;
}

export interface Approval {
  id: number;
  client_id: number;
  agent_type: string;
  content: string;
  status: string;
  created_at: string;
}

export interface Activity {
  id: number;
  client_id: number;
  agent_type: string;
  message: string;
  created_at: string;
}

export interface GeneratedWorkspace {
  id: number;
  client_id: number;
  workspace_json: string;
  setup_guide: string;
  openclaw_config: string;
  version: number;
  created_at: string;
}

export interface Subscription {
  id: number;
  client_id: number;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan: string;
  status: string;
  setup_fee_paid: boolean;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

// ── Client Operations ───────────────────────────────────────

export async function createClient(email: string, passwordHash: string, businessName: string, industry: string): Promise<Client> {
  const db = sql();
  const rows = await db`
    INSERT INTO clients (email, password_hash, business_name, industry)
    VALUES (${email}, ${passwordHash}, ${businessName}, ${industry})
    RETURNING *
  `;
  return rows[0] as Client;
}

export async function getClientByEmail(email: string): Promise<Client | undefined> {
  const db = sql();
  const rows = await db`SELECT * FROM clients WHERE email = ${email}`;
  return rows[0] as Client | undefined;
}

export async function getClientById(id: number): Promise<Client | undefined> {
  const db = sql();
  const rows = await db`SELECT * FROM clients WHERE id = ${id}`;
  return rows[0] as Client | undefined;
}

// ── Onboarding ──────────────────────────────────────────────

export async function saveOnboardingStep(clientId: number, step: number, data: any): Promise<void> {
  const db = sql();
  await db`DELETE FROM onboarding WHERE client_id = ${clientId} AND step = ${step}`;
  await db`
    INSERT INTO onboarding (client_id, step, data_json)
    VALUES (${clientId}, ${step}, ${JSON.stringify(data)})
  `;
}

export async function getOnboardingData(clientId: number): Promise<OnboardingData[]> {
  const db = sql();
  const rows = await db`SELECT * FROM onboarding WHERE client_id = ${clientId} ORDER BY step`;
  return rows as OnboardingData[];
}

// ── Agents ──────────────────────────────────────────────────

export async function createClientAgent(clientId: number, agentType: string, config?: any): Promise<ClientAgent> {
  const db = sql();
  const rows = await db`
    INSERT INTO client_agents (client_id, agent_type, config_json)
    VALUES (${clientId}, ${agentType}, ${config ? JSON.stringify(config) : null})
    RETURNING *
  `;
  return rows[0] as ClientAgent;
}

export async function getClientAgents(clientId: number): Promise<ClientAgent[]> {
  const db = sql();
  const rows = await db`SELECT * FROM client_agents WHERE client_id = ${clientId} ORDER BY created_at`;
  return rows as ClientAgent[];
}

export async function updateClientAgent(id: number, updates: Partial<ClientAgent>): Promise<void> {
  const db = sql();
  // Simple update for status (most common use case)
  if (updates.status) {
    await db`UPDATE client_agents SET status = ${updates.status} WHERE id = ${id}`;
  }
  if (updates.config_json) {
    await db`UPDATE client_agents SET config_json = ${updates.config_json} WHERE id = ${id}`;
  }
}

// ── Approvals ───────────────────────────────────────────────

export async function createApproval(clientId: number, agentType: string, content: string): Promise<Approval> {
  const db = sql();
  const rows = await db`
    INSERT INTO approvals (client_id, agent_type, content)
    VALUES (${clientId}, ${agentType}, ${content})
    RETURNING *
  `;
  return rows[0] as Approval;
}

export async function getClientApprovals(clientId: number, status?: string): Promise<Approval[]> {
  const db = sql();
  if (status) {
    const rows = await db`SELECT * FROM approvals WHERE client_id = ${clientId} AND status = ${status} ORDER BY created_at DESC`;
    return rows as Approval[];
  }
  const rows = await db`SELECT * FROM approvals WHERE client_id = ${clientId} ORDER BY created_at DESC`;
  return rows as Approval[];
}

export async function updateApproval(id: number, status: string): Promise<void> {
  const db = sql();
  await db`UPDATE approvals SET status = ${status} WHERE id = ${id}`;
}

// ── Activity ────────────────────────────────────────────────

export async function createActivity(clientId: number, agentType: string, message: string): Promise<Activity> {
  const db = sql();
  const rows = await db`
    INSERT INTO activity (client_id, agent_type, message)
    VALUES (${clientId}, ${agentType}, ${message})
    RETURNING *
  `;
  return rows[0] as Activity;
}

export async function getClientActivity(clientId: number, limit: number = 50): Promise<Activity[]> {
  const db = sql();
  const rows = await db`SELECT * FROM activity WHERE client_id = ${clientId} ORDER BY created_at DESC LIMIT ${limit}`;
  return rows as Activity[];
}

// ── Workspaces ──────────────────────────────────────────────

export async function saveWorkspace(
  clientId: number,
  workspaceJson: string,
  setupGuide: string,
  openclawConfig: string
): Promise<GeneratedWorkspace> {
  const db = sql();
  await db`DELETE FROM generated_workspaces WHERE client_id = ${clientId}`;
  const rows = await db`
    INSERT INTO generated_workspaces (client_id, workspace_json, setup_guide, openclaw_config)
    VALUES (${clientId}, ${workspaceJson}, ${setupGuide}, ${openclawConfig})
    RETURNING *
  `;
  return rows[0] as GeneratedWorkspace;
}

export async function getLatestWorkspace(clientId: number): Promise<GeneratedWorkspace | undefined> {
  const db = sql();
  const rows = await db`
    SELECT * FROM generated_workspaces
    WHERE client_id = ${clientId}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return rows[0] as GeneratedWorkspace | undefined;
}

// ── Subscriptions ───────────────────────────────────────────

export async function createSubscription(
  clientId: number,
  plan: string,
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
): Promise<Subscription> {
  const db = sql();
  const rows = await db`
    INSERT INTO subscriptions (client_id, plan, stripe_customer_id, stripe_subscription_id)
    VALUES (${clientId}, ${plan}, ${stripeCustomerId ?? null}, ${stripeSubscriptionId ?? null})
    RETURNING *
  `;
  return rows[0] as Subscription;
}

export const createSubscriptionRecord = createSubscription;

export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: string,
  periodEnd?: string,
  setupFeePaid?: boolean
): Promise<void> {
  const db = sql();
  await db`
    UPDATE subscriptions SET
      status = ${status},
      updated_at = NOW(),
      current_period_end = COALESCE(${periodEnd ?? null}, current_period_end),
      setup_fee_paid = COALESCE(${setupFeePaid ?? null}, setup_fee_paid)
    WHERE stripe_subscription_id = ${stripeSubscriptionId}
  `;
}

export async function getClientSubscription(clientId: number): Promise<Subscription | undefined> {
  const db = sql();
  const rows = await db`SELECT * FROM subscriptions WHERE client_id = ${clientId} ORDER BY created_at DESC LIMIT 1`;
  return rows[0] as Subscription | undefined;
}

export async function hasActiveSubscription(clientId: number): Promise<boolean> {
  const subscription = await getClientSubscription(clientId);
  return subscription ? ['active', 'trialing'].includes(subscription.status) : false;
}

// ── Helpers ─────────────────────────────────────────────────

export function toAuthClient(client: Client): AuthClient {
  return {
    id: client.id,
    email: client.email,
    business_name: client.business_name,
    industry: client.industry,
    plan: client.plan,
  };
}
