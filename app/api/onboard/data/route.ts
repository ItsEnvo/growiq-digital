import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getOnboardingData } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const onboardingData = getOnboardingData(currentUser.id);
    return NextResponse.json(onboardingData);
  } catch (error: any) {
    console.error('Get onboarding data error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}