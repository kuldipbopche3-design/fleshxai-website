import React from "react";
import { Globe, ArrowRight, Zap, Target, Sparkles } from "lucide-react";

interface WebsitesSectionProps {
  onBookDemoClick: () => void;
}

export default function WebsitesSection({ onBookDemoClick }: WebsitesSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative overflow-hidden">
      {/* Soft light leaks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Copy (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" /> SECONDARY COMPLEMENTARY SERVICE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Your AI Front Desk Deserves a Front Door That Matches It
              </h3>
            </div>

            <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
              A high-performing AI voice agent is only as good as the website sending it traffic. 
              We build premium, custom-coded, ultra-fast websites specifically designed to capture clinic booking intent. 
              No templates, no bloated WordPress plug-ins—just clean, modern visual design that converts.
            </p>

            {/* Quick value cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <Zap className="w-5 h-5 text-brand-400" />
                <h5 className="font-display font-bold text-white text-xs">Blazing Performance</h5>
                <p className="text-[10px] text-slate-500 leading-normal font-light">Sub-second load speeds boost SEO and lower ad bounce rates.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <Target className="w-5 h-5 text-brand-400" />
                <h5 className="font-display font-bold text-white text-xs">Conversion DNA</h5>
                <p className="text-[10px] text-slate-500 leading-normal font-light">Engineered around intuitive book flows, mobile priority, and trust elements.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <h5 className="font-display font-bold text-white text-xs">Voice Ready</h5>
                <p className="text-[10px] text-slate-500 leading-normal font-light">Includes native click-to-ring AI triggers and SMS follow-up widgets.</p>
              </div>
            </div>

            {/* Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookDemoClick}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-2 group"
              >
                Ask About Web + AI Bundles
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Visual Mock / Illustration Card (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-80 shadow-2xl">
            <div className="absolute top-0 left-0 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
            
            {/* Simulated UI Window header */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
              </div>
              <div className="px-3 py-1 bg-slate-950 rounded-md border border-slate-850">
                <span className="font-mono text-[9px] text-slate-500 lowercase">https://glowmedspa.com</span>
              </div>
            </div>

            {/* Simulated website landing elements */}
            <div className="space-y-4 py-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2 text-center">
                <div className="h-4 bg-slate-800 rounded-md w-3/4 mx-auto animate-pulse"></div>
                <div className="h-3 bg-slate-850 rounded-md w-1/2 mx-auto"></div>
              </div>
              
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex items-center justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 bg-slate-800 rounded-sm w-1/3"></div>
                  <div className="h-2 bg-slate-850 rounded-sm w-2/3"></div>
                </div>
                <div className="px-3 py-1.5 bg-brand-600 rounded-md text-[9px] font-mono text-white font-bold">
                  BOOK CLINIC
                </div>
              </div>
            </div>

            {/* Mobile overlay */}
            <div className="absolute bottom-4 right-4 w-28 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-[7px] text-slate-400">AI VOICE LIVE</span>
              </div>
              <div className="h-1.5 bg-slate-850 rounded-sm w-full mb-1"></div>
              <div className="h-1 bg-slate-900 rounded-sm w-3/4"></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
