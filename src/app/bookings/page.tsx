'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  QrCode,
  KeyRound,
} from 'lucide-react';

interface BookingItem {
  id: string;
  bookingRef: string;
  chargerId: string;
  chargerTitle: string;
  chargerAddress: string;
  hostName: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  estimatedKwh: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'charging' | 'completed' | 'cancelled';
  entryOtp: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionStarting, setSessionStarting] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/v1/bookings');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings || []);
        }
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleStartSession = async (bookingId: string) => {
    setSessionStarting(bookingId);
    try {
      const res = await fetch('/api/v1/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, startSoC: 32 }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.session) {
        router.push(`/session/${data.session.id}`);
      } else {
        alert(data.error || 'Failed to start session');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSessionStarting(null);
    }
  };

  if (!user && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <Calendar className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Sign In to View Passes</h2>
        <p className="text-xs text-slate-400 mb-6">
          Access your digital gate passes, active charging sessions, and reservation receipts.
        </p>
        <button
          onClick={() => openAuthModal('signin')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
        >
          Sign In to VoltShare
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            Driver Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Charging Reservations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Digital entry passes, live telemetry sessions, and payment records.
          </p>
        </div>

        <Link
          href="/chargers"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5"
        >
          <span>Reserve Another Charger</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="p-16 text-center rounded-2xl glass-panel border border-slate-800">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Active Reservations</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
            You have not booked any charging slots yet. Discover verified community chargers near your commute.
          </p>
          <Link
            href="/chargers"
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
          >
            Explore Chargers in Bhopal
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl glass-panel-glow border border-slate-800 overflow-hidden bg-[#090d16] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    {booking.bookingRef}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : booking.status === 'charging'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{booking.chargerTitle}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{booking.chargerAddress}</span>
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                      {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({booking.durationHours}h)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Host: </span>
                    <span className="font-semibold text-white">{booking.hostName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Est. Energy: </span>
                    <span className="font-semibold text-emerald-400 font-mono">~{booking.estimatedKwh} kWh</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total: </span>
                    <span className="font-bold text-white font-mono">₹{booking.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Right: Digital Pass & Action Button */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mb-1 flex items-center justify-center gap-1">
                    <KeyRound className="w-3 h-3 text-emerald-400" />
                    <span>Gate Entry Pass</span>
                  </div>
                  <div className="font-mono text-2xl font-black text-emerald-400 tracking-[4px]">
                    {booking.entryOtp}
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleStartSession(booking.id)}
                    disabled={sessionStarting === booking.id}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{sessionStarting === booking.id ? 'Connecting Plug...' : 'Start Session'}</span>
                  </button>
                )}

                {booking.status === 'charging' && (
                  <Link
                    href={`/session/${booking.id}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1.5 animate-pulse"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>View Live Meter</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
