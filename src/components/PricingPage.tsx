import React from "react";
import ProblemSection from "./ProblemSection";
import Pricing from "./Pricing";

interface PricingPageProps {
  onBookDemoClick: () => void;
}

export default function PricingPage({ onBookDemoClick }: PricingPageProps) {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 text-slate-100">
      {/* 1. Problem Section (THE SILENT REVENUE LEAK) */}
      <ProblemSection />

      {/* 2. Pricing Section (TRANSPARENT VALUE) */}
      <Pricing onBookDemoClick={onBookDemoClick} />
    </div>
  );
}
