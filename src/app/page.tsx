import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import LiveChargerShowcase from '@/components/home/LiveChargerShowcase';
import HardwareProductsSuite from '@/components/home/HardwareProductsSuite';
import HostRoiCalculator from '@/components/home/HostRoiCalculator';
import InteractiveTelemetrySimulator from '@/components/home/InteractiveTelemetrySimulator';
import DualPersonaWorkflow from '@/components/home/DualPersonaWorkflow';
import VehicleCompatibilityMatrix from '@/components/home/VehicleCompatibilityMatrix';
import TrustSafetyGuarantee from '@/components/home/TrustSafetyGuarantee';
import VerifiedCaseStudies from '@/components/home/VerifiedCaseStudies';
import FaqSection from '@/components/home/FaqSection';
import CtaBanner from '@/components/home/CtaBanner';

export const metadata = {
  title: 'VoltShare — Community EV Charging Sharing Network & Smart Wallbox Hardware',
  description:
    'Turn your idle residential EV wallbox into passive revenue. Book verified neighborhood charging slots at 40% less than public DC fast chargers. Serving Bhopal, MP.',
};

export default function HomePage() {
  return (
    <div className="w-full bg-[#06090e] text-slate-100 overflow-x-hidden">
      {/* 1. Hero with Instant Search, Live HUD metrics, and Dual Action */}
      <HeroSection />

      {/* 2. Real Active Inventory Showcase from Database */}
      <LiveChargerShowcase />

      {/* 3. Physical & Smart Metering Hardware Ecosystem */}
      <HardwareProductsSuite />

      {/* 4. Interactive Host ROI & Earnings Calculator */}
      <HostRoiCalculator />

      {/* 5. Live Interactive Vehicle Telemetry Sandbox */}
      <InteractiveTelemetrySimulator />

      {/* 6. Dual Persona Workflows: Driver vs Host */}
      <DualPersonaWorkflow />

      {/* 7. Indian EV Compatibility Matrix & Specs */}
      <VehicleCompatibilityMatrix />

      {/* 8. Trust, Safety, Insurance & MoP Regulatory Compliance */}
      <TrustSafetyGuarantee />

      {/* 9. Verified Customer & Host Case Studies */}
      <VerifiedCaseStudies />

      {/* 10. Comprehensive Technical & Legal FAQ */}
      <FaqSection />

      {/* 11. High-Converting Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
