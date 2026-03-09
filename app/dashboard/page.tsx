'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const agentData = [
  { emoji: '📞', name: 'IRIS', role: 'Reception', status: 'active', activity: 'Handling call #47 - New patient inquiry' },
  { emoji: '💼', name: 'ATLAS', role: 'Sales', status: 'active', activity: 'Follow-up sequence sent to lead #312' },
  { emoji: '🔄', name: 'PULSE', role: 'Follow-Up', status: 'active', activity: 'Re-engagement campaign: 3 responses today' },
  { emoji: '📅', name: 'SYNC', role: 'Scheduling', status: 'active', activity: 'Appointment confirmed: Sarah M. - Thu 2PM' },
  { emoji: '🛡️', name: 'AEGIS', role: 'Support', status: 'active', activity: 'Ticket resolved: Insurance coverage question' },
  { emoji: '⭐', name: 'PRISM', role: 'Reviews', status: 'active', activity: 'Review secured: 5-star on Google from Mike R.' },
];

export default function DashboardOverview() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats>({ leads: 0, calls: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);
  const [activeAgentIdx, setActiveAgentIdx] = useState(0);

  useEffect(() => {
    fetchDashboardData();
    
    // Rotate active agent every 3 seconds
    const interval = setInterval(() => {
      setActiveAgentIdx(prev => (prev + 1) % agentData.length);
    }, 3000);

    return () => clearInterval(interval);
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
        setActivity(activityData.slice(0, 10));
      }

      // Simulated stats
      setStats({
        leads: 47,
        calls: 124,
        appointments: 23,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div className="dashboard-card" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: 'rgba(199,214,255,.6)' }}>Loading Command Center...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="growiq-pill" style={{ marginBottom: 16 }}>
          <span className="growiq-pill-dot" />
          Live Operations
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          <span className="gradient-text">Command Center</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: 14 }}>
          Monitor your AI workforce • Real-time performance • Full system visibility
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📈</span>
            <div className="growiq-pill" style={{ fontSize: 8 }}>
              <span className="growiq-pill-dot" />
              THIS WEEK
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#00e87b', marginBottom: 4 }}>{stats.leads}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>New Leads Generated</div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📞</span>
            <div className="growiq-pill" style={{ fontSize: 8 }}>
              <span className="growiq-pill-dot" />
              THIS WEEK
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#00b4d8', marginBottom: 4 }}>{stats.calls}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Calls Handled by AI</div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📅</span>
            <div className="growiq-pill" style={{ fontSize: 8 }}>
              <span className="growiq-pill-dot" />
              THIS WEEK
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b', marginBottom: 4 }}>{stats.appointments}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Appointments Booked</div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>💰</span>
            <div className="growiq-pill" style={{ fontSize: 8 }}>
              <span className="growiq-pill-dot" />
              PROJECTED
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#a855f7', marginBottom: 4 }}>$18.2K</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Revenue Influenced</div>
        </div>
      </div>

      {/* AI Agent Status Grid */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🤖</span> AI Agent Network
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {agentData.map((agent, i) => (
            <div 
              key={i} 
              className="dashboard-card"
              style={{
                transition: 'all .3s',
                borderColor: i === activeAgentIdx ? 'rgba(0,232,123,.3)' : 'rgba(0,232,123,.1)',
                boxShadow: i === activeAgentIdx ? '0 0 40px rgba(0,232,123,.1)' : '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)',
                transform: i === activeAgentIdx ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 32 }}>{agent.emoji}</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: i === activeAgentIdx ? '#00e87b' : '#fff' }}>
                    {agent.name}
                  </h3>
                  <p style={{ fontSize: 11, color: 'rgba(199,214,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {agent.role}
                  </p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: agent.status === 'active' ? '#00e87b' : 'rgba(199,214,255,.3)',
                    animation: agent.status === 'active' ? 'pulse 2s infinite' : 'none'
                  }} />
                </div>
              </div>
              
              <div style={{ 
                fontSize: 12, 
                color: 'rgba(199,214,255,.6)', 
                lineHeight: 1.5,
                opacity: i === activeAgentIdx ? 1 : 0.7 
              }}>
                {agent.activity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📊</span> Live Activity Feed
          </h2>
          
          <div className="dashboard-card" style={{ maxHeight: 400, overflow: 'hidden' }}>
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              {[
                { time: '2m ago', agent: 'IRIS', action: 'Answered call from 555-0123 - New patient inquiry qualified' },
                { time: '4m ago', agent: 'ATLAS', action: 'Sent personalized follow-up to lead #847 - Response rate 47%' },
                { time: '7m ago', agent: 'SYNC', action: 'Appointment confirmed: Dr. Smith consultation Thu 3:30 PM' },
                { time: '12m ago', agent: 'PRISM', action: 'Review request sent to completed patient - 5-star secured' },
                { time: '18m ago', agent: 'PULSE', action: 'No-show recovery campaign launched - 3 responses already' },
                { time: '23m ago', agent: 'AEGIS', action: 'Support ticket resolved: Insurance coverage question' },
                { time: '31m ago', agent: 'MUSE', action: 'Content posted to Instagram - 12 likes in first 5 minutes' },
                { time: '45m ago', agent: 'RADAR', action: 'Weekly performance report compiled - sent to leadership' },
              ].map((item, i) => (
                <div key={i} style={{ 
                  padding: '12px 0', 
                  borderBottom: i < 7 ? '1px solid rgba(255,255,255,.04)' : 'none' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ 
                      fontSize: 10, 
                      color: 'rgba(199,214,255,.4)', 
                      minWidth: 40,
                      marginTop: 2 
                    }}>
                      {item.time}
                    </div>
                    <div style={{ 
                      fontSize: 10, 
                      fontWeight: 700, 
                      color: '#00e87b', 
                      minWidth: 50,
                      marginTop: 2 
                    }}>
                      {item.agent}
                    </div>
                    <div style={{ 
                      fontSize: 12, 
                      color: 'rgba(199,214,255,.7)', 
                      lineHeight: 1.4 
                    }}>
                      {item.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>⚡</span> Quick Actions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/dashboard/agents" className="dashboard-card" style={{ 
              padding: 16, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              textDecoration: 'none',
              transition: 'all .2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.2)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.1)'
              e.currentTarget.style.boxShadow = '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)'
            }}>
              <span style={{ fontSize: 24 }}>🤖</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Manage AI Agents</div>
                <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Configure, train, and monitor your AI workforce</div>
              </div>
            </Link>

            <Link href="/dashboard/deploy" className="dashboard-card" style={{ 
              padding: 16, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              textDecoration: 'none',
              transition: 'all .2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.2)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.1)'
              e.currentTarget.style.boxShadow = '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)'
            }}>
              <span style={{ fontSize: 24 }}>🚀</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Deploy Updates</div>
                <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Push new configurations and system updates</div>
              </div>
            </Link>

            <Link href="/dashboard/billing" className="dashboard-card" style={{ 
              padding: 16, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              textDecoration: 'none',
              transition: 'all .2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.2)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.1)'
              e.currentTarget.style.boxShadow = '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)'
            }}>
              <span style={{ fontSize: 24 }}>📊</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>View Performance</div>
                <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Detailed analytics and ROI reports</div>
              </div>
            </Link>

            <Link href="/dashboard/settings" className="dashboard-card" style={{ 
              padding: 16, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              textDecoration: 'none',
              transition: 'all .2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.2)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,232,123,.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,232,123,.1)'
              e.currentTarget.style.boxShadow = '0 0 80px rgba(0,232,123,.04), 0 30px 80px rgba(0,0,0,.4)'
            }}>
              <span style={{ fontSize: 24 }}>⚙️</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>System Settings</div>
                <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Account preferences and integrations</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}