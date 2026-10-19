import { MongoClient, Db, Collection } from 'mongodb';
import { User, Charger, Booking, ChargingSession, Review, Payout } from '@/types';

const globalForMongo = global as unknown as { _mongoClientPromise?: Promise<MongoClient> };

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment');
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db('voltshare_prod');
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDb();
  return db.collection<User>('users');
}

export async function getChargersCollection(): Promise<Collection<Charger>> {
  const db = await getDb();
  return db.collection<Charger>('chargers');
}

export async function getBookingsCollection(): Promise<Collection<Booking>> {
  const db = await getDb();
  return db.collection<Booking>('bookings');
}

export async function getSessionsCollection(): Promise<Collection<ChargingSession>> {
  const db = await getDb();
  return db.collection<ChargingSession>('sessions');
}

export async function getReviewsCollection(): Promise<Collection<Review>> {
  const db = await getDb();
  return db.collection<Review>('reviews');
}

export async function getPayoutsCollection(): Promise<Collection<Payout>> {
  const db = await getDb();
  return db.collection<Payout>('payouts');
}

let indexesEnsured = false;
export async function ensureIndexes(): Promise<void> {
  if (indexesEnsured) return;
  try {
    const db = await getDb();
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('chargers').createIndex({ location: '2dsphere' });
    await db.collection('chargers').createIndex({ hostId: 1 });
    await db.collection('bookings').createIndex({ driverId: 1 });
    await db.collection('bookings').createIndex({ chargerId: 1 });
    await db.collection('bookings').createIndex({ bookingRef: 1 }, { unique: true });
    await db.collection('sessions').createIndex({ bookingId: 1 });
    indexesEnsured = true;
  } catch (err) {
    console.warn('[DB] Warning ensuring indexes:', err);
  }
}
