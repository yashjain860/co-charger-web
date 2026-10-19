'use client';

import React from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Zap,
} from 'lucide-react';

const REVIEWS = [
  {
    name: 'Arjun Verma',
    role: 'Driveway Host (Bungalow Owner)',
    location: 'E-7 Arera Colony, Bhopal',
    setup: '7.4 kW ABB Terra AC Wallbox',
    stat: '₹16,400 earned last month',
    statSub: '64 hours shared with neighbors',
    quote:
      'My 7.4kW charger was sitting idle 20 hours a day while I was at the office. VoltShare turned that empty space into pure passive cash. The automatic gate OTP and instant bank payouts mean I don’t even have to talk to anyone.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Vikramaditya Roy',
    role: 'EV Driver (Tata Nexon EV Max)',
    location: 'MP Nagar, Bhopal',
    setup: 'Daily Commuter (40.5 kWh Pack)',
    stat: '₹3,800 saved every month',
    statSub: 'vs commercial DC fast charging',
    quote:
      'Commercial fast chargers in Bhopal charge ₹24 to ₹28 per unit, and you often get stuck behind a taxi or dealing with broken RFID cards. On VoltShare, I plug in overnight at Arjun’s driveway for ₹16/kWh and wake up to 100% full battery.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Dr. Radhika Sharma',
    role: 'Driveway Host (Covered Garage)',
    location: 'Shahpura Lakeview, Bhopal',
    setup: '7.4 kW Schneider EVlink',
    stat: '100% Zero Neighbor Friction',
    statSub: 'Automated 15ms safety trip',
    quote:
      'My primary concern was security and whether a stranger could damage my home electrical meter. The Aadhaar KYC requirement and ₹5 Lakh insurance gave me complete confidence. It’s the easiest secondary income stream I have.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export default function VerifiedCaseStudies() {
  return (
    <section className="py-24 bg-slate-900/30 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Community Verified</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Loved By Neighborhood Hosts & Daily EV Drivers
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Real feedback from early hosts and EV owners operating on the VoltShare Bhopal community mesh.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="p-8 rounded-3xl bg-slate-950 border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Metric pill */}
                <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-sm font-bold text-emerald-400 font-mono">{r.stat}</div>
                  <div className="text-[11px] text-slate-400">{r.statSub}</div>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              {/* Author bio */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-3.5">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border border-emerald-500/30"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{r.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-slate-400">{r.role}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{r.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
