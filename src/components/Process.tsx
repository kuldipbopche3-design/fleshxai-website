import React from "react";
import { Search, Cable, Cpu, Radio, ShieldCheck } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Blueprinting",
      desc: "We analyze your typical call volume, map out your common treatments, collect your scheduling constraints, and document provider boundaries.",
      icon: <Search className="w-5 h-5 text-brand-400" />
    },
    {
      num: "02",
      title: "Seamless Calendaring Sync",
      desc: "Our engineering team syncs Sam with your calendar or CRM securely. We establish call forwarding lines and configure SMS/WhatsApp outreach channels.",
      icon: <Cable className="w-5 h-5 text-brand-400" />
    },
    {
      num: "03",
      title: "Training & Guardrails Testing",
      desc: "We train your custom instance of Sam on your treatment pricing, pre-care guidelines, FAQs, and escalation protocols. We run 50+ test calls to ensure absolute safety.",
      icon: <Cpu className="w-5 h-5 text-brand-400" />
    },
    {
      num: "04",
      title: "Forward & Go Live",
      desc: "Forward your lines, go live, and watch your dashboard populate with booked appointments. We monitor early performance daily to refine Sam's conversational accuracy.",
      icon: <Radio className="w-5 h-5 text-brand-400" />
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            IMPLEMENTATION MAP
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Our 4-Step White-Glove Onboarding
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            We handle 100% of the heavy lifting. No technical skills are required from you or your front desk. We build, train, and deploy your custom voice agent within 14 business days.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-500/10 via-brand-500/30 to-brand-500/10 z-0"></div>

          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/30 border border-slate-850 hover:border-slate-750 p-6 rounded-2xl relative z-10 transition-all duration-300 group"
            >
              <div className="space-y-6">
                
                {/* Number & Icon header */}
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 tracking-wider">
                    STEP {step.num}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-base text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Seal */}
        <div className="mt-16 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-display font-semibold text-white text-sm">Our Zero-Risk Clinical Guarantee</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              If your custom voice agent does not successfully book multiple appointments or save your clinic managers hours of phone tag during the first 30 days, we will refund your setup fee in full. No questions asked.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
