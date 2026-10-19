'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  MapPin,
  Star,
  ShieldCheck,
  BatteryCharging,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ChargerItem {
  id: string;
  hostName: string;
  title: string;
  description: string;
  address: string;
  city: string;
  powerKw: number;
  connectorType: string;
  pricingPerKwh: number;
  parkingType: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  photos: string[];
}

export default function LiveChargerShowcase() {
  const [chargers, setChargers] = useState<ChargerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterKw, setFilterKw] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/v1/chargers');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.chargers?.length > 0) {
            setChargers(data.chargers);
          }
        }
      } catch (err) {
        console.error('Error fetching showcase chargers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = filterKw === 0 
    ? chargers 
    : chargers.filter(c => c.powerKw >= filterKw);

  return (
    <section className="py-20 bg-slate-950/60 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Real-Time Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live Neighborhood Wallboxes Available Now
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-2xl">
              Verified private driveways and residential garages equipped with high-speed Level-2 AC chargers. Reserve in advance with guaranteed bay vacancy.
            </p>
          </div>

          {/* Quick power filter chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Speeds', kw: 0 },
              { label: '7.4 kW Home', kw: 7.4 },
              { label: '11 kW Commercial', kw: 11 },
              { label: '22 kW Pro', kw: 22 },
            ].map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFilterKw(f.kw)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterKw === f.kw
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.09] border border-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Charger Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/[0.06]">
            <p className="text-slate-400">No active chargers found matching this speed tier.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.slice(0, 4).map((charger) => (
              <div
                key={charger.id}
                className="group rounded-2xl bg-slate-900/70 border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-emerald-500/10"
              >
                {/* Photo & Power Badge */}
                <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={charger.photos?.[0] || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'}
                    alt={charger.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-emerald-400" />
                      {charger.powerKw} kW
                    </span>
                    <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-slate-300 text-xs border border-white/10">
                      {charger.connectorType}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Ready
                    </span>
                  </div>

                  {/* Pricing on bottom edge of photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-xl font-bold font-mono">₹{charger.pricingPerKwh}</span>
                      <span className="text-xs text-slate-300"> / kWh</span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-white">{charger.rating.toFixed(1)}</span>
                      <span>({charger.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {charger.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="line-clamp-1">{charger.address}</span>
                    </p>

                    <div className="mt-3 py-2 px-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Host:
                      </span>
                      <span className="font-medium text-slate-200">{charger.hostName}</span>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-emerald-400/90 font-medium">Instant Reserve</span>
                    <Link
                      href={`/chargers/${charger.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 text-xs font-semibold border border-emerald-500/20 hover:border-transparent transition-all flex items-center gap-1 group/btn"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discovery Footer Link */}
        <div className="mt-10 text-center">
          <Link
            href="/chargers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View all 8 Bhopal chargers on interactive map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
