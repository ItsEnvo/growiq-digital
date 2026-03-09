'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: number;
  agent_type: string;
  status: string;
  config_json?: string;
}

interface Activity {
  id: number;
  agent_type: string;
  message: string;
  created_at: string;
}

interface Stats {
  leads: number;
  calls: number;
  appointments: number;
}

export default function DashboardOverview() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats>({ leads: 0, calls: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [agentsRes, activityRes] = await Promise.all([
        fetch('/api/agents'),
        fetch('/api/activity'),
      ]);

      if (agentsRes.ok) {
        const agentsData = await agentsRes.json();
        setAgents(agentsData);
      }

      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setActivity(activityData.slice(0, 10)); // Latest 10 activities
      }

      // Set placeholder stats for now
      setStats({
        leads: Math.floor(Math.random() * 50) + 10,
        calls: Math.floor(Math.random() * 30) + 5,
        appointments: Math.floor(Math.random() * 20) + 3,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
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

  const getAgentIcon = (agentType: string) => {
    const icons: { [key: string]: string } = {
      salesAgent: '💼',
      supportAgent: '🎧',
      followUpAgent: '📞',
      reviewAgent: '⭐',
    };
    return icons[agentType] || '🤖';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="hud-card p-6">
                <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-16"></div>
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
        <div className="hud-kicker mb-4">Dashboard</div>
        <h1 className="hud-title mb-4">Operations Center</h1>
        <p className="text-gray-400">Monitor your AI agents and business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="hud-card p-6">
          <div className="hud-kicker mb-2">This Month</div>
          <div className="text-3xl font-bold text-mint">{stats.leads}</div>
          <div className="text-sm text-gray-400">New Leads</div>
        </div>
        <div className="hud-card p-6">
          <div className="hud-kicker mb-2">This Month</div>
          <div className="text-3xl font-bold text-mint">{stats.calls}</div>
          <div className="text-sm text-gray-400">Calls Handled</div>
        </div>
        <div className="hud-card p-6">
          <div className="hud-kicker mb-2">This Month</div>
          <div className="text-3xl font-bold text-mint">{stats.appointments}</div>
          <div className="text-sm text-gray-400">Appointments Booked</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Status Cards */}
        <div>
          <h2 className="hud-section-title mb-4">Agent Status</h2>
          <div className="space-y-4">
            {agents.length > 0 ? (
              agents.map((agent) => (
                <div key={agent.id} className="hud-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getAgentIcon(agent.agent_type)}</div>
                      <div>
                        <h3 className="font-medium">{getAgentDisplayName(agent.agent_type)}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`hud-dot ${agent.status === 'active' ? '' : 'opacity-30'}`} />
                          <span className={`text-sm ${
                            agent.status === 'active' ? 'text-mint' : 'text-gray-500'
                          }`}>
                            {agent.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {agent.status === 'active' ? 'Working...' : 'Standby'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="hud-card p-6 text-center">
                <div className="text-gray-400 mb-4">No agents deployed yet</div>
                <p className="text-sm text-gray-500">
                  Complete onboarding to activate your AI team
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="hud-section-title mb-4">Recent Activity</h2>
          <div className="hud-card">
            <div className="max-h-80 overflow-y-auto">
              {activity.length > 0 ? (
                <div className="divide-y divide-gray-800">
                  {activity.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-lg mt-0.5">
                          {getAgentIcon(item.agent_type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{item.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="hud-chip text-xs">
                              {getAgentDisplayName(item.agent_type)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(item.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="text-gray-400 mb-2">No activity yet</div>
                  <p className="text-sm text-gray-500">
                    Activity will appear here once your agents start working
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hud-card p-6">
        <h2 className="hud-section-title mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="hud-btn hud-btn--ghost text-left p-4">
            <div className="text-lg mb-2">📊</div>
            <div className="font-medium">View Reports</div>
            <div className="text-xs text-gray-500">Detailed performance analytics</div>
          </button>
          <button className="hud-btn hud-btn--ghost text-left p-4">
            <div className="text-lg mb-2">⚙️</div>
            <div className="font-medium">Agent Settings</div>
            <div className="text-xs text-gray-500">Configure agent behavior</div>
          </button>
          <button className="hud-btn hud-btn--ghost text-left p-4">
            <div className="text-lg mb-2">📧</div>
            <div className="font-medium">Contact Support</div>
            <div className="text-xs text-gray-500">Get help from our team</div>
          </button>
        </div>
      </div>
    </div>
  );
}