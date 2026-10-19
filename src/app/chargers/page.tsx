'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Zap,
  MapPin,
  Star,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  BatteryCharging,
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

export default function ChargersDiscoveryPage() {
  const [chargers, setChargers] = useState<ChargerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedConnector, setSelectedConnector] = useState('all');
  const [minPower, setMinPower] = useState(0);

  const fetchChargers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedConnector !== 'all') params.set('connector', selectedConnector);
      if (minPower > 0) params.set('minPower', minPower.toString());

      const res = await fetch(`/api/v1/chargers?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setChargers(data.chargers || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch chargers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchChargers();
    }, 200);
    return () => clearTimeout(timeout);
  }, [search, selectedConnector, minPower]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              Live Mesh Directory
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Community EV Chargers Nearby
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Private driveways and dedicated bays in Bhopal, available for reservation.
            </p>
          </div>

          <Link
            href="/host"
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Host Your Charger</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center gap-3">
          {/* Text Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by neighborhood, street, or host (e.g. Arera Colony, MP Nagar)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Connector Pills */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {['all', 'Type 2', 'CCS2', '15A Socket'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedConnector(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedConnector === type
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {type === 'all' ? 'All Plugs' : type}
              </button>
            ))}
          </div>

          {/* Power Selector */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setMinPower(minPower === 7.4 ? 0 : 7.4)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                minPower === 7.4
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              ⚡ ≥ 7.4 kW
            </button>
            <button
              onClick={() => setMinPower(minPower === 11 ? 0 : 11)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                minPower === 11
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              ⚡ ≥ 11 kW
            </button>
          </div>
        </div>
      </div>

      {/* Chargers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : chargers.length === 0 ? (
        <div className="p-16 text-center rounded-2xl glass-panel border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Chargers Matched Your Filters</h3>
          <p className="text-xs text-slate-400 mb-4">Try clearing filters or searching another area in Bhopal.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedConnector('all');
              setMinPower(0);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chargers.map((charger) => (
            <div
              key={charger.id}
              className="group rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              {/* Image Preview with Distance Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={charger.photos?.[0] || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80'}
                  alt={charger.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{charger.distanceKm.toFixed(1)} km away</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-md">
                  {charger.powerKw} kW
                </div>
              </div>

              {/* Details Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-300">{charger.parkingType}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{charger.rating}</span>
                      <span className="text-slate-500 font-normal">({charger.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition mb-1 line-clamp-1">
                    {charger.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {charger.address}, {charger.city}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Rate</span>
                    <span className="text-lg font-black text-white font-mono">₹{charger.pricingPerKwh}</span>
                    <span className="text-[10px] text-slate-400 font-normal"> / kWh</span>
                  </div>

                  <Link
                    href={`/chargers/${charger.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5"
                  >
                    <span>Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
