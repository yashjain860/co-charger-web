'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Zap,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Info,
} from 'lucide-react';

export default function ChargerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { user, openAuthModal, triggerConfetti } = useAuth();

  const [charger, setCharger] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [durationHours, setDurationHours] = useState(2);
  const [startTime, setStartTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30); // 30 mins from now
    return d.toISOString().slice(0, 16);
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    async function loadCharger() {
      try {
        const res = await fetch(`/api/v1/chargers/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setCharger(data.charger);
          }
        }
      } catch (err) {
        console.error('Error fetching charger:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCharger();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Accessing VoltShare Mesh Node...</p>
      </div>
    );
  }

  if (!charger) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Charger Node Not Found</h2>
        <p className="text-slate-400 text-xs mb-6">This charger listing may have been deactivated or removed.</p>
        <Link
          href="/chargers"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  // Energy & Price calculations
  const estimatedKwh = Math.round(charger.powerKw * durationHours * 0.88 * 10) / 10;
  const totalAmount = Math.round(estimatedKwh * charger.pricingPerKwh);

  const handleBookSlot = async () => {
    if (!user) {
      openAuthModal('signin');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      const res = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chargerId: id,
          startTime: new Date(startTime).toISOString(),
          durationHours,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete reservation');
      }

      triggerConfetti();
      router.push('/bookings');
    } catch (err: any) {
      setBookingError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <Link
        href="/chargers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Chargers</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details & Photos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Photo Card */}
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            <img
              src={charger.photos?.[0] || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80'}
              alt={charger.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Residential Driveway</span>
            </div>
            <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-lg">
              {charger.powerKw} kW AC Fast
            </div>
          </div>

          {/* Heading Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                {charger.connectorType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {charger.parkingType}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{charger.rating}</span>
                <span className="text-slate-500 font-normal">({charger.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {charger.title}
            </h1>
            <p className="text-sm text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{charger.address}, {charger.city} - {charger.pincode}</span>
            </p>
          </div>

          {/* Description & Specs */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">About This Charger</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {charger.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-500 block mb-0.5">Connector</span>
                <span className="font-bold text-sm text-white">{charger.connectorType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-500 block mb-0.5">Max Output</span>
                <span className="font-bold text-sm text-emerald-400">{charger.powerKw} kW</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 block mb-0.5">Tariff</span>
                <span className="font-bold text-sm text-white">₹{charger.pricingPerKwh} / kWh</span>
              </div>
            </div>
          </div>

          {/* Parking & Access Notes */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Access & Entry Instructions</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {charger.accessNotes}
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Driveway entry passcode and host contact are unlocked upon slot confirmation.</span>
            </div>
          </div>

          {/* Host Card */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5">
                <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center font-bold text-emerald-300 text-lg">
                  {charger.hostName.charAt(0)}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{charger.hostName}</h4>
                <p className="text-xs text-slate-400">Verified VoltShare Host • Bhopal Central</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
              Superhost ⚡
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Reservation Studio */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-3xl glass-panel-glow border border-emerald-500/40 bg-[#090d16]">
            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="text-2xl font-black text-white font-mono">₹{charger.pricingPerKwh}</span>
                <span className="text-xs text-slate-400 font-normal"> / kWh</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-400 block">Instant Booking</span>
                <span className="text-[10px] text-slate-500">Zero cancellation fee</span>
              </div>
            </div>

            {/* Error Message */}
            {bookingError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {bookingError}
              </div>
            )}

            {/* Booking Form Controls */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Start Date & Time</span>
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Duration</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{durationHours} Hours</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setDurationHours(hrs)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        durationHours === hrs
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Energy & Bill Preview */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 mb-6 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Estimated Energy:</span>
                <span className="text-white font-mono font-semibold">~{estimatedKwh} kWh</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Charging Rate:</span>
                <span className="text-white font-mono font-semibold">₹{charger.pricingPerKwh} / kWh</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Platform Convenience Fee:</span>
                <span className="text-emerald-400 font-mono font-semibold">FREE (Beta)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                <span className="text-white">Estimated Total:</span>
                <span className="text-emerald-400 font-mono text-base">₹{totalAmount}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleBookSlot}
              disabled={bookingLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {bookingLoading ? (
                'Securing Reservation...'
              ) : user ? (
                <>
                  <span>Reserve Slot & Get Pass</span>
                  <Zap className="w-4 h-4 fill-white" />
                </>
              ) : (
                'Sign In to Reserve'
              )}
            </button>

            <p className="text-[11px] text-slate-500 text-center mt-3 leading-tight">
              Instant OTP pass generated upon booking. Live confirmation sent via SMTP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
