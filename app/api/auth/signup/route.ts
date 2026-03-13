import { NextRequest, NextResponse } from 'next/server';
import { registerClient, generateToken, toAuthClient } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, businessName, industry } = await request.json();

    if (!email || !password || !businessName || !industry) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const client = await registerClient(email, password, businessName, industry);
    const authClient = toAuthClient(client);
    const token = generateToken(authClient);

    const response = NextResponse.json({ success: true });
    
    // Set JWT cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return new NextResponse(error.message || 'Internal server error', { 
      status: error.message === 'Client already exists' ? 409 : 500 
    });
  }
}