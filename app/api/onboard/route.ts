import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { saveOnboardingStep } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { step, data } = await request.json();

    if (!step || !data) {
      return new NextResponse('Step and data are required', { status: 400 });
    }

    await saveOnboardingStep(currentUser.id, step, data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Onboarding save error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}