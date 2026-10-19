'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
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
    chargeTime7Kw: '3.3 Hours',
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
    plugType: 'Type 2 AC (3-Phase)',
    chargeTime7Kw: '6.5 Hours',
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
    model: '450X Gen 3',
    batteryKwh: 3.7,
    obcKw: 3.3,
    plugType: '15A Socket / Type-2 Converter',
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
    plugType: '15A Household Socket',
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
    <section className="py-20 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Vehicle Compatibility & Charging Times
            </h2>
            <p className="mt-1.5 text-slate-400 text-sm">
              VoltShare hosts support standard Type-2 and 15A plugs used by all major Indian electric cars and two-wheelers.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search EV model..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 text-xs">
          {makes.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMake(m)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedMake === m
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Compatibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ev) => (
            <div
              key={`${ev.make}-${ev.model}`}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{ev.make}</span>
                  <span className="text-slate-300 font-medium">{ev.batteryKwh} kWh Pack</span>
                </div>

                <h3 className="font-semibold text-white text-base">{ev.model}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ev.plugType}</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">7.4 kW Home Speed:</span>
                    <span className="font-semibold text-white">{ev.chargeTime7Kw}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">15A Socket Speed:</span>
                    <span className="text-slate-300">{ev.chargeTime3Kw}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Full Charge Cost:</span>
                    <span className="font-semibold text-emerald-400">{ev.fullChargeCost}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Range: ~{ev.rangeKm} km</span>
                <Link
                  href="/chargers"
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <span>Find Bays</span>
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
