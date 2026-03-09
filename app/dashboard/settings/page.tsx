'use client';

import { useState, useEffect } from 'react';
import { TIERS } from '@/lib/offers';

interface User {
  id: number;
  email: string;
  business_name: string;
  industry: string;
  plan: string;
}

interface OnboardingData {
  step: number;
  data_json: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingData, setOnboardingData] = useState<{ [key: number]: any }>({});
  const [activeTab, setActiveTab] = useState('business');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserAndData();
  }, []);

  const fetchUserAndData = async () => {
    try {
      const [userRes, onboardingRes] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/onboard/data'),
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      if (onboardingRes.ok) {
        const onboardingArray = await onboardingRes.json();
        const dataMap = onboardingArray.reduce((acc: any, item: OnboardingData) => {
          acc[item.step] = JSON.parse(item.data_json);
          return acc;
        }, {});
        setOnboardingData(dataMap);
      }
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessInfo = async (data: any) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 1, data }),
      });

      if (response.ok) {
        setOnboardingData(prev => ({ ...prev, 1: data }));
        setSuccess('Business information updated successfully');
      } else {
        setError('Failed to update business information');
      }
    } catch (err) {
      setError('Failed to update business information');
    } finally {
      setSaving(false);
    }
  };

  const saveToolsConfig = async (data: any) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 3, data }),
      });

      if (response.ok) {
        setOnboardingData(prev => ({ ...prev, 3: data }));
        setSuccess('API keys updated successfully');
      } else {
        setError('Failed to update API keys');
      }
    } catch (err) {
      setError('Failed to update API keys');
    } finally {
      setSaving(false);
    }
  };

  const saveBrandVoice = async (data: any) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 4, data }),
      });

      if (response.ok) {
        setOnboardingData(prev => ({ ...prev, 4: data }));
        setSuccess('Brand voice updated successfully');
      } else {
        setError('Failed to update brand voice');
      }
    } catch (err) {
      setError('Failed to update brand voice');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'business', label: 'Business Info', icon: '🏢' },
    { id: 'tools', label: 'API Keys', icon: '🔑' },
    { id: 'brand', label: 'Brand Voice', icon: '🎨' },
    { id: 'plan', label: 'Plan & Billing', icon: '💳' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="hud-kicker mb-4">Account Settings</div>
        <h1 className="hud-title mb-4">Settings</h1>
        <p className="text-gray-400">
          Manage your business information, API integrations, and account settings.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
          <div className="text-red-400 text-sm">{error}</div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-500/10 border border-green-500/20 p-3">
          <div className="text-green-400 text-sm">{success}</div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-mint text-mint'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="hud-card p-8">
        {activeTab === 'business' && (
          <BusinessInfoTab
            data={onboardingData[1] || {}}
            onSave={saveBusinessInfo}
            saving={saving}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsTab
            data={onboardingData[3] || {}}
            onSave={saveToolsConfig}
            saving={saving}
          />
        )}

        {activeTab === 'brand' && (
          <BrandVoiceTab
            data={onboardingData[4] || {}}
            onSave={saveBrandVoice}
            saving={saving}
          />
        )}

        {activeTab === 'plan' && (
          <PlanTab user={user} />
        )}
      </div>
    </div>
  );
}

function BusinessInfoTab({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState({
    businessName: data.businessName || '',
    website: data.website || '',
    phone: data.phone || '',
    address: data.address || '',
    industry: data.industry || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="hud-section-title mb-6">Business Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Business Name</label>
          <input
            type="text"
            className="hud-input"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <select
            className="hud-input"
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          >
            <option value="">Select industry</option>
            <option value="medspa">Med Spa</option>
            <option value="dental">Dental</option>
            <option value="realestate">Real Estate</option>
            <option value="restaurant">Restaurant</option>
            <option value="fitness">Fitness</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <input
            type="url"
            className="hud-input"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            className="hud-input"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          type="text"
          className="hud-input"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="hud-btn hud-btn--primary disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function ToolsTab({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState({
    openaiKey: data.openaiKey || '',
    twilioKey: data.twilioKey || '',
    sendgridKey: data.sendgridKey || '',
    googleCalendarKey: data.googleCalendarKey || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="hud-section-title mb-6">API Keys & Integrations</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">OpenAI API Key *</label>
          <input
            type="password"
            className="hud-input"
            value={formData.openaiKey}
            onChange={(e) => setFormData(prev => ({ ...prev, openaiKey: e.target.value }))}
            placeholder="sk-..."
          />
          <p className="text-xs text-gray-500 mt-1">Required for AI agent functionality</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Twilio API Key</label>
          <input
            type="password"
            className="hud-input"
            value={formData.twilioKey}
            onChange={(e) => setFormData(prev => ({ ...prev, twilioKey: e.target.value }))}
            placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <p className="text-xs text-gray-500 mt-1">For SMS messaging capabilities</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SendGrid API Key</label>
          <input
            type="password"
            className="hud-input"
            value={formData.sendgridKey}
            onChange={(e) => setFormData(prev => ({ ...prev, sendgridKey: e.target.value }))}
            placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <p className="text-xs text-gray-500 mt-1">For email automation</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Google Calendar API Key</label>
          <input
            type="password"
            className="hud-input"
            value={formData.googleCalendarKey}
            onChange={(e) => setFormData(prev => ({ ...prev, googleCalendarKey: e.target.value }))}
          />
          <p className="text-xs text-gray-500 mt-1">For appointment scheduling</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="hud-btn hud-btn--primary disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function BrandVoiceTab({ data, onSave, saving }: any) {
  const [formData, setFormData] = useState({
    tone: data.tone || 'professional',
    keyServices: data.keyServices || [''],
    faqItems: data.faqItems || [{ question: '', answer: '' }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      keyServices: [...prev.keyServices, ''],
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyServices: prev.keyServices.filter((_: string, i: number) => i !== index),
    }));
  };

  const updateService = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyServices: prev.keyServices.map((service: string, i: number) => i === index ? value : service),
    }));
  };

  const addFaqItem = () => {
    setFormData(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { question: '', answer: '' }],
    }));
  };

  const removeFaqItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqItems: prev.faqItems.filter((_: any, i: number) => i !== index),
    }));
  };

  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqItems: prev.faqItems.map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="hud-section-title mb-6">Brand Voice & Personality</h3>

      <div>
        <label className="block text-sm font-medium mb-2">Brand Tone</label>
        <select
          className="hud-input"
          value={formData.tone}
          onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Key Services</label>
        {formData.keyServices.map((service: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="hud-input flex-1"
              value={service}
              onChange={(e) => updateService(index, e.target.value)}
              placeholder="e.g., Facials, Botox, Massage Therapy"
            />
            {formData.keyServices.length > 1 && (
              <button
                type="button"
                onClick={() => removeService(index)}
                className="hud-btn text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addService}
          className="hud-btn hud-btn--ghost text-sm"
        >
          Add Service
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">FAQ Items</label>
        {formData.faqItems.map((item: any, index: number) => (
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
              {formData.faqItems.length > 1 && (
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

      <button
        type="submit"
        disabled={saving}
        className="hud-btn hud-btn--primary disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function PlanTab({ user }: { user: User | null }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="hud-section-title mb-6">Current Plan</h3>
        <div className="hud-card bg-mint/10 border-mint/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-mint capitalize">{user?.plan} Plan</h4>
              <p className="text-sm text-gray-400 mt-1">
                Perfect for growing businesses
              </p>
            </div>
            <div className="hud-chip">
              <div className="hud-dot" />
              Active
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="hud-section-title mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`hud-card p-6 ${
                tier.highlight ? 'border-mint/40 bg-mint/5' : ''
              }`}
            >
              <div className="hud-kicker mb-2">{tier.sub}</div>
              <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
              <div className="text-2xl font-bold text-mint mb-4">{tier.price}</div>
              
              <ul className="space-y-2 mb-6">
                {tier.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-sm text-gray-400">
                    • {bullet}
                  </li>
                ))}
              </ul>
              
              <button
                className={`hud-btn w-full ${
                  tier.highlight ? 'hud-btn--primary' : 'hud-btn--ghost'
                } ${user?.plan.toLowerCase() === tier.name.toLowerCase() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={user?.plan.toLowerCase() === tier.name.toLowerCase()}
              >
                {user?.plan.toLowerCase() === tier.name.toLowerCase() ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}