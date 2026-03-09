'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BusinessInfo {
  businessName: string;
  website: string;
  phone: string;
  address: string;
  industry: string;
}

interface AgentSelection {
  selectedAgents: string[];
  selectedPlan: 'growth' | 'scale' | 'custom';
}

interface ToolsConfig {
  anthropicKey: string;
  twilioKey: string;
  sendgridKey: string;
  googleCalendarKey: string;
  googleReviewLink?: string;
  bookingLink?: string;
  googleAdsId?: string;
  monthlyAdBudget?: string;
}

interface ServicesInfo {
  services: Array<{ name: string; description?: string; price?: string }>;
}

interface BrandVoice {
  ownerName: string;
  businessHours?: string;
  timezone: string;
  tone: 'professional' | 'friendly' | 'casual';
  faqItems: Array<{ question: string; answer: string }>;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    website: '',
    phone: '',
    address: '',
    industry: '',
  });

  const [agentSelection, setAgentSelection] = useState<AgentSelection>({
    selectedAgents: [],
    selectedPlan: 'growth'
  });

  const [toolsConfig, setToolsConfig] = useState<ToolsConfig>({
    anthropicKey: '',
    twilioKey: '',
    sendgridKey: '',
    googleCalendarKey: '',
  });

  const [servicesInfo, setServicesInfo] = useState<ServicesInfo>({
    services: [{ name: '', description: '', price: '' }],
  });

  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    ownerName: '',
    timezone: 'America/New_York',
    tone: 'professional',
    faqItems: [{ question: '', answer: '' }],
  });

  const agents = [
    // Revenue Tier
    {
      id: 'iris',
      emoji: '🎯',
      name: 'IRIS',
      fullName: 'Intelligent Reception & Intake System',
      role: 'AI Reception & Lead Qualification',
      description: 'Your 24/7 AI receptionist that welcomes visitors, qualifies leads, and books appointments with professional charm.',
      channels: ['Telegram', 'SMS', 'Web Chat'],
      tier: 'Revenue'
    },
    {
      id: 'atlas',
      emoji: '🗺️',
      name: 'ATLAS',
      fullName: 'Advanced Territory Lead & Acquisition System',
      role: 'Lead Generation & Sales Pipeline',
      description: 'Maps your sales territory, identifies high-value prospects, and nurtures leads through personalized outreach campaigns.',
      channels: ['Telegram', 'Email', 'CRM'],
      tier: 'Revenue'
    },
    {
      id: 'pulse',
      emoji: '💓',
      name: 'PULSE',
      fullName: 'Personalized Upselling & Loyalty System Enhancement',
      role: 'Customer Success & Retention',
      description: 'Monitors customer health, identifies upsell opportunities, and delivers personalized retention campaigns.',
      channels: ['Telegram', 'Email', 'SMS'],
      tier: 'Revenue'
    },

    // Operations Tier
    {
      id: 'sync',
      emoji: '⚡',
      name: 'SYNC',
      fullName: 'System Yield & Nurturing Coordinator',
      role: 'Operations & Workflow Automation',
      description: 'Synchronizes your business operations, automates workflows, and ensures nothing falls through the cracks.',
      channels: ['Telegram', 'Email', 'Integrations'],
      tier: 'Operations'
    },
    {
      id: 'aegis',
      emoji: '🛡️',
      name: 'AEGIS',
      fullName: 'Automated Engagement & Growth Intelligence System',
      role: 'Customer Experience & Quality Control',
      description: 'Protects your brand reputation, monitors customer satisfaction, and ensures consistent service quality.',
      channels: ['Telegram', 'Reviews', 'Social'],
      tier: 'Operations'
    },
    {
      id: 'prism',
      emoji: '💎',
      name: 'PRISM',
      fullName: 'Personalized Retention & Intelligence System Manager',
      role: 'Business Intelligence & Analytics',
      description: 'Analyzes customer data through multiple lenses, revealing insights that drive strategic business decisions.',
      channels: ['Telegram', 'Analytics', 'CRM'],
      tier: 'Operations'
    },

    // Content & Social Tier
    {
      id: 'muse',
      emoji: '🎨',
      name: 'MUSE',
      fullName: 'Multimedia Universal Social Engagement',
      role: 'Content Creation & Social Media',
      description: 'Inspires your brand\'s creative voice, generates engaging content, and manages your social media presence.',
      channels: ['Telegram', 'Social Media', 'Content'],
      tier: 'Content & Social'
    },
    {
      id: 'wave',
      emoji: '🌊',
      name: 'WAVE',
      fullName: 'Web Analytics & Visitor Engagement',
      role: 'Website Optimization & Traffic Analysis',
      description: 'Rides the flow of your website traffic, optimizes user experience, and converts visitors into customers.',
      channels: ['Telegram', 'Web Analytics', 'SEO'],
      tier: 'Content & Social'
    },

    // Intelligence Tier
    {
      id: 'radar',
      emoji: '📡',
      name: 'RADAR',
      fullName: 'Review Analytics & Digital Reputation',
      role: 'Reputation Management & Review Strategy',
      description: 'Scans the digital landscape for mentions of your brand, manages reviews, and protects your online reputation.',
      channels: ['Telegram', 'Review Sites', 'Social Monitoring'],
      tier: 'Intelligence'
    },
    {
      id: 'scout',
      emoji: '🔍',
      name: 'SCOUT',
      fullName: 'Social Communication & Online Unified Tracking',
      role: 'Competitive Intelligence & Market Research',
      description: 'Scouts your competitive landscape, tracks industry trends, and identifies market opportunities.',
      channels: ['Telegram', 'Social Monitoring', 'Market Research'],
      tier: 'Intelligence'
    }
  ];

  const agentPlans = {
    growth: ['iris', 'atlas', 'pulse', 'sync', 'wave', 'radar'],
    scale: ['iris', 'atlas', 'pulse', 'sync', 'aegis', 'prism', 'muse', 'wave', 'radar', 'scout']
  };

  const tiers = [
    { name: 'Revenue', agents: agents.filter(a => a.tier === 'Revenue') },
    { name: 'Operations', agents: agents.filter(a => a.tier === 'Operations') },
    { name: 'Content & Social', agents: agents.filter(a => a.tier === 'Content & Social') },
    { name: 'Intelligence', agents: agents.filter(a => a.tier === 'Intelligence') }
  ];

  const saveStep = async (step: number, data: any) => {
    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data }),
      });

      if (!response.ok) {
        throw new Error('Failed to save step');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleNext = async () => {
    setError('');
    setLoading(true);

    try {
      let stepData;
      switch (currentStep) {
        case 1:
          if (!businessInfo.businessName || !businessInfo.industry) {
            throw new Error('Please fill in all required fields');
          }
          stepData = { ...businessInfo, ...brandVoice };
          break;
        case 2:
          if (agentSelection.selectedAgents.length === 0) {
            throw new Error('Please select at least one agent');
          }
          stepData = agentSelection;
          break;
        case 3:
          if (!toolsConfig.anthropicKey) {
            throw new Error('Anthropic API key is required');
          }
          stepData = toolsConfig;
          break;
        case 4:
          stepData = servicesInfo;
          break;
        case 5:
          stepData = { faqItems: brandVoice.faqItems };
          break;
      }

      await saveStep(currentStep, stepData);

      if (currentStep === 5) {
        // Final step - create agents and redirect
        await createAgents();
        router.push('/dashboard/workspace');
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAgents = async () => {
    await fetch('/api/agents/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agents: agentSelection.selectedAgents }),
    });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlanSelect = (plan: 'growth' | 'scale' | 'custom') => {
    setAgentSelection(prev => ({
      selectedPlan: plan,
      selectedAgents: plan === 'custom' ? prev.selectedAgents : agentPlans[plan]
    }));
  };

  const handleAgentToggle = (agentId: string) => {
    setAgentSelection(prev => ({
      ...prev,
      selectedPlan: 'custom',
      selectedAgents: prev.selectedAgents.includes(agentId)
        ? prev.selectedAgents.filter(id => id !== agentId)
        : [...prev.selectedAgents, agentId]
    }));
  };

  const addService = () => {
    setServicesInfo(prev => ({
      services: [...prev.services, { name: '', description: '', price: '' }],
    }));
  };

  const removeService = (index: number) => {
    setServicesInfo(prev => ({
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const updateService = (index: number, field: 'name' | 'description' | 'price', value: string) => {
    setServicesInfo(prev => ({
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      ),
    }));
  };

  const addFaqItem = () => {
    setBrandVoice(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { question: '', answer: '' }],
    }));
  };

  const removeFaqItem = (index: number) => {
    setBrandVoice(prev => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, i) => i !== index),
    }));
  };

  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    setBrandVoice(prev => ({
      ...prev,
      faqItems: prev.faqItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Business Name *</label>
                <input
                  type="text"
                  className="hud-input"
                  value={businessInfo.businessName}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Owner Name *</label>
                <input
                  type="text"
                  className="hud-input"
                  value={brandVoice.ownerName}
                  onChange={(e) => setBrandVoice(prev => ({ ...prev, ownerName: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  className="hud-input"
                  value={businessInfo.website}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="hud-input"
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                className="hud-input"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Industry *</label>
                <select
                  className="hud-input"
                  value={businessInfo.industry}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, industry: e.target.value }))}
                  required
                >
                  <option value="">Select your industry</option>
                  <option value="medspa">Med Spa</option>
                  <option value="dental">Dental</option>
                  <option value="realestate">Real Estate</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="fitness">Fitness</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="legal">Legal Services</option>
                  <option value="consulting">Consulting</option>
                  <option value="automotive">Automotive</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Brand Tone</label>
                <select
                  className="hud-input"
                  value={brandVoice.tone}
                  onChange={(e) => setBrandVoice(prev => ({ ...prev, tone: e.target.value as any }))}
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Business Hours</label>
                <input
                  type="text"
                  className="hud-input"
                  value={brandVoice.businessHours || ''}
                  onChange={(e) => setBrandVoice(prev => ({ ...prev, businessHours: e.target.value }))}
                  placeholder="Mon-Fri 9AM-6PM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  className="hud-input"
                  value={brandVoice.timezone}
                  onChange={(e) => setBrandVoice(prev => ({ ...prev, timezone: e.target.value }))}
                >
                  <option value="America/New_York">Eastern (EST/EDT)</option>
                  <option value="America/Chicago">Central (CST/CDT)</option>
                  <option value="America/Denver">Mountain (MST/MDT)</option>
                  <option value="America/Los_Angeles">Pacific (PST/PDT)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Plan Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Choose Your Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`hud-card p-4 cursor-pointer border-2 transition-all ${
                    agentSelection.selectedPlan === 'growth' ? 'border-mint bg-mint/10' : 'border-transparent'
                  }`}
                  onClick={() => handlePlanSelect('growth')}
                >
                  <h4 className="font-medium mb-2">Growth Plan</h4>
                  <p className="text-sm text-gray-400 mb-2">6 Essential Agents</p>
                  <p className="text-xs text-gray-500">Perfect for growing businesses</p>
                </div>
                <div 
                  className={`hud-card p-4 cursor-pointer border-2 transition-all ${
                    agentSelection.selectedPlan === 'scale' ? 'border-mint bg-mint/10' : 'border-transparent'
                  }`}
                  onClick={() => handlePlanSelect('scale')}
                >
                  <h4 className="font-medium mb-2">Scale Plan</h4>
                  <p className="text-sm text-gray-400 mb-2">All 10 Agents</p>
                  <p className="text-xs text-gray-500">Complete AI automation</p>
                </div>
                <div 
                  className={`hud-card p-4 cursor-pointer border-2 transition-all ${
                    agentSelection.selectedPlan === 'custom' ? 'border-mint bg-mint/10' : 'border-transparent'
                  }`}
                  onClick={() => handlePlanSelect('custom')}
                >
                  <h4 className="font-medium mb-2">Custom Plan</h4>
                  <p className="text-sm text-gray-400 mb-2">Pick & Choose</p>
                  <p className="text-xs text-gray-500">Select specific agents</p>
                </div>
              </div>
            </div>

            {/* Agent Selection by Tier */}
            <div className="space-y-6">
              {tiers.map((tier) => (
                <div key={tier.name}>
                  <h3 className="text-lg font-medium mb-4">{tier.name}</h3>
                  <div className="grid gap-4">
                    {tier.agents.map((agent) => (
                      <div 
                        key={agent.id} 
                        className={`hud-card p-4 border-2 transition-all ${
                          agentSelection.selectedAgents.includes(agent.id) 
                            ? 'border-mint bg-mint/10' 
                            : 'border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="checkbox"
                            id={agent.id}
                            checked={agentSelection.selectedAgents.includes(agent.id)}
                            onChange={() => handleAgentToggle(agent.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{agent.emoji}</span>
                              <div>
                                <label htmlFor={agent.id} className="block font-medium cursor-pointer">
                                  {agent.name} - {agent.fullName}
                                </label>
                                <p className="text-sm text-gray-400">{agent.role}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{agent.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {agent.channels.map((channel) => (
                                <span key={channel} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                  {channel}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Anthropic API Key *
              </label>
              <input
                type="password"
                className="hud-input"
                value={toolsConfig.anthropicKey}
                onChange={(e) => setToolsConfig(prev => ({ ...prev, anthropicKey: e.target.value }))}
                placeholder="sk-ant-..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Required for AI agent functionality</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Twilio Account SID (Optional)
                </label>
                <input
                  type="password"
                  className="hud-input"
                  value={toolsConfig.twilioKey}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, twilioKey: e.target.value }))}
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-gray-500 mt-1">For SMS messaging capabilities</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  SendGrid API Key (Optional)
                </label>
                <input
                  type="password"
                  className="hud-input"
                  value={toolsConfig.sendgridKey}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, sendgridKey: e.target.value }))}
                  placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-gray-500 mt-1">For email automation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Google Review Link (Optional)
                </label>
                <input
                  type="url"
                  className="hud-input"
                  value={toolsConfig.googleReviewLink || ''}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, googleReviewLink: e.target.value }))}
                  placeholder="https://g.page/r/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Booking Link (Optional)
                </label>
                <input
                  type="url"
                  className="hud-input"
                  value={toolsConfig.bookingLink || ''}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, bookingLink: e.target.value }))}
                  placeholder="https://calendly.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Google Ads ID (Optional)
                </label>
                <input
                  type="text"
                  className="hud-input"
                  value={toolsConfig.googleAdsId || ''}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, googleAdsId: e.target.value }))}
                  placeholder="123-456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Ad Budget (Optional)
                </label>
                <input
                  type="text"
                  className="hud-input"
                  value={toolsConfig.monthlyAdBudget || ''}
                  onChange={(e) => setToolsConfig(prev => ({ ...prev, monthlyAdBudget: e.target.value }))}
                  placeholder="$2,500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Services</label>
              {servicesInfo.services.map((service, index) => (
                <div key={index} className="hud-card p-4 mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="hud-input"
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                      placeholder="Service name (e.g., Facial Treatment)"
                    />
                    <input
                      type="text"
                      className="hud-input"
                      value={service.description || ''}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      placeholder="Service description (optional)"
                    />
                    <input
                      type="text"
                      className="hud-input"
                      value={service.price || ''}
                      onChange={(e) => updateService(index, 'price', e.target.value)}
                      placeholder="Price (e.g., $150)"
                    />
                    {servicesInfo.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="hud-btn text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove Service
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="hud-btn hud-btn--ghost text-sm"
              >
                Add Another Service
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Frequently Asked Questions</label>
              <p className="text-sm text-gray-400 mb-4">
                Add common questions and answers to help your AI agents provide better customer support.
              </p>
              {brandVoice.faqItems.map((item, index) => (
                <div key={index} className="hud-card p-4 mb-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="hud-input"
                      value={item.question}
                      onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                      placeholder="Frequently asked question"
                    />
                    <textarea
                      className="hud-input"
                      rows={3}
                      value={item.answer}
                      onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                      placeholder="Answer to the question"
                    />
                    {brandVoice.faqItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaqItem(index)}
                        className="hud-btn text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove FAQ
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFaqItem}
                className="hud-btn hud-btn--ghost text-sm"
              >
                Add FAQ Item
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Business Information';
      case 2: return 'Choose Your AI Agents';
      case 3: return 'Connect Your Tools';
      case 4: return 'Your Services';
      case 5: return 'FAQ & Knowledge Base';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Tell us about your business and brand';
      case 2: return 'Select the AI agents that will help grow your business';
      case 3: return 'Connect your APIs and integration tools';
      case 4: return 'List your services and offerings';
      case 5: return 'Add frequently asked questions for better customer support';
      default: return '';
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 pt-8">
      <div className="mb-8">
        <div className="hud-kicker mb-4">Onboarding</div>
        <h1 className="hud-title mb-4">Set up your AI team</h1>
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step <= currentStep 
                  ? 'bg-mint text-black' 
                  : 'border border-gray-600 text-gray-400'
              }`}>
                {step}
              </div>
              {step < 5 && <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-mint' : 'bg-gray-600'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="hud-card p-8 mb-8">
        <div className="mb-6">
          <h2 className="hud-section-title mb-2">{getStepTitle()}</h2>
          <p className="text-gray-400">{getStepDescription()}</p>
        </div>

        {renderStep()}

        {error && (
          <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 mt-6">
            <div className="text-red-400 text-sm">{error}</div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="hud-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="hud-btn hud-btn--primary disabled:opacity-50"
          >
{loading ? 'Saving...' : currentStep === 5 ? 'Deploy AI Team' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}