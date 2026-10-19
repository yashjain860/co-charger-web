import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04070c] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Zap className="w-4 h-4 fill-emerald-400" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">VoltShare</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs mb-4">
              Decentralized community EV charging mesh. Unlocking millions of private residential wallboxes for urban EV drivers.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Hosts & Driveways</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Platform Routes</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/chargers" className="hover:text-emerald-400 transition">
                  Find Nearby Chargers
                </Link>
              </li>
              <li>
                <Link href="/host" className="hover:text-emerald-400 transition">
                  Host Studio & Earnings
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-emerald-400 transition">
                  Driver Passes & Reservations
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-emerald-400 transition">
                  The EV Grid Story (Interactive)
                </Link>
              </li>
            </ul>
          </div>

          {/* Active Mesh Cities */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Active Hubs</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bhopal Central Hub (Arera, MP Nagar, Kolar)</span>
              </li>
              <li>Indore Super Corridor (Coming Soon)</li>
              <li>Jabalpur Ring Road (Coming Soon)</li>
              <li>Gwalior Fort Belt (Coming Soon)</li>
            </ul>
          </div>

          {/* Infrastructure & Standards */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Standards & Support</h4>
            <p className="text-slate-500 leading-relaxed mb-3">
              Certified per Ministry of Power EV charging guidelines. Type-2 and CCS2 compliant residential wallbox installations with 24/7 driver roadside support.
            </p>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <a href="mailto:info@thewebvale.com" className="hover:text-emerald-400 transition">
                info@thewebvale.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} VoltShare by TheWebVale. Community EV Charging Network. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Network Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
