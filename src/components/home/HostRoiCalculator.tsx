'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Zap,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function HostRoiCalculator() {
  const [powerKw, setPowerKw] = useState<number>(7.4);
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [monthlyDays, setMonthlyDays] = useState<number>(26);
  const [homeTariff, setHomeTariff] = useState<number>(8.0);
  const [chargeRate, setChargeRate] = useState<number>(16.0);

  // Computations
  const monthlyKwh = Math.round(powerKw * dailyHours * monthlyDays * 0.75); // 75% average utilization during open hours
  const grossMonthlyRevenue = Math.round(monthlyKwh * chargeRate);
  const electricityCost = Math.round(monthlyKwh * homeTariff);
  const platformFee = Math.round(grossMonthlyRevenue * 0.10); // 10% platform fee
  const netMonthlyProfit = grossMonthlyRevenue - electricityCost - platformFee;
  const netAnnualProfit = netMonthlyProfit * 12;

  // Payback period assuming standard 7.4kW Wallbox (₹28,999)
  const hardwareCost = powerKw <= 7.4 ? 28999 : 64999;
  const paybackMonths = (hardwareCost / Math.max(1, netMonthlyProfit)).toFixed(1);

  return (
    <section className="py-24 bg-slate-950 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Host Economics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Calculate Your Monthly Driveway Earnings
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            See the exact passive income your idle home charger can generate each month. All numbers reflect actual domestic tariffs, 75% bay occupancy, and net bank payouts.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Configure Your Charging Setup</span>
            </h3>

            {/* Control 1: Charger Rating */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-300">Charger Power Rating:</span>
                <span className="text-emerald-400 font-mono font-bold">{powerKw} kW</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '3.3 kW', val: 3.3 },
                  { label: '7.4 kW', val: 7.4 },
                  { label: '11 kW', val: 11.0 },
                  { label: '22 kW', val: 22.0 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setPowerKw(item.val)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      powerKw === item.val
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Available Hours Per Day */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-300">Available Sharing Window:</span>
                <span className="text-emerald-400 font-mono font-bold">{dailyHours} hours / day</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>2 hrs (Part-time)</span>
                <span>6 hrs (Daytime)</span>
                <span>12 hrs (All-day)</span>
              </div>
            </div>

            {/* Control 3: Active Days Per Month */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-300">Sharing Days Per Month:</span>
                <span className="text-emerald-400 font-mono font-bold">{monthlyDays} days / mo</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="2"
                value={monthlyDays}
                onChange={(e) => setMonthlyDays(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>10 days (Weekends)</span>
                <span>20 days (Weekdays)</span>
                <span>30 days (Full month)</span>
              </div>
            </div>

            {/* Control 4: Dual Tariff Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-400">Your Domestic Tariff:</span>
                  <span className="text-slate-200 font-mono font-semibold">₹{homeTariff.toFixed(1)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="10.0"
                  step="0.5"
                  value={homeTariff}
                  onChange={(e) => setHomeTariff(parseFloat(e.target.value))}
                  className="w-full accent-slate-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-400">Guest Rate Charged:</span>
                  <span className="text-emerald-400 font-mono font-semibold">₹{chargeRate.toFixed(1)} / kWh</span>
                </div>
                <input
                  type="range"
                  min="14.0"
                  max="22.0"
                  step="1.0"
                  value={chargeRate}
                  onChange={(e) => setChargeRate(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Projected Earnings Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Estimated Net Payout
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-mono font-semibold">
                Direct to Bank
              </span>
            </div>

            {/* Master Profit Numbers */}
            <div className="my-6">
              <div className="text-xs text-slate-400">Projected Net Monthly Profit</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono mt-1 text-emerald-400">
                ₹{netMonthlyProfit.toLocaleString('en-IN')}
                <span className="text-base font-normal text-slate-400"> / mo</span>
              </div>
              <div className="mt-2 text-sm text-slate-300">
                Annualized Passive Income:{' '}
                <span className="font-bold text-white font-mono">
                  ₹{netAnnualProfit.toLocaleString('en-IN')} / year
                </span>
              </div>
            </div>

            {/* Breakdown itemized list */}
            <div className="space-y-3 py-4 border-t border-b border-white/[0.08] text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Estimated Energy Delivered:</span>
                <span className="font-mono text-slate-200">{monthlyKwh} kWh / month</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gross Driver Billings:</span>
                <span className="font-mono text-slate-200">₹{grossMonthlyRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Domestic Electricity Cost:</span>
                <span className="font-mono text-red-400">-₹{electricityCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>VoltShare 10% Platform Shield:</span>
                <span className="font-mono text-slate-400">-₹{platformFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payback badge */}
            <div className="mt-5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-400">Wallbox Hardware Payback:</span>
              <span className="font-mono font-bold text-emerald-400">
                ~{paybackMonths} Months to 100% ROI
              </span>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/host"
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
              >
                <span>Start Monetizing Your Driveway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
