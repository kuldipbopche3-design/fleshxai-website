import React from "react";
import Features from "./Features";
import Industries from "./Industries";
import WebsitesSection from "./WebsitesSection";

interface SpecsPageProps {
  onBookDemoClick: () => void;
}

export default function SpecsPage({ onBookDemoClick }: SpecsPageProps) {
  return (
    <div className="pt-20 min-h-screen bg-slate-950 text-slate-100">
      {/* Header Banner */}
      <section className="relative py-16 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-950/20 via-slate-950 to-slate-950 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-4">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold bg-brand-950/40 border border-brand-850 px-3 py-1 rounded-full">
            SYSTEM SPECIFICATIONS & SERVICES
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Technical Architecture & Integrations
          </h1>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
            Explore our custom-trained clinical voice models, HIPAA-compliant databases, and high-converting web integration systems.
          </p>
        </div>
      </section>

      {/* 1. Features Section (Engine Details & Specifications) */}
      <Features />

      {/* 2. Industries Section (Market Specialization) */}
      <Industries />

      {/* 3. Websites Section (Secondary Complementary Service) */}
      <WebsitesSection onBookDemoClick={onBookDemoClick} />
    </div>
  );
}
