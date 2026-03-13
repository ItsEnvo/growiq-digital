import { NextRequest, NextResponse } from 'next/server';
import { loginClient, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse('Email and password are required', { status: 400 });
    }

    const authClient = await loginClient(email, password);
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
    console.error('Login error:', error);
    return new NextResponse(error.message || 'Internal server error', { 
      status: error.message === 'Invalid email or password' ? 401 : 500 
    });
  }
}