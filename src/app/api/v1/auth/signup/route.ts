import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection, ensureIndexes } from '@/lib/db';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';
import { sendOtpEmail } from '@/lib/mailer';
import { UserRole } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await ensureIndexes();
    const body = await req.json();
    const { email, password, name, phone, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const users = await getUsersCollection();
    const existing = await users.findOne({ email: cleanEmail });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    const newUser = {
      email: cleanEmail,
      passwordHash,
      name: name.trim(),
      phone: phone?.trim() || '',
      role: (role as UserRole) || 'driver',
      isVerified: false,
      otpCode,
      otpExpiresAt,
      vehicles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertResult = await users.insertOne(newUser as any);
    const userId = insertResult.insertedId.toString();

    // Fire off transactional email via SMTP (non-blocking)
    sendOtpEmail(cleanEmail, name, otpCode).catch((err) =>
      console.error('[SMTP Background Error]:', err)
    );

    const token = signToken({
      userId,
      email: cleanEmail,
      name: newUser.name,
      role: newUser.role,
      isVerified: false,
    });

    const res = NextResponse.json({
      success: true,
      message: 'Account created successfully. A verification code has been dispatched to your email.',
      user: {
        id: userId,
        email: cleanEmail,
        name: newUser.name,
        role: newUser.role,
        isVerified: false,
      },
    });

    setAuthCookie(res, token);
    return res;
  } catch (err: any) {
    console.error('[API /auth/signup error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
