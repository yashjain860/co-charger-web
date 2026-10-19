'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    totalCost: 22,
    powerKw: 7.4,
    voltage: 238,
    isCompleted: false,
  });

  const [loading, setLoading] = useState(false);
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
            setTelemetry(data.telemetry);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {completedSummary ? (
        /* COMPLETED INVOICE RECEIPT */
        <div className="p-8 rounded-3xl glass-panel-glow border border-emerald-500/40 bg-[#090d16] text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Charging Completed!</h2>
          <p className="text-xs text-slate-400 mb-6">
            The Type-2 solenoid lock has been released. Digital tax receipt generated.
          </p>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-left text-xs mb-6">
            <div className="flex justify-between text-slate-400">
              <span>Energy Delivered:</span>
              <span className="font-mono font-bold text-white text-sm">{completedSummary.deliveredKwh} kWh</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Starting Battery SoC:</span>
              <span className="font-mono text-slate-300">{completedSummary.startSoC}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Final Battery SoC:</span>
              <span className="font-mono font-bold text-emerald-400">{completedSummary.finalSoC}%</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Duration:</span>
              <span className="font-mono text-white">{completedSummary.durationMinutes} Minutes</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-slate-200">Total Billed:</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">₹{completedSummary.totalCost}</span>
            </div>
          </div>

          <Link
            href="/bookings"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Return to Driver Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* LIVE TELEMETRY TERMINAL */
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ACTIVE OCPP TELEMETRY HUD
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Live Driveway Charging Session
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time sinusoidal power flow from host wallbox into EV battery pack.
              </p>
            </div>

            <button
              onClick={handleStopCharging}
              disabled={stopping}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Square className="w-4 h-4 fill-rose-300" />
              <span>{stopping ? 'Stopping Flow...' : 'Stop Charging'}</span>
            </button>
          </div>

          {/* Central Battery Gauge Card */}
          <div className="p-8 rounded-3xl glass-panel-glow border border-emerald-500/40 bg-[#090d16] text-center">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Hardware Lock: Engaged
              </span>
              <span className="font-mono text-emerald-400">
                {telemetry.voltage} V • 50.0 Hz
              </span>
            </div>

            <div className="my-8">
              <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 font-mono mb-2">
                {telemetry.currentSoC}%
              </div>
              <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">
                State of Charge (Target: {telemetry.targetSoC}%)
              </p>
            </div>

            {/* Visual Battery Bar */}
            <div className="w-full max-w-lg mx-auto h-4 rounded-full bg-slate-950 border border-slate-800 p-0.5 overflow-hidden mb-8">
              <div
                style={{ width: `${telemetry.currentSoC}%` }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>

            {/* 3 Metric Capsules */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4 border-t border-slate-800 text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Rate</span>
                <span className="text-lg font-black text-white font-mono">{telemetry.powerKw} kW</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Delivered</span>
                <span className="text-lg font-black text-white font-mono">{telemetry.deliveredKwh} kWh</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Total Cost</span>
                <span className="text-lg font-black text-emerald-400 font-mono">₹{telemetry.totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
