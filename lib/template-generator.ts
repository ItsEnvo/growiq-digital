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
const AGENT_METADATA: Record<string, { name: string; role: string; emoji: string; channels: string[]; plan: 'growth' | 'scale' }> = {
  iris: {
    name: 'IRIS',
    role: 'AI Receptionist — answers inquiries, books appointments',
    emoji: '🎙️',
    channels: ['telegram', 'sms'],
    plan: 'growth'
  },
  atlas: {
    name: 'ATLAS',
    role: 'Sales Follow-Up — nurtures leads, handles objections, closes deals',
    emoji: '🎯',
    channels: ['telegram', 'sms'],
    plan: 'growth'
  },
  pulse: {
    name: 'PULSE',
    role: 'Daily Briefing — morning business summary and alerts',
    emoji: '📊',
    channels: ['telegram'],
    plan: 'growth'
  },
  sync: {
    name: 'SYNC',
    role: 'Scheduling — calendar management, reminders, no-show prevention',
    emoji: '📅',
    channels: ['telegram'],
    plan: 'growth'
  },
  wave: {
    name: 'WAVE',
    role: 'Social Media — content creation, scheduling, platform management',
    emoji: '🌊',
    channels: ['telegram'],
    plan: 'growth'
  },
  radar: {
    name: 'RADAR',
    role: 'Reputation — review monitoring, feedback requests, response management',
    emoji: '📡',
    channels: ['telegram'],
    plan: 'growth'
  },
  aegis: {
    name: 'AEGIS',
    role: 'Security & Systems — agent health monitoring, access management',
    emoji: '🛡️',
    channels: ['telegram'],
    plan: 'scale'
  },
  prism: {
    name: 'PRISM',
    role: 'Personal Assistant — task management, drafting, organization',
    emoji: '💎',
    channels: ['telegram'],
    plan: 'scale'
  },
  muse: {
    name: 'MUSE',
    role: 'Content Creator — graphics, copy, visual content, brand assets',
    emoji: '🎨',
    channels: ['telegram'],
    plan: 'scale'
  },
  scout: {
    name: 'SCOUT',
    role: 'Analytics & Optimization — KPI tracking, performance insights',
    emoji: '🔍',
    channels: ['telegram'],
    plan: 'scale'
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
  // Also check templates/agents/ as fallback
  const altTemplateDir = path.join(process.cwd(), 'templates/agents', agentId);
  const files: Array<{ path: string; content: string }> = [];
  
  // Standard agent files
  const agentFiles = ['SOUL.md', 'AGENTS.md'];
  
  for (const fileName of agentFiles) {
    let filePath = path.join(templateDir, fileName);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(altTemplateDir, fileName);
    }
    
    if (fs.existsSync(filePath)) {
      const templateContent = fs.readFileSync(filePath, 'utf8');
      const processedContent = replacePlaceholders(templateContent, config);
      
      files.push({
        path: `workspaces/${agentId}/${fileName}`,
        content: processedContent
      });
    }
  }
  
  // Generate KNOWLEDGE.md from shared template
  const knowledgeTemplatePath = path.join(process.cwd(), 'templates/KNOWLEDGE-TEMPLATE.md');
  if (fs.existsSync(knowledgeTemplatePath)) {
    const knowledgeTemplate = fs.readFileSync(knowledgeTemplatePath, 'utf8');
    const metadata = AGENT_METADATA[agentId];
    const processedKnowledge = replacePlaceholders(
      knowledgeTemplate.replace(/\{\{AGENT_NAME\}\}/g, metadata?.name || agentId.toUpperCase()),
      config
    );
    files.push({
      path: `workspaces/${agentId}/KNOWLEDGE.md`,
      content: processedKnowledge
    });
  }
  
  // Generate IDENTITY.md
  const metadata = AGENT_METADATA[agentId];
  const identityContent = `# IDENTITY.md — ${metadata?.name || agentId.toUpperCase()}

- **Name:** ${metadata?.name || agentId.toUpperCase()}
- **Role:** ${metadata?.role || 'AI Agent'}
- **Business:** ${config.businessName}
- **Industry:** ${config.industry}
- **Created:** ${new Date().toISOString().split('T')[0]}
`;
  files.push({
    path: `workspaces/${agentId}/IDENTITY.md`,
    content: identityContent
  });

  // Generate MEMORY.md
  files.push({
    path: `workspaces/${agentId}/MEMORY.md`,
    content: `# MEMORY.md — ${metadata?.name || agentId.toUpperCase()}

## Setup
- Deployed for ${config.businessName} on ${new Date().toISOString().split('T')[0]}
- Industry: ${config.industry}
- Owner: ${config.ownerName}
`
  });
  
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
  // Map of all placeholder variants (UPPER_CASE and camelCase) to values
  const replacements: Record<string, string> = {
    // Business info
    'BUSINESS_NAME': config.businessName,
    'businessName': config.businessName,
    'INDUSTRY': config.industry,
    'industry': config.industry,
    'OWNER_NAME': config.ownerName,
    'ownerName': config.ownerName,
    'WEBSITE': config.website || 'Not configured',
    'website': config.website || 'Not configured',
    'PHONE': config.phone || 'Not configured',
    'phone': config.phone || 'Not configured',
    'ADDRESS': config.address || 'Not configured',
    'address': config.address || 'Not configured',
    'EMAIL': config.phone || 'Not configured', // fallback
    'BUSINESS_HOURS': config.businessHours || 'Not configured',
    'businessHours': config.businessHours || 'Not configured',
    'TIMEZONE': config.timezone,
    'timezone': config.timezone,
    'TONE': config.brandTone,
    'brandTone': config.brandTone,
    
    // Links
    'REVIEW_LINK': config.googleReviewLink || 'Not configured',
    'googleReviewLink': config.googleReviewLink || 'Not configured',
    'BOOKING_LINK': config.bookingLink || 'Not configured',
    'bookingLink': config.bookingLink || 'Not configured',
    'CONTACT': config.phone || config.website || 'Not configured',
    'googleAdsId': config.googleAdsId || 'Not configured',
    'monthlyAdBudget': config.monthlyAdBudget || 'Not configured',
    
    // Content lists
    'SERVICES_LIST': formatServicesList(config.services),
    'servicesList': formatServicesList(config.services),
    'FAQ_ITEMS': formatFaqItems(config.faqItems),
    'faqItems': formatFaqItems(config.faqItems),
    
    // Defaults for optional fields
    'BRIEFING_TIME': '8:00 AM',
    'BUFFER_MINUTES': '15',
    'TARGET_AUDIENCE': `Customers interested in ${config.industry} services`,
    'PLATFORMS_LIST': 'Instagram, Facebook, Google Business',
    'INDUSTRY_PLATFORMS': 'Google Reviews, Yelp',
    'BRAND_COLORS': 'To be configured during setup',
    'BRAND_FONTS': 'To be configured during setup',
    'VISUAL_STYLE': 'Professional and clean',
  };

  let result = content;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  
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