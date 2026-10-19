'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Star,
  ArrowRight,
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
    <section className="py-20 border-b border-slate-800/80 bg-[#070b13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Driveway Chargers Ready to Book
            </h2>
            <p className="mt-1.5 text-slate-400 text-sm">
              Verified private slots in Bhopal with dedicated parking and Level-2 AC wallboxes.
            </p>
          </div>

          {/* Clean Speed Filters */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { label: 'All', kw: 0 },
              { label: '7.4 kW Home', kw: 7.4 },
              { label: '11 kW', kw: 11 },
              { label: '22 kW Fast', kw: 22 },
            ].map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFilterKw(f.kw)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterKw === f.kw
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Charger Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-xl bg-slate-900 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-slate-400 text-sm">No active chargers found matching this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.slice(0, 4).map((charger) => (
              <div
                key={charger.id}
                className="rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="relative h-44 w-full bg-slate-800">
                  <img
                    src={charger.photos?.[0] || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80'}
                    alt={charger.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-emerald-400 font-semibold text-xs border border-white/10">
                      {charger.powerKw} kW
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-slate-300 text-xs border border-white/10">
                      {charger.connectorType}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{charger.parkingType}</span>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-white">{charger.rating.toFixed(1)}</span>
                        <span>({charger.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-white text-sm leading-snug line-clamp-1">
                      {charger.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{charger.address}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-white">₹{charger.pricingPerKwh}</span>
                      <span className="text-xs text-slate-400"> / kWh</span>
                    </div>

                    <Link
                      href={`/chargers/${charger.id}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/chargers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View all verified charging bays in Bhopal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
