import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database connection helper - only use on server side
function getDatabase() {
  if (typeof window !== 'undefined') {
    throw new Error('Database should only be used on server side');
  }
  
  const dbPath = path.join(process.cwd(), 'data/growiq.sqlite');
  
  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const db = new Database(dbPath);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  return db;
}

// Database schema
export function initializeDatabase() {
  const db = getDatabase();
  
  // Clients table
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      business_name TEXT NOT NULL,
      industry TEXT NOT NULL,
      plan TEXT DEFAULT 'starter',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Client agents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS client_agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      config_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);
  
  // Onboarding table
  db.exec(`
    CREATE TABLE IF NOT EXISTS onboarding (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      step INTEGER NOT NULL,
      data_json TEXT NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);
  
  // Approvals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS approvals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);
  
  // Activity table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Agent configs table - stores generated prompts and settings per agent
  db.exec(`
    CREATE TABLE IF NOT EXISTS agent_configs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      system_prompt TEXT NOT NULL,
      tools_config TEXT,
      twilio_number TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Conversations table - tracks conversations between agents and contacts
  db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      contact_phone TEXT,
      contact_email TEXT,
      contact_name TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Messages table - stores individual messages in conversations
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      role TEXT NOT NULL, -- 'user', 'assistant', 'system'
      content TEXT NOT NULL,
      channel TEXT NOT NULL, -- 'sms', 'email', 'chat'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations (id)
    )
  `);

  // Scheduled tasks table - for follow-ups and review requests
  db.exec(`
    CREATE TABLE IF NOT EXISTS scheduled_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      contact_id INTEGER,
      contact_phone TEXT,
      contact_email TEXT,
      contact_name TEXT,
      task_type TEXT NOT NULL, -- 'follow_up', 'review_request'
      scheduled_for DATETIME NOT NULL,
      status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'cancelled'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Contacts table - stores lead/customer contact information
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      name TEXT,
      phone TEXT,
      email TEXT,
      source TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Generated workspaces table - stores generated AI agent workspaces
  db.exec(`
    CREATE TABLE IF NOT EXISTS generated_workspaces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      workspace_json TEXT NOT NULL,
      setup_guide TEXT NOT NULL,
      openclaw_config TEXT NOT NULL,
      version INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Subscriptions table - stores Stripe subscription data
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      plan TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      setup_fee_paid BOOLEAN DEFAULT 0,
      current_period_end TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);
  
  db.close();
}

// Client interfaces
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

// Database operations
export function createClient(email: string, passwordHash: string, businessName: string, industry: string): Client {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO clients (email, password_hash, business_name, industry)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(email, passwordHash, businessName, industry);
  
  const getClient = db.prepare('SELECT * FROM clients WHERE id = ?');
  const client = getClient.get(result.lastInsertRowid) as Client;
  db.close();
  return client;
}

export function getClientByEmail(email: string): Client | undefined {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM clients WHERE email = ?');
  const client = stmt.get(email) as Client | undefined;
  db.close();
  return client;
}

export function getClientById(id: number): Client | undefined {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM clients WHERE id = ?');
  const client = stmt.get(id) as Client | undefined;
  db.close();
  return client;
}

export function saveOnboardingStep(clientId: number, step: number, data: any): void {
  const db = getDatabase();
  
  // Delete existing step data
  const deleteStmt = db.prepare('DELETE FROM onboarding WHERE client_id = ? AND step = ?');
  deleteStmt.run(clientId, step);
  
  // Insert new step data
  const insertStmt = db.prepare(`
    INSERT INTO onboarding (client_id, step, data_json)
    VALUES (?, ?, ?)
  `);
  
  insertStmt.run(clientId, step, JSON.stringify(data));
  db.close();
}

export function getOnboardingData(clientId: number): OnboardingData[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM onboarding WHERE client_id = ? ORDER BY step');
  const data = stmt.all(clientId) as OnboardingData[];
  db.close();
  return data;
}

export function createClientAgent(clientId: number, agentType: string, config?: any): ClientAgent {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO client_agents (client_id, agent_type, config_json)
    VALUES (?, ?, ?)
  `);
  
  const result = stmt.run(clientId, agentType, config ? JSON.stringify(config) : null);
  
  const getAgent = db.prepare('SELECT * FROM client_agents WHERE id = ?');
  const agent = getAgent.get(result.lastInsertRowid) as ClientAgent;
  db.close();
  return agent;
}

export function getClientAgents(clientId: number): ClientAgent[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM client_agents WHERE client_id = ? ORDER BY created_at');
  const agents = stmt.all(clientId) as ClientAgent[];
  db.close();
  return agents;
}

export function updateClientAgent(id: number, updates: Partial<ClientAgent>): void {
  const db = getDatabase();
  
  const fields = Object.keys(updates).filter(key => key !== 'id');
  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const values = fields.map(field => updates[field as keyof ClientAgent]);
  
  const stmt = db.prepare(`UPDATE client_agents SET ${setClause} WHERE id = ?`);
  stmt.run(...values, id);
  db.close();
}

export function createApproval(clientId: number, agentType: string, content: string): Approval {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO approvals (client_id, agent_type, content)
    VALUES (?, ?, ?)
  `);
  
  const result = stmt.run(clientId, agentType, content);
  
  const getApproval = db.prepare('SELECT * FROM approvals WHERE id = ?');
  const approval = getApproval.get(result.lastInsertRowid) as Approval;
  db.close();
  return approval;
}

export function getClientApprovals(clientId: number, status?: string): Approval[] {
  const db = getDatabase();
  
  let query = 'SELECT * FROM approvals WHERE client_id = ?';
  const params: any[] = [clientId];
  
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY created_at DESC';
  
  const stmt = db.prepare(query);
  const approvals = stmt.all(...params) as Approval[];
  db.close();
  return approvals;
}

export function updateApproval(id: number, status: string): void {
  const db = getDatabase();
  const stmt = db.prepare('UPDATE approvals SET status = ? WHERE id = ?');
  stmt.run(status, id);
  db.close();
}

export function createActivity(clientId: number, agentType: string, message: string): Activity {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO activity (client_id, agent_type, message)
    VALUES (?, ?, ?)
  `);
  
  const result = stmt.run(clientId, agentType, message);
  
  const getActivity = db.prepare('SELECT * FROM activity WHERE id = ?');
  const activity = getActivity.get(result.lastInsertRowid) as Activity;
  db.close();
  return activity;
}

export function getClientActivity(clientId: number, limit: number = 50): Activity[] {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM activity WHERE client_id = ? ORDER BY created_at DESC LIMIT ?');
  const activities = stmt.all(clientId, limit) as Activity[];
  db.close();
  return activities;
}

export function saveWorkspace(
  clientId: number, 
  workspaceJson: string, 
  setupGuide: string, 
  openclawConfig: string
): GeneratedWorkspace {
  const db = getDatabase();
  
  // Delete any existing workspace for this client
  const deleteStmt = db.prepare('DELETE FROM generated_workspaces WHERE client_id = ?');
  deleteStmt.run(clientId);
  
  // Insert new workspace
  const insertStmt = db.prepare(`
    INSERT INTO generated_workspaces (client_id, workspace_json, setup_guide, openclaw_config)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = insertStmt.run(clientId, workspaceJson, setupGuide, openclawConfig);
  
  const getWorkspace = db.prepare('SELECT * FROM generated_workspaces WHERE id = ?');
  const workspace = getWorkspace.get(result.lastInsertRowid) as GeneratedWorkspace;
  db.close();
  return workspace;
}

export function getLatestWorkspace(clientId: number): GeneratedWorkspace | undefined {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT * FROM generated_workspaces 
    WHERE client_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `);
  const workspace = stmt.get(clientId) as GeneratedWorkspace | undefined;
  db.close();
  return workspace;
}

export function toAuthClient(client: Client): AuthClient {
  return {
    id: client.id,
    email: client.email,
    business_name: client.business_name,
    industry: client.industry,
    plan: client.plan,
  };
}

// Subscription functions
export function createSubscription(
  clientId: number, 
  plan: string, 
  stripeCustomerId?: string, 
  stripeSubscriptionId?: string
): Subscription {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO subscriptions (client_id, plan, stripe_customer_id, stripe_subscription_id)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(clientId, plan, stripeCustomerId, stripeSubscriptionId);
  
  const getSubscription = db.prepare('SELECT * FROM subscriptions WHERE id = ?');
  const subscription = getSubscription.get(result.lastInsertRowid) as Subscription;
  db.close();
  return subscription;
}

// Alias for backwards compatibility
export const createSubscriptionRecord = createSubscription;

export function updateSubscriptionStatus(
  stripeSubscriptionId: string, 
  status: string, 
  periodEnd?: string, 
  setupFeePaid?: boolean
): void {
  const db = getDatabase();
  
  let query = 'UPDATE subscriptions SET status = ?, updated_at = CURRENT_TIMESTAMP';
  const params: any[] = [status];
  
  if (periodEnd !== undefined) {
    query += ', current_period_end = ?';
    params.push(periodEnd);
  }
  
  if (setupFeePaid !== undefined) {
    query += ', setup_fee_paid = ?';
    params.push(setupFeePaid ? 1 : 0);
  }
  
  query += ' WHERE stripe_subscription_id = ?';
  params.push(stripeSubscriptionId);
  
  const stmt = db.prepare(query);
  stmt.run(...params);
  db.close();
}

export function getClientSubscription(clientId: number): Subscription | undefined {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM subscriptions WHERE client_id = ? ORDER BY created_at DESC LIMIT 1');
  const subscription = stmt.get(clientId) as Subscription | undefined;
  db.close();
  return subscription;
}

export function hasActiveSubscription(clientId: number): boolean {
  const subscription = getClientSubscription(clientId);
  return subscription ? ['active', 'trialing'].includes(subscription.status) : false;
}

// Initialize database on import
if (typeof window === 'undefined') {
  initializeDatabase();
}