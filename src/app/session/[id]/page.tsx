'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Zap,
  Gauge,
  BatteryCharging,
  Clock,
  Square,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Thermometer,
  Lock,
  Car,
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

  const [isFlipped, setIsFlipped] = useState(false);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Session Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SESSION IN PROGRESS • LEVEL-2 AC MESH</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Live Charging Telemetry HUD
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Session Ref: {id} • Gated Driveway Node #1
          </p>
        </div>

        {!completedSummary && (
          <button
            type="button"
            onClick={handleStopCharging}
            disabled={stopping}
            className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition flex items-center gap-2"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>{stopping ? 'Disconnecting...' : 'Stop & Unplug Bay'}</span>
          </button>
        )}
      </div>

      {completedSummary ? (
        /* COMPLETED INVOICE RECEIPT */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center max-w-lg mx-auto shadow-2xl"
        >
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Charging Completed!</h2>
          <p className="text-xs text-slate-400 mb-6">
            The Type-2 solenoid lock has been released. Automated tax receipt generated and emailed.
          </p>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 text-left text-xs mb-6">
            <div className="flex justify-between text-slate-400">
              <span>Energy Delivered:</span>
              <span className="font-mono font-bold text-white">{completedSummary.deliveredKwh} kWh</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Duration Parked:</span>
              <span className="font-mono text-white">{completedSummary.durationMinutes} minutes</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Energy Tariff:</span>
              <span className="font-mono text-white">₹{completedSummary.ratePerKwh}/kWh flat</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-emerald-400">
              <span>Total Settled:</span>
              <span className="font-mono">₹{completedSummary.totalAmount}</span>
            </div>
          </div>

          <Link
            href="/bookings"
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition block shadow-lg shadow-emerald-500/20"
          >
            View All My Bookings
          </Link>
        </motion.div>
      ) : (
        /* LIVE DUAL-PANEL HUD */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3D PASS CARD */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Digital Pass & Keycard
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Tap to flip diagnostics
              </span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-64 sm:h-72 perspective-1000 cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d shadow-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE (Driver Pass) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b1320] to-black border border-emerald-500/30 p-6 flex flex-col justify-between backface-hidden shadow-2xl group-hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Tata Nexon EV Max</div>
                        <div className="text-[10px] text-slate-400 font-mono">MP-04-EV-9821</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/20">
                      LIVE BAY #1
                    </span>
                  </div>

                  <div className="my-auto">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                      Gate Entry Intercom PIN
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-widest mt-1">
                      5 8 2 1
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Auto-authorized at gate intercom
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.08] pt-2.5">
                    <span>E-7 Arera Colony Node</span>
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                      <span>Tap to flip</span>
                      <RotateCcw className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* BACK FACE (Safety Sensors) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-950 via-[#0e1626] to-slate-900 border border-cyan-500/30 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Safety Interlocks
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Type-B RCD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 my-auto text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 font-mono">EARTH IMPEDANCE</span>
                      <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">0.11 Ω</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 font-mono">TEMPERATURE</span>
                      <div className="text-sm font-bold font-mono text-white mt-0.5">34°C (Normal)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 font-mono">RESIDUAL DC</span>
                      <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">&lt; 3mA</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 font-mono">SOLENOID LOCK</span>
                      <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">ENGAGED</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.08] pt-2">
                    <span>15ms Auto-Cutoff Armed</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <span>Tap to flip front</span>
                      <RotateCcw className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE TELEMETRY GAUGES */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Circular SoC Gauge */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
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
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {Math.round(telemetry.currentSoC)}%
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono uppercase mt-0.5">
                      TARGET: {telemetry.targetSoC}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensor Readouts */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono">CHARGING SPEED</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                    {telemetry.powerKw} kW
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono">LINE VOLTS / AMPS</span>
                  <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
                    {telemetry.voltage}V / 32A
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono">ENERGY CONSUMED</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {telemetry.deliveredKwh} kWh
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono">BILLED AMOUNT</span>
                  <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                    ₹{telemetry.totalCost}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Active Escrow Protected
              </span>
              <span className="font-mono text-slate-300">
                Billing Rate: ₹16.00/kWh flat
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
