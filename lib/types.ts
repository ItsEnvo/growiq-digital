export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji?: string;
  type: string;
  description?: string;
  soul?: string;
  knowledge?: string;
  identity?: string;
  userConfig?: string;
  memory?: string;
}

export interface WorkspaceData {
  agents: Agent[];
  openclawConfig: object;
  setupGuide: string;
  generatedAt: string;
  version: number;
  workspaceSoul?: string;
  agentsTemplate?: string;
}

export interface ClientConfig {
  businessName: string;
  businessSlug: string;
  selectedAgents: Agent[];
  anthropicKey?: string;
  botTokens?: Record<string, string>;
}