'use client';

import React from 'react';
import {
  TrendingUp,
  Zap,
  Shield,
  Users,
} from 'lucide-react';

interface HostStatsHeaderProps {
  userName: string;
}

export default function HostStatsHeader({ userName }: HostStatsHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Host Dashboard
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Welcome back, {userName || 'Arjun'}. Monitor your active charging bays, guest sessions, and bank payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Bay Online</span>
          </span>
        </div>
      </div>

      {/* 4 Clean Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Net Monthly Payout</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            ₹16,400.00
          </div>
          <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Next settlement:</span>
            <span className="text-slate-200">Monday, 9:00 AM</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Energy Shared</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            1,024 <span className="text-sm font-normal text-slate-400">kWh</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Utilization rate:</span>
            <span className="text-slate-200">~6.5 hrs/day</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Guest Sessions</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            18 <span className="text-sm font-normal text-slate-400">sessions</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Average rating:</span>
            <span className="text-slate-200">4.9 / 5.0</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Property Insurance</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            ₹5,00,000
          </div>
          <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex justify-between">
            <span>Policy Status:</span>
            <span className="text-emerald-400 font-medium">Cover Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
