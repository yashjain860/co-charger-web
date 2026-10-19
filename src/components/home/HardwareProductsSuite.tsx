'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Zap,
  Shield,
  Wifi,
  Smartphone,
  Check,
  ArrowRight,
  Gauge,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface Product {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  price: string;
  priceSub: string;
  image: string;
  specs: { [key: string]: string };
  features: string[];
  ctaText: string;
}

const products: Product[] = [
  {
    id: 'wallbox-7',
    tag: 'Flagship Residential',
    title: 'VoltShare Home Smart Wallbox',
    subtitle: '7.4 kW Level-2 AC Smart Charger with Dynamic Load Curtailment',
    price: '₹28,999',
    priceSub: 'or ₹1,299/mo lease',
    image: 'https://images.unsplash.com/photo-1558441719-74e508827361?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '7.4 kW (230V / 32A 1-Phase)',
      'Connector': 'Tethered 5m Type-2 (IEC 62196-2)',
      'Connectivity': 'Built-in 4G LTE eSIM + Wi-Fi',
      'Protection': 'IP65 Weatherproof & IK10 Vandal-Resistant',
      'Metering': 'MID-Class 1 Certified Smart Meter',
      'Warranty': '3 Years Comprehensive Replacement',
    },
    features: [
      'Automated tenant & guest billing directly to your bank account',
      'Dynamic load balancing prevents tripping domestic mains',
      'RFID swipe cards for household members + mobile app for guests',
      'Solar net-metering integration (surplus solar charging mode)',
    ],
    ctaText: 'Order Home Wallbox',
  },
  {
    id: 'pro-duo-22',
    tag: 'Societies & Commercial',
    title: 'VoltShare Pro Duo Dual-Gun',
    subtitle: '22 kW Commercial Destination Station for RWAs & Corporate Bays',
    price: '₹64,999',
    priceSub: 'inclusive of dual MID meters & GST',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '22 kW (415V / 32A 3-Phase, 11kW x 2)',
      'Connector': 'Dual Type-2 Sockets with Electronic Lock',
      'Connectivity': 'Ethernet + 4G Cat-M1 + OCPP 1.6J JSON',
      'Protection': 'IP66 Industrial Powder-Coated Steel',
      'Metering': 'Dual Independent Bi-directional Revenue Meters',
      'Warranty': '5 Years Commercial On-Site Warranty',
    },
    features: [
      'Simultaneous charging for 2 vehicles with intelligent load distribution',
      'Automated RWA society maintenance account credit reconciliation',
      '7-inch outdoor readable anti-glare capacitive display',
      'Emergency stop button & 15ms Type-B RCD electrical safety cutoff',
    ],
    ctaText: 'Request Society Demo',
  },
  {
    id: 'smart-meter-kit',
    tag: 'Retrofit Existing Charger',
    title: 'VoltShare IoT Sub-Meter Hub',
    subtitle: 'DIN-Rail Retrofit Kit for Existing Tata, ABB or Schneider Wallboxes',
    price: '₹4,999',
    priceSub: 'one-time hardware cost',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Compatibility': 'Works with any 1-Phase or 3-Phase AC Charger',
      'Current Sensors': 'Split-core non-invasive CT Clamps (up to 63A)',
      'Connectivity': 'NB-IoT & LoRaWAN with 5-year data package',
      'Form Factor': 'Standard 2-Module DIN-Rail Mount',
      'Relay Cutoff': 'Integrated 40A Contactor with remote trip',
      'Warranty': '2 Years Replacement Guarantee',
    },
    features: [
      'Turn your existing unmetered charger into a paid public node',
      'Zero wire cutting: installs in 15 minutes inside your electrical panel',
      'Automatic sync with VoltShare Driver App and instant settlements',
      'Maintains original OEM manufacturer warranty intact',
    ],
    ctaText: 'Get Retrofit Kit',
  },
  {
    id: 'travel-adapter',
    tag: 'On-The-Go Heavy Duty',
    title: 'VoltShare Mobile 3.3 kW Adapter',
    subtitle: 'Portable Rugged 16A Smart Charging Cable with OLED Display',
    price: '₹11,499',
    priceSub: 'includes hard shell carry case',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '3.3 kW (230V / 16A, Adjustable 8A/10A/13A/16A)',
      'Inlet Plug': '16A Industrial 3-Pin + 15A Household Converter',
      'Vehicle Plug': 'Type-2 (IEC 62196)',
      'Display': '0.96-inch Real-Time OLED (Volts, Amps, kWh, Temp)',
      'Protection': 'IP66 Waterproof & Crush-Proof (2-Ton Driveover)',
      'Cable Length': '8.5 Meters Heavy-Duty TPU Cable',
    },
    features: [
      'Emergency roadside charging from any standard 15A/16A wall outlet',
      'Over-temperature auto-curtailment protects socket from overheating',
      'Lightning & leakage protection (Class A RCD built into control box)',
      'Fits compactly in trunk frunk or spare wheel cavity',
    ],
    ctaText: 'Order Travel Kit',
  },
];

export default function HardwareProductsSuite() {
  const [activeTab, setActiveTab] = useState<string>('wallbox-7');
  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section className="py-24 bg-slate-900/40 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>The Hardware Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Engineered For Residential Driveways & Housing Societies
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Whether you already own an OEM EV charger or want a plug-and-play smart wallbox, our hardware turns any parking bay into a compliant, automated revenue generator.
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
                activeTab === p.id
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === p.id ? 'fill-slate-950' : 'text-emerald-400'}`} />
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Active Product Deep-Dive Card */}
        <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Product Image & Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                    {activeProduct.tag}
                  </span>
                </div>
              </div>

              {/* Price card below */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {activeProduct.price}
                  </div>
                  <div className="text-xs text-slate-400">{activeProduct.priceSub}</div>
                </div>
                <Link
                  href="/host"
                  className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  {activeProduct.ctaText}
                </Link>
              </div>
            </div>

            {/* Right: Technical Specs & Core Features */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeProduct.title}
                </h3>
                <p className="mt-1 text-slate-400 text-sm font-medium">
                  {activeProduct.subtitle}
                </p>

                {/* Key Benefits */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Core Platform Capabilities
                  </h4>
                  {activeProduct.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specifications Matrix */}
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Verified Technical Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeProduct.specs).map(([specKey, specVal]) => (
                      <div
                        key={specKey}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col"
                      >
                        <span className="text-[11px] font-mono text-slate-400">{specKey}</span>
                        <span className="text-sm font-medium text-slate-200 mt-0.5">{specVal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="mt-8 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-300">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  All hardware meets Indian CEA (Central Electricity Authority) 2023 EV charging safety standards.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Comparison Table */}
        <div className="mt-16 bg-slate-950/80 border border-white/10 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-white/[0.04] text-slate-400 font-mono uppercase text-[11px] border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Hardware Model</th>
                <th className="py-4 px-6">Max Output</th>
                <th className="py-4 px-6">Target Deployment</th>
                <th className="py-4 px-6">Connectivity</th>
                <th className="py-4 px-6">Billing Mode</th>
                <th className="py-4 px-6">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> VoltShare Home 7.4kW
                </td>
                <td className="py-4 px-6 font-mono text-emerald-400 font-semibold">7.4 kW (32A 1-Ph)</td>
                <td className="py-4 px-6">Villas, Bungalows, Paved Driveways</td>
                <td className="py-4 px-6">4G LTE + Wi-Fi</td>
                <td className="py-4 px-6">VoltShare App Direct Escrow</td>
                <td className="py-4 px-6 font-mono font-bold text-white">₹28,999</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> VoltShare Pro Duo 22kW
                </td>
                <td className="py-4 px-6 font-mono text-cyan-400 font-semibold">22 kW (32A 3-Ph, Dual)</td>
                <td className="py-4 px-6">Societies, Commercial Parks</td>
                <td className="py-4 px-6">Ethernet + 4G + OCPP 1.6J</td>
                <td className="py-4 px-6">Dual Sub-Meter RWA Auto-Payout</td>
                <td className="py-4 px-6 font-mono font-bold text-white">₹64,999</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> IoT Sub-Meter Retrofit
                </td>
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">Up to 44 kW Passthrough</td>
                <td className="py-4 px-6">Existing Wallbox Owners</td>
                <td className="py-4 px-6">NB-IoT / LoRaWAN</td>
                <td className="py-4 px-6">App Automated Revenue Split</td>
                <td className="py-4 px-6 font-mono font-bold text-white">₹4,999</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-teal-400" /> Mobile 3.3kW Travel Kit
                </td>
                <td className="py-4 px-6 font-mono text-teal-400 font-semibold">3.3 kW (16A 1-Ph)</td>
                <td className="py-4 px-6">Emergency Roadside & Roadtrips</td>
                <td className="py-4 px-6">OLED Display Onboard</td>
                <td className="py-4 px-6">Flat Domestic Outlet Plug</td>
                <td className="py-4 px-6 font-mono font-bold text-white">₹11,499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
