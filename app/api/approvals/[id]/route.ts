import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateApproval, getClientApprovals, createActivity } from '@/lib/db';

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
    const approvalId = parseInt(resolvedParams.id);
    if (isNaN(approvalId)) {
      return new NextResponse('Invalid approval ID', { status: 400 });
    }

    // Verify approval belongs to current user
    const userApprovals = getClientApprovals(currentUser.id);
    const approval = userApprovals.find(a => a.id === approvalId);
    
    if (!approval) {
      return new NextResponse('Approval not found', { status: 404 });
    }

    const { status } = await request.json();
    
    if (!['approved', 'rejected'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 });
    }

    // Update approval
    updateApproval(approvalId, status);

    // Log activity
    const action = status === 'approved' ? 'approved' : 'rejected';
    createActivity(
      currentUser.id,
      approval.agent_type,
      `Content ${action} - ${approval.content.substring(0, 50)}${approval.content.length > 50 ? '...' : ''}`
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update approval error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}