'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DualPersonaWorkflow() {
  const [activePersona, setActivePersona] = useState<'driver' | 'host'>('driver');

  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#070b13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How It Works
            </h2>
            <p className="mt-1.5 text-slate-400 text-sm">
              Simple steps for EV owners charging nearby and homeowners hosting their space.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActivePersona('driver')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePersona === 'driver'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For EV Drivers
            </button>
            <button
              type="button"
              onClick={() => setActivePersona('host')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePersona === 'host'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              For Hosts
            </button>
          </div>
        </div>

        {/* Workflow steps */}
        {activePersona === 'driver' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 1</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Find a Nearby Bay</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Search by neighborhood and filter by plug type (Type-2 AC or 15A) and charging speed.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 2</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Reserve Your Slot</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pick your arrival time and duration. Your parking space is guaranteed with zero queueing.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 3</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Arrive & Plug In</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your 4-digit gate access PIN at the host's intercom, park in the driveway bay, and plug in.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 4</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Track & Auto-Pay</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Watch live battery progress on your phone. When complete, power auto-cuts and your receipt is emailed.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/chargers"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>Browse nearby chargers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 1</span>
                <h3 className="font-semibold text-white text-base mb-1.5">List in 3 Minutes</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your address, upload a photo of your driveway, and specify your charger power.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 2</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Set Your Schedule</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Choose which hours and days your driveway is open for booking, and set your price per kWh.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 3</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Automated Gate Entry</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Only verified drivers with confirmed bookings receive gate access codes. Your home stays private.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Step 4</span>
                <h3 className="font-semibold text-white text-base mb-1.5">Weekly Bank Payouts</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Earnings from guest charging are calculated automatically and deposited to your bank every Monday.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/host"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>List your charger as a host</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
