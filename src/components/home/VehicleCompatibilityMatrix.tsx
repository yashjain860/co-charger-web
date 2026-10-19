'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Zap,
  Battery,
  Clock,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface EVData {
  make: string;
  model: string;
  batteryKwh: number;
  obcKw: number;
  plugType: string;
  chargeTime7Kw: string;
  chargeTime3Kw: string;
  fullChargeCost: string;
  rangeKm: number;
}

const EV_LIST: EVData[] = [
  {
    make: 'Tata',
    model: 'Nexon EV Max / Empowered',
    batteryKwh: 40.5,
    obcKw: 7.2,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '4.5 Hours',
    chargeTime3Kw: '11.0 Hours',
    fullChargeCost: '₹648',
    rangeKm: 453,
  },
  {
    make: 'Tata',
    model: 'Punch EV Long Range',
    batteryKwh: 35.0,
    obcKw: 7.2,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '3.8 Hours',
    chargeTime3Kw: '9.5 Hours',
    fullChargeCost: '₹560',
    rangeKm: 421,
  },
  {
    make: 'Tata',
    model: 'Tiago EV XT / XZ+',
    batteryKwh: 24.0,
    obcKw: 3.3,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '3.3 Hours (limited by 3.3kW OBC)',
    chargeTime3Kw: '6.5 Hours',
    fullChargeCost: '₹384',
    rangeKm: 315,
  },
  {
    make: 'Mahindra',
    model: 'XUV400 EL Pro',
    batteryKwh: 39.4,
    obcKw: 7.2,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '4.4 Hours',
    chargeTime3Kw: '10.5 Hours',
    fullChargeCost: '₹630',
    rangeKm: 456,
  },
  {
    make: 'MG',
    model: 'ZS EV Exclusive',
    batteryKwh: 50.3,
    obcKw: 7.4,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '5.5 Hours',
    chargeTime3Kw: '13.5 Hours',
    fullChargeCost: '₹804',
    rangeKm: 461,
  },
  {
    make: 'Hyundai',
    model: 'Ioniq 5',
    batteryKwh: 72.6,
    obcKw: 11.0,
    plugType: 'Type 2 AC (3-Phase compatible)',
    chargeTime7Kw: '6.5 Hours (11kW: 4.8h)',
    chargeTime3Kw: '18.0 Hours',
    fullChargeCost: '₹1,161',
    rangeKm: 631,
  },
  {
    make: 'BYD',
    model: 'Atto 3',
    batteryKwh: 60.5,
    obcKw: 7.0,
    plugType: 'Type 2 AC (IEC 62196)',
    chargeTime7Kw: '7.0 Hours',
    chargeTime3Kw: '16.0 Hours',
    fullChargeCost: '₹968',
    rangeKm: 521,
  },
  {
    make: 'Ather',
    model: '450X Gen 3 / Apex',
    batteryKwh: 3.7,
    obcKw: 3.3,
    plugType: '15A Industrial / Type 2 Converter',
    chargeTime7Kw: '2.5 Hours',
    chargeTime3Kw: '3.5 Hours',
    fullChargeCost: '₹59',
    rangeKm: 150,
  },
  {
    make: 'Ola',
    model: 'S1 Pro Gen 2',
    batteryKwh: 4.0,
    obcKw: 3.3,
    plugType: '15A Household / Industrial Plug',
    chargeTime7Kw: '2.8 Hours',
    chargeTime3Kw: '4.0 Hours',
    fullChargeCost: '₹64',
    rangeKm: 195,
  },
];

export default function VehicleCompatibilityMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('All');

  const makes = ['All', 'Tata', 'Mahindra', 'MG', 'Hyundai', 'BYD', 'Ather', 'Ola'];

  const filtered = EV_LIST.filter((ev) => {
    const matchesMake = selectedMake === 'All' || ev.make === selectedMake;
    const matchesSearch =
      ev.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMake && matchesSearch;
  });

  return (
    <section className="py-24 bg-slate-900/40 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>Universal Compatibility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Will VoltShare Work With Your EV?
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            VoltShare hosts support 100% of Indian 4-wheel and 2-wheel electric vehicles with standard Type-2 (IEC 62196-2) and 15A plugs. Check your car’s exact charging parameters below.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your EV model (e.g. Nexon, Ioniq, Ather...)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {makes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMake(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedMake === m
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compatibility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev) => (
            <div
              key={`${ev.make}-${ev.model}`}
              className="p-6 rounded-2xl bg-slate-950 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {ev.make}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                    {ev.batteryKwh} kWh
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-1">{ev.model}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {ev.plugType}
                </p>

                <div className="mt-5 space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      VoltShare 7.4kW Speed:
                    </span>
                    <span className="font-mono font-bold text-white">{ev.chargeTime7Kw}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      15A / 3.3kW Socket Speed:
                    </span>
                    <span className="font-mono text-slate-300">{ev.chargeTime3Kw}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Full Charge Cost (@ ₹16/kWh):
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{ev.fullChargeCost}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400">Claimed Range: ~{ev.rangeKm} km</span>
                <Link
                  href="/chargers"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Find Slots</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
