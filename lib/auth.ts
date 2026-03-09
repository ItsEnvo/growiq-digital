import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthClient, Client, createClient, getClientByEmail, getClientById, toAuthClient } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(client: AuthClient): string {
  return jwt.sign(client, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string): AuthClient | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthClient;
  } catch {
    return null;
  }
}

export function registerClient(email: string, password: string, businessName: string, industry: string): Client {
  // Check if client already exists
  const existingClient = getClientByEmail(email);
  if (existingClient) {
    throw new Error('Client already exists');
  }
  
  const passwordHash = hashPassword(password);
  return createClient(email, passwordHash, businessName, industry);
}

export function loginClient(email: string, password: string): AuthClient {
  const client = getClientByEmail(email);
  
  if (!client || !verifyPassword(password, client.password_hash)) {
    throw new Error('Invalid email or password');
  }
  
  return toAuthClient(client);
}

// Admin emails get access to all client data
const ADMIN_EMAILS = ['envo@envotrades.com', 'envo@phantomlabsai.com', 'envo@growiqdigital.com'];

export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function hasAccess(client: AuthClient): boolean {
  if (isAdmin(client.email)) return true;
  return true; // For now, all registered clients have access
}

// Utility to get current user from request
export function getCurrentUser(request: Request): AuthClient | null {
  try {
    const cookie = request.headers.get('cookie');
    if (!cookie) return null;

    const cookies = Object.fromEntries(
      cookie.split('; ').map(c => {
        const [name, ...v] = c.split('=');
        return [name, decodeURIComponent(v.join('='))];
      })
    );

    const token = cookies['auth-token'];
    if (!token) return null;

    return verifyToken(token);
  } catch {
    return null;
  }
}

export { getClientById, toAuthClient };