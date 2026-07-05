import React from "react";
import { 
  PhoneCall, 
  Calendar, 
  Send, 
  ShieldAlert, 
  Database, 
  FileText, 
  TrendingUp, 
  UserCheck 
} from "lucide-react";
import { FEATURES } from "../types";

export default function Features() {
  // Helper to render the correct Lucide icon
  const renderIcon = (name: string) => {
    switch (name) {
      case "PhoneCall":
        return <PhoneCall className="w-5 h-5 text-brand-400" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-brand-400" />;
      case "Send":
        return <Send className="w-5 h-5 text-brand-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-brand-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-brand-400" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-brand-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-brand-400" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5 text-brand-400" />;
      default:
        return <PhoneCall className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            ENGINE DETAILS & SPECIFICATIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Features Built Exclusively for High-LTV Business Growth
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            We don't offer generic templates or simple voice recordings. Every feature is configured 
            to solve a concrete business problem and capture real patient pipeline.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/40 hover:bg-slate-900 border border-slate-850 hover:border-slate-750 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {renderIcon(feat.iconName)}
                </div>

                {/* Outcome Header (Benefit-First) */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-brand-400 font-semibold block">
                    {feat.outcome}
                  </span>
                  <h4 className="font-display font-bold text-base text-white">
                    {feat.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>

              {/* Minimal indicator link */}
              <div className="w-full h-px bg-gradient-to-r from-slate-850 to-transparent mt-6 group-hover:from-brand-500/20 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
