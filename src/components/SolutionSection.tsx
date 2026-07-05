import React, { useState } from "react";
import { Phone, CheckCircle, Calendar, MessageSquare, ShieldCheck, Mail, ArrowRight } from "lucide-react";

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);

  const callSteps = [
    {
      title: "1. Call Received instantly",
      desc: "Sam answers on the first ring, 24/7/365. No queues, zero hold times, and absolutely no tedious 'press 1 for billing' robotic menus.",
      details: "Greeting is personalized to your clinic: 'Thank you for calling SkinCare Spa, this is Sam on the virtual desk...'",
      icon: <Phone className="w-5 h-5 text-brand-400" />
    },
    {
      title: "2. Understands & Guides",
      desc: "Sam speaks and understands in highly polite, conversational English. It answers treatment questions, details duration, and qualifies client needs.",
      details: "Example: 'Yes, Botox is $14/unit and usually takes about 15 minutes. Would you like a consultation tomorrow?'",
      icon: <MessageSquare className="w-5 h-5 text-brand-400" />
    },
    {
      title: "3. Direct Calendar Booking",
      desc: "Sam checks live availability inside Google Calendar (or Jane, Dentrix) and instantly books the appointment block—strictly respecting your provider constraints.",
      details: "Checks for minimum buffers, provider license limitations, and marks the event name cleanly.",
      icon: <Calendar className="w-5 h-5 text-brand-400" />
    },
    {
      title: "4. Multi-Channel Confirmation",
      desc: "Sam collects the patient's phone and email and instantly pushes custom pre-care guidelines, clinic location, and booking confirmation links.",
      details: "Automated SMS/WhatsApp reminder cuts clinical no-shows by up to 80% on autopilot.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-400" />
    },
    {
      title: "5. Real-Time Staff Sync",
      desc: "The booking pops up on your reception screen in real time. Your staff receives an email summarizing the call, transcript, and custom notes.",
      details: "No manual data entry required. Your team is perfectly aligned before the patient walks in.",
      icon: <Mail className="w-5 h-5 text-brand-400" />
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16 md:mb-24">
          {/* Left Column: Core Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
              THE SOLUTION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Meet Sam: Your New Always-On Digital Front Desk
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              We don't build generic chatbots or pre-recorded IVR menus. We build bespoke voice intelligence trained to represent your specific clinic with warmth, professional composure, and clinical accuracy.
            </p>
            
            {/* Value Checkmarks */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 font-sans text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Answers on ring one, 24/7</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Zero hold times or hold music</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Human-like natural voice flow</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Real-time scheduling sync</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Concept Visual */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-850 rounded-2xl p-6 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-4">
              SAM'S CORE SKILLS IN ACTION
            </h4>
            
            {/* Grid of micro cards detailing outcomes */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-mono font-bold shrink-0">
                  A
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Absolute Calendar Sync</p>
                  <p className="text-slate-400 font-light leading-relaxed">Direct read-and-write API integration with Google Calendar, Jane App, Dentrix, and Mindbody.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center font-mono font-bold shrink-0">
                  B
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Clinical IQ Base</p>
                  <p className="text-slate-400 font-light leading-relaxed">Answers questions about downtime, pricing, preparation rules, and clinic parking naturally.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-950 text-brand-400 flex items-center justify-center font-mono font-bold shrink-0">
                  C
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Smart Safety Escalation</p>
                  <p className="text-slate-400 font-light leading-relaxed">Gracefully transitions complex medical questions or clinical emergencies to your human desk.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Step-by-Step Call Lifecycle Visual */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-10">
          <div className="text-center md:text-left mb-8">
            <h3 className="font-display text-lg font-bold text-white mb-1">
              What a Complete Call Looks Like
            </h3>
            <p className="text-xs text-slate-400">
              Click through the steps below to follow Sam's operational safety flow during a client call.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Steps Selector (Left 5 Columns) */}
            <div className="lg:col-span-5 space-y-2">
              {callSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    activeStep === index
                      ? "bg-slate-900 border-brand-500/80 text-white shadow"
                      : "bg-transparent border-slate-850 hover:bg-slate-900/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activeStep === index ? "bg-brand-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Detail Card (Right 7 Columns) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 min-h-[240px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-brand-400 uppercase font-bold">
                  <span>STEP DETAILED REPORT</span>
                  <span>•</span>
                  <span>ONLINE ENGINE</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-lg text-white">
                    {callSteps[activeStep].title}
                  </h4>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {callSteps[activeStep].desc}
                  </p>
                </div>

                {/* Technical Simulation Terminal block */}
                <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-1 bg-opacity-70">
                  <span className="text-slate-500 text-[10px] block mb-1">REAL-TIME CONSOLE TRANSCRIPT:</span>
                  <p className="text-emerald-400">
                    {callSteps[activeStep].details}
                  </p>
                </div>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex gap-1.5 pt-6 justify-center lg:justify-start">
                {callSteps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep ? "w-8 bg-brand-500" : "w-1.5 bg-slate-800"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
