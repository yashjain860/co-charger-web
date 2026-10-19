'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
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
} from 'lucide-react';

export default function HostStudioPage() {
  const { user, openAuthModal, triggerConfetti } = useAuth();
  const [activeTab, setActiveTab] = useState<'chargers' | 'new' | 'payouts'>('chargers');

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
    if (!user) return;
    try {
      const res = await fetch(`/api/v1/chargers?hostId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setChargers(data.chargers || []);
        }
      }
    } catch (err) {
      console.error('Failed to load host chargers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHostChargers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCreateCharger = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // Reset form
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

  if (!user && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <Zap className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Host Studio Sign In</h2>
        <p className="text-xs text-slate-400 mb-6">
          Sign in or create a host account to list your home wallbox charger and receive monthly payouts.
        </p>
        <button
          onClick={() => openAuthModal('signup')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
        >
          Join as Host
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Studio Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            Host Operations Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Manage Driveway Hardware & Revenue
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track availability, adjust energy tariffs, and monitor direct UPI settlements.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('new')}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List New Charger</span>
        </button>
      </div>

      {/* Studio Tabs */}
      <div className="flex p-1 mb-8 rounded-2xl bg-slate-900/60 border border-slate-800 max-w-md">
        <button
          onClick={() => setActiveTab('chargers')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'chargers'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          My Listed Chargers ({chargers.length})
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'new'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          + Add Listing
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'payouts'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Payouts Ledger
        </button>
      </div>

      {/* TAB 1: MY CHARGERS LIST */}
      {activeTab === 'chargers' && (
        <div>
          {loading ? (
            <div className="h-44 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ) : chargers.length === 0 ? (
            <div className="p-16 text-center rounded-2xl glass-panel border border-slate-800">
              <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Chargers Listed Yet</h3>
              <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
                Turn your home wallbox or 15A socket into a passive income generator.
              </p>
              <button
                onClick={() => setActiveTab('new')}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs"
              >
                List Your First Charger
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {chargers.map((charger) => (
                <div
                  key={charger.id}
                  className="rounded-2xl glass-panel-glow border border-slate-800 bg-[#090d16] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
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
                        {charger.isAvailable ? 'Online & Available' : 'Offline (Paused)'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">{charger.title}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{charger.address}, {charger.city}</span>
                    </p>

                    <div className="flex gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500">Rate: </span>
                        <span className="font-bold text-white font-mono">₹{charger.pricingPerKwh}/kWh</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Parking: </span>
                        <span className="font-medium text-white">{charger.parkingType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Rating: </span>
                        <span className="font-bold text-amber-400">★ {charger.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleAvailability(charger.id, charger.isAvailable)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                        charger.isAvailable
                          ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                          : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{charger.isAvailable ? 'Pause Listing' : 'Make Active'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ADD NEW CHARGER WIZARD */}
      {activeTab === 'new' && (
        <div className="max-w-2xl p-8 rounded-3xl glass-panel-glow border border-emerald-500/30 bg-[#090d16]">
          <h2 className="text-2xl font-extrabold text-white mb-1">List a New Driveway Charger</h2>
          <p className="text-xs text-slate-400 mb-6">
            Enter your wallbox specifications and rate. Listing is immediately published across the mesh.
          </p>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleCreateCharger} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Listing Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arera Colony E-7 ABB 7.4kW Type-2 Driveway"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Lane / Colony name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Power Output</label>
                <select
                  value={powerKw}
                  onChange={(e) => setPowerKw(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="3.3">3.3 kW (Slow AC)</option>
                  <option value="7.4">7.4 kW (Fast Wallbox)</option>
                  <option value="11">11 kW (Three-Phase)</option>
                  <option value="22">22 kW (High Power AC)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Connector Plug</label>
                <select
                  value={connectorType}
                  onChange={(e) => setConnectorType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Type 2">Type 2 (Mennekes)</option>
                  <option value="CCS2">CCS2 Combo</option>
                  <option value="15A Socket">15A Raw Socket</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rate (₹/kWh)</label>
                <input
                  type="number"
                  required
                  value={pricingPerKwh}
                  onChange={(e) => setPricingPerKwh(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Access Instructions for Drivers</label>
              <textarea
                rows={2}
                value={accessNotes}
                onChange={(e) => setAccessNotes(e.target.value)}
                placeholder="Gate intercom code, security instructions, or driveway layout..."
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition disabled:opacity-50"
            >
              {submitting ? 'Publishing Listing...' : 'Publish Charger Listing Live'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: PAYOUTS & EARNINGS */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Gross Dispensed</span>
              <span className="text-3xl font-extrabold text-white font-mono">₹4,240</span>
              <span className="text-[11px] text-slate-500 block mt-1">265 kWh Delivered</span>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Net Host Earnings</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">₹3,816</span>
              <span className="text-[11px] text-emerald-500/80 block mt-1">90% Net Payout</span>
            </div>
            <div className="p-6 rounded-2xl glass-panel border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Next Automated Settlement</span>
              <span className="text-lg font-bold text-white">Sunday 11:59 PM</span>
              <span className="text-[11px] text-slate-500 block mt-1">UPI VPA: verified</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <h3 className="font-bold text-white text-base mb-4">Payout Transaction Ledger</h3>
            <div className="divide-y divide-slate-800 text-xs">
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Booking VS-782109 • Tata Nexon EV</div>
                  <div className="text-slate-500 text-[11px]">Today, 2:15 PM • 13.0 kWh</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400">+₹187.20</div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Settled</span>
                </div>
              </div>
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Booking VS-654102 • MG ZS EV</div>
                  <div className="text-slate-500 text-[11px]">Yesterday, 5:40 PM • 18.5 kWh</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400">+₹266.40</div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Settled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
