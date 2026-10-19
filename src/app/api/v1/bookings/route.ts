import { NextRequest, NextResponse } from 'next/server';
import { getBookingsCollection, getChargersCollection, getUsersCollection, ensureIndexes } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { sendBookingConfirmationEmail } from '@/lib/mailer';
import { Booking } from '@/types';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    await ensureIndexes();
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const roleMode = searchParams.get('mode') || 'driver'; // 'driver' or 'host'

    const bookings = await getBookingsCollection();
    const query = roleMode === 'host' ? { hostId: session.userId } : { driverId: session.userId };

    const docs = await bookings.find(query).sort({ createdAt: -1 }).toArray();

    const mapped = docs.map((doc) => ({
      id: doc._id!.toString(),
      bookingRef: doc.bookingRef,
      driverId: doc.driverId,
      driverName: doc.driverName,
      driverEmail: doc.driverEmail,
      chargerId: doc.chargerId,
      chargerTitle: doc.chargerTitle,
      chargerAddress: doc.chargerAddress,
      hostId: doc.hostId,
      hostName: doc.hostName,
      startTime: doc.startTime,
      endTime: doc.endTime,
      durationHours: doc.durationHours,
      estimatedKwh: doc.estimatedKwh,
      ratePerKwh: doc.ratePerKwh,
      totalAmount: doc.totalAmount,
      status: doc.status,
      entryOtp: doc.entryOtp,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json({
      success: true,
      count: mapped.length,
      bookings: mapped,
    });
  } catch (err: any) {
    console.error('[API GET /bookings error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to reserve a charging slot.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { chargerId, startTime, durationHours } = body;

    if (!chargerId || !startTime || !durationHours) {
      return NextResponse.json(
        { success: false, error: 'Charger ID, start time, and duration are required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(chargerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid charger ID format' },
        { status: 400 }
      );
    }

    const chargers = await getChargersCollection();
    const charger = await chargers.findOne({ _id: new ObjectId(chargerId) });

    if (!charger) {
      return NextResponse.json(
        { success: false, error: 'Selected charger listing does not exist' },
        { status: 404 }
      );
    }

    if (!charger.isAvailable) {
      return NextResponse.json(
        { success: false, error: 'This charger is currently offline or unavailable' },
        { status: 400 }
      );
    }

    const hours = parseFloat(durationHours) || 2;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

    // Calculate energy and cost
    const estimatedKwh = Math.round(charger.powerKw * hours * 0.88 * 10) / 10;
    const totalAmount = Math.round(estimatedKwh * charger.pricingPerKwh);

    const bookingRef = `VS-${Math.floor(100000 + Math.random() * 900000)}`;
    const entryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Omit<Booking, '_id'> = {
      bookingRef,
      driverId: session.userId,
      driverName: session.name,
      driverEmail: session.email,
      chargerId,
      chargerTitle: charger.title,
      chargerAddress: charger.address,
      hostId: charger.hostId,
      hostName: charger.hostName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      durationHours: hours,
      estimatedKwh,
      ratePerKwh: charger.pricingPerKwh,
      totalAmount,
      status: 'confirmed',
      entryOtp,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const bookings = await getBookingsCollection();
    const result = await bookings.insertOne(newBooking as any);

    // Dispatch real email via SMTP
    sendBookingConfirmationEmail(session.email, {
      ...newBooking,
      _id: result.insertedId.toString(),
    } as any).catch((err) => console.error('[SMTP Booking Email Error]:', err));

    return NextResponse.json({
      success: true,
      message: 'Charging slot reserved successfully!',
      booking: {
        id: result.insertedId.toString(),
        ...newBooking,
      },
    });
  } catch (err: any) {
    console.error('[API POST /bookings error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
