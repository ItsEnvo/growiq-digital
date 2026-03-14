import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getOnboardingData, saveWorkspace } from '@/lib/db';
import { generateWorkspace, ClientConfig } from '@/lib/template-generator';
import { requireSubscription } from '@/lib/subscription-guard';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check subscription status
    const subscriptionCheck = await requireSubscription(user.id);
    if (!subscriptionCheck.allowed) {
      return NextResponse.json(
        { error: 'Active subscription required to deploy agents' },
        { status: 403 }
      );
    }

    // Get the client's onboarding data
    const onboardingData = await getOnboardingData(user.id);
    
    if (onboardingData.length === 0) {
      return NextResponse.json({ error: 'No onboarding data found' }, { status: 404 });
    }

    // Build ClientConfig from onboarding data
    const config = buildClientConfigFromOnboarding(onboardingData, user);

    // Generate the workspace
    const workspace = generateWorkspace(config);

    // Save to database
    const savedWorkspace = await saveWorkspace(
      user.id,
      JSON.stringify(workspace),
      workspace.setupInstructions,
      JSON.stringify(workspace.openclawConfig)
    );

    return NextResponse.json({
      success: true,
      workspaceId: savedWorkspace.id,
      agents: workspace.agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role
      })),
      setupInstructions: workspace.setupInstructions
    });
  } catch (error) {
    console.error('Deploy error:', error);
    return NextResponse.json(
      { error: 'Failed to deploy workspace' }, 
      { status: 500 }
    );
  }
}

function buildClientConfigFromOnboarding(onboardingData: any[], user: any): ClientConfig {
  // Initialize config with user data
  const config: ClientConfig = {
    businessName: user.business_name,
    industry: user.industry,
    ownerName: '',
    timezone: 'America/New_York', // Default
    brandTone: 'professional',
    services: [],
    faqItems: [],
    selectedAgents: []
  };

  // Process each onboarding step
  for (const step of onboardingData) {
    const data = JSON.parse(step.data_json);
    
    switch (step.step) {
      case 1: // Business info
        if (data.ownerName) config.ownerName = data.ownerName;
        if (data.website) config.website = data.website;
        if (data.phone) config.phone = data.phone;
        if (data.address) config.address = data.address;
        if (data.businessHours) config.businessHours = data.businessHours;
        if (data.timezone) config.timezone = data.timezone;
        if (data.brandTone) config.brandTone = data.brandTone;
        break;
        
      case 2: // Agent selection
        if (data.selectedAgents) {
          config.selectedAgents = data.selectedAgents;
        }
        break;
        
      case 3: // Tools/integrations
        if (data.googleReviewLink) config.googleReviewLink = data.googleReviewLink;
        if (data.bookingLink) config.bookingLink = data.bookingLink;
        if (data.googleAdsId) config.googleAdsId = data.googleAdsId;
        if (data.monthlyAdBudget) config.monthlyAdBudget = data.monthlyAdBudget;
        break;
        
      case 4: // Services
        if (data.services) config.services = data.services;
        break;
        
      case 5: // Brand voice + FAQ
        if (data.ownerName) config.ownerName = data.ownerName;
        if (data.businessHours) config.businessHours = data.businessHours;
        if (data.timezone) config.timezone = data.timezone;
        if (data.tone) config.brandTone = data.tone;
        if (data.faqItems) config.faqItems = data.faqItems;
        break;
    }
  }

  // Ensure we have required fields
  if (!config.ownerName) config.ownerName = 'Business Owner';
  if (config.selectedAgents.length === 0) {
    // Default to Growth plan agents if none selected
    config.selectedAgents = ['iris', 'atlas', 'pulse', 'sync', 'wave', 'radar'];
  }
  if (config.services.length === 0) {
    // Add a default service
    config.services = [{ name: `${config.industry} Services`, description: 'Professional services' }];
  }
  if (config.faqItems.length === 0) {
    // Add default FAQ items
    config.faqItems = [
      {
        question: `What ${config.industry} services do you offer?`,
        answer: `We provide comprehensive ${config.industry} services tailored to your needs.`
      },
      {
        question: 'How do I get started?',
        answer: 'Contact us to schedule a consultation and discuss your requirements.'
      }
    ];
  }

  return config;
}