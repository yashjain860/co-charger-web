'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Zap, MapPin, PlusCircle, Calendar, LogOut, User, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, openAuthModal, logout } = useAuth();

  const navLinks = [
    { label: 'Explore Chargers', href: '/chargers', icon: MapPin },
    { label: 'Host Studio', href: '/host', icon: PlusCircle },
    { label: 'My Bookings', href: '/bookings', icon: Calendar },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#06090e]/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              VoltShare <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">PROD</span>
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-8 rounded-lg bg-slate-800/60 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/bookings"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:border-slate-700 transition"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold">{user.name.split(' ')[0]}</span>
                {user.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                  {user.role}
                </span>
              </Link>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 transition"
              >
                Join Mesh
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
