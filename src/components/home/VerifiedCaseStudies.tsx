'use client';

import React from 'react';
import { Star, MapPin } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Arjun Verma',
    role: 'Homeowner & Host',
    location: 'E-7 Arera Colony, Bhopal',
    stat: '₹16,400 earned last month',
    quote:
      'My 7.4kW charger was sitting idle during the day while I was at work. Listing on VoltShare was straightforward—the gate code feature means I don’t even have to be home when neighbors charge.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Vikramaditya Roy',
    role: 'Nexon EV Owner',
    location: 'MP Nagar, Bhopal',
    stat: 'Saves ~₹3,500/month',
    quote:
      'Commercial fast chargers in Bhopal charge ₹24 to ₹28 per unit, and you often get stuck behind fleet cars. Now I plug in overnight at Arjun’s driveway for ₹16/kWh and wake up to 100% full battery.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Dr. Radhika Sharma',
    role: 'Driveway Host',
    location: 'Shahpura Lakeview, Bhopal',
    stat: 'Zero issues over 4 months',
    quote:
      'I was initially worried about electrical safety and strangers on the property. The Aadhaar verification and ₹5 Lakh insurance gave me the reassurance I needed. Weekly payouts go straight to my bank account.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export default function VerifiedCaseStudies() {
  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What Hosts & Drivers Say
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm">
            Real feedback from early members using VoltShare in Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="text-xs font-semibold text-emerald-400 mb-3">
                  {r.stat}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">{r.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
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
