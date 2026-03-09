import { ClientConfig } from './template-generator';

// Agent metadata for bot name suggestions
const AGENT_METADATA: Record<string, { name: string; role: string; suggestedBotName: string }> = {
  iris: {
    name: 'IRIS',
    role: 'Reception & Intake',
    suggestedBotName: 'Reception'
  },
  atlas: {
    name: 'ATLAS', 
    role: 'Lead Acquisition',
    suggestedBotName: 'Sales'
  },
  pulse: {
    name: 'PULSE',
    role: 'Customer Success',
    suggestedBotName: 'Support'
  },
  sync: {
    name: 'SYNC',
    role: 'Operations Coordinator',
    suggestedBotName: 'Operations'
  },
  aegis: {
    name: 'AEGIS',
    role: 'Growth Intelligence',
    suggestedBotName: 'Growth'
  },
  prism: {
    name: 'PRISM',
    role: 'Customer Intelligence',
    suggestedBotName: 'Intelligence'
  },
  muse: {
    name: 'MUSE',
    role: 'Content & Social',
    suggestedBotName: 'Content'
  },
  wave: {
    name: 'WAVE',
    role: 'Web Analytics',
    suggestedBotName: 'Analytics'
  },
  radar: {
    name: 'RADAR',
    role: 'Reputation Management',
    suggestedBotName: 'Reputation'
  },
  scout: {
    name: 'SCOUT',
    role: 'Social Monitoring',
    suggestedBotName: 'Social'
  }
};

export function generateSetupGuide(config: ClientConfig, agentNames: string[]): string {
  const agentList = agentNames.map(id => AGENT_METADATA[id]).filter(Boolean);
  
  return `# ${config.businessName} AI Agent Setup Guide

Welcome to your custom AI agent workspace! This guide will walk you through setting up your ${agentList.length} AI agents on your own server.

## Prerequisites

Before you begin, ensure you have:

- **VPS/Server**: Ubuntu 20.04+ or similar Linux distribution
- **Memory**: Minimum 2GB RAM (4GB+ recommended for ${agentList.length} agents)
- **Node.js**: Version 18 or higher
- **Storage**: At least 5GB free space
- **Domain**: Optional but recommended for professional setup
- **Telegram Account**: Required for bot communication

## Step 1: Install OpenClaw

Connect to your server via SSH and install OpenClaw globally:

\`\`\`bash
# Update your system
sudo apt update && sudo apt upgrade -y

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install OpenClaw
npm install -g openclaw

# Verify installation
openclaw --version
\`\`\`

## Step 2: Create Your Workspace

Create the directory structure for your ${config.businessName} AI agents:

\`\`\`bash
# Create main workspace directory
mkdir -p ~/growiq-workspace
cd ~/growiq-workspace

# Create agent workspace directories
${agentList.map(agent => `mkdir -p workspaces/${agentNames[agentList.indexOf(agent)]}`).join('\n')}

# Create shared directory
mkdir -p shared
\`\`\`

## Step 3: Copy Agent Files

You'll need to copy all the generated agent files to your server. The structure should look like this:

\`\`\`
~/growiq-workspace/
├── openclaw.json
├── shared/
│   ├── USER.md
│   └── MEMORY.md
${agentList.map((agent, index) => `├── workspaces/${agentNames[index]}/
│   ├── SOUL.md
│   ├── AGENTS.md
│   ├── KNOWLEDGE.md
│   └── IDENTITY.md`).join('\n')}
\`\`\`

## Step 4: Create Telegram Bots

For each of your ${agentList.length} AI agents, you'll need to create a Telegram bot:

1. **Open Telegram** and search for @BotFather
2. **Start a chat** with @BotFather
3. **Create each bot** by following these steps:

${agentList.map((agent, index) => `
### ${agent.name} (${agent.role})
- Send: \`/newbot\`
- Bot name: \`${config.businessName} ${agent.suggestedBotName}\`
- Username: \`${config.businessName.toLowerCase().replace(/\s+/g, '')}${agent.suggestedBotName.toLowerCase()}bot\`
- **Save the bot token** - you'll need it for ${agent.name}_BOT_TOKEN`).join('\n')}

## Step 5: Configure API Keys

You'll need several API keys for your agents to function:

### Required: Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up/login and create an API key
3. Save this as your \`ANTHROPIC_API_KEY\`

### Optional: Additional Services
- **Twilio** (for SMS): Get Account SID and Auth Token from [twilio.com](https://twilio.com)
- **SendGrid** (for email): Get API key from [sendgrid.com](https://sendgrid.com)

### Set Environment Variables

Create a \`.env\` file in your workspace:

\`\`\`bash
cd ~/growiq-workspace
nano .env
\`\`\`

Add your keys:

\`\`\`env
# Required
ANTHROPIC_API_KEY=your_anthropic_key_here

# Bot tokens (replace with your actual tokens)
${agentList.map(agent => `${agent.name}_BOT_TOKEN=your_${agent.name.toLowerCase()}_bot_token_here`).join('\n')}

# Optional
TWILIO_ACCOUNT_SID=your_twilio_sid_here
TWILIO_AUTH_TOKEN=your_twilio_token_here
SENDGRID_API_KEY=your_sendgrid_key_here
\`\`\`

## Step 6: Update OpenClaw Configuration

Edit the \`openclaw.json\` file and replace the bot token placeholders with environment variable references:

\`\`\`bash
nano openclaw.json
\`\`\`

Update each bot token from \`{{AGENT_NAME_BOT_TOKEN}}\` to \`$AGENT_NAME_BOT_TOKEN\`

## Step 7: Start OpenClaw

Launch your AI agent system:

\`\`\`bash
# Start the OpenClaw gateway
openclaw gateway start

# Check status
openclaw gateway status

# View logs
openclaw gateway logs
\`\`\`

## Step 8: Test Your Agents

Test each agent by sending a message to their Telegram bots:

${agentList.map((agent, index) => `
### Test ${agent.name}
1. Open Telegram and search for your \`${config.businessName} ${agent.suggestedBotName}\` bot
2. Start a conversation with \`/start\`
3. Send a test message: "Hello, I'm interested in ${config.services[0]?.name || 'your services'}."
4. Verify the agent responds appropriately`).join('\n')}

## Troubleshooting

### Common Issues

**Bot not responding:**
- Check bot token is correctly set in .env file
- Verify OpenClaw is running: \`openclaw gateway status\`
- Check logs: \`openclaw gateway logs\`

**API errors:**
- Verify Anthropic API key has sufficient credits
- Check API key format (should start with \`sk-\`)

**Memory issues:**
- Monitor RAM usage: \`htop\`
- Consider upgrading server if running ${agentList.length} agents

**File permissions:**
- Ensure OpenClaw can read workspace files: \`chmod -R 755 ~/growiq-workspace\`

### Support Commands

\`\`\`bash
# Restart all agents
openclaw gateway restart

# Stop all agents
openclaw gateway stop

# Check individual agent status
openclaw agent status ${agentNames[0]}

# View specific agent logs
openclaw agent logs ${agentNames[0]}
\`\`\`

## Next Steps

Once your agents are running:

1. **Monitor Performance**: Check logs regularly for any issues
2. **Update Content**: Modify KNOWLEDGE.md files as your business evolves
3. **Scale Resources**: Monitor server performance and upgrade as needed
4. **Backup Configuration**: Regularly backup your workspace and .env files

## Business-Specific Notes

- **Timezone**: All agents are configured for ${config.timezone}
${config.businessHours ? `- **Business Hours**: ${config.businessHours}` : ''}
- **Brand Tone**: Agents will maintain a ${config.brandTone} communication style
- **Services**: Agents are trained on your ${config.services.length} services
- **FAQ**: ${config.faqItems.length} FAQ items have been pre-loaded

Your AI team is now ready to serve ${config.businessName}! Each agent will handle their specific role while maintaining consistency with your brand and business requirements.

---

*Generated by GrowIQ Digital for ${config.businessName}*
*Setup Date: ${new Date().toLocaleDateString()}*`;
}