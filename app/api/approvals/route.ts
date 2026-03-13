import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getClientApprovals, createApproval } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const approvals = await getClientApprovals(currentUser.id, status);
    return NextResponse.json(approvals);
  } catch (error: any) {
    console.error('Get approvals error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { agentType, content } = await request.json();

    if (!agentType || !content) {
      return new NextResponse('Agent type and content are required', { status: 400 });
    }

    const approval = await createApproval(currentUser.id, agentType, content);
    return NextResponse.json(approval);
  } catch (error: any) {
    console.error('Create approval error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}