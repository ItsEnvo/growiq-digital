'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  role: string;
  emoji?: string;
}

interface WorkspaceData {
  agents: Agent[];
  generatedAt: string;
}

interface DeployLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export default function DeployPage() {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Deploy form state
  const [deployType, setDeployType] = useState<'self' | 'managed'>('self');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLog, setDeployLog] = useState<DeployLog[]>([]);
  const [deploySuccess, setDeploySuccess] = useState(false);
  
  // Form fields
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('root');
  const [authType, setAuthType] = useState<'password' | 'key'>('password');
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [botTokens, setBotTokens] = useState<Record<string, string>>({});

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
        // Initialize bot tokens
        const tokens: Record<string, string> = {};
        data.workspace.agents.forEach((agent: Agent) => {
          tokens[agent.id] = '';
        });
        setBotTokens(tokens);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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

  const handleManagedDeploy = async () => {
    if (!workspace) return;

    // Validate form
    if (!host || !username || !anthropicKey) {
      setError('Please fill in all required fields');
      return;
    }

    if (authType === 'password' && !password) {
      setError('Password is required');
      return;
    }

    if (authType === 'key' && !privateKey) {
      setError('Private key is required');
      return;
    }

    // Check bot tokens
    const missingTokens = workspace.agents.filter(agent => !botTokens[agent.id]);
    if (missingTokens.length > 0) {
      setError(`Please provide bot tokens for: ${missingTokens.map(a => a.name).join(', ')}`);
      return;
    }

    setIsDeploying(true);
    setDeployLog([]);
    setError(null);

    try {
      const deployData = {
        host,
        username,
        anthropicKey,
        botTokens,
        ...(authType === 'password' ? { password } : { privateKey })
      };

      addLog('Starting deployment...', 'info');
      
      const response = await fetch('/api/deploy/remote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deployData),
      });

      const result = await response.json();

      if (result.success) {
        // Add all log entries
        result.log?.forEach((logEntry: string) => {
          addLog(logEntry, 'success');
        });
        setDeploySuccess(true);
      } else {
        result.log?.forEach((logEntry: string) => {
          addLog(logEntry, 'error');
        });
        setError(result.error || 'Deployment failed');
      }
    } catch (err) {
      addLog(`Deployment error: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
      setError(err instanceof Error ? err.message : 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  const addLog = (message: string, type: 'info' | 'success' | 'error') => {
    setDeployLog(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  const updateBotToken = (agentId: string, token: string) => {
    setBotTokens(prev => ({
      ...prev,
      [agentId]: token
    }));
  };

  if (loading) {
    return (
      <div className="hud-card p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error && !workspace) {
    return (
      <div className="hud-card p-8">
        <h1 className="text-2xl font-bold mb-4">Deploy Your AI Team</h1>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-300">{error}</p>
        </div>
        {error === 'No workspace generated yet' && (
          <Link
            href="/onboard"
            className="hud-btn hud-btn-primary"
          >
            Complete Onboarding First
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="hud-card p-6">
        <h1 className="text-2xl font-bold mb-2">Deploy Your AI Team</h1>
        <p className="text-gray-400 mb-6">
          Choose how you'd like to deploy your AI agents to your server.
        </p>

        {/* Deployment Options */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Self-Deploy Option */}
          <div 
            className={`hud-card p-6 cursor-pointer transition-colors ${
              deployType === 'self' ? 'ring-2 ring-mint' : ''
            }`}
            onClick={() => setDeployType('self')}
          >
            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="deployType"
                value="self"
                checked={deployType === 'self'}
                onChange={() => setDeployType('self')}
                className="mr-3"
              />
              <h3 className="text-lg font-semibold">Self-Deploy</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Download your AI team as a ZIP file and deploy it yourself using our automated script.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Full control over deployment</li>
              <li>✅ Works with any VPS provider</li>
              <li>✅ Includes automated setup script</li>
              <li>✅ Step-by-step guide included</li>
            </ul>
          </div>

          {/* Managed Deploy Option */}
          <div 
            className={`hud-card p-6 cursor-pointer transition-colors ${
              deployType === 'managed' ? 'ring-2 ring-mint' : ''
            }`}
            onClick={() => setDeployType('managed')}
          >
            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="deployType"
                value="managed"
                checked={deployType === 'managed'}
                onChange={() => setDeployType('managed')}
                className="mr-3"
              />
              <h3 className="text-lg font-semibold">Managed Deploy</h3>
            </div>
            <p className="text-gray-400 mb-4">
              We deploy your AI team directly to your server. Just provide your server details.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Hands-off deployment</li>
              <li>✅ Real-time deployment log</li>
              <li>✅ Automatic configuration</li>
              <li>🚧 Coming soon (build issues)</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Self-Deploy Section */}
        {deployType === 'self' && workspace && (
          <div className="hud-card p-6">
            <h3 className="text-lg font-semibold mb-4">Download Your AI Team</h3>
            <p className="text-gray-400 mb-6">
              Download the complete workspace including all agent configurations, setup scripts, and documentation.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {workspace.agents.map((agent) => (
                <div key={agent.id} className="hud-card p-4">
                  <div className="text-lg mb-1">
                    {agent.emoji || '🤖'} {agent.name}
                  </div>
                  <div className="text-sm text-gray-400">{agent.role}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleDownloadZip}
              className="hud-btn hud-btn-primary"
            >
              📦 Download AI Team ZIP
            </button>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold mb-2">After Download:</h4>
              <ol className="text-sm text-gray-300 space-y-1 ml-4">
                <li>1. Upload the ZIP to your VPS</li>
                <li>2. Extract: <code className="bg-black/30 px-1 rounded">unzip ai-team.zip</code></li>
                <li>3. Run: <code className="bg-black/30 px-1 rounded">chmod +x deploy.sh && ./deploy.sh</code></li>
                <li>4. Follow the prompts for API keys and bot tokens</li>
                <li>5. Your AI team will be live!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Managed Deploy Section */}
        {deployType === 'managed' && workspace && (
          <div className="hud-card p-6">
            <h3 className="text-lg font-semibold mb-4">Managed Deployment</h3>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-300 mb-2">🚧 Coming Soon</h4>
              <p className="text-yellow-200 text-sm">
                Managed deployment is temporarily unavailable due to build compatibility issues with the SSH package. 
                We're working on resolving this. Please use the self-deploy option for now.
              </p>
            </div>
            
            {deploySuccess ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-mint mb-2">Your AI Team is Live!</h3>
                <p className="text-gray-400 mb-6">
                  Your AI agents have been successfully deployed and are ready to work.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {workspace.agents.map((agent) => (
                    <div key={agent.id} className="hud-card p-4">
                      <div className="text-lg mb-1">
                        {agent.emoji || '🤖'} {agent.name}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">{agent.role}</div>
                      <div className="text-xs text-mint">✅ Active</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Server Configuration */}
                <div>
                  <h4 className="font-semibold mb-4">Server Configuration</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Server Host/IP *</label>
                      <input
                        type="text"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        placeholder="192.168.1.100 or myserver.com"
                        className="hud-input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">SSH Username *</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="root"
                        className="hud-input w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Authentication */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Authentication Method</label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="password"
                          checked={authType === 'password'}
                          onChange={(e) => setAuthType(e.target.value as 'password' | 'key')}
                          className="mr-2"
                        />
                        Password
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="key"
                          checked={authType === 'key'}
                          onChange={(e) => setAuthType(e.target.value as 'password' | 'key')}
                          className="mr-2"
                        />
                        Private Key
                      </label>
                    </div>

                    {authType === 'password' ? (
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="SSH password"
                        className="hud-input w-full"
                      />
                    ) : (
                      <textarea
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----"
                        rows={6}
                        className="hud-input w-full"
                      />
                    )}
                  </div>
                </div>

                {/* API Configuration */}
                <div>
                  <h4 className="font-semibold mb-4">API Configuration</h4>
                  <div>
                    <label className="block text-sm font-medium mb-2">Anthropic API Key *</label>
                    <input
                      type="password"
                      value={anthropicKey}
                      onChange={(e) => setAnthropicKey(e.target.value)}
                      placeholder="sk-ant-..."
                      className="hud-input w-full"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Get your API key from <a href="https://console.anthropic.com" target="_blank" className="text-mint hover:underline">console.anthropic.com</a>
                    </p>
                  </div>
                </div>

                {/* Bot Tokens */}
                <div>
                  <h4 className="font-semibold mb-4">Telegram Bot Tokens</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Create a bot for each agent with <a href="https://t.me/BotFather" target="_blank" className="text-mint hover:underline">@BotFather</a> on Telegram.
                  </p>
                  <div className="space-y-4">
                    {workspace.agents.map((agent) => (
                      <div key={agent.id}>
                        <label className="block text-sm font-medium mb-2">
                          {agent.emoji || '🤖'} {agent.name} Bot Token *
                        </label>
                        <input
                          type="password"
                          value={botTokens[agent.id] || ''}
                          onChange={(e) => updateBotToken(agent.id, e.target.value)}
                          placeholder="123456789:ABCdefGHIjklMNOpqrSTUVwxyz"
                          className="hud-input w-full"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deploy Button */}
                <div className="pt-4">
                  <button
                    onClick={handleManagedDeploy}
                    disabled={isDeploying}
                    className="hud-btn hud-btn-primary w-full"
                  >
                    {isDeploying ? '🚀 Deploying...' : '🚀 Deploy Now'}
                  </button>
                </div>

                {/* Deployment Log */}
                {deployLog.length > 0 && (
                  <div className="hud-card p-4">
                    <h4 className="font-semibold mb-2">Deployment Log</h4>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-sm max-h-64 overflow-y-auto">
                      {deployLog.map((entry, index) => (
                        <div 
                          key={index}
                          className={`${
                            entry.type === 'error' ? 'text-red-400' :
                            entry.type === 'success' ? 'text-green-400' :
                            'text-gray-300'
                          }`}
                        >
                          [{entry.timestamp}] {entry.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}