'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-[#04060a] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bhopal Community Mesh Live</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Charge at Your Neighbor’s Driveway or Earn Passive Cash?
        </h2>

        <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Join hundreds of EV owners and smart homeowners creating a decentralized charging grid across Bhopal. Zero upfront listing fees.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chargers"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group"
          >
            <span>Find A Charger Near Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/host"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-white/10 transition-all flex items-center justify-center gap-2 hover:border-emerald-500/40"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>List My Driveway & Earn</span>
          </Link>
        </div>

        {/* Small trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ₹5 Lakh Property Guarantee
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            100% Aadhaar Verified Users
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Weekly Automated UPI Bank Payouts
          </span>
        </div>
      </div>
    </section>
  );
}
