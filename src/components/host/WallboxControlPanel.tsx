'use client';

import React, { useState } from 'react';
import {
  Zap,
  Power,
  ShieldCheck,
  Check,
  Copy,
  QrCode,
  MapPin,
  Clock,
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

export default function WallboxControlPanel({ charger }: ChargerProps) {
  const [isPaused, setIsPaused] = useState(!charger.isAvailable);
  const [copied, setCopied] = useState(false);

  // Policy toggles
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
      {/* LEFT: Realistic Hardware Status Console */}
      <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="text-xs text-slate-400">Hardware Node</div>
            <h3 className="text-base font-semibold text-white mt-0.5">
              {charger.title}
            </h3>
          </div>

          <span
            className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5 ${
              isPaused
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPaused ? 'bg-slate-500' : 'bg-emerald-400'
              }`}
            />
            <span>{isPaused ? 'Bay Paused' : 'Bay Online & Ready'}</span>
          </span>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Rated Output</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">
              {charger.powerKw} kW AC
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Connector</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">
              {charger.connectorType}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Guest Tariff</span>
            <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">
              ₹{charger.pricingPerKwh}/kWh
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Breaker Rating</span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
              32A Continuous
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Line Voltage</span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
              231.4 V (50Hz)
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block">Earth Ground</span>
            <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">
              0.11 Ω (Safe)
            </span>
          </div>
        </div>

        {/* Location & Controls */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="line-clamp-1">{charger.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySerial}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Serial'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isPaused
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Power className="w-3 h-3" />
              <span>{isPaused ? 'Resume Bay' : 'Pause Bay'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Clean Policy Controls */}
      <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="pb-3 border-b border-slate-800 mb-4">
          <h3 className="text-base font-semibold text-white">
            Operational Policies
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Rules applied to visiting drivers booking this charging slot.
          </p>
        </div>

        <div className="divide-y divide-slate-800/80 text-xs">
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-white">Instant Booking</div>
              <div className="text-slate-400 mt-0.5">
                Verified Aadhaar KYC drivers can reserve slots automatically without waiting for host confirmation.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoBooking(!autoBooking)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                autoBooking ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoBooking ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-white">Overstay Fee (₹2/min)</div>
              <div className="text-slate-400 mt-0.5">
                Automatically fines drivers who remain parked past a 15-minute grace period after charging completes.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOverstayPenalty(!overstayPenalty)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                overstayPenalty ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  overstayPenalty ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-white">Solar Priority Charging</div>
              <div className="text-slate-400 mt-0.5">
                Only open the bay when household rooftop solar inverter is generating surplus electricity.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSolarOnly(!solarOnly)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                solarOnly ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  solarOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium text-white">Sunday Family Blackout</div>
              <div className="text-slate-400 mt-0.5">
                Keep the driveway bay private every Sunday for personal household vehicles.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWeekendBlackout(!weekendBlackout)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                weekendBlackout ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  weekendBlackout ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
