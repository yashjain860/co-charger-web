'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Search,
  MapPin,
  ShieldCheck,
  TrendingUp,
  BatteryCharging,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedPlug, setSelectedPlug] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set('search', searchLocation.trim());
    if (selectedPlug !== 'all') params.set('connector', selectedPlug);
    router.push(`/chargers?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-white/[0.06]">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top live network status badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>LIVE IN BHOPAL: 8 Verified Residential Chargers Active • ₹14-₹18/kWh Flat Rates</span>
          </div>
        </div>

        {/* Master headline & value proposition */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            The Neighborhood EV Charging Mesh.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Charge At Your Neighbor’s Driveway.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            VoltShare turns idle residential wallboxes into high-yield passive revenue for hosts, while giving EV drivers guaranteed, reserved charging bays at 40% less than public commercial fast chargers.
          </p>
        </div>

        {/* Instant Search Bar Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl mb-12">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative flex items-center">
              <MapPin className="absolute left-4 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search neighborhood (e.g. Arera Colony, MP Nagar, Shahpura...)"
                className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="w-full md:w-56 relative flex items-center">
              <Zap className="absolute left-4 w-4 h-4 text-emerald-400" />
              <select
                value={selectedPlug}
                onChange={(e) => setSelectedPlug(e.target.value)}
                aria-label="Filter by connector type"
                className="w-full pl-11 pr-8 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Connectors</option>
                <option value="Type 2">Type 2 AC (7.4 - 22kW)</option>
                <option value="15A Socket">15A Industrial Plug</option>
                <option value="CCS2">CCS2 Fast</option>
              </select>
              <div className="absolute right-4 pointer-events-none text-slate-400 text-xs">▼</div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Chargers</span>
            </button>
          </form>

          {/* Quick tags */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Popular hubs:</span>
            {['Arera Colony E-7', 'MP Nagar Zone-2', 'Shahpura Lakeview', 'Gulmohar Colony', 'Bawadiya Kalan'].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setSearchLocation(area);
                  router.push(`/chargers?search=${encodeURIComponent(area)}`);
                }}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-300 border border-white/[0.06] transition-colors"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics HUD Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">₹14 - ₹18</div>
              <div className="text-xs text-slate-400">Avg Cost per kWh</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">100% KYC</div>
              <div className="text-xs text-slate-400">Aadhaar Verified Hosts</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">₹16,400+</div>
              <div className="text-xs text-slate-400">Avg Host Monthly Payout</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">₹5 Lakh</div>
              <div className="text-xs text-slate-400">Host Property Protection</div>
            </div>
          </div>
        </div>

        {/* Dual primary action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chargers"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 group"
          >
            <span>Explore Active Chargers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/host"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base border border-white/10 transition-all flex items-center justify-center gap-2 hover:border-emerald-500/40"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>List Your Space & Earn</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
