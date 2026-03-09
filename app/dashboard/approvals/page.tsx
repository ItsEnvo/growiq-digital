'use client';

import { useState, useEffect } from 'react';

interface Approval {
  id: number;
  agent_type: string;
  content: string;
  status: string;
  created_at: string;
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const response = await fetch('/api/approvals');
      if (response.ok) {
        const data = await response.json();
        setApprovals(data);
      } else {
        setError('Failed to fetch approvals');
      }
    } catch (err) {
      setError('Failed to fetch approvals');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (approvalId: number, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/approvals/${approvalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: action === 'approve' ? 'approved' : 'rejected' 
        }),
      });

      if (response.ok) {
        setApprovals(prev =>
          prev.map(approval =>
            approval.id === approvalId 
              ? { ...approval, status: action === 'approve' ? 'approved' : 'rejected' }
              : approval
          )
        );
      } else {
        setError(`Failed to ${action} item`);
      }
    } catch (err) {
      setError(`Failed to ${action} item`);
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

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const processedApprovals = approvals.filter(a => a.status !== 'pending');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="hud-card p-6">
                <div className="h-6 bg-gray-700 rounded w-40 mb-2"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
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
        <div className="hud-kicker mb-4">Approval Queue</div>
        <h1 className="hud-title mb-4">Review Agent Actions</h1>
        <p className="text-gray-400">
          Review and approve content before your AI agents send emails, post on social media, or make public communications.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
          <div className="text-red-400 text-sm">{error}</div>
        </div>
      )}

      {/* Pending Approvals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="hud-section-title">Pending Approval</h2>
          {pendingApprovals.length > 0 && (
            <div className="hud-chip">
              <div className="hud-dot bg-yellow-500" />
              {pendingApprovals.length} pending
            </div>
          )}
        </div>

        {pendingApprovals.length > 0 ? (
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="hud-card p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getAgentIcon(approval.agent_type)}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="hud-chip">
                        {getAgentDisplayName(approval.agent_type)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(approval.created_at)}
                      </span>
                    </div>
                    
                    <div className="hud-card bg-black/20 p-4 mb-4">
                      <div className="hud-kicker mb-2">Content to Review</div>
                      <div className="text-sm whitespace-pre-wrap">
                        {approval.content}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApproval(approval.id, 'approve')}
                        className="hud-btn hud-btn--primary"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleApproval(approval.id, 'reject')}
                        className="hud-btn text-red-400 hover:text-red-300"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hud-card p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="hud-section-title mb-4">All Caught Up!</h3>
            <p className="text-gray-400">
              No pending approvals right now. Your AI agents will submit content here for review before sending.
            </p>
          </div>
        )}
      </div>

      {/* Processed Approvals */}
      {processedApprovals.length > 0 && (
        <div>
          <h2 className="hud-section-title mb-6">Recent Decisions</h2>
          <div className="hud-card">
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-800">
                {processedApprovals.map((approval) => (
                  <div key={approval.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-lg">{getAgentIcon(approval.agent_type)}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="hud-chip text-xs">
                            {getAgentDisplayName(approval.agent_type)}
                          </span>
                          <div className={`hud-chip text-xs ${
                            approval.status === 'approved' 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            <div className={`hud-dot ${
                              approval.status === 'approved' 
                                ? 'bg-green-400' 
                                : 'bg-red-400'
                            }`} />
                            {approval.status}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(approval.created_at)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-300 line-clamp-2">
                          {approval.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}