'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Home,
  Search,
  KeyRound,
  Zap,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock,
  Lock,
} from 'lucide-react';

export default function DualPersonaWorkflow() {
  const [activePersona, setActivePersona] = useState<'driver' | 'host'>('driver');

  return (
    <section className="py-24 bg-slate-950 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How VoltShare Operates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Engineered For Drivers. Built For Hosts.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            A seamless two-sided marketplace designed to eliminate range anxiety in dense urban neighborhoods while generating hands-free host income.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10">
            <button
              type="button"
              onClick={() => setActivePersona('driver')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activePersona === 'driver'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>For EV Drivers</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePersona('host')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activePersona === 'host'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>For Residential & Society Hosts</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Content */}
        {activePersona === 'driver' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-white">Find Nearby Driveways</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Filter by exact vehicle connector (Type-2, 15A), power speed (7.4kW - 22kW), and real-time live availability in your neighborhood.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <Search className="w-4 h-4" />
                  <span>Sub-kilometer GPS accuracy</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-white">Reserve Guaranteed Bay</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Select your charging window (1h to 4h). Pay securely via UPI/Card into escrow. Your private driveway slot is reserved with zero queueing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Instant slot confirmation</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-white">Arrive & Unlock Gate</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Drive up to host premises, share your 4-digit verified entry passcode at the gate intercom, plug your EV, and initiate charging.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <KeyRound className="w-4 h-4" />
                  <span>Zero host awkwardness</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-white">Live Telemetry & Receipt</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Track live battery %, voltage, and kWh on your phone. When complete, power auto-cuts, escrow releases, and GST receipt is emailed.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CreditCard className="w-4 h-4" />
                  <span>Automated digital settlement</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/chargers"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              >
                <span>Find Your Next Driveway Slot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-white">List Charger in 3 Min</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Enter your address, upload 2 photos of your driveway or parking bay, and connect your existing wallbox or order a VoltShare Smart unit.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <Home className="w-4 h-4" />
                  <span>Zero listing fees</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-white">Set Rules & Rates</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    You dictate everything: choose allowed charging hours (e.g. 9am to 6pm while at work), set per-kWh tariff, and block personal days.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <Lock className="w-4 h-4" />
                  <span>100% host autonomy</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-white">Hands-Free Security</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Drivers are 100% Aadhaar-verified. Only confirmed bookings receive gate entry PINs. Your personal home interior stays completely private.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>₹5 Lakh property guarantee</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-4">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-white">Weekly Bank Payouts</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Metered energy consumption is calculated automatically. Net earnings are deposited directly to your bank account every Monday via UPI/NEFT.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-cyan-400 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Direct automated settlement</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/host"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                <span>List Your Charger as a Host</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
