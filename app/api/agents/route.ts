import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getClientAgents } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const agents = getClientAgents(currentUser.id);
    return NextResponse.json(agents);
  } catch (error: any) {
    console.error('Get agents error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}