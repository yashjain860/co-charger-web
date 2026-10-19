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
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#06090e]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
            <Zap className="w-4 h-4 fill-slate-950" />
          </div>
          <span className="font-bold text-base tracking-tight text-white">
            VoltShare
          </span>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-white/[0.08] text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-7 rounded-lg bg-slate-800/60 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/bookings"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-slate-200 hover:border-white/[0.15] transition"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user.name.split(' ')[0]}</span>
                {user.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 uppercase">
                  {user.role}
                </span>
              </Link>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
