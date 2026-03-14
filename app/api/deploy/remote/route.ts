import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getLatestWorkspace, getClientById } from '@/lib/db';
import { remoteDeploy, DeployConfig } from '@/lib/remote-deploy';
import JSZip from 'jszip';
import { generateDeployScript } from '@/lib/deploy-script-generator';
import { ClientConfig } from '@/lib/types';

const JWT_SECRET = process.env.JWT_SECRET || 'growiq-secret-key';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// For now, restrict to admin users (could be expanded later)
const ADMIN_EMAILS = ['admin@growiqdigital.com', 'support@growiqdigital.com'];

async function generateWorkspaceZip(clientId: number): Promise<Buffer> {
  const workspace = await getLatestWorkspace(clientId);
  const client = await getClientById(clientId);
  
  if (!workspace || !client) {
    throw new Error('Workspace or client not found');
  }

  const workspaceData = JSON.parse(workspace.workspace_json);
  const openclawConfig = JSON.parse(workspace.openclaw_config);
  const businessName = client.business_name;
  const businessSlug = slugify(businessName);

  const zip = new JSZip();
  const rootFolder = zip.folder(`${businessSlug}-ai-team`);
  if (!rootFolder) {
    throw new Error('Failed to create root folder');
  }

  // Add workspaces directory
  const workspacesFolder = rootFolder.folder('workspaces');
  if (!workspacesFolder) {
    throw new Error('Failed to create workspaces folder');
  }

  // Add each agent's workspace
  for (const agent of workspaceData.agents) {
    const agentFolder = workspacesFolder.folder(agent.id);
    if (!agentFolder) continue;

    agentFolder.file('SOUL.md', agent.soul || `# ${agent.name}\n\n${agent.role}`);
    agentFolder.file('AGENTS.md', workspaceData.agentsTemplate || '# Agent Operating Rules');
    agentFolder.file('KNOWLEDGE.md', agent.knowledge || `# ${agent.name} Knowledge Base`);
    agentFolder.file('IDENTITY.md', agent.identity || `# ${agent.name} Identity`);
    agentFolder.file('USER.md', agent.userConfig || `# User Configuration`);
    agentFolder.file('MEMORY.md', agent.memory || `# Agent Memory`);
  }

  // Add openclaw.json
  rootFolder.file('openclaw.json', JSON.stringify(openclawConfig, null, 2));

  // Add other files
  rootFolder.file('SETUP-GUIDE.md', workspace.setup_guide);
  rootFolder.file('SOUL.md', workspaceData.workspaceSoul || `# ${businessName} AI Team`);
  rootFolder.file('AGENTS.md', workspaceData.agentsTemplate || '# Agent Operating Rules');

  return zip.generateAsync({ type: 'nodebuffer' });
}

export async function POST(request: NextRequest) {
  try {
    // Verify JWT token
    const token = request.cookies.get('token')?.value || request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: any;
    try {
      payload = verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const clientId = payload.clientId || payload.id;
    const client = await getClientById(clientId);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check if user is admin (for managed deployments)
    if (!ADMIN_EMAILS.includes(client.email)) {
      return NextResponse.json({ 
        error: 'Managed deployment is currently available only for GrowIQ team members' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { 
      host, 
      username, 
      privateKey, 
      password, 
      anthropicKey, 
      botTokens 
    } = body;

    // Validate required fields
    if (!host || !username || !anthropicKey || !botTokens) {
      return NextResponse.json({ 
        error: 'Missing required fields: host, username, anthropicKey, botTokens' 
      }, { status: 400 });
    }

    if (!privateKey && !password) {
      return NextResponse.json({ 
        error: 'Either privateKey or password is required for SSH connection' 
      }, { status: 400 });
    }

    // Get workspace
    const workspace = await getLatestWorkspace(clientId);
    if (!workspace) {
      return NextResponse.json({ error: 'No workspace found' }, { status: 404 });
    }

    // Generate workspace ZIP
    const workspaceZip = await generateWorkspaceZip(clientId);

    // Prepare deploy configuration
    const deployConfig: DeployConfig = {
      host,
      username,
      privateKey,
      password,
      workspaceZip,
      anthropicKey,
      botTokens
    };

    // Execute remote deployment
    const result = await remoteDeploy(deployConfig);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Deployment completed successfully!',
        log: result.log
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        log: result.log
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Remote deployment error:', error);
    return NextResponse.json({
      success: false,
      error: 'Deployment failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}