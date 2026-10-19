import { NextRequest, NextResponse } from 'next/server';
import { getChargersCollection, getBookingsCollection, getUsersCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid charger ID format' },
        { status: 400 }
      );
    }

    const chargers = await getChargersCollection();
    const charger = await chargers.findOne({ _id: new ObjectId(id) });

    if (!charger) {
      return NextResponse.json(
        { success: false, error: 'Charger listing not found' },
        { status: 404 }
      );
    }

    // Fetch host profile & contact
    const users = await getUsersCollection();
    const host = await users.findOne(
      { _id: new ObjectId(charger.hostId) },
      { projection: { name: 1, phone: 1, email: 1 } }
    );

    // Fetch active bookings for this charger to show reserved slots
    const bookings = await getBookingsCollection();
    const upcomingBookings = await bookings
      .find({
        chargerId: id,
        status: { $in: ['confirmed', 'charging'] },
        endTime: { $gte: new Date().toISOString() },
      })
      .project({ startTime: 1, endTime: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      charger: {
        id: charger._id!.toString(),
        hostId: charger.hostId,
        hostName: host?.name || charger.hostName,
        hostPhone: host?.phone || '',
        title: charger.title,
        description: charger.description,
        address: charger.address,
        city: charger.city,
        pincode: charger.pincode,
        coordinates: {
          lat: charger.location?.coordinates?.[1] || 23.2599,
          lng: charger.location?.coordinates?.[0] || 77.4126,
        },
        powerKw: charger.powerKw,
        connectorType: charger.connectorType,
        pricingPerKwh: charger.pricingPerKwh,
        parkingType: charger.parkingType,
        accessNotes: charger.accessNotes,
        isAvailable: charger.isAvailable,
        schedule: charger.schedule,
        photos: charger.photos || [],
        rating: charger.rating || 5.0,
        reviewCount: charger.reviewCount || 0,
        createdAt: charger.createdAt,
      },
      reservedSlots: upcomingBookings.map((b) => ({
        startTime: b.startTime,
        endTime: b.endTime,
      })),
    });
  } catch (err: any) {
    console.error('[API GET /chargers/[id] error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid charger ID format' },
        { status: 400 }
      );
    }

    const chargers = await getChargersCollection();
    const existing = await chargers.findOne({ _id: new ObjectId(id) });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Charger listing not found' },
        { status: 404 }
      );
    }

    if (existing.hostId !== session.userId && session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. You do not own this listing.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.title) updateData.title = body.title.trim();
    if (body.description) updateData.description = body.description.trim();
    if (body.address) updateData.address = body.address.trim();
    if (body.powerKw) updateData.powerKw = parseFloat(body.powerKw);
    if (body.pricingPerKwh) updateData.pricingPerKwh = parseFloat(body.pricingPerKwh);
    if (body.connectorType) updateData.connectorType = body.connectorType;
    if (body.parkingType) updateData.parkingType = body.parkingType;
    if (body.accessNotes) updateData.accessNotes = body.accessNotes.trim();
    if (typeof body.isAvailable === 'boolean') updateData.isAvailable = body.isAvailable;
    if (body.schedule) updateData.schedule = body.schedule;

    await chargers.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({
      success: true,
      message: 'Charger updated successfully',
    });
  } catch (err: any) {
    console.error('[API PUT /chargers/[id] error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid charger ID format' },
        { status: 400 }
      );
    }

    const chargers = await getChargersCollection();
    const existing = await chargers.findOne({ _id: new ObjectId(id) });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Charger not found' },
        { status: 404 }
      );
    }

    if (existing.hostId !== session.userId && session.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    await chargers.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: 'Charger deleted successfully',
    });
  } catch (err: any) {
    console.error('[API DELETE /chargers/[id] error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
