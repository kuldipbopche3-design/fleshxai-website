import React from "react";
import { ShieldCheck, Heart, Sparkles, Check, ArrowRight } from "lucide-react";

interface TestimonialsPageProps {
  onBookDemoClick: () => void;
}

export default function TestimonialsPage({ onBookDemoClick }: TestimonialsPageProps) {
  const cards = [
    {
      title: "Transparent from Day One",
      description: "We don't use fake reviews or invented success stories. Every project we showcase is either a real client project or a clearly labeled demo.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-400" />
    },
    {
      title: "Quality Before Scale",
      description: "Our focus is delivering outstanding work, even if it means working with fewer clients. Every project receives personal attention.",
      icon: <Heart className="w-6 h-6 text-rose-400" />
    },
    {
      title: "Looking for Founding Clients",
      description: "We're currently partnering with a limited number of businesses to build our portfolio. Early clients receive dedicated support, fast communication, and our full commitment.",
      icon: <Sparkles className="w-6 h-6 text-amber-400" />
    }
  ];

  const benefits = [
    "Direct communication with the founder",
    "Custom-built solutions (no generic templates)",
    "AI Voice Agent expertise",
    "Modern, fast-loading websites",
    "Long-term support after launch",
    "Honest communication and transparent pricing"
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Page Header */}
      <section className="relative py-24 overflow-hidden">
        {/* Glowing background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-950/25 via-slate-950 to-slate-950 opacity-70 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold bg-brand-950/40 border border-brand-900/50 px-4 py-1.5 rounded-full">
            Our Approach
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Building Our Portfolio
          </h1>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            We're a new agency focused on delivering exceptional AI Voice Agents and high-converting websites. Instead of filling our website with fake testimonials, we prefer complete transparency.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-[#0e1015] border border-slate-900 hover:border-slate-800 rounded-3xl p-8 flex flex-col space-y-6 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center shadow-inner">
                {card.icon}
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Work With Us Highlight Box */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-b from-[#0e1015] to-[#0a0c10] border border-slate-900 rounded-[32px] p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Subtle glow inside the box */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-8 relative z-10">
            <div className="text-center md:text-left space-y-2">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
                Why Work With Us?
              </h2>
              <p className="text-xs text-slate-500 font-mono tracking-wider">
                OUR CORE VALUES & COMMITMENTS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-slate-950/40 border border-slate-900/50 p-4 rounded-2xl">
                  <div className="w-6 h-6 rounded-full bg-brand-950/30 border border-brand-900/40 flex items-center justify-center text-brand-400 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-300 font-light leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Call Call-to-Action */}
      <section className="py-16 text-center max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="space-y-8">
          <p className="text-xs text-slate-500 italic tracking-wide">
            "Every testimonial you see here in the future will come from a real client."
          </p>
          <div className="pt-2">
            <button
              onClick={onBookDemoClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-2xl shadow-xl shadow-brand-600/15 transition-all duration-300 hover:scale-[1.02]"
            >
              Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
