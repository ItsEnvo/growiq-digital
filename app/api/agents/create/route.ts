import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createClientAgent, createActivity, getOnboardingData, saveWorkspace } from '@/lib/db';
import { generateWorkspace, ClientConfig } from '@/lib/template-generator';

function buildClientConfigFromOnboarding(onboardingData: any[], user: any, selectedAgents: string[]): ClientConfig {
  // Initialize config with user data
  const config: ClientConfig = {
    businessName: user.business_name,
    industry: user.industry,
    ownerName: '',
    timezone: 'America/New_York', // Default
    brandTone: 'professional',
    services: [],
    faqItems: [],
    selectedAgents: selectedAgents
  };

  // Process each onboarding step
  for (const step of onboardingData) {
    const data = JSON.parse(step.data_json);
    
    switch (step.step) {
      case 1: // Business info + Brand voice
        if (data.ownerName) config.ownerName = data.ownerName;
        if (data.website) config.website = data.website;
        if (data.phone) config.phone = data.phone;
        if (data.address) config.address = data.address;
        if (data.businessHours) config.businessHours = data.businessHours;
        if (data.timezone) config.timezone = data.timezone;
        if (data.tone) config.brandTone = data.tone;
        break;
        
      case 2: // Agent selection (handled above)
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
        
      case 5: // FAQ
        if (data.faqItems) config.faqItems = data.faqItems;
        break;
    }
  }

  // Ensure we have required fields
  if (!config.ownerName) config.ownerName = 'Business Owner';
  if (config.services.length === 0) {
    config.services = [{ name: `${config.industry} Services`, description: 'Professional services' }];
  }
  if (config.faqItems.length === 0) {
    config.faqItems = [
      {
        question: `What ${config.industry} services do you offer?`,
        answer: `We provide comprehensive ${config.industry} services tailored to your needs.`
      }
    ];
  }

  return config;
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { agents } = await request.json();

    if (!agents || !Array.isArray(agents)) {
      return new NextResponse('Agents array is required', { status: 400 });
    }

    // Create the selected agents
    const createdAgents = [];
    
    for (const agentType of agents) {
      const agent = createClientAgent(currentUser.id, agentType);
      createdAgents.push(agent);
      
      // Create activity log
      createActivity(
        currentUser.id,
        agentType,
        `${agentType.charAt(0).toUpperCase() + agentType.slice(1)} has been activated and is ready to work`
      );
    }

    // Generate workspace after creating agents
    try {
      const onboardingData = getOnboardingData(currentUser.id);
      const config = buildClientConfigFromOnboarding(onboardingData, currentUser, agents);
      const workspace = generateWorkspace(config);
      
      saveWorkspace(
        currentUser.id,
        JSON.stringify(workspace),
        workspace.setupInstructions,
        JSON.stringify(workspace.openclawConfig)
      );
    } catch (workspaceError) {
      console.error('Workspace generation error:', workspaceError);
      // Don't fail the whole request if workspace generation fails
    }

    return NextResponse.json({ 
      success: true, 
      agents: createdAgents 
    });
  } catch (error: any) {
    console.error('Agent creation error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}