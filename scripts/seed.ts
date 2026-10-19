import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI');
  process.exit(1);
}

async function seed() {
  console.log('[Seed] Connecting to MongoDB Atlas...');
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db('voltshare_prod');

  console.log('[Seed] Ensuring indexes...');
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('chargers').createIndex({ location: '2dsphere' });
  await db.collection('bookings').createIndex({ bookingRef: 1 }, { unique: true });

  console.log('[Seed] Clearing existing demo collections...');
  await db.collection('users').deleteMany({ email: { $in: ['host@thewebvale.com', 'driver@thewebvale.com'] } });
  await db.collection('chargers').deleteMany({});
  await db.collection('bookings').deleteMany({});
  await db.collection('sessions').deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hostPass = await bcrypt.hash('HostPass2026!', salt);
  const driverPass = await bcrypt.hash('DriverPass2026!', salt);

  console.log('[Seed] Creating demo host and driver...');
  const hostResult = await db.collection('users').insertOne({
    email: 'host@thewebvale.com',
    passwordHash: hostPass,
    name: 'Arjun Verma',
    phone: '+91 98260 12345',
    role: 'host',
    isVerified: true,
    vehicles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const driverResult = await db.collection('users').insertOne({
    email: 'driver@thewebvale.com',
    passwordHash: driverPass,
    name: 'Vikramaditya Roy',
    phone: '+91 94250 67890',
    role: 'driver',
    isVerified: true,
    vehicles: [
      {
        make: 'Tata',
        model: 'Nexon EV Max',
        batteryCapacityKwh: 40.5,
        connectorType: 'Type 2',
        registrationPlate: 'MP-04-EV-9821',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const hostId = hostResult.insertedId.toString();
  const driverId = driverResult.insertedId.toString();

  console.log('[Seed] Creating real Bhopal neighborhood chargers...');
  const chargers = [
    {
      hostId,
      hostName: 'Arjun Verma',
      hostPhone: '+91 98260 12345',
      title: 'Arera Colony 7.4kW Type-2 Driveway Charger',
      description: 'Gated independent bungalow in E-7 Arera Colony. Equipped with ABB Terra AC Wallbox. Well-lit driveway with CCTV security and paved parking space.',
      address: 'E-7/42, Near 10 No. Market, Arera Colony',
      city: 'Bhopal',
      pincode: '462016',
      location: {
        type: 'Point',
        coordinates: [77.4265, 23.2185],
      },
      powerKw: 7.4,
      connectorType: 'Type 2',
      pricingPerKwh: 16,
      parkingType: 'Driveway',
      accessNotes: 'Call the gate security intercom on arrival. Plug and charge.',
      isAvailable: true,
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        startHour: '07:00',
        endHour: '23:00',
      },
      photos: [
        'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558441719-74e508827361?auto=format&fit=crop&w=1200&q=80',
      ],
      rating: 4.9,
      reviewCount: 18,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      hostId,
      hostName: 'Arjun Verma',
      hostPhone: '+91 98260 12345',
      title: 'MP Nagar Fast 11kW Commercial AC Station',
      description: 'Dedicated commercial parking slot in MP Nagar Zone 2. Ideal for office commuters looking to top-up during meetings.',
      address: 'Plot 45, Zone-2, Maharana Pratap Nagar',
      city: 'Bhopal',
      pincode: '462011',
      location: {
        type: 'Point',
        coordinates: [77.4368, 23.2325],
      },
      powerKw: 11,
      connectorType: 'Type 2',
      pricingPerKwh: 18,
      parkingType: 'Dedicated Bay',
      accessNotes: 'Enter via rear corporate ramp. Bay #3.',
      isAvailable: true,
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startHour: '08:00',
        endHour: '21:00',
      },
      photos: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      ],
      rating: 4.8,
      reviewCount: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      hostId,
      hostName: 'Dr. Radhika Sharma',
      hostPhone: '+91 98261 54321',
      title: 'Shahpura Lakeview Covered EV Garage',
      description: 'Secure shaded parking right next to Shahpura Lake promenade. Schneider EVlink 7.4kW with 5m tethered Type-2 cable.',
      address: 'House 18, Sector B, Shahpura Lake View Road',
      city: 'Bhopal',
      pincode: '462039',
      location: {
        type: 'Point',
        coordinates: [77.4230, 23.1970],
      },
      powerKw: 7.4,
      connectorType: 'Type 2',
      pricingPerKwh: 15,
      parkingType: 'Garage',
      accessNotes: 'Right side garage shutter. Shutter remains half open during daylight hours.',
      isAvailable: true,
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        startHour: '06:00',
        endHour: '22:00',
      },
      photos: [
        'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      ],
      rating: 5.0,
      reviewCount: 22,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      hostId,
      hostName: 'Pradeep Mehra',
      hostPhone: '+91 97555 43210',
      title: 'Gulmohar High-Power 22kW Dual-Socket Station',
      description: 'Fast 22kW AC destination charging point located in Gulmohar Colony near Trilanga. Suitable for Mercedes EQE, BMW i4, and dual-inverter EVs.',
      address: 'B-24, Main Road, Gulmohar Colony',
      city: 'Bhopal',
      pincode: '462039',
      location: {
        type: 'Point',
        coordinates: [77.4420, 23.2040],
      },
      powerKw: 22,
      connectorType: 'Type 2',
      pricingPerKwh: 20,
      parkingType: 'Driveway',
      accessNotes: 'Wide entrance driveway suitable for full-size SUVs.',
      isAvailable: true,
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        startHour: '08:00',
        endHour: '23:00',
      },
      photos: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      ],
      rating: 4.9,
      reviewCount: 31,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const chargerDocs = await db.collection('chargers').insertMany(chargers as any);
  const chargerId = chargerDocs.insertedIds[0].toString();

  console.log('[Seed] Creating sample active booking...');
  const now = new Date();
  const later = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  await db.collection('bookings').insertOne({
    bookingRef: 'VS-782109',
    driverId,
    driverName: 'Vikramaditya Roy',
    driverEmail: 'driver@thewebvale.com',
    chargerId,
    chargerTitle: chargers[0].title,
    chargerAddress: chargers[0].address,
    hostId,
    hostName: 'Arjun Verma',
    startTime: now.toISOString(),
    endTime: later.toISOString(),
    durationHours: 2,
    estimatedKwh: 13.0,
    ratePerKwh: 16,
    totalAmount: 208,
    status: 'confirmed',
    entryOtp: '5821',
    createdAt: now,
    updatedAt: now,
  });

  console.log('[Seed] Database seeded successfully with real MongoDB Atlas collections!');
  await client.close();
}

seed().catch((err) => {
  console.error('[Seed Error]:', err);
  process.exit(1);
});
