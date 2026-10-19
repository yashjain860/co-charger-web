'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  UserCheck,
  Zap,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export default function TrustSafetyGuarantee() {
  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#070b13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Safety, Security & Insurance
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm max-w-2xl">
            Opening your driveway requires total peace of mind. Every reservation is protected by physical safety interlocks, verified identities, and property insurance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">₹5,00,000 Property Cover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatic property and electrical damage protection on every active booking, covering host electrical meters, gates, and wiring.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">100% Verified Users</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drivers complete government Aadhaar and driving license verification before their first booking. No anonymous visitors.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">Automatic Circuit Cutoff</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Type-B RCD sensors instantly trip electricity delivery in 15 milliseconds if an earth fault, overcurrent, or overheating is detected.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base mb-1">Gate Passcode Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hosts do not need to wait outside. Drivers receive a temporary 4-digit code for the gate intercom that expires upon session completion.
            </p>
          </div>
        </div>

        {/* Regulatory note */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Ministry of Power Legal Compliance:</strong> Under official Government of India guidelines, EV charging is classified as a service rather than the resale of electricity, requiring no distribution license for residential homeowners or housing societies.
          </span>
        </div>
      </div>
    </section>
  );
}
