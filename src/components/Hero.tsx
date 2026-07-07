import React from "react";
import { Check, ArrowRight } from "lucide-react";

interface HeroProps {
  onBookDemoClick: () => void;
  onRingSamClick?: () => void;
  isCallActive?: boolean;
}

export default function Hero({ onBookDemoClick, onRingSamClick, isCallActive }: HeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-950 overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="font-mono text-xs text-slate-300 tracking-wider uppercase font-medium">
              AI Voice Agents for Appointment-Based Businesses
            </span>
          </div>

          {/* Primary Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Never Miss Another Call. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-300">
              Never Lose Another Patient.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-light leading-relaxed">
            Meet <strong className="text-white font-medium">Sam</strong>, our intelligent 24/7 AI voice receptionist. 
            Sam answers inbound calls instantly, answers treatment FAQs, schedules appointments into your calendar, 
            and rescues lost leads—stopping your clinic's silent revenue leaks today.
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onBookDemoClick}
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-brand-500/35 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Book a Free Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onRingSamClick}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Try Sam
            </button>
          </div>

          {/* Trust Indicators Bar */}
          <div className="pt-8 border-t border-slate-900/60 w-full">
            <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 text-center">
              TRAINED SPECIALISTS FOR HIGH-LTV CLINICS
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 font-medium font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                <Check className="w-3.5 h-3.5 text-brand-500" /> MEDSPAS & AESTHETIC
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                <Check className="w-3.5 h-3.5 text-brand-500" /> DENTAL CLINICS
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                <Check className="w-3.5 h-3.5 text-brand-500" /> DERMATOLOGY
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                <Check className="w-3.5 h-3.5 text-brand-500" /> BEAUTY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
