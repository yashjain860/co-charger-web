'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import HostStatsHeader from '@/components/host/HostStatsHeader';
import InteractiveWallboxCard from '@/components/host/InteractiveWallboxCard';
import {
  Zap,
  PlusCircle,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Sliders,
  Power,
  Trash2,
  Sparkles,
  ArrowRight,
  Layers,
  History,
} from 'lucide-react';

export default function HostStudioPage() {
  const { user, openAuthModal, triggerConfetti } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'chargers' | 'new' | 'payouts'>('overview');

  const [chargers, setChargers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Charger Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bhopal');
  const [pincode, setPincode] = useState('462016');
  const [lat, setLat] = useState('23.2185');
  const [lng, setLng] = useState('77.4265');
  const [powerKw, setPowerKw] = useState('7.4');
  const [connectorType, setConnectorType] = useState('Type 2');
  const [pricingPerKwh, setPricingPerKwh] = useState('16');
  const [parkingType, setParkingType] = useState('Driveway');
  const [accessNotes, setAccessNotes] = useState('Gated independent house. Intercom code 5821 on arrival.');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchHostChargers = async () => {
    try {
      // If user is logged in, query by hostId, otherwise fetch all to showcase demo
      const url = user ? `/api/v1/chargers?hostId=${user.id}` : '/api/v1/chargers';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.chargers) {
          setChargers(data.chargers);
        }
      }
    } catch (err) {
      console.error('Failed to load host chargers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostChargers();
  }, [user]);

  const handleCreateCharger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/chargers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          address,
          city,
          pincode,
          lat,
          lng,
          powerKw,
          connectorType,
          pricingPerKwh,
          parkingType,
          accessNotes,
          schedule: {
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            startHour: '08:00',
            endHour: '22:00',
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to list charger');
      }

      triggerConfetti();
      await fetchHostChargers();
      setActiveTab('chargers');
      setTitle('');
      setAddress('');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleAvailability = async (chargerId: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/v1/chargers/${chargerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentStatus }),
      });
      fetchHostChargers();
    } catch (err) {
      console.error(err);
    }
  };

  // Sample default charger for 3D card display if host has no listed chargers yet
  const primaryCharger = chargers[0] || {
    id: 'demo-wbx',
    title: 'Arera Colony 7.4kW Type-2 Driveway Charger',
    address: 'E-7/42, Near 10 No. Market, Arera Colony',
    powerKw: 7.4,
    connectorType: 'Type 2',
    pricingPerKwh: 16,
    isAvailable: true,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. TOP GREETING & STATS (Framer Motion hover cards) */}
      <HostStatsHeader userName={user?.name || 'Arjun Verma'} />

      {/* 2. SUB-NAVIGATION TABS (Fluid Pill Switcher) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10">
          {[
            { id: 'overview', label: 'Overview & Hardware', icon: Layers },
            { id: 'chargers', label: `My Listed Bays (${chargers.length})`, icon: Zap },
            { id: 'payouts', label: 'Payouts & Escrow', icon: TrendingUp },
            { id: 'new', label: '+ Add Bay Listing', icon: PlusCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 relative ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Quick List Charger</span>
        </button>
      </div>

      {/* 3. ANIMATED TAB CONTENT */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            {/* 3D Physical Wallbox Card + Policy Controls */}
            <InteractiveWallboxCard charger={primaryCharger} />

            {/* Recent Guest Activity Feed */}
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>Recent Driveway Guest Activity</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time log of neighbor charging sessions and automated UPI payouts.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">18 Sessions Billed</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    ref: 'VS-782109',
                    driver: 'Vikramaditya Roy',
                    car: 'Tata Nexon EV Max',
                    kwh: '24.5 kWh',
                    amount: '₹392.00',
                    time: 'Today, 2:15 PM',
                    status: 'Settled to Bank',
                  },
                  {
                    ref: 'VS-651092',
                    driver: 'Dr. Radhika Sharma',
                    car: 'MG ZS EV Exclusive',
                    kwh: '32.1 kWh',
                    amount: '₹513.60',
                    time: 'Yesterday, 8:40 PM',
                    status: 'Settled to Bank',
                  },
                  {
                    ref: 'VS-549102',
                    driver: 'Kunal Singhal',
                    car: 'Mahindra XUV400',
                    kwh: '18.4 kWh',
                    amount: '₹294.40',
                    time: '18 Oct, 11:20 AM',
                    status: 'Settled to Bank',
                  },
                ].map((item) => (
                  <div
                    key={item.ref}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-mono font-bold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.driver}</span>
                          <span className="text-[11px] font-mono text-slate-400">({item.car})</span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                          <span>{item.ref}</span>
                          <span>•</span>
                          <span>{item.kwh}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/[0.04] pt-2 sm:pt-0">
                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-emerald-400">{item.amount}</div>
                        <div className="text-[10px] text-slate-400">{item.status}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-[11px] font-semibold border border-emerald-500/20">
                        Paid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MY CHARGERS LIST */}
        {activeTab === 'chargers' && (
          <motion.div
            key="chargers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            {loading ? (
              <div className="h-44 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
            ) : chargers.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-slate-900/50 border border-white/10">
                <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Chargers Listed Yet</h3>
                <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
                  Turn your home wallbox or 15A socket into a passive income generator.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('new')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  List Your First Charger
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {chargers.map((charger) => (
                  <div
                    key={charger.id}
                    className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 font-mono">
                          {charger.powerKw} kW AC
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
                          {charger.connectorType}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            charger.isAvailable
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          }`}
                        >
                          {charger.isAvailable ? 'Online & Ready' : 'Paused'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{charger.title}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{charger.address}, {charger.city}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/[0.06] pt-4 md:pt-0">
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-emerald-400">
                          ₹{charger.pricingPerKwh}
                          <span className="text-xs text-slate-400 font-normal"> / kWh</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Standard Domestic Grid</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(charger.id, charger.isAvailable)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          charger.isAvailable
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{charger.isAvailable ? 'Pause Bay' : 'Activate Bay'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: PAYOUTS LEDGER */}
        {activeTab === 'payouts' && (
          <motion.div
            key="payouts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Verified Bank Settlement Account
                </div>
                <div className="text-2xl font-bold text-white mt-1">HDFC Bank •••• 9842</div>
                <div className="text-xs text-slate-400 mt-1">
                  UPI ID: <span className="font-mono text-slate-200">arjun.verma@okhdfcbank</span> • Auto-settled every Monday
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                  Instant NEFT Active
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4">Past 30 Days Payout Ledger</h3>
              <div className="divide-y divide-white/[0.06] text-xs">
                <div className="py-3 flex justify-between">
                  <span className="text-slate-400 font-mono">14 Oct 2026</span>
                  <span className="text-slate-300">Weekly Node Settlement #892</span>
                  <span className="font-mono font-bold text-emerald-400">₹4,280.00 (Success)</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-400 font-mono">07 Oct 2026</span>
                  <span className="text-slate-300">Weekly Node Settlement #891</span>
                  <span className="font-mono font-bold text-emerald-400">₹3,940.00 (Success)</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-400 font-mono">30 Sep 2026</span>
                  <span className="text-slate-300">Weekly Node Settlement #890</span>
                  <span className="font-mono font-bold text-emerald-400">₹4,110.00 (Success)</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-400 font-mono">23 Sep 2026</span>
                  <span className="text-slate-300">Weekly Node Settlement #889</span>
                  <span className="font-mono font-bold text-emerald-400">₹4,070.00 (Success)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: ADD LISTING FORM */}
        {activeTab === 'new' && (
          <motion.div
            key="new"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="max-w-2xl mx-auto bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">List Your Private Charger</h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter details below. Your listing goes live on the Bhopal VoltShare Mesh immediately.
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateCharger} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Listing Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Arera Colony E-7 7.4kW Type-2 Driveway"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Driveway Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Bungalow 14, E-7 Arera Colony"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Charger Power (kW)</label>
                  <select
                    value={powerKw}
                    onChange={(e) => setPowerKw(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="3.3">3.3 kW (15A/16A Socket)</option>
                    <option value="7.4">7.4 kW (Type 2 Wallbox)</option>
                    <option value="11">11 kW (Fast AC)</option>
                    <option value="22">22 kW (Commercial AC)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Guest Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="30"
                    value={pricingPerKwh}
                    onChange={(e) => setPricingPerKwh(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Gate / Intercom Access Instructions</label>
                <textarea
                  rows={2}
                  value={accessNotes}
                  onChange={(e) => setAccessNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {submitting ? 'Listing on VoltShare Mesh...' : 'Publish Driveway Charger'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
