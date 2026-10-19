'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is it legal to sell electricity from a residential domestic meter in India?',
    answer:
      'Yes, 100% legal. The Ministry of Power (MoP), Government of India, issued formal revised guidelines stating that providing an EV charging service does not constitute the resale of electricity under the Electricity Act 2003. It is legally classified as a service activity, meaning individual homeowners, housing societies, and commercial complexes do not require any electricity distribution license to share their EV chargers.',
  },
  {
    question: 'How do I get paid and what about electricity bill costs?',
    answer:
      'VoltShare’s hardware or IoT sub-meter tracks the exact kilowatt-hours (kWh) consumed during each driver session down to 0.01 kWh precision. The driver pays the full tariff (e.g., ₹16/kWh) into escrow. VoltShare deducts a 10% platform facilitation fee and automatically deposits the remainder directly into your linked bank account every Monday via UPI or NEFT. You only pay your DISCOM for actual units consumed on your standard domestic bill, keeping the profit margin as pure secondary income.',
  },
  {
    question: 'What if a visiting EV driver damages my wallbox, gate, or electrical meter?',
    answer:
      'Every active reservation on VoltShare is backed by our ₹5,00,000 Property & Electrical Damage Protection Policy. In the unlikely event of physical damage to your gate, wallbox, or distribution board caused by a visiting driver, our dedicated local surveyor processes repair claims within 72 hours. Furthermore, drivers are pre-verified via Aadhaar KYC and their vehicle registration plate is locked to the booking.',
  },
  {
    question: 'What happens if a driver overstays their booked time slot?',
    answer:
      'Drivers receive automated SMS and WhatsApp reminders 15 minutes before their slot expires. If a vehicle remains parked in your bay past a 15-minute grace period, VoltShare automatically charges an idle overstay fee of ₹2.00 per minute, which is credited straight to the host’s wallet to compensate for driveway inconvenience.',
  },
  {
    question: 'Can I list my charger if I already have an OEM wallbox (Tata Power, ABB, Schneider, Exicom)?',
    answer:
      'Absolutely! You do not need to replace your existing charger. We supply the VoltShare IoT Sub-Meter Retrofit Kit (₹4,999), which installs seamlessly on your DIN rail inside your electrical breaker box in 15 minutes without cutting any wires. It automatically communicates with our cloud mesh and handles automated billing while keeping your original charger warranty 100% intact.',
  },
  {
    question: 'How do I handle housing society (RWA) permissions for shared apartment bays?',
    answer:
      'We provide a turnkey RWA Society Legal Pack that outlines Ministry of Power mandates and safety compliance. For gated societies, we can configure our Pro Duo 22kW dual-gun stations with independent sub-meters that credit society maintenance accounts directly, eliminating all administrative burden for society committees.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-slate-950 border-b border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Everything you need to know about domestic EV charging legality, tariffs, property protection, and community mechanics.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-slate-900/60 border border-white/[0.08] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <p className="text-sm text-slate-400">
            Have a custom question about your electrical setup or society installation?
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-semibold">
            <Link href="/host" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              <span>Talk to our Bhopal technical team</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
