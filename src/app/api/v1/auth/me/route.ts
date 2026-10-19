import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection, getChargersCollection, getBookingsCollection } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne(
      { _id: new ObjectId(session.userId) },
      { projection: { passwordHash: 0, otpCode: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Pull host statistics or driver bookings count
    const chargers = await getChargersCollection();
    const hostedChargersCount = await chargers.countDocuments({ hostId: session.userId });

    const bookings = await getBookingsCollection();
    const activeBookingsCount = await bookings.countDocuments({
      driverId: session.userId,
      status: { $in: ['confirmed', 'charging'] },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        role: user.role,
        isVerified: user.isVerified,
        vehicles: user.vehicles || [],
        createdAt: user.createdAt,
      },
      stats: {
        hostedChargersCount,
        activeBookingsCount,
      },
    });
  } catch (err: any) {
    console.error('[API /auth/me error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
