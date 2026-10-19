import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/db';
import { getUserFromRequest, signToken, setAuthCookie } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    const body = await req.json();
    const { email, otp } = body;

    const targetEmail = (email || session?.email)?.toLowerCase().trim();
    if (!targetEmail || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and OTP code are required' },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: targetEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Account not found' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json({
        success: true,
        message: 'Account is already verified.',
        isVerified: true,
      });
    }

    if (user.otpCode !== otp.trim()) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code. Please check your email.' },
        { status: 400 }
      );
    }

    if (user.otpExpiresAt && new Date() > new Date(user.otpExpiresAt)) {
      return NextResponse.json(
        { success: false, error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Mark as verified and clear OTP
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          isVerified: true,
          updatedAt: new Date(),
        },
        $unset: {
          otpCode: '',
          otpExpiresAt: '',
        },
      }
    );

    const token = signToken({
      userId: user._id!.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: true,
    });

    const res = NextResponse.json({
      success: true,
      message: 'Account verified successfully. Welcome to VoltShare!',
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: true,
      },
    });

    setAuthCookie(res, token);
    return res;
  } catch (err: any) {
    console.error('[API /auth/verify-otp error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
