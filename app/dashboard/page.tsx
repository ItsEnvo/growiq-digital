'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats] = useState({ leads: 47, calls: 124, appointments: 23, revenue: 18200 });
  const [activeAgentIdx, setActiveAgentIdx] = useState(0);

  const agentData = [
    { emoji: '📞', name: 'IRIS', role: 'Reception & Lead Qualification', activity: 'Answered call #47 - New patient inquiry', color: '#00e87b', metrics: { total: 89, qualified: 64 } },
    { emoji: '💼', name: 'ATLAS', role: 'Sales Pipeline Automation', activity: 'Follow-up sequence sent to lead #312', color: '#00b4d8', metrics: { total: 312, contacted: 156 } },
    { emoji: '🔄', name: 'PULSE', role: 'Customer Retention', activity: 'Re-engagement campaign launched', color: '#f59e0b', metrics: { total: 58, recovered: 12 } },
    { emoji: '📅', name: 'SYNC', role: 'Scheduling Coordination', activity: 'Appointment confirmed: Sarah M. - Thu 2PM', color: '#a855f7', metrics: { total: 89, confirmed: 74 } },
    { emoji: '🛡️', name: 'AEGIS', role: 'Customer Experience', activity: 'Support ticket resolved - insurance query', color: '#06b6d4', metrics: { total: 23, resolved: 23 } },
    { emoji: '⭐', name: 'PRISM', role: 'Review Management', activity: 'Review secured: 5-star from Mike R.', color: '#ef4444', metrics: { total: 34, collected: 34 } },
  ];

  const activityFeed = [
    { agent: 'IRIS', text: 'Answered call - new patient inquiry qualified', time: '2m ago' },
    { agent: 'ATLAS', text: 'Follow-up sequence sent to lead #312', time: '5m ago' },
    { agent: 'SYNC', text: 'Appointment confirmed: Sarah M. - Thu 2PM', time: '7m ago' },
    { agent: 'PRISM', text: 'Review secured: 5-star on Google from Mike R.', time: '12m ago' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgentIdx(prev => (prev + 1) % agentData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <p style={{ fontSize: 14, color: 'rgba(199,214,255,.4)' }}>
          AI Workforce Status • Real-time Performance • Full System Visibility
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📈</span>
            <div className="growiq-pill" style={{ fontSize: 9 }}><span className="growiq-pill-dot" />THIS WEEK</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#00e87b' }}>{stats.leads}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>New Leads Generated</div>
        </div>
        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📞</span>
            <div className="growiq-pill" style={{ fontSize: 9 }}><span className="growiq-pill-dot" />THIS WEEK</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#00b4d8' }}>{stats.calls}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Calls Handled by AI</div>
        </div>
        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>📅</span>
            <div className="growiq-pill" style={{ fontSize: 9 }}><span className="growiq-pill-dot" />THIS WEEK</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#f59e0b' }}>{stats.appointments}</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Appointments Booked</div>
        </div>
        <div className="dashboard-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>💰</span>
            <div className="growiq-pill" style={{ fontSize: 9 }}><span className="growiq-pill-dot" />PROJECTED</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#a855f7' }}>${(stats.revenue / 1000).toFixed(1)}K</div>
          <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>Revenue Influenced</div>
        </div>
      </div>

      {/* AI Agent Status Grid */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>🤖</span> AI Agent Network
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {agentData.map((agent, i) => (
            <div 
              key={i} 
              className="dashboard-card"
              style={{
                transition: 'all .3s',
                borderColor: i === activeAgentIdx ? 'rgba(0,232,123,.3)' : 'rgba(0,232,123,.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 32, color: agent.color }}>{agent.emoji}</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 2, color: agent.color }}>
                    {agent.name}
                  </h3>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: 'rgba(199,214,255,.4)', textTransform: 'uppercase' }}>
                    {agent.role}
                  </p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00e87b',
                    animation: 'pulse 2s infinite'
                  }} />
                </div>
              </div>

              <p style={{
                fontSize: 12,
                color: 'rgba(199,214,255,.6)',
                lineHeight: 1.5,
                opacity: i === activeAgentIdx ? 1 : 0.7
              }}>
                {agent.activity}
              </p>

              <div style={{
                fontSize: 11,
                color: 'rgba(199,214,255,.3)',
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,.06)'
              }}>
                {Object.entries(agent.metrics).map(([key, value]) => (
                  <span key={key} style={{ marginRight: 8 }}>
                    {key}: <span style={{ color: agent.color }}>{value}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Live Activity Feed */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>📊</span> Live Activity Feed
          </h2>
          
          <div className="dashboard-card" style={{ maxHeight: 400, overflow: 'hidden' }}>
            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              {activityFeed.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  padding: '16px 0',
                  borderBottom: i < activityFeed.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                  fontSize: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      background: 'rgba(0,232,123,.1)',
                      color: '#00e87b',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      {item.agent}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(199,214,255,.7)', lineHeight: 1.5 }}>
                    {item.text}
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(199,214,255,.4)', flexShrink: 0 }}>
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>⚡</span> Quick Actions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/dashboard/agents" style={{ textDecoration: 'none' }}>
              <div className="dashboard-card" style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all .2s'
              }}>
                <span style={{ fontSize: 24 }}>🤖</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>Configure AI Agents</div>
                  <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>
                    Adjust training, behaviors, and configurations
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/deploy" style={{ textDecoration: 'none' }}>
              <div className="dashboard-card" style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all .2s'
              }}>
                <span style={{ fontSize: 24 }}>🚀</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>Deploy Updates</div>
                  <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>
                    Push new configurations and system updates
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/settings" style={{ textDecoration: 'none' }}>
              <div className="dashboard-card" style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all .2s'
              }}>
                <span style={{ fontSize: 24 }}>⚙️</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>System Settings</div>
                  <div style={{ fontSize: 12, color: 'rgba(199,214,255,.4)' }}>
                    Account preferences and integrations
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}