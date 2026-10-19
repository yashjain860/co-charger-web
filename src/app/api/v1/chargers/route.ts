import { NextRequest, NextResponse } from 'next/server';
import { getChargersCollection, getUsersCollection, ensureIndexes } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { calculateDistance, DEFAULT_COORDINATES } from '@/lib/geo';
import { Charger } from '@/types';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    await ensureIndexes();
    const { searchParams } = new URL(req.url);

    const lat = parseFloat(searchParams.get('lat') || '') || DEFAULT_COORDINATES.lat;
    const lng = parseFloat(searchParams.get('lng') || '') || DEFAULT_COORDINATES.lng;
    const connector = searchParams.get('connector');
    const search = searchParams.get('search')?.toLowerCase().trim();
    const hostId = searchParams.get('hostId');
    const minPower = parseFloat(searchParams.get('minPower') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');

    const filter: any = {};

    if (hostId) {
      filter.hostId = hostId;
    } else {
      filter.isAvailable = true;
    }

    if (connector && connector !== 'all') {
      filter.connectorType = connector;
    }

    if (minPower > 0) {
      filter.powerKw = { $gte: minPower };
    }

    if (maxPrice < 1000) {
      filter.pricingPerKwh = { $lte: maxPrice };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const chargersCol = await getChargersCollection();
    const docs = await chargersCol.find(filter).toArray();

    // Map and annotate with calculated distance
    const results = docs.map((doc) => {
      const chargerLat = doc.location?.coordinates?.[1] || DEFAULT_COORDINATES.lat;
      const chargerLng = doc.location?.coordinates?.[0] || DEFAULT_COORDINATES.lng;
      const distanceKm = calculateDistance(lat, lng, chargerLat, chargerLng);

      return {
        id: doc._id!.toString(),
        hostId: doc.hostId,
        hostName: doc.hostName,
        title: doc.title,
        description: doc.description,
        address: doc.address,
        city: doc.city,
        pincode: doc.pincode,
        coordinates: {
          lat: chargerLat,
          lng: chargerLng,
        },
        powerKw: doc.powerKw,
        connectorType: doc.connectorType,
        pricingPerKwh: doc.pricingPerKwh,
        parkingType: doc.parkingType,
        accessNotes: doc.accessNotes,
        isAvailable: doc.isAvailable,
        schedule: doc.schedule,
        photos: doc.photos || [],
        rating: doc.rating || 4.9,
        reviewCount: doc.reviewCount || 12,
        distanceKm,
        createdAt: doc.createdAt,
      };
    });

    // Sort by proximity
    results.sort((a, b) => a.distanceKm - b.distanceKm);

    return NextResponse.json({
      success: true,
      count: results.length,
      chargers: results,
    });
  } catch (err: any) {
    console.error('[API GET /chargers error]:', err);
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
        { success: false, error: 'Unauthorized. Please log in to list a charger.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      address,
      city,
      pincode,
      lat,
      lng,
      powerKw,
      connectorType,
      pricingPerKwh,
      parkingType,
      accessNotes,
      schedule,
      photos,
    } = body;

    if (!title || !address || !powerKw || !pricingPerKwh) {
      return NextResponse.json(
        { success: false, error: 'Title, address, power rating, and pricing per kWh are required' },
        { status: 400 }
      );
    }

    const chargerLat = parseFloat(lat) || DEFAULT_COORDINATES.lat;
    const chargerLng = parseFloat(lng) || DEFAULT_COORDINATES.lng;

    const newCharger: Omit<Charger, '_id'> = {
      hostId: session.userId,
      hostName: session.name,
      title: title.trim(),
      description: description?.trim() || 'Private residential EV charger with dedicated driveway access.',
      address: address.trim(),
      city: city?.trim() || 'Bhopal',
      pincode: pincode?.trim() || '462001',
      location: {
        type: 'Point',
        coordinates: [chargerLng, chargerLat],
      },
      powerKw: parseFloat(powerKw) || 7.4,
      connectorType: connectorType || 'Type 2',
      pricingPerKwh: parseFloat(pricingPerKwh) || 16,
      parkingType: parkingType || 'Driveway',
      accessNotes: accessNotes?.trim() || 'Gate entry code will be provided upon booking confirmation.',
      isAvailable: true,
      schedule: schedule || {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        startHour: '08:00',
        endHour: '22:00',
      },
      photos: Array.isArray(photos) && photos.length > 0 ? photos : [
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
      ],
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const chargers = await getChargersCollection();
    const result = await chargers.insertOne(newCharger as any);

    // Promote user role to 'host' if they were 'driver'
    const users = await getUsersCollection();
    await users.updateOne(
      { _id: new ObjectId(session.userId), role: 'driver' },
      { $set: { role: 'host', updatedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: 'Charger listed successfully on VoltShare Mesh!',
      charger: {
        id: result.insertedId.toString(),
        ...newCharger,
      },
    });
  } catch (err: any) {
    console.error('[API POST /chargers error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
