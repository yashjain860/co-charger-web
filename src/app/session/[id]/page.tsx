'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Zap,
  CheckCircle2,
  Square,
  ShieldCheck,
  MapPin,
  Car,
  Clock,
  Phone,
  ArrowLeft,
  Navigation,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function SessionTelemetryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { triggerConfetti } = useAuth();

  const [telemetry, setTelemetry] = useState({
    currentSoC: 32,
    targetSoC: 85,
    deliveredKwh: 1.4,
    totalCost: 22.4,
    powerKw: 7.4,
    voltage: 231.4,
    currentAmps: 32.0,
    isCompleted: false,
  });

  const [stopping, setStopping] = useState(false);
  const [completedSummary, setCompletedSummary] = useState<any>(null);

  // Live telemetry polling / ticking engine
  useEffect(() => {
    if (telemetry.isCompleted || completedSummary) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/sessions/${id}/tick`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.telemetry) {
            setTelemetry((prev) => ({
              ...prev,
              ...data.telemetry,
              currentAmps: 31.8,
              voltage: 231.4,
            }));
            if (data.telemetry.isCompleted) {
              triggerConfetti();
            }
          }
        }
      } catch (err) {
        console.error('Tick error:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id, telemetry.isCompleted, completedSummary]);

  const handleStopCharging = async () => {
    const confirmStop = window.confirm('Are you sure you want to stop charging and release the connector?');
    if (!confirmStop) return;

    setStopping(true);
    try {
      const res = await fetch(`/api/v1/sessions/${id}/stop`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setCompletedSummary(data.summary);
        triggerConfetti();
      } else {
        alert(data.error || 'Failed to stop session');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setStopping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href="/bookings"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to my reservations</span>
      </Link>

      {/* Session Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Live Session Active
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Bay #1 (7.4 kW Type-2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Charging Session & Gate Pass
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reference: <span className="font-mono text-slate-300">{id}</span>
          </p>
        </div>

        {!completedSummary && (
          <button
            type="button"
            onClick={handleStopCharging}
            disabled={stopping}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>{stopping ? 'Stopping & Unlocking...' : 'Stop Charging'}</span>
          </button>
        )}
      </div>

      {completedSummary ? (
        /* COMPLETED INVOICE RECEIPT */
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 rounded-2xl bg-[#0c121e] border border-white/[0.08] max-w-lg mx-auto shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-1">Charging Complete</h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            The connector solenoid has unlocked. You may unplug your vehicle.
          </p>

          <div className="p-4 rounded-xl bg-[#070b13] border border-white/[0.06] space-y-3 text-xs mb-6">
            <div className="flex justify-between text-slate-400">
              <span>Energy Delivered</span>
              <span className="font-semibold text-white">{completedSummary.deliveredKwh} kWh</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Session Duration</span>
              <span className="text-white">{completedSummary.durationMinutes} minutes</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tariff</span>
              <span className="text-white">₹{completedSummary.ratePerKwh}/kWh</span>
            </div>
            <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm font-semibold text-white">
              <span>Total Settled</span>
              <span className="text-emerald-400">₹{completedSummary.totalAmount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg mb-6">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tax invoice has been dispatched to your registered email address.</span>
          </div>

          <Link
            href="/bookings"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs text-center block transition"
          >
            View All Reservations
          </Link>
        </motion.div>
      ) : (
        /* LIVE DUAL-PANEL HUD */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: DIGITAL GATE PASS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0c121e] border border-white/[0.08] p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Tata Nexon EV Max</h3>
                    <p className="text-[11px] text-slate-400 font-mono">MP-04-EV-9821</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Bay 1 Active
                </span>
              </div>

              {/* Prominent PIN Display */}
              <div className="my-6 text-center py-4 px-3 rounded-xl bg-[#070b13] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
                  Gate Intercom & Keypad PIN
                </span>
                <span className="text-3xl font-extrabold text-white tracking-[6px] font-mono">
                  5 8 2 1
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Key this code at the driveway gate intercom to open.
                </p>
              </div>

              {/* Host and Location info */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Driveway Location</span>
                    <span className="text-slate-400 leading-relaxed">
                      Plot 42, Sector E-7, Arera Colony, Bhopal, MP
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Host</span>
                    <span className="font-semibold text-white">Rajesh Sharma</span>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 font-medium transition text-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hardware Safety Interlocks */}
            <div className="rounded-2xl bg-[#0c121e] border border-white/[0.08] p-5">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Hardware Safety Interlocks</span>
              </h4>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-[#070b13] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 block">Earth Impedance</span>
                  <span className="text-sm font-semibold text-white">0.11 Ω (Pass)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#070b13] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 block">Temperature</span>
                  <span className="text-sm font-semibold text-white">34°C Normal</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#070b13] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 block">Residual DC Leak</span>
                  <span className="text-sm font-semibold text-white">&lt; 3 mA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#070b13] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 block">Connector Lock</span>
                  <span className="text-sm font-semibold text-emerald-400">Engaged</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE TELEMETRY GAUGES */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0c121e] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-6 border-b border-white/[0.06]">
              {/* Circular Battery Progress */}
              <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-emerald-400 transition-all duration-300"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - telemetry.currentSoC / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {Math.round(telemetry.currentSoC)}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Target {telemetry.targetSoC}%
                  </span>
                </div>
              </div>

              {/* Status summary */}
              <div className="space-y-3 w-full">
                <div>
                  <span className="text-xs text-slate-400 block">Status</span>
                  <span className="text-base font-semibold text-white">
                    Charging at 7.4 kW Level-2 AC
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Estimated Completion</span>
                  <span className="text-sm font-medium text-slate-200">
                    ~42 minutes remaining to 85%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Session started at 14:30 IST</span>
                </div>
              </div>
            </div>

            {/* 4 Measurement Tiles */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-[#070b13] border border-white/[0.05]">
                <span className="text-xs text-slate-400 block">Charging Rate</span>
                <span className="text-xl font-bold text-white mt-0.5 block">
                  {telemetry.powerKw} kW
                </span>
                <span className="text-[11px] text-slate-500">231V • 32A continuous</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#070b13] border border-white/[0.05]">
                <span className="text-xs text-slate-400 block">Energy Delivered</span>
                <span className="text-xl font-bold text-white mt-0.5 block">
                  {telemetry.deliveredKwh} kWh
                </span>
                <span className="text-[11px] text-slate-500">~11 km range added</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#070b13] border border-white/[0.05]">
                <span className="text-xs text-slate-400 block">Accrued Cost</span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block">
                  ₹{telemetry.totalCost}
                </span>
                <span className="text-[11px] text-slate-500">₹16.00/kWh tariff</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#070b13] border border-white/[0.05]">
                <span className="text-xs text-slate-400 block">Grid Efficiency</span>
                <span className="text-xl font-bold text-white mt-0.5 block">
                  98.4%
                </span>
                <span className="text-[11px] text-slate-500">Power factor 0.99</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected by escrow settlement</span>
              </span>
              <span>Direct meter billing</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
