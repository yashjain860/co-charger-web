import { NextRequest, NextResponse } from 'next/server';
import { getSessionsCollection, getBookingsCollection, getChargersCollection } from '@/lib/db';
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
      return NextResponse.json({ success: false, error: 'Charging session not found' }, { status: 404 });
    }

    if (activeSession.status !== 'in_progress') {
      return NextResponse.json({
        success: false,
        error: 'Charging session is already completed',
        session: activeSession,
      });
    }

    const bookings = await getBookingsCollection();
    const booking = await bookings.findOne({ _id: new ObjectId(activeSession.bookingId) });
    const ratePerKwh = booking?.ratePerKwh || 16;

    // Simulate 1 telemetry tick increment (approx 0.4 kWh delivered per tick)
    const powerKw = activeSession.currentPowerKw || 7.4;
    const incrementKwh = Math.round((powerKw * (1 / 60)) * 100) / 100; // ~1 minute equivalent
    const newDeliveredKwh = Math.round((activeSession.deliveredKwh + incrementKwh) * 100) / 100;
    
    // Battery capacity standard 40kWh (Tata Nexon / MG ZS benchmark)
    const newSoC = Math.min(100, Math.round(activeSession.currentSoC + (incrementKwh / 40) * 100));
    const newCost = Math.round(newDeliveredKwh * ratePerKwh);

    const newTick = {
      timestamp: new Date().toISOString(),
      powerKw: Math.round((powerKw + (Math.random() * 0.4 - 0.2)) * 10) / 10,
      deliveredKwh: newDeliveredKwh,
      soc: newSoC,
      voltage: Math.round(238 + Math.random() * 4 - 2),
    };

    const updateFields: any = {
      deliveredKwh: newDeliveredKwh,
      currentSoC: newSoC,
      totalCost: newCost,
      currentPowerKw: newTick.powerKw,
      updatedAt: new Date(),
    };

    // Auto-cutoff if target reached
    if (newSoC >= activeSession.targetSoC) {
      updateFields.status = 'completed';
      updateFields.stoppedAt = new Date();
      await bookings.updateOne(
        { _id: new ObjectId(activeSession.bookingId) },
        { $set: { status: 'completed', updatedAt: new Date() } }
      );
    }

    await sessions.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateFields,
        $push: { telemetryTicks: { $each: [newTick], $slice: -30 } } as any, // keep last 30 ticks
      }
    );

    return NextResponse.json({
      success: true,
      telemetry: {
        currentSoC: newSoC,
        targetSoC: activeSession.targetSoC,
        deliveredKwh: newDeliveredKwh,
        totalCost: newCost,
        powerKw: newTick.powerKw,
        voltage: newTick.voltage,
        isCompleted: newSoC >= activeSession.targetSoC,
      },
    });
  } catch (err: any) {
    console.error('[API POST /sessions/[id]/tick error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
