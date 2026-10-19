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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            My Charging Reservations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Digital gate access passes, live charging meters, and past invoice records.
          </p>
        </div>

        <Link
          href="/chargers"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition flex items-center gap-1.5"
        >
          <span>Find Another Charger</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-[#0c121e] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#0c121e] border border-white/[0.08]">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white mb-1">No Active Reservations</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
            You do not have any charging bookings scheduled. Browse verified community chargers in Bhopal.
          </p>
          <Link
            href="/chargers"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition inline-block"
          >
            Explore Chargers in Bhopal
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl bg-[#0c121e] border border-white/[0.08] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
            >
              {/* Left Details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                    {booking.bookingRef}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : booking.status === 'charging'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{booking.chargerTitle}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{booking.chargerAddress}</span>
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                      {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({booking.durationHours}h)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Host: </span>
                    <span className="font-medium text-white">{booking.hostName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated: </span>
                    <span className="font-medium text-slate-200">~{booking.estimatedKwh} kWh</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Amount: </span>
                    <span className="font-semibold text-white">₹{booking.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Right: Digital Pass & Action Button */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-center gap-4 bg-[#070b13] p-4 rounded-xl border border-white/[0.06]">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1 font-semibold">
                    <KeyRound className="w-3 h-3 text-emerald-400" />
                    <span>Gate Access PIN</span>
                  </div>
                  <div className="font-mono text-2xl font-bold text-emerald-400 tracking-[5px]">
                    {booking.entryOtp}
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleStartSession(booking.id)}
                    disabled={sessionStarting === booking.id}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{sessionStarting === booking.id ? 'Connecting...' : 'Start Session'}</span>
                  </button>
                )}

                {booking.status === 'charging' && (
                  <Link
                    href={`/session/${booking.id}`}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Open Live Meter</span>
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
