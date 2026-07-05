import React, { useState } from "react";
import { DollarSign, Percent, Phone, TrendingUp, HelpCircle } from "lucide-react";

export default function Calculator() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [patientLTV, setPatientLTV] = useState(600);
  const [conversionRate, setConversionRate] = useState(40);

  // ROI math:
  // Monthly missed calls = missedCalls * 4.33
  // Recovered bookings = Monthly missed calls * (conversionRate / 100)
  // Monthly recovered revenue = Recovered bookings * patientLTV
  // Annual recovered revenue = Monthly recovered revenue * 12
  const monthlyMissed = Math.round(missedCalls * 4.33);
  const monthlyRecoveredBookings = Math.round(monthlyMissed * (conversionRate / 100));
  const monthlyRevenue = Math.round(monthlyRecoveredBookings * patientLTV);
  const annualRevenue = monthlyRevenue * 12;

  return (
    <section id="roi-calculator" className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative">
      <div className="absolute inset-0 bg-brand-500/5 mix-blend-color-dodge rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            ESTIMATE YOUR CLINIC'S OUTCOME
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Calculate Your Recoverable Revenue Leak
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Missed calls are one of the largest silent revenue drains in modern clinics. 
            Drag the sliders below to see how much revenue Flow AI can recover for your business.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Sliders Input Panel (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-8 flex flex-col justify-center">
            
            {/* Input 1: Missed Calls per Week */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-400" />
                  Missed Inbound Calls / Week
                </label>
                <span className="font-mono text-sm font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded text-white">
                  {missedCalls} calls
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full accent-brand-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>5 / wk (Conservative)</span>
                <span>100 / wk (High Volume Practice)</span>
              </div>
            </div>

            {/* Input 2: Patient/Client Lifetime Value */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-400" />
                  Average Patient Value / LTV
                </label>
                <span className="font-mono text-sm font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded text-white">
                  ${patientLTV}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={patientLTV}
                onChange={(e) => setPatientLTV(Number(e.target.value))}
                className="w-full accent-brand-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>$100 (Routine clean/beauty)</span>
                <span>$3,000 (Major dental/injectables pack)</span>
              </div>
            </div>

            {/* Input 3: Conversion Booking Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-brand-400" />
                  AI Booking Conversion Rate
                </label>
                <span className="font-mono text-sm font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded text-white">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-brand-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>10% (Low)</span>
                <span>90% (Ultra High Capture)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-950 to-slate-950 border-2 border-brand-500/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-brand-400 font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                ESTIMATED MONTHLY HARVEST
              </div>

              {/* Big Metric Display */}
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-light uppercase tracking-wider">Estimated Monthly Recovered</p>
                <p className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  ${monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 font-light">
                  recovering approximately <strong className="text-brand-300 font-medium">{monthlyRecoveredBookings} premium appointments</strong>/month
                </p>
              </div>

              {/* Annualized box */}
              <div className="pt-6 border-t border-slate-800 space-y-1.5">
                <p className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">Projected Annual Revenue Recovered</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-400 font-display">
                  +${annualRevenue.toLocaleString()} / Year
                </p>
                <p className="text-xs text-slate-500 leading-normal">
                  Based on recovering {monthlyRecoveredBookings * 12} missed clinical patients annually.
                </p>
              </div>
            </div>

            {/* Micro assurance and CTA */}
            <div className="pt-8 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex gap-2.5 items-start">
                <HelpCircle className="w-4.5 h-4.5 text-brand-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-400 font-light">
                  *This math is illustrative using typical industry conversion coefficients. Recovering even <strong className="text-white">three missed calls a week</strong> entirely pays for Sam's setup fee.
                </p>
              </div>

              <a
                href="#booking"
                className="block text-center w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl shadow-lg transition-colors text-sm"
              >
                Claim Your Missed Revenue Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
