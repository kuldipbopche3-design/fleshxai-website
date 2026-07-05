import React from "react";
import { MessageSquare, RefreshCw, Star } from "lucide-react";
import { ILLUSTRATIVE_SCENARIOS } from "../types";

export default function CaseScenarios() {
  return (
    <section className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current text-brand-400" /> REALISTIC CASE SCENARIOS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How Flow AI Performs in the Real World
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            These are typical operational scenarios modeled directly from actual medical and aesthetic practice workflows, demonstrating how we rescue leads.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {ILLUSTRATIVE_SCENARIOS.map((sc, idx) => (
            <div 
              key={idx} 
              className="bg-slate-950 border border-slate-850 hover:border-slate-750 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Category tag */}
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-widest text-brand-400 font-bold bg-brand-950/40 border border-brand-800/30 px-2.5 py-1 rounded">
                    {sc.category}
                  </span>
                  <MessageSquare className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                </div>

                {/* Title */}
                <h4 className="font-display font-bold text-base text-white">
                  {sc.title}
                </h4>

                {/* Inner blocks for Problem, Solution, Result */}
                <div className="space-y-4 text-xs font-sans">
                  {/* Problem */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">THE PROBLEM:</p>
                    <p className="text-slate-400 leading-relaxed font-light">{sc.problem}</p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-brand-400 uppercase">THE INTEGRATION:</p>
                    <p className="text-slate-200 leading-relaxed font-light">{sc.solution}</p>
                  </div>
                </div>
              </div>

              {/* Result block */}
              <div className="pt-5 border-t border-slate-850/60 mt-6 space-y-1">
                <p className="text-[10px] font-mono text-emerald-400 uppercase">OUTCOME METRIC:</p>
                <p className="text-xs font-semibold text-white">{sc.result}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
