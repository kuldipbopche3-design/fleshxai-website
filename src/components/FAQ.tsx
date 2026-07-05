import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQs } from "../types";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    if (openIdx === idx) {
      setOpenIdx(null);
    } else {
      setOpenIdx(idx);
    }
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> REVENUE & OPERATION INTELLIGENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Answered Concerns
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-xl mx-auto text-sm">
            We operate with transparency. Here is exactly how we address clinical compliance, technical compatibility, and scheduling guardrails.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4 font-sans">
          {FAQs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`border border-slate-850 rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? "bg-slate-900/60 border-slate-750" : "bg-slate-900/10"
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Answer block with transition simulation */}
                <div 
                  className={`transition-all duration-300 ease-in-out border-slate-800 ${
                    isOpen ? "max-h-[500px] border-t p-5 md:p-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
