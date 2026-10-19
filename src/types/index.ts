import type { ObjectId } from 'mongodb';

export type UserRole = 'driver' | 'host' | 'admin';

export interface Vehicle {
  make: string;
  model: string;
  batteryCapacityKwh: number;
  connectorType: 'Type 2' | 'CCS2' | '15A Socket';
  registrationPlate?: string;
}

export interface User {
  _id?: ObjectId | string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: Date;
  vehicles: Vehicle[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface AvailabilitySchedule {
  days: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  startHour: string; // e.g. '09:00'
  endHour: string;   // e.g. '18:00'
}

export interface Charger {
  _id?: ObjectId | string;
  hostId: string;
  hostName: string;
  hostPhone?: string;
  title: string;
  description: string;
  address: string;
  city: string;
  pincode: string;
  location: GeoLocation;
  powerKw: number;
  connectorType: 'Type 2' | 'CCS2' | '15A Socket';
  pricingPerKwh: number; // in INR
  parkingType: 'Driveway' | 'Garage' | 'Basement' | 'Dedicated Bay';
  accessNotes: string;
  isAvailable: boolean;
  schedule: AvailabilitySchedule;
  photos: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'charging' | 'completed' | 'cancelled';

export interface Booking {
  _id?: ObjectId | string;
  bookingRef: string;
  driverId: string;
  driverName: string;
  driverEmail: string;
  driverPhone?: string;
  chargerId: string;
  chargerTitle: string;
  chargerAddress: string;
  hostId: string;
  hostName: string;
  hostPhone?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  durationHours: number;
  estimatedKwh: number;
  ratePerKwh: number;
  totalAmount: number;
  status: BookingStatus;
  entryOtp: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SessionStatus = 'in_progress' | 'completed' | 'emergency_stopped';

export interface TelemetryTick {
  timestamp: string;
  powerKw: number;
  deliveredKwh: number;
  soc: number;
  voltage: number;
}

export interface ChargingSession {
  _id?: ObjectId | string;
  bookingId: string;
  chargerId: string;
  driverId: string;
  driverName: string;
  hostId: string;
  startedAt: Date;
  stoppedAt?: Date;
  startSoC: number;
  currentSoC: number;
  targetSoC: number;
  currentPowerKw: number;
  deliveredKwh: number;
  totalCost: number;
  status: SessionStatus;
  telemetryTicks: TelemetryTick[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id?: ObjectId | string;
  chargerId: string;
  bookingId: string;
  driverId: string;
  driverName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: Date;
}

export interface Payout {
  _id?: ObjectId | string;
  hostId: string;
  hostName: string;
  bookingId: string;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  payoutMethod: 'upi' | 'bank_transfer';
  payoutVpa?: string;
  status: 'pending' | 'processed';
  createdAt: Date;
}
