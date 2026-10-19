'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  ZapOff,
  CheckCircle2,
  FileCheck2,
  BadgeAlert,
  ArrowRight,
} from 'lucide-react';

export default function TrustSafetyGuarantee() {
  return (
    <section className="py-24 bg-slate-950 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bank-Grade Trust & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Designed To Protect Your Home & Electrical Grid
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Opening your driveway to a neighbor requires iron-clad confidence. VoltShare combines hardware safety interlocks, full KYC verification, and ₹5 Lakh underwritten property protection.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">₹5 Lakh Property Shield</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Every reservation includes automatic property liability and electrical surge protection up to ₹5,00,000 covering host panels, meters, and gates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-emerald-400">
              Underwritten Policy Included
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Aadhaar KYC</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Zero anonymous drivers. Every user passes government identity verification and vehicle registration matching before booking their first driveway.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-emerald-400">
              Real-time UIDAI API Verified
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <ZapOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">15ms Electrical Cutoff</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Type-B RCD sensors monitor earth leakage, DC residual currents, and thermal spikes, triggering a 15-millisecond instant circuit trip on any anomaly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-emerald-400">
              CEA 2023 Grid Standards
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">One-Time Gate OTP</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Hosts never have to be present or open doors. Drivers use a time-bound 4-digit code for gate intercom or smart lock, expiring right after the session.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-emerald-400">
              Time-Bound Cryptographic Pin
            </div>
          </div>
        </div>

        {/* Legal Regulatory Compliance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                100% Compliant with Ministry of Power (MoP) EV Charging Guidelines
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Under the Indian Electricity Act (Amendment 2022), providing an EV charging service is classified as a value-added service, not retail resale of electricity, requiring no distribution license.
              </p>
            </div>
          </div>

          <Link
            href="/host"
            className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/10 whitespace-nowrap transition-colors"
          >
            Review Legal Terms
          </Link>
        </div>
      </div>
    </section>
  );
}
