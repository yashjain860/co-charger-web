'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import HostStatsHeader from '@/components/host/HostStatsHeader';
import WallboxControlPanel from '@/components/host/WallboxControlPanel';
import {
  Zap,
  PlusCircle,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Power,
  Layers,
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
      <HostStatsHeader userName={user?.name || 'Arjun'} />

      {/* Navigation tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'overview', label: 'Overview & Bay Control' },
            { id: 'chargers', label: `My Listed Bays (${chargers.length})` },
            { id: 'payouts', label: 'Payouts & Ledger' },
            { id: 'new', label: '+ Add Bay' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add New Charger</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div>
          <WallboxControlPanel charger={primaryCharger} />

          {/* Recent Guest Sessions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Recent Guest Sessions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated UPI settlements from neighbor bookings.</p>
              </div>
              <span className="text-xs text-slate-400">18 Sessions Billed</span>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              {[
                {
                  ref: 'VS-782109',
                  driver: 'Vikramaditya Roy',
                  car: 'Tata Nexon EV Max',
                  kwh: '24.5 kWh',
                  amount: '₹392.00',
                  time: 'Today, 2:15 PM',
                },
                {
                  ref: 'VS-651092',
                  driver: 'Dr. Radhika Sharma',
                  car: 'MG ZS EV',
                  kwh: '32.1 kWh',
                  amount: '₹513.60',
                  time: 'Yesterday, 8:40 PM',
                },
                {
                  ref: 'VS-549102',
                  driver: 'Kunal Singhal',
                  car: 'Mahindra XUV400',
                  kwh: '18.4 kWh',
                  amount: '₹294.40',
                  time: '18 Oct, 11:20 AM',
                },
              ].map((item) => (
                <div key={item.ref} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{item.driver} <span className="text-slate-400 font-normal">({item.car})</span></div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{item.ref} • {item.kwh} • {item.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-400">{item.amount}</div>
                    <div className="text-[10px] text-slate-500">Deposited to HDFC</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Listed Bays */}
      {activeTab === 'chargers' && (
        <div>
          {loading ? (
            <div className="h-44 rounded-xl bg-slate-900 border border-slate-800 animate-pulse" />
          ) : chargers.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-semibold text-white mb-1">No Chargers Listed Yet</h3>
              <p className="text-xs text-slate-400 mb-4">List your home charger to start earning.</p>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-semibold rounded-lg"
              >
                List Your First Charger
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {chargers.map((c) => (
                <div key={c.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-emerald-400">{c.powerKw} kW</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-300">{c.connectorType}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{c.address}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-bold text-white">₹{c.pricingPerKwh}/kWh</div>
                      <div className="text-[11px] text-slate-500">{c.isAvailable ? 'Online' : 'Paused'}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(c.id, c.isAvailable)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        c.isAvailable
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {c.isAvailable ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Payouts */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Linked Bank Account</div>
              <div className="text-lg font-semibold text-white mt-0.5">HDFC Bank •••• 9842</div>
              <div className="text-xs text-slate-400 mt-0.5">UPI ID: arjun.verma@okhdfcbank</div>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              Active Weekly Auto-Settlement
            </span>
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-3">Past Settlements</h3>
            <div className="divide-y divide-slate-800/80 text-xs text-slate-300">
              <div className="py-2.5 flex justify-between">
                <span>14 Oct 2026</span>
                <span>Weekly Node Settlement #892</span>
                <span className="font-semibold text-emerald-400">₹4,280.00</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>07 Oct 2026</span>
                <span>Weekly Node Settlement #891</span>
                <span className="font-semibold text-emerald-400">₹3,940.00</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>30 Sep 2026</span>
                <span>Weekly Node Settlement #890</span>
                <span className="font-semibold text-emerald-400">₹4,110.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Add Listing Form */}
      {activeTab === 'new' && (
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">List Your Charger</h2>
          <p className="text-xs text-slate-400 mb-5">
            Fill in your charger details. It will appear on the Bhopal discovery map immediately.
          </p>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleCreateCharger} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arera Colony E-7 7.4kW Type-2 Driveway"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Bungalow 14, E-7 Arera Colony"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Power Output</label>
                <select
                  value={powerKw}
                  onChange={(e) => setPowerKw(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-slate-600"
                >
                  <option value="3.3">3.3 kW (15A Socket)</option>
                  <option value="7.4">7.4 kW (Wallbox)</option>
                  <option value="11">11 kW (Fast AC)</option>
                  <option value="22">22 kW (Commercial)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Rate per kWh (₹)</label>
                <input
                  type="number"
                  required
                  min="10"
                  max="30"
                  value={pricingPerKwh}
                  onChange={(e) => setPricingPerKwh(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Access Notes</label>
              <textarea
                rows={2}
                value={accessNotes}
                onChange={(e) => setAccessNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? 'Publishing...' : 'List Driveway Charger'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
