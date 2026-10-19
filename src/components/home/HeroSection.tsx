'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Shield,
  ArrowRight,
  Zap,
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
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Human Headline & Value Proposition */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3">
            Bhopal Community Charging Network
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Rent a neighbor’s EV charger. Or share yours to earn.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            Book guaranteed driveway charging bays in residential neighborhoods. Plug in overnight or during work hours at 40% less than public commercial stations.
          </p>
        </div>

        {/* Clean, High-Utility Search Bar (Airbnb / Zapmap style) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl mb-10">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-2.5">
            <div className="flex-1 relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Neighborhood or area (e.g. Arera Colony, MP Nagar, Shahpura...)"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-slate-600 transition-colors"
              />
            </div>

            <div className="w-full md:w-56 relative flex items-center">
              <select
                value={selectedPlug}
                onChange={(e) => setSelectedPlug(e.target.value)}
                aria-label="Filter by plug type"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-slate-600 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Plug Types</option>
                <option value="Type 2">Type 2 AC (7.4 – 22kW)</option>
                <option value="15A Socket">15A Standard Socket</option>
              </select>
              <div className="absolute right-3.5 pointer-events-none text-slate-500 text-xs">▼</div>
            </div>

            <button
              type="submit"
              className="px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Bays</span>
            </button>
          </form>

          {/* Quiet Neighborhood Chips */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Popular:</span>
            {['Arera Colony E-7', 'MP Nagar Zone-2', 'Shahpura Lakeview', 'Gulmohar Colony'].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setSearchLocation(area);
                  router.push(`/chargers?search=${encodeURIComponent(area)}`);
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Quiet Trust Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>₹14 – ₹18 per kWh flat</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>Aadhaar verified drivers & hosts</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>₹5,00,000 property damage cover</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>Weekly direct UPI bank payouts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
