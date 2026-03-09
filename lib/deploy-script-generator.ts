import { Agent, ClientConfig } from './types';

export function generateDeployScript(config: ClientConfig): string {
  const { businessName, businessSlug, selectedAgents } = config;
  const date = new Date().toISOString().split('T')[0];

  const botTokenPrompts = selectedAgents
    .map(agent => `read -p "Enter Telegram bot token for ${agent.name}: " ${agent.id.toUpperCase().replace(/-/g, '_')}_TOKEN`)
    .join('\n');

  const tokenReplacements = selectedAgents
    .map(agent => {
      const tokenVar = `${agent.id.toUpperCase().replace(/-/g, '_')}_TOKEN`;
      return `sed -i "s/BOT_TOKEN_${agent.id.toUpperCase().replace(/-/g, '_')}/\$${tokenVar}/g" "$HOME/.openclaw/openclaw.json"`;
    })
    .join('\n');

  return `#!/bin/bash
# GrowIQ AI Team Deploy Script for ${businessName}
# Generated on ${date}

set -e

echo "🧠 GrowIQ AI Team Deployment"
echo "=============================="

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required. Install it: https://nodejs.org"; exit 1; }
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then echo "❌ Node.js 18+ required. Current: $(node -v)"; exit 1; fi
echo "✅ Node.js $(node -v)"

# Install OpenClaw
echo "Installing OpenClaw..."
npm install -g openclaw

# Create workspace directory
WORKSPACE_DIR="$HOME/.openclaw/workspace-${businessSlug}"
mkdir -p "$WORKSPACE_DIR"

# Copy agent files (user needs to extract ZIP first)
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
echo "Copying agent files..."
cp -r "$SCRIPT_DIR/workspaces/"* "$WORKSPACE_DIR/" 2>/dev/null || true
cp "$SCRIPT_DIR/openclaw.json" "$HOME/.openclaw/openclaw.json" 2>/dev/null || true
cp "$SCRIPT_DIR"/SOUL.md "$SCRIPT_DIR"/AGENTS.md "$SCRIPT_DIR"/USER.md "$SCRIPT_DIR"/MEMORY.md "$WORKSPACE_DIR/" 2>/dev/null || true

# Prompt for API keys
echo ""
echo "📋 Configuration needed:"
read -p "Enter your Anthropic API key: " ANTHROPIC_KEY
# Set environment variable
echo "export ANTHROPIC_API_KEY=$ANTHROPIC_KEY" >> "$HOME/.bashrc"

# Prompt for Telegram bot tokens (per agent)
${botTokenPrompts}

# Update openclaw.json with tokens
${tokenReplacements}

echo ""
echo "✅ Deployment complete!"
echo "Start your AI team: openclaw gateway start"
echo "Check status: openclaw status"
echo ""
echo "Your AI agents are now ready to work for ${businessName}!"
echo "Each agent can be reached via their Telegram bot."
`;
}