import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getLatestWorkspace, getClientById } from '@/lib/db';
import { requireSubscription } from '@/lib/subscription-guard';
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

function generateReadme(businessName: string, agents: any[]): string {
  const agentList = agents
    .map(agent => `- ${agent.emoji || '🤖'} **${agent.name}** — ${agent.role}`)
    .join('\n');

  return `# ${businessName} AI Team
_Powered by GrowIQ Digital_

## Your Agents
${agentList}

## Quick Start
1. Extract this ZIP on your VPS
2. Run \`chmod +x deploy.sh && ./deploy.sh\`
3. Follow the prompts
4. Your AI team will be live!

## Need Help?
- Setup Guide: See SETUP-GUIDE.md
- Support: support@growiqdigital.com
- Dashboard: https://growiq-site.vercel.app/dashboard

## What's Included
- \`workspaces/\` - Individual agent configurations
- \`openclaw.json\` - OpenClaw configuration file
- \`deploy.sh\` - Automated deployment script
- \`SETUP-GUIDE.md\` - Detailed setup instructions
- \`README.md\` - This file

## Manual Setup
If you prefer to set up manually instead of using the deploy script:

1. Install Node.js 18+ and OpenClaw: \`npm install -g openclaw\`
2. Copy workspace files to \`~/.openclaw/workspace-${slugify(businessName)}/\`
3. Copy \`openclaw.json\` to \`~/.openclaw/openclaw.json\`
4. Set your Anthropic API key: \`export ANTHROPIC_API_KEY=your_key\`
5. Update bot tokens in openclaw.json
6. Start the gateway: \`openclaw gateway start\`

Your AI team will be ready to assist your business!
`;
}

export async function GET(request: NextRequest) {
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

    const clientId = payload.clientId;
    const client = await getClientById(clientId);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check subscription status
    const subscriptionCheck = await requireSubscription(clientId);
    if (!subscriptionCheck.allowed) {
      return NextResponse.json(
        { error: 'Active subscription required to download workspace' },
        { status: 403 }
      );
    }

    // Get the latest workspace
    const workspace = await getLatestWorkspace(clientId);
    if (!workspace) {
      return NextResponse.json({ error: 'No workspace found' }, { status: 404 });
    }

    // Parse workspace data
    const workspaceData = JSON.parse(workspace.workspace_json);
    const openclawConfig = JSON.parse(workspace.openclaw_config);
    const businessName = client.business_name;
    const businessSlug = slugify(businessName);

    // Create ZIP
    const zip = new JSZip();

    // Create root folder
    const rootFolder = zip.folder(`${businessSlug}-ai-team`);
    if (!rootFolder) {
      throw new Error('Failed to create root folder');
    }

    // Add workspaces directory with agent configurations
    const workspacesFolder = rootFolder.folder('workspaces');
    if (!workspacesFolder) {
      throw new Error('Failed to create workspaces folder');
    }

    // Add each agent's workspace
    for (const agent of workspaceData.agents) {
      const agentFolder = workspacesFolder.folder(agent.id);
      if (!agentFolder) continue;

      // Create agent files
      agentFolder.file('SOUL.md', agent.soul || `# ${agent.name}\n\n${agent.role}\n\nI am ${agent.name}, your dedicated ${agent.role.toLowerCase()}. I'm here to help ${businessName} with ${agent.description || 'various tasks'}.`);
      agentFolder.file('AGENTS.md', workspaceData.agentsTemplate || '# Agent Operating Rules\n\nFollow the company guidelines and assist customers professionally.');
      agentFolder.file('KNOWLEDGE.md', agent.knowledge || `# ${agent.name} Knowledge Base\n\n## About ${businessName}\n\nIndustry: ${client.industry}\n\n## My Role\n${agent.role}\n\n## Guidelines\n- Always be helpful and professional\n- Focus on ${businessName}'s needs\n- Escalate complex issues appropriately`);
      agentFolder.file('IDENTITY.md', agent.identity || `# ${agent.name} Identity\n\nI am ${agent.name}, a specialized AI agent for ${businessName}.\n\n## Personality\n- Professional but friendly\n- Knowledgeable about ${client.industry}\n- Focused on customer success\n\n## Communication Style\n- Clear and concise\n- Helpful and solution-oriented\n- Appropriate for business context`);
      agentFolder.file('USER.md', agent.userConfig || `# User Configuration\n\nPrimary user: ${businessName}\nIndustry: ${client.industry}\nAgent role: ${agent.role}`);
      agentFolder.file('MEMORY.md', agent.memory || `# Agent Memory\n\nInitial setup for ${agent.name} at ${businessName}.\n\n## Setup Date\n${new Date().toISOString()}\n\n## Configuration\n- Business: ${businessName}\n- Industry: ${client.industry}\n- Role: ${agent.role}`);
    }

    // Add openclaw.json (with placeholder bot tokens)
    const openclawConfigWithPlaceholders = {
      ...openclawConfig,
      channels: openclawConfig.channels?.map((channel: any) => ({
        ...channel,
        token: channel.token || `BOT_TOKEN_${channel.agentId?.toUpperCase().replace(/-/g, '_') || 'PLACEHOLDER'}`
      }))
    };
    rootFolder.file('openclaw.json', JSON.stringify(openclawConfigWithPlaceholders, null, 2));

    // Generate and add deploy script
    const deployConfig: ClientConfig = {
      businessName,
      businessSlug,
      selectedAgents: workspaceData.agents.map((agent: any) => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        emoji: agent.emoji,
        type: agent.type
      }))
    };
    const deployScript = generateDeployScript(deployConfig);
    rootFolder.file('deploy.sh', deployScript);

    // Add setup guide
    rootFolder.file('SETUP-GUIDE.md', workspace.setup_guide);

    // Add README
    const readme = generateReadme(businessName, workspaceData.agents);
    rootFolder.file('README.md', readme);

    // Add main workspace files at root
    rootFolder.file('SOUL.md', workspaceData.workspaceSoul || `# ${businessName} AI Team\n\nWelcome to your custom AI team workspace!`);
    rootFolder.file('AGENTS.md', workspaceData.agentsTemplate || '# Agent Operating Rules\n\nYour AI agents follow these guidelines...');
    rootFolder.file('USER.md', `# ${businessName}\n\nIndustry: ${client.industry}\nAI Team deployed on: ${new Date().toISOString()}`);
    rootFolder.file('MEMORY.md', `# Workspace Memory\n\nInitial deployment for ${businessName}\nGenerated: ${workspace.created_at}`);

    // Generate ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Return ZIP file
    return new NextResponse(zipBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${businessSlug}-ai-team.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('ZIP generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate workspace ZIP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}