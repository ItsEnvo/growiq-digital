import fs from 'fs';
import path from 'path';
import { generateSetupGuide } from './setup-guide-generator';

export interface ClientConfig {
  businessName: string;
  industry: string;
  ownerName: string;
  website?: string;
  phone?: string;
  address?: string;
  businessHours?: string;
  timezone: string;
  brandTone: 'professional' | 'friendly' | 'casual';
  services: Array<{ name: string; description?: string; price?: string }>;
  faqItems: Array<{ question: string; answer: string }>;
  selectedAgents: string[]; // ['iris', 'atlas', 'pulse', 'sync', 'aegis', 'prism', 'muse', 'wave', 'radar', 'scout']
  googleReviewLink?: string;
  bookingLink?: string;
  googleAdsId?: string;
  monthlyAdBudget?: string;
}

export interface GeneratedWorkspace {
  agents: Array<{
    id: string;
    name: string;
    role: string;
    files: Array<{ path: string; content: string }>;
  }>;
  sharedFiles: Array<{ path: string; content: string }>;
  openclawConfig: object;
  setupInstructions: string;
}

// Agent metadata for the 10 GrowIQ agents
const AGENT_METADATA: Record<string, { name: string; role: string; channels: string[] }> = {
  iris: {
    name: 'IRIS',
    role: 'Intelligent Reception & Intake System',
    channels: ['telegram', 'sms']
  },
  atlas: {
    name: 'ATLAS',
    role: 'Advanced Territory Lead & Acquisition System',
    channels: ['telegram', 'email']
  },
  pulse: {
    name: 'PULSE',
    role: 'Personalized Upselling & Loyalty System Enhancement',
    channels: ['telegram', 'email', 'sms']
  },
  sync: {
    name: 'SYNC',
    role: 'System Yield & Nurturing Coordinator',
    channels: ['telegram', 'email']
  },
  aegis: {
    name: 'AEGIS',
    role: 'Automated Engagement & Growth Intelligence System',
    channels: ['telegram', 'social']
  },
  prism: {
    name: 'PRISM',
    role: 'Personalized Retention & Intelligence System Manager',
    channels: ['telegram', 'email', 'crm']
  },
  muse: {
    name: 'MUSE',
    role: 'Multimedia Universal Social Engagement',
    channels: ['telegram', 'social', 'content']
  },
  wave: {
    name: 'WAVE',
    role: 'Web Analytics & Visitor Engagement',
    channels: ['telegram', 'web', 'analytics']
  },
  radar: {
    name: 'RADAR',
    role: 'Review Analytics & Digital Reputation',
    channels: ['telegram', 'review', 'social']
  },
  scout: {
    name: 'SCOUT',
    role: 'Social Communication & Online Unified Tracking',
    channels: ['telegram', 'social', 'monitoring']
  }
};

export function generateWorkspace(config: ClientConfig): GeneratedWorkspace {
  const agents: GeneratedWorkspace['agents'] = [];
  
  // Process each selected agent
  for (const agentId of config.selectedAgents) {
    const metadata = AGENT_METADATA[agentId];
    if (!metadata) {
      throw new Error(`Unknown agent: ${agentId}`);
    }

    const agentFiles = generateAgentFiles(agentId, config);
    
    agents.push({
      id: agentId,
      name: metadata.name,
      role: metadata.role,
      files: agentFiles
    });
  }

  // Generate shared files
  const sharedFiles = generateSharedFiles(config);
  
  // Generate OpenClaw config
  const openclawConfig = generateOpenClawConfig(config);
  
  // Generate setup instructions
  const setupInstructions = generateSetupGuide(config, config.selectedAgents);

  return {
    agents,
    sharedFiles,
    openclawConfig,
    setupInstructions
  };
}

function generateAgentFiles(agentId: string, config: ClientConfig): Array<{ path: string; content: string }> {
  const templateDir = path.join(process.cwd(), 'lib/agent-templates', agentId);
  const files: Array<{ path: string; content: string }> = [];
  
  // Standard agent files
  const agentFiles = ['SOUL.md', 'AGENTS.md', 'KNOWLEDGE.md', 'IDENTITY.md'];
  
  for (const fileName of agentFiles) {
    const filePath = path.join(templateDir, fileName);
    
    if (fs.existsSync(filePath)) {
      const templateContent = fs.readFileSync(filePath, 'utf8');
      const processedContent = replacePlaceholders(templateContent, config);
      
      files.push({
        path: `workspaces/${agentId}/${fileName}`,
        content: processedContent
      });
    }
  }
  
  return files;
}

function generateSharedFiles(config: ClientConfig): Array<{ path: string; content: string }> {
  const files: Array<{ path: string; content: string }> = [];
  
  // Generate USER.md
  const userContent = `# USER.md — Business Owner Profile

## About ${config.businessName}

**Business**: ${config.businessName}
**Industry**: ${config.industry}
**Owner**: ${config.ownerName}
**Brand Tone**: ${config.brandTone}
${config.website ? `**Website**: ${config.website}` : ''}
${config.phone ? `**Phone**: ${config.phone}` : ''}
${config.address ? `**Address**: ${config.address}` : ''}
${config.businessHours ? `**Business Hours**: ${config.businessHours}` : ''}
**Timezone**: ${config.timezone}

## Services

${formatServicesList(config.services)}

## FAQ Items

${formatFaqItems(config.faqItems)}

## Important Links

${config.googleReviewLink ? `**Google Reviews**: ${config.googleReviewLink}` : ''}
${config.bookingLink ? `**Booking System**: ${config.bookingLink}` : ''}
${config.googleAdsId ? `**Google Ads ID**: ${config.googleAdsId}` : ''}
${config.monthlyAdBudget ? `**Monthly Ad Budget**: ${config.monthlyAdBudget}` : ''}

## Communication Style

Maintain a ${config.brandTone} tone in all communications. Always represent ${config.businessName} professionally and align with the owner's vision.
`;

  files.push({
    path: 'shared/USER.md',
    content: userContent
  });
  
  // Generate MEMORY.md
  const memoryContent = `# MEMORY.md — Business Context

## Business Overview

${config.businessName} is a ${config.industry} business owned by ${config.ownerName}. We maintain a ${config.brandTone} communication style and serve clients with the following services:

${formatServicesList(config.services)}

## Key Information to Remember

- Always use a ${config.brandTone} tone
- Business operates in ${config.timezone} timezone
${config.businessHours ? `- Business hours: ${config.businessHours}` : ''}
- Owner name: ${config.ownerName}
${config.website ? `- Website: ${config.website}` : ''}
${config.phone ? `- Phone: ${config.phone}` : ''}

## Common Questions & Answers

${formatFaqItems(config.faqItems)}

## Important: 

This is shared business context. All agents should refer to this information when helping customers or prospects.
`;

  files.push({
    path: 'shared/MEMORY.md',
    content: memoryContent
  });

  return files;
}

function generateOpenClawConfig(config: ClientConfig): object {
  const agentConfigs: Record<string, any> = {};
  
  for (const agentId of config.selectedAgents) {
    const metadata = AGENT_METADATA[agentId];
    agentConfigs[agentId] = {
      name: metadata.name,
      workspace: `./workspaces/${agentId}`,
      channels: {
        telegram: {
          botToken: `{{${metadata.name}_BOT_TOKEN}}`
        }
      }
    };
  }

  return {
    agents: {
      defaults: {
        model: 'anthropic/claude-sonnet-4-20250514',
        memorySearch: {
          enabled: true,
          provider: 'local'
        }
      },
      agents: agentConfigs
    },
    apiKeys: {
      anthropic: '{{ANTHROPIC_API_KEY}}',
      twilio: {
        accountSid: '{{TWILIO_ACCOUNT_SID}}',
        authToken: '{{TWILIO_AUTH_TOKEN}}'
      },
      sendgrid: '{{SENDGRID_API_KEY}}'
    },
    heartbeat: {
      enabled: true,
      intervalMinutes: 60
    }
  };
}

function replacePlaceholders(content: string, config: ClientConfig): string {
  let result = content;
  
  // Basic replacements
  result = result.replace(/\{\{businessName\}\}/g, config.businessName);
  result = result.replace(/\{\{industry\}\}/g, config.industry);
  result = result.replace(/\{\{ownerName\}\}/g, config.ownerName);
  result = result.replace(/\{\{website\}\}/g, config.website || 'Not configured');
  result = result.replace(/\{\{phone\}\}/g, config.phone || 'Not configured');
  result = result.replace(/\{\{address\}\}/g, config.address || 'Not configured');
  result = result.replace(/\{\{businessHours\}\}/g, config.businessHours || 'Not configured');
  result = result.replace(/\{\{timezone\}\}/g, config.timezone);
  result = result.replace(/\{\{brandTone\}\}/g, config.brandTone);
  result = result.replace(/\{\{googleReviewLink\}\}/g, config.googleReviewLink || 'Not configured');
  result = result.replace(/\{\{bookingLink\}\}/g, config.bookingLink || 'Not configured');
  result = result.replace(/\{\{googleAdsId\}\}/g, config.googleAdsId || 'Not configured');
  result = result.replace(/\{\{monthlyAdBudget\}\}/g, config.monthlyAdBudget || 'Not configured');
  
  // Complex replacements
  result = result.replace(/\{\{servicesList\}\}/g, formatServicesList(config.services));
  result = result.replace(/\{\{faqItems\}\}/g, formatFaqItems(config.faqItems));
  
  return result;
}

function formatServicesList(services: ClientConfig['services']): string {
  return services.map(service => {
    let line = `- ${service.name}`;
    if (service.description) {
      line += `: ${service.description}`;
    }
    if (service.price) {
      line += ` (${service.price})`;
    }
    return line;
  }).join('\n');
}

function formatFaqItems(faqItems: ClientConfig['faqItems']): string {
  return faqItems.map(item => 
    `**Q: ${item.question}**\nA: ${item.answer}\n`
  ).join('\n');
}