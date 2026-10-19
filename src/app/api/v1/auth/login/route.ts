import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const users = await getUsersCollection();
    const user = await users.findOne({ email: cleanEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userId = user._id!.toString();
    const token = signToken({
      userId,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
    });

    const res = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: userId,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
        vehicles: user.vehicles || [],
      },
    });

    setAuthCookie(res, token);
    return res;
  } catch (err: any) {
    console.error('[API /auth/login error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
