import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getClientActivity } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const activities = await getClientActivity(currentUser.id, limit);
    return NextResponse.json(activities);
  } catch (error: any) {
    console.error('Get activity error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}