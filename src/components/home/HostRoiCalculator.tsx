'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HostRoiCalculator() {
  const [powerKw, setPowerKw] = useState<number>(7.4);
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [monthlyDays, setMonthlyDays] = useState<number>(26);
  const [homeTariff, setHomeTariff] = useState<number>(8.0);
  const [chargeRate, setChargeRate] = useState<number>(16.0);

  // Computations
  const monthlyKwh = Math.round(powerKw * dailyHours * monthlyDays * 0.75);
  const grossMonthlyRevenue = Math.round(monthlyKwh * chargeRate);
  const electricityCost = Math.round(monthlyKwh * homeTariff);
  const platformFee = Math.round(grossMonthlyRevenue * 0.10);
  const netMonthlyProfit = grossMonthlyRevenue - electricityCost - platformFee;
  const netAnnualProfit = netMonthlyProfit * 12;

  const hardwareCost = powerKw <= 7.4 ? 28999 : 64999;
  const paybackMonths = (hardwareCost / Math.max(1, netMonthlyProfit)).toFixed(1);

  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#070b13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Host Earnings Calculator
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm max-w-2xl">
            Estimate your monthly net profit after factoring in domestic electricity costs and platform fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {/* Power selection */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium mb-2 text-slate-300">
                <span>Charger Rating:</span>
                <span className="text-emerald-400 font-bold">{powerKw} kW</span>
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
                    className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                      powerKw === item.val
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Hours Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium mb-2 text-slate-300">
                <span>Sharing Hours Per Day:</span>
                <span className="text-white font-bold">{dailyHours} hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Days Per Month Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium mb-2 text-slate-300">
                <span>Active Days Per Month:</span>
                <span className="text-white font-bold">{monthlyDays} days</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="2"
                value={monthlyDays}
                onChange={(e) => setMonthlyDays(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Tariffs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1.5">
                  <span>Your Domestic Tariff:</span>
                  <span className="text-white">₹{homeTariff.toFixed(1)}/kWh</span>
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
                <div className="flex justify-between text-slate-400 mb-1.5">
                  <span>Guest Rate Charged:</span>
                  <span className="text-emerald-400">₹{chargeRate.toFixed(1)}/kWh</span>
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

          {/* Results Summary */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-xs text-slate-400">Estimated Net Monthly Profit</div>
            <div className="text-3xl sm:text-4xl font-bold text-white mt-1 text-emerald-400">
              ₹{netMonthlyProfit.toLocaleString('en-IN')}
              <span className="text-sm font-normal text-slate-400"> / month</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Annualized net income: <span className="text-white font-semibold">₹{netAnnualProfit.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-2.5 my-6 py-4 border-t border-b border-slate-800 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Energy shared:</span>
                <span className="text-slate-200">{monthlyKwh} kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Gross driver payments:</span>
                <span className="text-slate-200">₹{grossMonthlyRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Domestic electricity cost:</span>
                <span className="text-red-400">-₹{electricityCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform facilitation fee (10%):</span>
                <span className="text-slate-400">-₹{platformFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 mb-5">
              Estimated hardware payback: <span className="text-white font-medium">~{paybackMonths} months</span>
            </div>

            <Link
              href="/host"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>List Your Charger as a Host</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
