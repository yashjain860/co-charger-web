'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-20 bg-[#090d16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Start Charging or Earn as a Host Today
        </h2>

        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Reserve a guaranteed charging slot near your destination, or list your driveway wallbox to generate passive monthly income.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/chargers"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Find a Charger</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/host"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-800 transition-colors"
          >
            <span>List Your Space</span>
          </Link>
        </div>

        <div className="mt-10 text-xs text-slate-500">
          No long-term contracts • Aadhaar verified drivers • ₹5 Lakh damage protection
        </div>
      </div>
    </section>
  );
}
