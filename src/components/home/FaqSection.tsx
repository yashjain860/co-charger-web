'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is it legal to sell electricity from a home connection in India?',
    answer:
      'Yes. The Ministry of Power (MoP) revised guidelines clearly state that providing an EV charging service does not constitute the resale of electricity under the Electricity Act 2003. It is legally classified as a service activity, meaning individual homeowners and housing societies do not require an electricity distribution license to share their EV chargers.',
  },
  {
    question: 'How do host payouts work?',
    answer:
      'The VoltShare sub-meter or smart charger tracks exact kWh consumed during each session. Drivers pay at the time of reservation into escrow. VoltShare deducts a 10% platform facilitation fee and deposits your net earnings directly to your bank account every Monday via UPI or NEFT.',
  },
  {
    question: 'What if a driver damages my gate or electrical setup?',
    answer:
      'Every active reservation includes up to ₹5,00,000 in property and electrical damage protection. In the unlikely event of physical damage caused by a visiting driver to your gate, charger, or breaker panel, our team coordinates repair claims within 72 hours. All drivers are verified with government Aadhaar KYC.',
  },
  {
    question: 'What if a driver overstays their booked time?',
    answer:
      'Drivers receive automated SMS reminders 15 minutes before their slot ends. If a vehicle remains parked past a 15-minute grace period, an overstay fee of ₹2.00 per minute is charged and credited directly to the host.',
  },
  {
    question: 'Can I list an existing charger like Tata Power, ABB, or Schneider?',
    answer:
      'Yes. We provide the VoltShare IoT Sub-Meter Retrofit Kit (₹4,999) which clips into your DIN-rail breaker panel in 15 minutes without cutting any wires. It automatically connects to the network and handles guest metering while keeping your manufacturer warranty intact.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-[#070b13]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-slate-400 text-sm">
            Answers to common questions about tariffs, safety, legality, and equipment.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
