import { NextRequest, NextResponse } from 'next/server';
import { getSessionsCollection, getBookingsCollection, getChargersCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ChargingSession } from '@/types';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { bookingId, startSoC } = body;

    if (!bookingId || !ObjectId.isValid(bookingId)) {
      return NextResponse.json(
        { success: false, error: 'Valid booking ID is required' },
        { status: 400 }
      );
    }

    const bookings = await getBookingsCollection();
    const booking = await bookings.findOne({ _id: new ObjectId(bookingId) });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking reservation not found' },
        { status: 404 }
      );
    }

    if (booking.driverId !== session.userId && booking.hostId !== session.userId && session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. You are not a party to this booking.' },
        { status: 403 }
      );
    }

    // Check if session already exists
    const sessions = await getSessionsCollection();
    const existingSession = await sessions.findOne({
      bookingId,
      status: 'in_progress',
    });

    if (existingSession) {
      return NextResponse.json({
        success: true,
        message: 'Resuming active session',
        session: {
          id: existingSession._id!.toString(),
          ...existingSession,
        },
      });
    }

    const chargers = await getChargersCollection();
    const charger = await chargers.findOne({ _id: new ObjectId(booking.chargerId) });
    const powerKw = charger?.powerKw || 7.4;

    const initialSoC = parseInt(startSoC, 10) || 28;

    const newSession: Omit<ChargingSession, '_id'> = {
      bookingId,
      chargerId: booking.chargerId,
      driverId: booking.driverId,
      driverName: booking.driverName,
      hostId: booking.hostId,
      startedAt: new Date(),
      startSoC: initialSoC,
      currentSoC: initialSoC,
      targetSoC: 90,
      currentPowerKw: powerKw,
      deliveredKwh: 0,
      totalCost: 0,
      status: 'in_progress',
      telemetryTicks: [
        {
          timestamp: new Date().toISOString(),
          powerKw,
          deliveredKwh: 0,
          soc: initialSoC,
          voltage: 238,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertResult = await sessions.insertOne(newSession as any);

    // Update booking status
    await bookings.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'charging', updatedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: 'Charging session initialized! Plug engaged.',
      session: {
        id: insertResult.insertedId.toString(),
        ...newSession,
      },
    });
  } catch (err: any) {
    console.error('[API POST /sessions error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
