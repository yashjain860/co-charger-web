import { NextRequest, NextResponse } from 'next/server';
import { getSessionsCollection, getBookingsCollection, getPayoutsCollection, getUsersCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid session ID' }, { status: 400 });
    }

    const sessions = await getSessionsCollection();
    const activeSession = await sessions.findOne({ _id: new ObjectId(id) });

    if (!activeSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    const bookings = await getBookingsCollection();
    const booking = await bookings.findOne({ _id: new ObjectId(activeSession.bookingId) });

    const finalDeliveredKwh = Math.max(activeSession.deliveredKwh, 1.5);
    const ratePerKwh = booking?.ratePerKwh || 16;
    const grossAmount = Math.round(finalDeliveredKwh * ratePerKwh);
    const platformFee = Math.round(grossAmount * 0.10); // 10% platform fee
    const netPayout = grossAmount - platformFee;

    // Mark session completed
    await sessions.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'completed',
          stoppedAt: new Date(),
          deliveredKwh: finalDeliveredKwh,
          totalCost: grossAmount,
          updatedAt: new Date(),
        },
      }
    );

    // Mark booking completed
    await bookings.updateOne(
      { _id: new ObjectId(activeSession.bookingId) },
      {
        $set: {
          status: 'completed',
          totalAmount: grossAmount,
          updatedAt: new Date(),
        },
      }
    );

    // Create host payout entry
    const users = await getUsersCollection();
    const host = await users.findOne({ _id: new ObjectId(activeSession.hostId) });

    const payouts = await getPayoutsCollection();
    await payouts.insertOne({
      hostId: activeSession.hostId,
      hostName: host?.name || 'Host',
      bookingId: activeSession.bookingId,
      grossAmount,
      platformFee,
      netPayout,
      payoutMethod: 'upi',
      status: 'pending',
      createdAt: new Date(),
    } as any);

    return NextResponse.json({
      success: true,
      message: 'Charging session terminated. Digital invoice generated.',
      summary: {
        deliveredKwh: finalDeliveredKwh,
        totalCost: grossAmount,
        netPayout,
        startSoC: activeSession.startSoC,
        finalSoC: activeSession.currentSoC,
        durationMinutes: Math.round((Date.now() - new Date(activeSession.startedAt).getTime()) / 60000),
      },
    });
  } catch (err: any) {
    console.error('[API POST /sessions/[id]/stop error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
