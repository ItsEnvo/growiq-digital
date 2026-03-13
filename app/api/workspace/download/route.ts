import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getLatestWorkspace } from '@/lib/db';
import { requireSubscription } from '@/lib/subscription-guard';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check subscription status
    const subscriptionCheck = await requireSubscription(user.id);
    if (!subscriptionCheck.allowed) {
      return NextResponse.json(
        { error: 'Active subscription required to download workspace' },
        { status: 403 }
      );
    }

    // Get the client's latest workspace
    const workspace = await getLatestWorkspace(user.id);
    
    if (!workspace) {
      return NextResponse.json({ error: 'No workspace found' }, { status: 404 });
    }

    // Parse the stored data
    const workspaceData = JSON.parse(workspace.workspace_json);
    const openclawConfig = JSON.parse(workspace.openclaw_config);

    return NextResponse.json({
      success: true,
      workspace: {
        ...workspaceData,
        openclawConfig
      },
      setupGuide: workspace.setup_guide,
      generatedAt: workspace.created_at,
      version: workspace.version
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve workspace' }, 
      { status: 500 }
    );
  }
}