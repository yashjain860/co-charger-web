'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';
import {
  Zap,
  BatteryCharging,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Gauge,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function VoltShareStory() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Initialize Lenis smooth scroll and scroll progress scrubber
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Helper function to ease progress within a window [start, end]
  const clampWindow = (p: number, start: number, end: number) => {
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  };

  // Chapter active windows
  const w1 = clampWindow(progress, 0.0, 0.1);
  const w2 = clampWindow(progress, 0.1, 0.22);
  const w3 = clampWindow(progress, 0.22, 0.34);
  const w4 = clampWindow(progress, 0.34, 0.46);
  const w5 = clampWindow(progress, 0.46, 0.58);
  const w6 = clampWindow(progress, 0.58, 0.7);
  const w7 = clampWindow(progress, 0.7, 0.82);
  const w8 = clampWindow(progress, 0.82, 0.92);
  const w9 = clampWindow(progress, 0.92, 1.0);

  // Dynamic host earnings calculation for Chapter 5
  const hostHoursPerDay = Math.round(2 + w5 * 6);
  const hostMonthlyKwh = hostHoursPerDay * 7.4 * 26; // 26 working days
  const hostMonthlyGross = Math.round(hostMonthlyKwh * 16 * 0.35); // host margin ~₹5.6/kWh net

  // Dynamic charging meter for Chapter 7
  const liveSoC = Math.min(88, Math.round(28 + w7 * 60));
  const liveDeliveredKwh = Math.round(w7 * 24.5 * 10) / 10;
  const liveCost = Math.round(liveDeliveredKwh * 16);

  return (
    <div ref={stageRef} className="relative w-full voltshare-story-stage h-[1900vh]">
      {/* Pinned 100svh Stage */}
      <div className="voltshare-sticky-viewport flex flex-col justify-center items-center px-4 sm:px-6">
        {/* Background Grid Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* HUD Progress Pill (Top Center) */}
        <div className="absolute top-6 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/20 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>MESH PROGRESS: {Math.round(progress * 100)}%</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            {progress < 0.2
              ? 'THE RESIDENTIAL GRID'
              : progress < 0.4
              ? 'HARDWARE & PHYSICS'
              : progress < 0.6
              ? 'NEIGHBOURHOOD RADAR'
              : progress < 0.8
              ? 'SMART TELEMETRY'
              : 'ENTER THE MESH'}
          </span>
        </div>

        {/* =========================================================================
            CHAPTER 1: THE URBAN EV BOTTLENECK (p: 0.00 - 0.10)
        ========================================================================= */}
        {progress < 0.12 && (
          <div
            style={{
              opacity: progress < 0.08 ? 1 : 1 - (progress - 0.08) / 0.04,
              transform: `translateY(${w1 * -30}px) scale(${1 - w1 * 0.05})`,
            }}
            className="text-center max-w-4xl z-10 transition-transform duration-75"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              The Public Charging Gridlock
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              EVs Are Everywhere. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">
                Plugs Are Not.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Highway fast chargers have 45-minute lines and broken plugs. Meanwhile, right inside your neighbourhood...
            </p>
            <div className="flex items-center justify-center gap-6 text-xs font-mono text-slate-500">
              <span>↓ SCROLL TO POWER UP</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 2: THE LATENT DRIVEWAY GRID (p: 0.10 - 0.22)
        ========================================================================= */}
        {progress >= 0.08 && progress < 0.24 && (
          <div
            style={{
              opacity:
                progress < 0.12
                  ? (progress - 0.08) / 0.04
                  : progress > 0.2
                  ? 1 - (progress - 0.2) / 0.04
                  : 1,
              transform: `translateY(${(1 - w2) * 20}px)`,
            }}
            className="text-center max-w-4xl z-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              The Invisible Network
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Millions of Private Wallboxes. <br />
              <span className="text-emerald-400">Idle 16 Hours Every Day.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Every gated bungalow, apartment basement, and commercial driveway with a 7.4kW or 22kW AC charger is an untapped power station.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                <div className="text-2xl font-bold text-white mb-1">7.4 kW</div>
                <div className="text-xs text-slate-400">Average Home Wallbox</div>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                <div className="text-2xl font-bold text-emerald-400 mb-1">16.5 Hrs</div>
                <div className="text-xs text-slate-400">Daily Idle Time</div>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-slate-400">Zero Extra Grid Load</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 3: TYPE-2 PLUG PHYSICS & HARDWARE LOCK (p: 0.22 - 0.34)
        ========================================================================= */}
        {progress >= 0.2 && progress < 0.36 && (
          <div
            style={{
              opacity:
                progress < 0.24
                  ? (progress - 0.2) / 0.04
                  : progress > 0.32
                  ? 1 - (progress - 0.32) / 0.04
                  : 1,
            }}
            className="w-full max-w-4xl z-10 flex flex-col md:flex-row items-center gap-10"
          >
            {/* SVG Gun Cross Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 rounded-full bg-slate-900/80 border-2 border-emerald-500/40 p-6 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                {/* Visual Pin Circles */}
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-mono text-emerald-200">
                    L1
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-mono text-emerald-200">
                    L2
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-mono text-emerald-200">
                    L3
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-[10px] font-mono text-slate-300">
                    CP
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-[10px] font-mono text-slate-300">
                    PP
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-center text-xs font-mono font-bold text-emerald-300 animate-pulse">
                  PE
                </div>
                <div className="absolute bottom-3 text-[10px] font-mono text-emerald-400 tracking-wider">
                  TYPE-2 IEC 62196
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Sliders className="w-3.5 h-3.5" />
                Hardware Standards
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Universal Compatibility. Zero Adapters Needed.
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                VoltShare hosts provide standard Mennekes Type-2 AC connectors delivering clean, surge-protected sinusoidal power for every electric 4-wheeler and 2-wheeler.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Control Pilot (CP) smart handshake verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Solenoid motorized locking during active flow</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant 15ms ground-fault trip cutoff</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 4: HYPERLOCAL PROXIMITY RADAR (p: 0.34 - 0.46)
        ========================================================================= */}
        {progress >= 0.32 && progress < 0.48 && (
          <div
            style={{
              opacity:
                progress < 0.36
                  ? (progress - 0.32) / 0.04
                  : progress > 0.44
                  ? 1 - (progress - 0.44) / 0.04
                  : 1,
            }}
            className="text-center max-w-4xl z-10 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              Real Geospatial Proximity
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              A Charger in Every Second Lane.
            </h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
              OpenStreetMap Haversine calculations search in a 2.5km radius. Book a charger closer than your local petrol station.
            </p>

            {/* Radar Simulation Card */}
            <div className="max-w-xl mx-auto p-6 rounded-2xl glass-panel-glow border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Radar: Bhopal Hub
                </div>
                <span className="font-mono text-emerald-400 text-[11px]">8 NODES DETECTED</span>
              </div>
              <div className="py-4 space-y-3 text-left">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div>
                    <div className="font-bold text-white">E-7 Arera Colony Driveway</div>
                    <div className="text-[11px] text-slate-400">7.4 kW Type-2 • Arjun Verma</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      0.4 km
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">₹16 / kWh</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div>
                    <div className="font-bold text-white">MP Nagar Zone-2 Corporate Bay</div>
                    <div className="text-[11px] text-slate-400">11 kW Fast AC • Commercial</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      1.1 km
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">₹18 / kWh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 5: HOST MONTHLY PASSIVE INCOME (p: 0.46 - 0.58)
        ========================================================================= */}
        {progress >= 0.44 && progress < 0.6 && (
          <div
            style={{
              opacity:
                progress < 0.48
                  ? (progress - 0.44) / 0.04
                  : progress > 0.56
                  ? 1 - (progress - 0.56) / 0.04
                  : 1,
            }}
            className="text-center max-w-4xl z-10 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Host Economics
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
              Your Driveway, Paying Your EMIs.
            </h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
              Plug sharing turns idle home capital into monthly bank payouts via automated UPI settlement.
            </p>

            <div className="max-w-lg mx-auto p-6 rounded-2xl glass-panel-glow border border-emerald-500/40 text-center">
              <div className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider">
                Simulated Sharing Schedule
              </div>
              <div className="text-2xl font-bold text-white mb-4">
                {hostHoursPerDay} Hours / Day Available
              </div>

              <div className="py-4 border-y border-slate-800 my-4 flex items-center justify-around">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Energy Dispensed</div>
                  <div className="text-xl font-bold text-white font-mono">{Math.round(hostMonthlyKwh)} kWh/mo</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400 mb-1">Estimated Net Payout</div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                    ₹{hostMonthlyGross.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500">
                Direct bank transfer via UPI every Sunday night. Zero hassle.
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 6: THE DRIVER EXPERIENCE IN MOTION (p: 0.58 - 0.70)
        ========================================================================= */}
        {progress >= 0.56 && progress < 0.72 && (
          <div
            style={{
              opacity:
                progress < 0.6
                  ? (progress - 0.56) / 0.04
                  : progress > 0.68
                  ? 1 - (progress - 0.68) / 0.04
                  : 1,
            }}
            className="w-full max-w-4xl z-10 flex flex-col md:flex-row items-center justify-center gap-10"
          >
            {/* 3D Phone Mockup */}
            <div className="w-72 h-[460px] rounded-[36px] bg-[#0c121d] border-4 border-slate-700 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2" />

              {/* Simulated Screen */}
              <div className="flex-1 rounded-2xl bg-slate-950 p-4 flex flex-col justify-between border border-slate-800">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1">RESERVATION CONFIRMED</div>
                  <div className="text-sm font-bold text-white">Arera Colony Driveway</div>
                  <div className="text-[10px] text-slate-400 mb-3">Today, 2:00 PM – 4:00 PM</div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-center mb-3">
                    <div className="text-[9px] text-slate-400 uppercase">Entry Gate Pass</div>
                    <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-widest">
                      5821
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Slot reserved. Navigate via Google Maps.</span>
                </div>
              </div>

              {/* Phone Home Bar */}
              <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
            </div>

            <div className="max-w-md text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                Zero Friction
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">
                Reserve in 3 Taps. Drive In. Plug In.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                No subscription cards or proprietary RFID tags. Get a verified 4-digit gate entry code and automated booking confirmation straight to your inbox.
              </p>
              <Link
                href="/chargers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition"
              >
                <span>Browse Live Network</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 7: SMART METER TELEMETRY (p: 0.70 - 0.82)
        ========================================================================= */}
        {progress >= 0.68 && progress < 0.84 && (
          <div
            style={{
              opacity:
                progress < 0.72
                  ? (progress - 0.68) / 0.04
                  : progress > 0.8
                  ? 1 - (progress - 0.8) / 0.04
                  : 1,
            }}
            className="text-center max-w-4xl z-10 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Gauge className="w-3.5 h-3.5" />
              Active Telemetry HUD
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Real-Time Power Delivery Telemetry.
            </h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8">
              Live energy measurement streams directly from the charger. Remote auto-cutoff prevents battery overcharge.
            </p>

            {/* Simulated Live Charging HUD */}
            <div className="max-w-xl mx-auto p-6 rounded-2xl glass-panel-glow border border-emerald-500/40">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <span className="font-mono text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  CHARGING SESSION ACTIVE
                </span>
                <span className="text-slate-400 font-mono">238 V • 31.8 A</span>
              </div>

              {/* SoC Progress Bar */}
              <div className="my-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-slate-400 font-medium">Battery Level (Tata Nexon EV Max)</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">{liveSoC}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${liveSoC}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
                <div>
                  <div className="text-[11px] text-slate-500">Power Speed</div>
                  <div className="text-lg font-bold text-white font-mono">7.4 kW</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Delivered</div>
                  <div className="text-lg font-bold text-white font-mono">{liveDeliveredKwh} kWh</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Live Bill</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">₹{liveCost}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 8: TRUST & COMMUNITY VERIFICATION (p: 0.82 - 0.92)
        ========================================================================= */}
        {progress >= 0.8 && progress < 0.94 && (
          <div
            style={{
              opacity:
                progress < 0.84
                  ? (progress - 0.8) / 0.04
                  : progress > 0.9
                  ? 1 - (progress - 0.9) / 0.04
                  : 1,
            }}
            className="text-center max-w-4xl z-10 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sovereign Trust Mesh
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Protected for Both Host & Driver.
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
              Community sharing with commercial-grade accountability and verified identities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Aadhaar KYC Verified</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Both hosts and drivers complete identity screening before access is unlocked.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Protected Gate Access</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exact house numbers and entry OTPs are revealed only after confirmed reservation.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Escrow Settlement</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funds are secured in escrow; host payout is automatically credited upon plug release.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CHAPTER 9 & 10: LAUNCH GATE INTO THE PLATFORM (p: 0.92 - 1.00)
        ========================================================================= */}
        {progress >= 0.9 && (
          <div
            style={{
              opacity: (progress - 0.9) / 0.08,
              transform: `scale(${0.95 + (progress - 0.9) * 0.5})`,
            }}
            className="text-center max-w-4xl z-20 w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
              The Network is Live
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Enter the VoltShare Mesh.
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto mb-10">
              Whether you need a top-up on your commute or want to earn ₹8,000/month from your home wallbox, your spot is ready.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link
                href="/chargers"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2"
              >
                <span>Find Nearby Chargers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/host"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-slate-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <span>Host Your Driveway</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
