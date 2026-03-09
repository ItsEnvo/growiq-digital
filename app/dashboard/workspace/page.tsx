'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Agent {
  id: string;
  name: string;
  role: string;
}

interface WorkspaceData {
  agents: Agent[];
  openclawConfig: object;
  setupGuide: string;
  generatedAt: string;
  version: number;
}

export default function WorkspacePage() {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchWorkspace();
  }, []);

  const fetchWorkspace = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/workspace/download');
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setWorkspace(null);
          setError('No workspace generated yet');
        } else {
          throw new Error(data.error || 'Failed to fetch workspace');
        }
      } else {
        setWorkspace(data.workspace);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      const response = await fetch('/api/agents/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to regenerate workspace');
      }

      // Refresh the workspace data
      await fetchWorkspace();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate workspace');
    } finally {
      setRegenerating(false);
    }
  };

  const handleDownloadWorkspace = async () => {
    try {
      const response = await fetch('/api/workspace/download');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download workspace');
      }

      // Create and trigger download
      const blob = new Blob([JSON.stringify(data.workspace, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'growiq-workspace.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download workspace');
    }
  };

  const handleDownloadSetupGuide = () => {
    if (!workspace) return;

    const blob = new Blob([workspace.setupGuide], {
      type: 'text/markdown',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'setup-guide.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    try {
      const response = await fetch('/api/workspace/zip');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download ZIP');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-team.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download ZIP');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !workspace) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Agent Workspace</h1>
            <p className="text-gray-600 mb-6">
              {error === 'No workspace generated yet' 
                ? 'Your AI agent workspace hasn\'t been generated yet.'
                : error
              }
            </p>
            {error === 'No workspace generated yet' && (
              <button
                onClick={() => router.push('/onboard')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Complete Onboarding First
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your AI Agent Workspace</h1>
          <p className="text-gray-600">
            Your custom AI agents are ready to deploy. Download the workspace files and follow the setup guide.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {workspace && (
          <div className="space-y-6">
            {/* Agent List */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your AI Agents</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {workspace.agents.map((agent) => (
                  <div key={agent.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{agent.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup Guide Preview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Setup Guide</h2>
              <div className="bg-gray-50 rounded-md p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {workspace.setupGuide.split('\n').slice(0, 30).join('\n')}
                  {workspace.setupGuide.split('\n').length > 30 && '\n\n... (Download full guide)'}
                </pre>
              </div>
            </div>

            {/* Workspace Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Workspace Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600">Generated</p>
                  <p className="font-medium">{new Date(workspace.generatedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Version</p>
                  <p className="font-medium">v{workspace.version}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Agents</p>
                  <p className="font-medium">{workspace.agents.length} configured</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium text-green-600">Ready to deploy</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleDownloadZip}
                className="hud-btn hud-btn-primary"
              >
                📦 Download ZIP
              </button>
              <button
                onClick={() => router.push('/dashboard/deploy')}
                className="hud-btn bg-mint text-black hover:bg-mint/90"
              >
                🚀 View Deploy Options
              </button>
              <button
                onClick={handleDownloadWorkspace}
                className="hud-btn"
              >
                Download Workspace JSON
              </button>
              <button
                onClick={handleDownloadSetupGuide}
                className="hud-btn"
              >
                Download Setup Guide
              </button>
              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className="hud-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {regenerating ? 'Regenerating...' : 'Regenerate Workspace'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}