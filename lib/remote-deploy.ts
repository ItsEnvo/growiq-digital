// Note: ssh2 causes build issues with Next.js, so remote deploy is disabled for now
// import { Client } from 'ssh2';

export interface DeployConfig {
  host: string;        // VPS IP or hostname
  username: string;    // SSH username (usually 'root')
  privateKey?: string; // SSH private key content
  password?: string;   // SSH password (if no key)
  workspaceZip: Buffer; // The generated ZIP
  anthropicKey: string;
  botTokens: Record<string, string>; // agentId -> telegram bot token
}

export interface DeployResult {
  success: boolean;
  log: string[];
  error?: string;
}

export async function remoteDeploy(config: DeployConfig): Promise<DeployResult> {
  // Remote deployment is temporarily disabled due to build compatibility issues
  // This will be re-enabled once ssh2 package compatibility is resolved
  
  return {
    success: false,
    log: [
      '⚠️ Remote deployment is temporarily disabled',
      '📦 Please use the self-deploy option for now',
      '🔧 We are working on resolving build compatibility issues'
    ],
    error: 'Remote deployment temporarily unavailable'
  };
}

// Commented out SSH functions to prevent build issues
// Will be re-enabled when ssh2 compatibility is resolved

/*
async function deployToServer(conn: any, config: DeployConfig, log: string[]): Promise<void> {
  // Implementation will be restored once build issues are resolved
}

function execCommand(conn: any, command: string): Promise<string> {
  // Implementation will be restored once build issues are resolved
  return Promise.resolve('');
}

function uploadFile(conn: any, fileData: Buffer, remotePath: string): Promise<void> {
  // Implementation will be restored once build issues are resolved
  return Promise.resolve();
}
*/