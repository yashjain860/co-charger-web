'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Wifi,
  ShieldCheck,
  Power,
  RotateCcw,
  Copy,
  Lock,
  Unlock,
  Sliders,
  Check,
  AlertTriangle,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface ChargerProps {
  charger: {
    id: string;
    title: string;
    address: string;
    powerKw: number;
    connectorType: string;
    pricingPerKwh: number;
    isAvailable: boolean;
  };
}

export default function InteractiveWallboxCard({ charger }: ChargerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Policy Toggles state (inspired by CodeXR Card Controls)
  const [autoBooking, setAutoBooking] = useState(true);
  const [overstayPenalty, setOverstayPenalty] = useState(true);
  const [solarOnly, setSolarOnly] = useState(false);
  const [weekendBlackout, setWeekendBlackout] = useState(false);

  const serialNumber = 'VS-WBX-7421-BHP';

  const handleCopySerial = () => {
    navigator.clipboard.writeText(serialNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
      {/* LEFT COLUMN: 3D Physical Wallbox Card */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider">
            Active Hardware Bay
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Tap card to inspect diagnostics
          </span>
        </div>

        {/* 3D Perspective Card Container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full h-64 sm:h-72 perspective-1000 cursor-pointer select-none group"
        >
          <div
            className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d shadow-2xl ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE (Obsidian Hardware Card) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a0f18] to-black border border-white/10 p-6 sm:p-7 flex flex-col justify-between backface-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-emerald-500/40 transition-colors">
              {/* Subtle mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] rounded-3xl pointer-events-none" />

              {/* Top Row: Brand & Status Pill */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-5 h-5 fill-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">VoltShare PRO</div>
                    <div className="text-[10px] text-slate-400 font-mono">ABB Terra AC Smart Wallbox</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border flex items-center gap-1.5 ${
                    isLocked
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
                    <span>{isLocked ? 'LOCKED / STANDBY' : 'ACTIVE & READY'}</span>
                  </span>
                </div>
              </div>

              {/* Middle Row: Serial & Technical Specs */}
              <div className="relative z-10 my-auto">
                <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                  Hardware Node ID
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-wider mt-0.5">
                  •••• •••• 7421
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold">{charger.powerKw} kW AC</span>
                  <span className="text-slate-600">|</span>
                  <span>{charger.connectorType}</span>
                  <span className="text-slate-600">|</span>
                  <span className="font-mono font-semibold text-white">₹{charger.pricingPerKwh}/kWh</span>
                </div>
              </div>

              {/* Bottom Row: Microcopy & Flip hint */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.08] pt-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[11px] text-slate-300">E-7 Arera Colony Driveway</span>
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                  <span>Tap to flip</span>
                  <RotateCcw className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* BACK FACE (Diagnostics & Internal Sensors) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-950 via-[#0e1626] to-slate-900 border border-emerald-500/30 p-6 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Back Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Real-Time Internal Sensors</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">OCPP 1.6J JSON</span>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-2 gap-3 my-auto text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Breaker Rating</span>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">32A Continuous</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Line Voltage</span>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">231.4 V (50Hz)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Ground Impedance</span>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">0.11 Ω (Optimal)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Cellular Signal</span>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">-54 dBm (4G LTE)</div>
                </div>
              </div>

              {/* Back Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.08] pt-2.5">
                <span>Firmware: v2.4.1 (Latest)</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span>Tap to flip front</span>
                  <RotateCcw className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Pills Below Card */}
        <div className="grid grid-cols-4 gap-2 w-full mt-4">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Flip Card</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLocked(!isLocked)}
            className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
              isLocked
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-slate-300'
            }`}
          >
            {isLocked ? <Unlock className="w-3.5 h-3.5 text-red-400" /> : <Lock className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isLocked ? 'Unlock' : 'Freeze'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySerial}
            className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Serial'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Host Gate Intercom QR Code downloaded! Gate access token active.')}
            className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">QR Pass</span>
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Wallbox Policy & Security Controls (CodeXR Control Style) */}
      <div className="lg:col-span-6 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Wallbox Operational Controls</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure autonomous billing, gate policies, and overstay protection.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              Live Policy
            </span>
          </div>

          {/* Toggle 1: Instant Auto-Booking */}
          <div className="py-3.5 border-b border-white/[0.06] flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Instant Auto-Booking</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Allows verified Aadhaar KYC drivers to reserve slots without manual host SMS confirmation.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoBooking(!autoBooking)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors relative shrink-0 ${
                autoBooking ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  autoBooking ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Overstay Idle Fee */}
          <div className="py-3.5 border-b border-white/[0.06] flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Overstay Idle Penalty (₹2/min)</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Automatically fines drivers who remain plugged into your driveway past a 15-min grace window.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOverstayPenalty(!overstayPenalty)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors relative shrink-0 ${
                overstayPenalty ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  overstayPenalty ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Rooftop Solar Curtailment */}
          <div className="py-3.5 border-b border-white/[0.06] flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Rooftop Solar Curtailment</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Only enable charging bay when household rooftop solar inverter is generating surplus units.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSolarOnly(!solarOnly)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors relative shrink-0 ${
                solarOnly ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  solarOnly ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Weekend Family Blackout */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Sunday Family Blackout</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Automatically closes driveway to the public every Sunday for personal household vehicles.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWeekendBlackout(!weekendBlackout)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors relative shrink-0 ${
                weekendBlackout ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  weekendBlackout ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Protection Affirmation */}
        <div className="mt-5 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Underwritten ₹5 Lakh electrical & gate damage protection active on this node.</span>
        </div>
      </div>
    </div>
  );
}
