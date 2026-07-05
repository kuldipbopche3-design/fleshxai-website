import React from "react";
import { AlertCircle, Clock, ShieldAlert, Ban } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      stat: "29% - 68%",
      label: "Missed Clinic Calls",
      impact: "Silent Revenue Leak",
      description: "Industry data shows nearly 30% of standard inbound calls and up to 68% during peak hours (like Monday mornings or lunch) go straight to voicemail because staff are checking in patients.",
      icon: <Clock className="w-5 h-5 text-red-400" />
    },
    {
      stat: "67%",
      label: "Immediate Competitor Pivot",
      impact: "Wasted Marketing Dollars",
      description: "67% of potential patients who call a clinic and don't get an answer will simply hang up and call the next listing on Google or social ads. They do not leave a message—they just move on.",
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />
    },
    {
      stat: "11%",
      label: "After-Hours Opportunities",
      impact: "Uncaptured Late-Night Inquiries",
      description: "Around 11% of high-intent patient booking calls happen outside normal 9-to-5 operating hours. Relying on basic voicemails or cold automated forms leaves these premium spots empty.",
      icon: <AlertCircle className="w-5 h-5 text-red-400" />
    },
    {
      stat: "15% - 30%",
      label: "Patient No-Show Rates",
      impact: "Overworked Schedulers",
      description: "Clinics without prompt multi-channel reservation text and calendar reminder flows lose up to 30% of their weekly booked treatments to no-shows and forgotten slots.",
      icon: <Ban className="w-5 h-5 text-red-400" />
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            THE SILENT REVENUE LEAK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Hidden Cost of a Missed Call
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            You spend thousands on SEO, Google Maps, and social media ads to make the phone ring. 
            Yet, when that phone rings during peak hours or after-hours, here is the harsh reality.
          </p>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, idx) => (
            <div 
              key={idx} 
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon & Impact Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center">
                    {prob.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-slate-900 px-2 py-1 rounded text-red-400 font-medium">
                    {prob.impact}
                  </span>
                </div>

                {/* Big Stat */}
                <div className="space-y-1">
                  <p className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-brand-400 transition-colors">
                    {prob.stat}
                  </p>
                  <p className="text-sm font-semibold text-slate-300">
                    {prob.label}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {prob.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-red-950/20 via-slate-900 to-transparent mt-6"></div>
            </div>
          ))}
        </div>

        {/* Closing Authority Callout */}
        <div className="mt-12 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display font-semibold text-white">Is your front desk currently understaffed?</h4>
            <p className="text-xs text-slate-400 max-w-xl">
              Hiring another full-time receptionist costs over $40,000/year plus benefits. Sam does not take sick leave, works 24/7/365, answers every call on ring one, and recovers your ad spend instantly.
            </p>
          </div>
          <a
            href="#roi-calculator"
            className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-mono font-medium transition-colors"
          >
            Calculate Your Recoverable Loss →
          </a>
        </div>

      </div>
    </section>
  );
}
