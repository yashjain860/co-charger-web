'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Gauge,
  BatteryCharging,
  Play,
  Square,
  RotateCcw,
  ShieldCheck,
  Thermometer,
  Clock,
  Car,
  Receipt,
  CheckCircle2,
} from 'lucide-react';

interface CarModel {
  name: string;
  batteryKwh: number;
  maxKw: number;
  initialSoc: number;
}

const CARS: CarModel[] = [
  { name: 'Tata Nexon EV Max', batteryKwh: 40.5, maxKw: 7.2, initialSoc: 24 },
  { name: 'Mahindra XUV400', batteryKwh: 39.4, maxKw: 7.2, initialSoc: 30 },
  { name: 'MG ZS EV', batteryKwh: 50.3, maxKw: 7.4, initialSoc: 18 },
  { name: 'Ather 450X', batteryKwh: 3.7, maxKw: 3.3, initialSoc: 15 },
];

export default function InteractiveTelemetrySimulator() {
  const [selectedCar, setSelectedCar] = useState<CarModel>(CARS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soc, setSoc] = useState<number>(CARS[0].initialSoc);
  const [energyKwh, setEnergyKwh] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  // Rate per kWh for simulation
  const tariffRate = 16.0;

  useEffect(() => {
    setSoc(selectedCar.initialSoc);
    setEnergyKwh(0);
    setElapsedSec(0);
    setIsPlaying(false);
    setShowReceipt(false);
  }, [selectedCar]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSec((s) => s + 2);
        setEnergyKwh((k) => Math.min(selectedCar.batteryKwh, Math.round((k + 0.08) * 100) / 100));
        setSoc((prev) => {
          if (prev >= 98) {
            setIsPlaying(false);
            setShowReceipt(true);
            return 98;
          }
          return Math.min(98, Math.round((prev + 0.3) * 10) / 10);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedCar]);

  const currentCost = Math.round(energyKwh * tariffRate * 100) / 100;
  const currentVoltage = isPlaying ? (230 + Math.sin(elapsedSec) * 2).toFixed(1) : '231.0';
  const currentAmps = isPlaying ? ((selectedCar.maxKw * 1000) / 230).toFixed(1) : '0.0';
  const currentPower = isPlaying ? selectedCar.maxKw.toFixed(2) : '0.00';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-24 bg-slate-900/30 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Gauge className="w-3.5 h-3.5" />
            <span>Interactive Live HUD Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Test-Drive The Live Telemetry Engine
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Experience the real-time vehicle telemetry that drivers and hosts see during a live session. Choose your EV, initiate the smart charge, and inspect real-time electrical telemetry.
          </p>
        </div>

        {/* Vehicle Selection Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CARS.map((car) => (
            <button
              key={car.name}
              type="button"
              onClick={() => setSelectedCar(car)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedCar.name === car.name
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>{car.name}</span>
              <span className="text-[11px] opacity-75 font-mono">({car.batteryKwh} kWh)</span>
            </button>
          ))}
        </div>

        {/* Main Telemetry Box */}
        <div className="max-w-4xl mx-auto bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{selectedCar.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20">
                  {selectedCar.maxKw} kW Type-2 AC
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Session Location: E-7 Arera Colony Driveway Node
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    setShowReceipt(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Live Session</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setShowReceipt(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop & Bill</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setSoc(selectedCar.initialSoc);
                  setEnergyKwh(0);
                  setElapsedSec(0);
                  setIsPlaying(false);
                  setShowReceipt(false);
                }}
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 items-center">
            {/* Left: Glowing Circular SoC Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* SVG Gauge Circle */}
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
                    strokeDashoffset={2 * Math.PI * 40 * (1 - soc / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Inner SoC readout */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono font-semibold uppercase">
                    <BatteryCharging className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isPlaying ? 'CHARGING' : 'STANDBY'}</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight my-1">
                    {Math.round(soc)}%
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {energyKwh} / {selectedCar.batteryKwh} kWh
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Real-Time Sensor Metrics */}
            <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono text-slate-400">ACTIVE POWER</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {currentPower} <span className="text-xs text-slate-400 font-normal">kW</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">AC Level-2 Steady</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono text-slate-400">LINE VOLTAGE & CURRENT</span>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                  {currentVoltage} <span className="text-xs text-slate-400 font-normal">V</span>
                  <span className="text-slate-600 mx-1.5 font-normal">/</span>
                  {currentAmps} <span className="text-xs text-slate-400 font-normal">A</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">50 Hz Pure Sine</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono text-slate-400">SESSION ENERGY</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {energyKwh.toFixed(2)} <span className="text-xs text-slate-400 font-normal">kWh</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">MID-Class 1 Certified</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col">
                <span className="text-[11px] font-mono text-slate-400">LIVE BILLED COST</span>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                  ₹{currentCost.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">@ ₹{tariffRate}/kWh flat</span>
              </div>
            </div>
          </div>

          {/* Telemetry Status Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Ground Impedance: 0.12Ω (Safe)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                Wallbox Temp: 34°C
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>DURATION: {formatTime(elapsedSec)}</span>
            </div>
          </div>

          {/* Instant Receipt Pop-up upon Stop */}
          {showReceipt && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Session Completed & Settled</span>
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Ref: VS-SIM-9481
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Delivered {energyKwh} kWh in {formatTime(elapsedSec)} • Total: ₹{currentCost.toFixed(2)}
                  </div>
                </div>
              </div>

              <Link
                href="/chargers"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0 shadow-md"
              >
                Book Real Charging Slot
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
