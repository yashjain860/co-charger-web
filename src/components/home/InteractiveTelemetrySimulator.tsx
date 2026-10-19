'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Square,
  RotateCcw,
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
  const currentVoltage = isPlaying ? (230 + Math.sin(elapsedSec) * 2).toFixed(1) : '230.0';
  const currentAmps = isPlaying ? ((selectedCar.maxKw * 1000) / 230).toFixed(1) : '0.0';
  const currentPower = isPlaying ? selectedCar.maxKw.toFixed(1) : '0.0';

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Charging Works in Real-Time
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm max-w-2xl">
            Simulate a charging session to see the real-time battery readout, electricity delivery, and automatic bill calculation.
          </p>
        </div>

        {/* Car selector tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CARS.map((car) => (
            <button
              key={car.name}
              type="button"
              onClick={() => setSelectedCar(car)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCar.name === car.name
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {car.name} ({car.batteryKwh} kWh)
            </button>
          ))}
        </div>

        {/* Simulation Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div>
              <div className="text-sm font-semibold text-white">{selectedCar.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Connected to 7.4 kW Level-2 AC Driveway Wallbox
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    setShowReceipt(false);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Charging</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setShowReceipt(true);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop Session</span>
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
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 py-8 items-center">
            {/* Battery Circle */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-emerald-400 transition-all duration-300"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - soc / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {Math.round(soc)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isPlaying ? 'Charging active' : 'Plugged in'}
                  </div>
                </div>
              </div>
            </div>

            {/* Readouts */}
            <div className="sm:col-span-7 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Active Output</span>
                <span className="text-xl font-bold text-white mt-1 block">{currentPower} kW</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Voltage / Current</span>
                <span className="text-xl font-bold text-white mt-1 block">{currentVoltage}V / {currentAmps}A</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Energy Delivered</span>
                <span className="text-xl font-bold text-white mt-1 block">{energyKwh.toFixed(2)} kWh</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Current Bill</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">₹{currentCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Time and Status Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Elapsed: {formatTime(elapsedSec)}</span>
            <span>Billing Rate: ₹{tariffRate}/kWh flat</span>
          </div>

          {/* Receipt on finish */}
          {showReceipt && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-white font-semibold">Simulated Session Completed: </span>
                  <span className="text-slate-400">Delivered {energyKwh} kWh in {formatTime(elapsedSec)} for ₹{currentCost.toFixed(2)}.</span>
                </div>
              </div>

              <Link
                href="/chargers"
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-semibold text-xs rounded-lg hover:bg-emerald-400 transition-colors shrink-0"
              >
                Find Real Chargers
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
