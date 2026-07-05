import React from "react";
import { Sparkles, Smile, Heart, Flower } from "lucide-react";
import { INDUSTRIES } from "../types";

export default function Industries() {
  const renderIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-brand-400" />;
      case "Smile":
        return <Smile className="w-5 h-5 text-brand-400" />;
      case "Heart":
        return <Heart className="w-5 h-5 text-brand-400" />;
      case "Flower":
        return <Flower className="w-5 h-5 text-brand-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            MARKET SPECIALIZATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Custom-Trained for Premium Specialties
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            We don't believe in one-size-fits-all templates. Our voice agents are trained in clinical vocabulary, patient consultation flows, and specific booking rules for your exact niche.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {INDUSTRIES.map((ind, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/50 border border-slate-850 hover:border-slate-750 p-6 md:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-xl text-white group-hover:text-brand-300 transition-colors">
                      {ind.name}
                    </h4>
                    <p className="text-xs text-brand-400 font-mono tracking-wide uppercase">
                      {ind.tagline}
                    </p>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {renderIcon(ind.iconName)}
                  </div>
                </div>

                {/* Description of use cases */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    CORE VOICE FUNCTIONS:
                  </p>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {ind.useCase}
                  </p>
                </div>
              </div>

              {/* Metric Callout */}
              <div className="pt-6 border-t border-slate-850/60 mt-6 flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-500 uppercase">REPRESENTATIVE CLINIC STAT:</span>
                <span className="text-emerald-400 font-semibold uppercase">{ind.metrics}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
