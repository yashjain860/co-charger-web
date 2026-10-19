'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Sparkles,
  CreditCard,
  Users,
} from 'lucide-react';

interface HostStatsHeaderProps {
  userName: string;
}

export default function HostStatsHeader({ userName }: HostStatsHeaderProps) {
  return (
    <div className="mb-10">
      {/* Top Greeting & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Good morning, {userName || 'Arjun Verma'}
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Stay on top of your driveway chargers, monitor live guest sessions, and track weekly bank payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODE ONLINE • BHOPAL MESH</span>
          </span>
        </div>
      </div>

      {/* Grid of 4 Stat Cards with Framer Motion hover elevation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Net Balance */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Estimated Net Payout</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              ₹16,400.00
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4%</span>
              <span className="text-slate-500 font-normal">vs last month</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-white/[0.06] pt-2 flex justify-between">
            <span>Next settlement:</span>
            <span className="font-mono text-slate-200">Monday, 9:00 AM</span>
          </div>
        </motion.div>

        {/* Card 2: Today Energy Delivered */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Energy Shared (Month)</span>
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight">
              1,024 <span className="text-sm font-normal text-slate-400">kWh</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold font-mono">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.8%</span>
              <span className="text-slate-500 font-normal">utilization rate</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-white/[0.06] pt-2 flex justify-between">
            <span>Avg charging speed:</span>
            <span className="font-mono text-slate-200">7.2 kW AC</span>
          </div>
        </motion.div>

        {/* Card 3: Active Guest Bookings */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-500/40 shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Guest Reservations</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Users className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              18 <span className="text-sm font-normal text-slate-400">sessions</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
              <span>4.9 ★ rating</span>
              <span className="text-slate-500 font-normal">(18 reviews)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-white/[0.06] pt-2 flex justify-between">
            <span>Next driver arrival:</span>
            <span className="font-mono text-slate-200">Today, 6:00 PM</span>
          </div>
        </motion.div>

        {/* Card 4: Protection Status */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Host Property Shield</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
              ₹5 Lakh
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Comprehensive Cover Active</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-white/[0.06] pt-2 flex justify-between">
            <span>Policy Status:</span>
            <span className="font-mono text-emerald-400 font-semibold">Underwritten</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
