import React from "react";
import { Check, ArrowRight } from "lucide-react";

interface PricingProps {
  onBookDemoClick: () => void;
}

export default function Pricing({ onBookDemoClick }: PricingProps) {
  const plans = [
    {
      name: "Starter Plan",
      price: "$200",
      period: "month",
      description: "Perfect for local clinics and single-provider practices starting with AI operations.",
      features: [
        "Up to 500 AI call minutes/mo",
        "Standard Google Calendar sync",
        "1 custom voice persona (Sam)",
        "Automated SMS booking confirmations",
        "Next-day call transcripts",
        "Email & community support"
      ],
      ctaText: "Book a Free Demo",
      popular: false
    },
    {
      name: "Growth Plan",
      price: "$450",
      period: "month",
      description: "Ideal for busy practices, multi-provider clinics, and medspas with active marketing.",
      features: [
        "Up to 1,500 AI call minutes/mo",
        "Advanced CRM integration (Jane, Mindbody, etc.)",
        "Direct patient recalls & outbound callbacks",
        "Live call routing & escalation protocols",
        "Dedicated account manager",
        "Priority 24/7 Slack developer support"
      ],
      ctaText: "Book a Free Demo",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "bespoke",
      description: "For multi-location groups, hospital networks, or clinics requiring dedicated SLA.",
      features: [
        "Unlimited custom call capacity",
        "Full-suite custom API & EHR backend integrations",
        "HIPAA compliance logging & secure storage",
        "Fully custom voice cloning (your staff's voice)",
        "Lifetime support & regular accuracy audits",
        "SLA and response guarantees"
      ],
      ctaText: "Book a Free Demo",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-950 border-t border-b border-slate-900 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold bg-brand-950/40 border border-brand-900/40 px-3.5 py-1.5 rounded-full">
            TRANSPARENT VALUE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Flexible Pricing Built for Clinic Growth
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
            Qualify your inbound booking channels with custom-trained voice agents. Choose an entry tier or scale up as your call volume grows.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                plan.popular 
                  ? "bg-slate-900/80 border-brand-500 shadow-xl shadow-brand-500/5 scale-105 z-10" 
                  : "bg-slate-900/30 border-slate-850 hover:border-slate-750"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white font-mono text-[10px] tracking-wider uppercase font-bold rounded-full">
                  MOST POPULAR
                </span>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-white text-lg">{plan.name}</h4>
                  <p className="text-xs text-slate-400 font-light min-h-[40px] leading-relaxed">{plan.description}</p>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-1 text-white border-b border-slate-850 pb-6">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    /{plan.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 text-xs text-slate-300">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <span className="font-light leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={onBookDemoClick}
                  className={`w-full py-3.5 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer ${
                    plan.popular
                      ? "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25"
                      : "bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle footnote */}
        <div className="mt-16 text-center max-w-lg mx-auto">
          <p className="text-xs text-slate-500 font-light leading-relaxed font-mono">
            Looking for custom clinical websites or web-design additions? Ask about our <span className="text-brand-400 font-semibold">Web + AI bundle plans</span> during your free demo.
          </p>
        </div>

      </div>
    </section>
  );
}
