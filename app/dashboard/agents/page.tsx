'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: number;
  agent_type: string;
  status: string;
  config_json?: string;
  created_at: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      } else {
        setError('Failed to fetch agents');
      }
    } catch (err) {
      setError('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const toggleAgentStatus = async (agentId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setAgents(prev =>
          prev.map(agent =>
            agent.id === agentId ? { ...agent, status: newStatus } : agent
          )
        );
      } else {
        setError('Failed to update agent status');
      }
    } catch (err) {
      setError('Failed to update agent status');
    }
  };

  const getAgentDisplayName = (agentType: string) => {
    const names: { [key: string]: string } = {
      salesAgent: 'Sales Agent',
      supportAgent: 'Support Agent',
      followUpAgent: 'Follow-up Agent',
      reviewAgent: 'Review Agent',
    };
    return names[agentType] || agentType;
  };

  const getAgentDescription = (agentType: string) => {
    const descriptions: { [key: string]: string } = {
      salesAgent: 'Qualifies leads, books appointments, and follows up on sales opportunities',
      supportAgent: 'Handles customer inquiries and provides instant responses',
      followUpAgent: 'Maintains relationships through automated touchpoints',
      reviewAgent: 'Manages online reputation and review requests',
    };
    return descriptions[agentType] || 'AI agent for business automation';
  };

  const getAgentIcon = (agentType: string) => {
    const icons: { [key: string]: string } = {
      salesAgent: '💼',
      supportAgent: '🎧',
      followUpAgent: '📞',
      reviewAgent: '⭐',
    };
    return icons[agentType] || '🤖';
  };

  const getCurrentActivity = (agentType: string, status: string) => {
    if (status === 'paused') return 'On standby';
    
    const activities: { [key: string]: string[] } = {
      salesAgent: ['Qualifying incoming leads', 'Sending follow-up emails', 'Scheduling appointments'],
      supportAgent: ['Monitoring chat channels', 'Responding to inquiries', 'Processing tickets'],
      followUpAgent: ['Sending check-in messages', 'Nurturing prospects', 'Re-engaging cold leads'],
      reviewAgent: ['Monitoring review platforms', 'Sending review requests', 'Responding to feedback'],
    };
    
    const agentActivities = activities[agentType] || ['Working on automation tasks'];
    return agentActivities[Math.floor(Math.random() * agentActivities.length)];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="hud-card p-6">
                <div className="h-6 bg-gray-700 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-80"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="hud-kicker mb-4">Agent Management</div>
        <h1 className="hud-title mb-4">Your AI Team</h1>
        <p className="text-gray-400">
          Manage and monitor your AI agents. Toggle them on/off and monitor their activity.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
          <div className="text-red-400 text-sm">{error}</div>
        </div>
      )}

      {/* Agents List */}
      <div className="space-y-4">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div key={agent.id} className="hud-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getAgentIcon(agent.agent_type)}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="hud-section-title">{getAgentDisplayName(agent.agent_type)}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`hud-dot ${agent.status === 'active' ? '' : 'opacity-30'}`} />
                        <span className={`text-sm font-medium ${
                          agent.status === 'active' ? 'text-mint' : 'text-gray-500'
                        }`}>
                          {agent.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-3">{getAgentDescription(agent.agent_type)}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Currently:</span>
                      <span className={agent.status === 'active' ? 'text-mint' : 'text-gray-500'}>
                        {getCurrentActivity(agent.agent_type, agent.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleAgentStatus(agent.id, agent.status)}
                    className={`hud-btn ${
                      agent.status === 'active' 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'hud-btn--primary'
                    }`}
                  >
                    {agent.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  
                  <button className="hud-btn hud-btn--ghost">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="hud-card p-8 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="hud-section-title mb-4">No Agents Deployed</h3>
            <p className="text-gray-400 mb-6">
              You haven't set up any AI agents yet. Complete the onboarding process to activate your AI team.
            </p>
            <button className="hud-btn hud-btn--primary">
              Complete Onboarding
            </button>
          </div>
        )}
      </div>

      {/* Agent Performance */}
      {agents.length > 0 && (
        <div>
          <h2 className="hud-section-title mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hud-card p-6">
              <div className="hud-kicker mb-2">This Week</div>
              <div className="text-2xl font-bold text-mint">127</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
            <div className="hud-card p-6">
              <div className="hud-kicker mb-2">Response Time</div>
              <div className="text-2xl font-bold text-mint">2.3s</div>
              <div className="text-sm text-gray-400">Average Response</div>
            </div>
            <div className="hud-card p-6">
              <div className="hud-kicker mb-2">Success Rate</div>
              <div className="text-2xl font-bold text-mint">94%</div>
              <div className="text-sm text-gray-400">Task Success Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}