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
      emoji: '📞',
      name: 'IRIS',
      fullName: 'Intelligent Reception & Intake System',
      role: 'AI Reception & Lead Qualification',
      description: 'Your 24/7 AI receptionist that welcomes visitors, qualifies leads, and books appointments with professional charm.',
      channels: ['Phone', 'SMS', 'Web Chat'],
      tier: 'Revenue'
    },
    {
      id: 'atlas',
      emoji: '💼',
      name: 'ATLAS',
      fullName: 'Advanced Territory Lead & Acquisition System',
      role: 'Lead Generation & Sales Pipeline',
      description: 'Maps your sales territory, identifies high-value prospects, and nurtures leads through personalized outreach campaigns.',
      channels: ['Email', 'CRM', 'Social'],
      tier: 'Revenue'
    },
    {
      id: 'pulse',
      emoji: '🔄',
      name: 'PULSE',
      fullName: 'Personalized Upselling & Loyalty System Enhancement',
      role: 'Customer Success & Retention',
      description: 'Monitors customer health, identifies upsell opportunities, and delivers personalized retention campaigns.',
      channels: ['Email', 'SMS', 'Push'],
      tier: 'Revenue'
    },

    // Operations Tier
    {
      id: 'sync',
      emoji: '📅',
      name: 'SYNC',
      fullName: 'System Yield & Nurturing Coordinator',
      role: 'Operations & Workflow Automation',
      description: 'Synchronizes your business operations, automates workflows, and ensures nothing falls through the cracks.',
      channels: ['Calendar', 'Email', 'API'],
      tier: 'Operations'
    },
    {
      id: 'aegis',
      emoji: '🛡️',
      name: 'AEGIS',
      fullName: 'Automated Engagement & Growth Intelligence System',
      role: 'Customer Experience & Quality Control',
      description: 'Protects your brand reputation, monitors customer satisfaction, and ensures consistent service quality.',
      channels: ['Support', 'Reviews', 'Social'],
      tier: 'Operations'
    },
    {
      id: 'prism',
      emoji: '⭐',
      name: 'PRISM',
      fullName: 'Personalized Retention & Intelligence System Manager',
      role: 'Business Intelligence & Analytics',
      description: 'Analyzes customer data through multiple lenses, revealing insights that drive strategic business decisions.',
      channels: ['Analytics', 'CRM', 'Reports'],
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
      channels: ['Social Media', 'Content', 'Design'],
      tier: 'Content & Social'
    },
    {
      id: 'wave',
      emoji: '📱',
      name: 'WAVE',
      fullName: 'Web Analytics & Visitor Engagement',
      role: 'Website Optimization & Traffic Analysis',
      description: 'Rides the flow of your website traffic, optimizes user experience, and converts visitors into customers.',
      channels: ['Web Analytics', 'SEO', 'UX'],
      tier: 'Content & Social'
    },

    // Intelligence Tier
    {
      id: 'radar',
      emoji: '📊',
      name: 'RADAR',
      fullName: 'Review Analytics & Digital Reputation',
      role: 'Reputation Management & Review Strategy',
      description: 'Scans the digital landscape for mentions of your brand, manages reviews, and protects your online reputation.',
      channels: ['Review Sites', 'Social Monitor', 'Alerts'],
      tier: 'Intelligence'
    },
    {
      id: 'scout',
      emoji: '🎯',
      name: 'SCOUT',
      fullName: 'Social Communication & Online Unified Tracking',
      role: 'Competitive Intelligence & Market Research',
      description: 'Scouts your competitive landscape, tracks industry trends, and identifies market opportunities.',
      channels: ['Market Research', 'Competitive Intel', 'Trends'],
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
        router.push('/dashboard');
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
    <div style={{ padding: '120px 24px 40px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="growiq-pill" style={{ marginBottom: 16 }}>
            <span className="growiq-pill-dot" />
            AI Team Setup
          </div>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
            Deploy Your <span className="gradient-text">AI Workforce</span>
          </h1>
          <p className="text-secondary" style={{ fontSize: 15, marginBottom: 32 }}>
            Build your personalized AI team in 5 steps
          </p>

          {/* Progress indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  background: step <= currentStep ? 'linear-gradient(135deg, #00e87b, #00b4d8)' : 'rgba(255,255,255,.05)',
                  color: step <= currentStep ? '#050810' : 'rgba(199,214,255,.4)',
                  border: step === currentStep ? '2px solid rgba(0,232,123,.5)' : 'none',
                  transition: 'all .3s'
                }}>
                  {step}
                </div>
                {step < 5 && (
                  <div style={{
                    width: 20,
                    height: 2,
                    background: step < currentStep ? 'linear-gradient(90deg, #00e87b, #00b4d8)' : 'rgba(255,255,255,.1)',
                    transition: 'all .3s'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content card */}
        <div className="growiq-card" style={{ padding: 40, marginBottom: 24 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{getStepTitle()}</h2>
            <p className="text-secondary" style={{ fontSize: 14 }}>{getStepDescription()}</p>
          </div>

          {/* Step Content */}
          <div style={{ marginBottom: 32 }}>
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Business Name *
                    </label>
                    <input
                      type="text"
                      className="growiq-input"
                      value={businessInfo.businessName}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Owner Name *
                    </label>
                    <input
                      type="text"
                      className="growiq-input"
                      value={brandVoice.ownerName}
                      onChange={(e) => setBrandVoice(prev => ({ ...prev, ownerName: e.target.value }))}
                      placeholder="Enter owner name"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Website
                    </label>
                    <input
                      type="url"
                      className="growiq-input"
                      value={businessInfo.website}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="growiq-input"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Industry *
                    </label>
                    <select
                      className="growiq-input"
                      value={businessInfo.industry}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, industry: e.target.value }))}
                      required
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="">Select industry</option>
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
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Brand Tone
                    </label>
                    <select
                      className="growiq-input"
                      value={brandVoice.tone}
                      onChange={(e) => setBrandVoice(prev => ({ ...prev, tone: e.target.value as any }))}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {/* Plan Selection */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Choose Your Plan</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {[
                      { id: 'growth', name: 'Growth', agents: '6 Agents', desc: 'Essential AI workforce' },
                      { id: 'scale', name: 'Scale', agents: 'All 10 Agents', desc: 'Complete AI automation' },
                      { id: 'custom', name: 'Custom', agents: 'Pick & Choose', desc: 'Select specific agents' }
                    ].map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id as any)}
                        style={{
                          padding: 20,
                          borderRadius: 12,
                          background: agentSelection.selectedPlan === plan.id ? 'rgba(0,232,123,.06)' : 'rgba(255,255,255,.02)',
                          border: agentSelection.selectedPlan === plan.id ? '1px solid rgba(0,232,123,.2)' : '1px solid rgba(255,255,255,.06)',
                          cursor: 'pointer',
                          transition: 'all .2s'
                        }}
                      >
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h4>
                        <p style={{ fontSize: 12, color: '#00e87b', marginBottom: 8 }}>{plan.agents}</p>
                        <p style={{ fontSize: 11, color: 'rgba(199,214,255,.4)' }}>{plan.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Grid */}
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>AI Agent Selection</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        style={{
                          padding: 20,
                          borderRadius: 14,
                          background: agentSelection.selectedAgents.includes(agent.id) ? 'rgba(0,232,123,.06)' : 'rgba(255,255,255,.02)',
                          border: agentSelection.selectedAgents.includes(agent.id) ? '1px solid rgba(0,232,123,.2)' : '1px solid rgba(255,255,255,.06)',
                          cursor: 'pointer',
                          transition: 'all .2s'
                        }}
                        onClick={() => handleAgentToggle(agent.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: 24 }}>{agent.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>{agent.name}</h4>
                            <p style={{ fontSize: 11, color: 'rgba(199,214,255,.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                              {agent.role}
                            </p>
                            <p style={{ fontSize: 12, color: 'rgba(199,214,255,.6)', lineHeight: 1.4 }}>{agent.description}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={agentSelection.selectedAgents.includes(agent.id)}
                            onChange={() => {}}
                            style={{ pointerEvents: 'none' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                    Anthropic API Key *
                  </label>
                  <input
                    type="password"
                    className="growiq-input"
                    value={toolsConfig.anthropicKey}
                    onChange={(e) => setToolsConfig(prev => ({ ...prev, anthropicKey: e.target.value }))}
                    placeholder="sk-ant-..."
                    required
                  />
                  <p style={{ fontSize: 11, color: 'rgba(199,214,255,.4)', marginTop: 4 }}>Required for AI agent functionality</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      Twilio Account SID
                    </label>
                    <input
                      type="password"
                      className="growiq-input"
                      value={toolsConfig.twilioKey}
                      onChange={(e) => setToolsConfig(prev => ({ ...prev, twilioKey: e.target.value }))}
                      placeholder="AC... (optional)"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'rgba(199,214,255,.7)' }}>
                      SendGrid API Key
                    </label>
                    <input
                      type="password"
                      className="growiq-input"
                      value={toolsConfig.sendgridKey}
                      onChange={(e) => setToolsConfig(prev => ({ ...prev, sendgridKey: e.target.value }))}
                      placeholder="SG... (optional)"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your Services & Offerings</h3>
                {servicesInfo.services.map((service, index) => (
                  <div key={index} className="growiq-card" style={{ padding: 20, marginBottom: 16, background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <input
                          type="text"
                          className="growiq-input"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          placeholder="Service name (e.g., Facial Treatment)"
                        />
                        <input
                          type="text"
                          className="growiq-input"
                          value={service.description || ''}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          placeholder="Description (optional)"
                        />
                        <input
                          type="text"
                          className="growiq-input"
                          value={service.price || ''}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                          placeholder="Price (e.g., $150)"
                        />
                      </div>
                      {servicesInfo.services.length > 1 && (
                        <button
                          onClick={() => removeService(index)}
                          style={{
                            padding: 8,
                            borderRadius: 8,
                            background: 'rgba(239,68,68,.1)',
                            border: '1px solid rgba(239,68,68,.2)',
                            color: '#f87171',
                            fontSize: 12
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button onClick={addService} className="growiq-btn growiq-btn--secondary">
                  Add Another Service
                </button>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>FAQ & Knowledge Base</h3>
                <p style={{ fontSize: 14, color: 'rgba(199,214,255,.6)', marginBottom: 20 }}>
                  Add common questions to help your AI agents provide better support.
                </p>
                {brandVoice.faqItems.map((item, index) => (
                  <div key={index} className="growiq-card" style={{ padding: 20, marginBottom: 16, background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <input
                          type="text"
                          className="growiq-input"
                          value={item.question}
                          onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                          placeholder="Frequently asked question"
                        />
                        <textarea
                          className="growiq-input"
                          rows={3}
                          value={item.answer}
                          onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                          placeholder="Answer to the question"
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                      {brandVoice.faqItems.length > 1 && (
                        <button
                          onClick={() => removeFaqItem(index)}
                          style={{
                            padding: 8,
                            borderRadius: 8,
                            background: 'rgba(239,68,68,.1)',
                            border: '1px solid rgba(239,68,68,.2)',
                            color: '#f87171',
                            fontSize: 12
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button onClick={addFaqItem} className="growiq-btn growiq-btn--secondary">
                  Add FAQ Item
                </button>
              </div>
            )}
          </div>

          {error && (
            <div style={{
              padding: 12,
              borderRadius: 10,
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.2)',
              color: '#f87171',
              fontSize: 13,
              marginBottom: 24
            }}>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="growiq-btn growiq-btn--secondary"
              style={{ 
                opacity: currentStep === 1 ? 0.5 : 1,
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Back
            </button>
            
            <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>
              Step {currentStep} of 5
            </div>

            <button
              onClick={handleNext}
              disabled={loading}
              className="growiq-btn"
              style={{ 
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Saving...' : currentStep === 5 ? '🚀 Deploy AI Team' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}