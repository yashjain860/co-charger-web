'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
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
    tag: 'Residential Driveways',
    title: 'VoltShare Home Wallbox (7.4 kW)',
    subtitle: 'Single-phase smart EV charger with dynamic household load balancing',
    price: '₹28,999',
    priceSub: 'or ₹1,299/mo lease',
    image: 'https://images.unsplash.com/photo-1558441719-74e508827361?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '7.4 kW (230V / 32A)',
      'Connector': 'Tethered 5m Type-2 Cable',
      'Connectivity': 'Built-in 4G LTE eSIM + Wi-Fi',
      'Enclosure': 'IP65 Weatherproof',
      'Metering': 'MID-Class 1 Certified Revenue Meter',
      'Warranty': '3 Years Comprehensive Replacement',
    },
    features: [
      'Automated guest billing deposited weekly to your bank account',
      'Dynamic load curtailment prevents tripping domestic meters',
      'RFID swipe cards for household members + mobile app for guests',
      'Integrates with rooftop solar net-metering',
    ],
    ctaText: 'Order Home Wallbox',
  },
  {
    id: 'pro-duo-22',
    tag: 'Societies & Offices',
    title: 'VoltShare Pro Duo Dual-Bay (22 kW)',
    subtitle: 'Three-phase dual-gun AC station for housing societies and commercial complexes',
    price: '₹64,999',
    priceSub: 'inclusive of dual MID meters & GST',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '22 kW (415V / 32A 3-Phase, 11kW x 2)',
      'Connector': 'Dual Type-2 Sockets with Motorized Lock',
      'Connectivity': 'Ethernet + 4G + OCPP 1.6J JSON',
      'Enclosure': 'IP66 Industrial Steel Casing',
      'Metering': 'Dual Independent Revenue Sub-Meters',
      'Warranty': '5 Years Commercial On-Site Warranty',
    },
    features: [
      'Charges two cars simultaneously with smart power distribution',
      'Direct credit integration for society maintenance accounts',
      '7-inch outdoor readable anti-glare display',
      'Built-in 15ms Type-B RCD electrical safety cutoff',
    ],
    ctaText: 'Request Society Demo',
  },
  {
    id: 'smart-meter-kit',
    tag: 'Retrofit Kit',
    title: 'VoltShare IoT Sub-Meter Hub',
    subtitle: 'DIN-rail retrofit module for existing Tata, ABB, or Schneider chargers',
    price: '₹4,999',
    priceSub: 'one-time module cost',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Compatibility': 'Any 1-Phase or 3-Phase AC Charger',
      'Sensors': 'Split-core non-invasive CT clamps',
      'Connectivity': 'NB-IoT & LoRaWAN with data plan',
      'Mounting': 'Standard 2-Module DIN-Rail inside breaker box',
      'Protection': 'Integrated remote disconnect contactor',
      'Warranty': '2 Years Replacement Guarantee',
    },
    features: [
      'Share your existing OEM charger without replacing hardware',
      'Installs in 15 minutes without cutting existing wiring',
      'Syncs with the VoltShare app for automated guest payments',
      'Keeps your OEM manufacturer warranty intact',
    ],
    ctaText: 'Get Retrofit Kit',
  },
  {
    id: 'travel-adapter',
    tag: 'Portable',
    title: 'VoltShare Mobile 3.3 kW Adapter',
    subtitle: 'Heavy-duty 16A portable charging cable for emergency and road trip charging',
    price: '₹11,499',
    priceSub: 'includes heavy-duty carry case',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Rated Output': '3.3 kW (230V / 16A, Adjustable)',
      'Inlet Plug': '16A Industrial + 15A Household converter',
      'Vehicle Plug': 'Type-2 (IEC 62196)',
      'Display': 'OLED Voltage, Current, and kWh readout',
      'Enclosure': 'IP66 Waterproof & Crush-Proof',
      'Cable Length': '8.5 Meters TPU Cable',
    },
    features: [
      'Emergency charging from standard 15A/16A electrical sockets',
      'Socket temperature monitoring prevents overheating',
      'Built-in surge and earth fault protection',
      'Compact trunk storage',
    ],
    ctaText: 'Order Travel Kit',
  },
];

export default function HardwareProductsSuite() {
  const [activeTab, setActiveTab] = useState<string>('wallbox-7');
  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Chargers & Smart Sub-Meters
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm max-w-2xl">
            Whether you need a new wallbox or want to retrofit an existing charger, our hardware turns any parking space into an automated charging bay.
          </p>
        </div>

        {/* Quiet Selector Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === p.id
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Selected Product Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/10">
                  {activeProduct.tag}
                </span>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {activeProduct.price}
                  </div>
                  <div className="text-xs text-slate-400">{activeProduct.priceSub}</div>
                </div>
                <Link
                  href="/host"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  {activeProduct.ctaText}
                </Link>
              </div>
            </div>

            {/* Right Specs */}
            <div className="lg:col-span-7">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeProduct.title}
              </h3>
              <p className="mt-1 text-slate-400 text-xs sm:text-sm">
                {activeProduct.subtitle}
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-300">
                {activeProduct.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(activeProduct.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 block text-[11px]">{specKey}</span>
                      <span className="text-slate-200 font-medium">{specVal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Spec Table */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-5">Model</th>
                <th className="py-3 px-5">Power</th>
                <th className="py-3 px-5">Target Placement</th>
                <th className="py-3 px-5">Connectivity</th>
                <th className="py-3 px-5">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">VoltShare Home 7.4kW</td>
                <td className="py-3.5 px-5 text-emerald-400">7.4 kW (32A 1-Ph)</td>
                <td className="py-3.5 px-5">Bungalows, Villas, Paved Driveways</td>
                <td className="py-3.5 px-5">4G LTE + Wi-Fi</td>
                <td className="py-3.5 px-5 font-bold text-white">₹28,999</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">VoltShare Pro Duo 22kW</td>
                <td className="py-3.5 px-5 text-cyan-400">22 kW (32A 3-Ph, Dual)</td>
                <td className="py-3.5 px-5">Societies, Offices, Fleet Bays</td>
                <td className="py-3.5 px-5">Ethernet + 4G + OCPP 1.6J</td>
                <td className="py-3.5 px-5 font-bold text-white">₹64,999</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">IoT Sub-Meter Retrofit</td>
                <td className="py-3.5 px-5 text-slate-300">Up to 44 kW Passthrough</td>
                <td className="py-3.5 px-5">Existing Wallbox Owners</td>
                <td className="py-3.5 px-5">NB-IoT / LoRaWAN</td>
                <td className="py-3.5 px-5 font-bold text-white">₹4,999</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Mobile 3.3kW Travel Kit</td>
                <td className="py-3.5 px-5 text-slate-300">3.3 kW (16A 1-Ph)</td>
                <td className="py-3.5 px-5">Trunk Emergency Cable</td>
                <td className="py-3.5 px-5">OLED Display Onboard</td>
                <td className="py-3.5 px-5 font-bold text-white">₹11,499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
