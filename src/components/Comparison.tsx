import React from "react";
import { AlertTriangle, Sparkles, XCircle, CheckCircle2 } from "lucide-react";

export default function Comparison() {
  const points = [
    {
      topic: "Inbound Call Inquiries",
      before: "29% - 68% of calls go unanswered during rush hours or lunchtime, sliding directly to voicemail.",
      after: "Every single call answered on ring one, 24/7/365. Zero hold times, zero callers sent to voicemail.",
      isGood: true
    },
    {
      topic: "Calendar Booking & Sync",
      before: "Overworked receptionists play phone tag or try to sync manual paper books, leading to double-bookings.",
      after: "Instant live Google Calendar checks. Schedules, reschedules, or cancels appointments in real-time securely.",
      isGood: true
    },
    {
      topic: "Patient No-Show Prevention",
      before: "Forgotten spots due to manual text follow-up, costing clinics thousands in empty treatment slots.",
      after: "Immediate automated SMS confirmations and reminders pushed automatically to cut no-shows by up to 80%.",
      isGood: true
    },
    {
      topic: "Operational Visibility",
      before: "Owner has zero records of missed calls, unanswered clinical questions, or team booking leakages.",
      after: "Full call transcripts, AI summaries, and estimated revenue impact logs populated onto your metrics dashboard.",
      isGood: true
    },
    {
      topic: "Front-Desk Workplace Burden",
      before: "Burnout, stress, constant phone interruptions, high hiring and training costs for receptionist roles.",
      after: "Front-desk staff freed from phone anxiety to focus exclusively on checking in patients and premium treatments.",
      isGood: true
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            THE STRATEGIC SHIFT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Transform Your Clinic's Operational DNA
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Traditional answering services cost money without driving bookings. Flow AI replaces chaotic, manual overhead with fully automated, predictable clinic growth.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Before Column (Leaky/Stressful) */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
            {/* Red alert gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">Without Flow AI Voice</h4>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Unpredictable Leakage & Manual Burden</p>
                </div>
              </div>

              {/* Point lists */}
              <div className="space-y-5">
                {points.map((pt, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">{pt.topic}</p>
                    <div className="flex gap-2.5 items-start">
                      <XCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-400 leading-relaxed font-light">{pt.before}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900/60 mt-8">
              <p className="text-xs font-mono text-red-400/80 font-light">
                ❌ Voicemails left unanswered, high staff turnover, and wasted clinical advertising budget.
              </p>
            </div>
          </div>

          {/* After Column (Streamlined/Lucrative) */}
          <div className="bg-slate-950 border-2 border-brand-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-brand-950/10">
            {/* Green gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-950/50 border border-brand-800/40 flex items-center justify-center text-brand-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">With Sam (Your AI Clerk)</h4>
                  <p className="text-xs text-brand-400 font-mono uppercase tracking-wider">Automated Efficiency & Captured Bookings</p>
                </div>
              </div>

              {/* Point lists */}
              <div className="space-y-5">
                {points.map((pt, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-semibold text-brand-300 font-mono uppercase tracking-wider">{pt.topic}</p>
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-300 leading-relaxed font-light">{pt.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900/60 mt-8">
              <p className="text-xs font-mono text-emerald-400 font-light">
                ✅ Answered instantly, synchronized calendars, SMS confirmed, and full staff relief.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
