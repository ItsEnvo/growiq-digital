import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateClientAgent, getClientAgents, createActivity } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const resolvedParams = await params;
    const agentId = parseInt(resolvedParams.id);
    if (isNaN(agentId)) {
      return new NextResponse('Invalid agent ID', { status: 400 });
    }

    // Verify agent belongs to current user
    const userAgents = getClientAgents(currentUser.id);
    const agent = userAgents.find(a => a.id === agentId);
    
    if (!agent) {
      return new NextResponse('Agent not found', { status: 404 });
    }

    const updates = await request.json();
    
    // Update agent
    updateClientAgent(agentId, updates);

    // Log activity
    if (updates.status) {
      const statusMessage = updates.status === 'active' 
        ? 'has been activated and is ready to work'
        : 'has been paused';
        
      createActivity(
        currentUser.id,
        agent.agent_type,
        `${agent.agent_type.charAt(0).toUpperCase() + agent.agent_type.slice(1)} ${statusMessage}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update agent error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}