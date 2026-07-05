import React, { useState } from "react";
import { PhoneCall, Calendar, Check, Play, RotateCcw, MessageSquare, ArrowRight } from "lucide-react";
import { MOCK_SIMULATIONS } from "../types";

interface HeroProps {
  onBookDemoClick: () => void;
}

export default function Hero({ onBookDemoClick }: HeroProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<"medspa" | "dental">("medspa");
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [callLog, setCallLog] = useState<Array<{ speaker: string; text: string }>>([]);
  const [isCalling, setIsCalling] = useState(false);

  const simulation = MOCK_SIMULATIONS[selectedIndustry];
  const currentNode = simulation.nodes[currentNodeId];

  const handleOptionClick = (nextNodeId: string, optionText: string) => {
    // Add user selection to log
    const updatedLog = [...callLog];
    if (currentNodeId !== "start") {
      updatedLog.push({ speaker: "caller", text: optionText });
    }
    
    // Add Sam response to log (with simulated delay)
    setIsCalling(true);
    setCurrentNodeId(nextNodeId);
    
    const nextNode = simulation.nodes[nextNodeId];
    if (nextNode && nextNode.speaker !== "system") {
      updatedLog.push({ speaker: nextNode.speaker, text: nextNode.text });
    } else if (nextNode && nextNode.speaker === "system") {
      updatedLog.push({ speaker: "system", text: nextNode.text });
    }
    setCallLog(updatedLog);
  };

  const handleReset = () => {
    setCurrentNodeId("start");
    setCallLog([]);
    setIsCalling(false);
  };

  const handleIndustryChange = (ind: "medspa" | "dental") => {
    setSelectedIndustry(ind);
    setCurrentNodeId("start");
    setCallLog([]);
    setIsCalling(false);
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-slate-950 overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="font-mono text-xs text-slate-300 tracking-wider uppercase font-medium">
                AI Voice Agents for Appointment-Based Businesses
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Never Miss Another Call. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-sky-300">
                Never Lose Another Patient.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-400 font-light leading-relaxed">
              Meet <strong className="text-white font-medium">Sam</strong>, our intelligent 24/7 AI voice receptionist. 
              Sam answers inbound calls instantly, answers treatment FAQs, schedules appointments into your calendar, 
              and rescues lost leads—stopping your clinic's silent revenue leaks today.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookDemoClick}
                className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-brand-500/35 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                Book Your 15-Minute Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#interactive-demo"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Try Live Simulator
              </a>
            </div>

            {/* Trust Indicators Bar */}
            <div className="pt-8 border-t border-slate-900/60">
              <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 text-center lg:text-left">
                TRAINED SPECIALISTS FOR HIGH-LTV CLINICS
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                  <Check className="w-3.5 h-3.5 text-brand-500" /> MEDSPAS & AESTHETIC
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                  <Check className="w-3.5 h-3.5 text-brand-500" /> DENTAL CLINICS
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                  <Check className="w-3.5 h-3.5 text-brand-500" /> DERMATOLOGY
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/40 border border-slate-900">
                  <Check className="w-3.5 h-3.5 text-brand-500" /> BEAUTY
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Telephone Simulator (Right 5 Columns) */}
          <div id="interactive-demo" className="lg:col-span-5 relative w-full max-w-md mx-auto">
            {/* Glowing background halo */}
            <div className="absolute inset-0 bg-brand-500/20 rounded-3xl blur-2xl opacity-50"></div>

            {/* Simulated Phone Container */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[560px]">
              {/* Phone Header / Status Bar */}
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 absolute"></span>
                  <span className="font-mono text-xs font-semibold text-slate-300">SAM (AI CLERK) IS ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-brand-950 text-brand-400 border border-brand-800/50 px-2 py-0.5 rounded">
                    VOICE ENGINE v3.4
                  </span>
                </div>
              </div>

              {/* Industry Select Tabs */}
              <div className="grid grid-cols-2 bg-slate-950/40 border-b border-slate-800">
                <button
                  onClick={() => handleIndustryChange("medspa")}
                  className={`py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-medium transition-colors ${
                    selectedIndustry === "medspa"
                      ? "border-brand-500 text-white bg-slate-900/30"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Glow MedSpa Demo
                </button>
                <button
                  onClick={() => handleIndustryChange("dental")}
                  className={`py-3 text-xs font-mono tracking-wider uppercase border-b-2 font-medium transition-colors ${
                    selectedIndustry === "dental"
                      ? "border-brand-500 text-white bg-slate-900/30"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Riverside Dental Demo
                </button>
              </div>

              {/* Active Call Visualization / Logs Panel */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
                {callLog.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-950/80 border border-brand-800/40 flex items-center justify-center text-brand-400 animate-pulse">
                      <PhoneCall className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-white">Experience an AI Phone Call</h4>
                      <p className="text-xs text-slate-400 max-w-[240px]">
                        Choose options below to simulate how Sam handles live patient inquiries, answers questions, and schedules bookings.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {callLog.map((log, index) => {
                      if (log.speaker === "sam") {
                        return (
                          <div key={index} className="flex gap-2.5 items-start">
                            <div className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              S
                            </div>
                            <div className="bg-slate-800/80 border border-slate-750 text-slate-100 p-3 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[85%]">
                              <span className="font-semibold text-[10px] font-mono text-brand-400 block mb-1">Sam (AI Voice)</span>
                              {log.text}
                            </div>
                          </div>
                        );
                      } else if (log.speaker === "caller") {
                        return (
                          <div key={index} className="flex gap-2.5 items-start justify-end">
                            <div className="bg-brand-950/40 border border-brand-800/50 text-slate-100 p-3 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[85%]">
                              <span className="font-semibold text-[10px] font-mono text-slate-400 block mb-1">Your response (Customer)</span>
                              {log.text}
                            </div>
                            <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              Y
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl text-center space-y-2">
                            <p className="text-xs font-mono text-slate-400 font-light">{log.text}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>

              {/* Animated Waveform (shown when call is active but no results or just typing) */}
              {callLog.length > 0 && currentNodeId !== "success" && currentNodeId !== "start" && (
                <div className="px-6 py-2.5 bg-slate-950 border-t border-b border-slate-800 flex items-center justify-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase mr-2">SAM SPEAKING:</span>
                  <div className="flex items-center gap-1 h-4">
                    <span className="w-0.75 h-2.5 bg-brand-500 rounded animate-[pulse_0.8s_infinite]"></span>
                    <span className="w-0.75 h-4 bg-brand-400 rounded animate-[pulse_1.2s_infinite]"></span>
                    <span className="w-0.75 h-1.5 bg-brand-500 rounded animate-[pulse_0.6s_infinite]"></span>
                    <span className="w-0.75 h-3.5 bg-brand-300 rounded animate-[pulse_1s_infinite]"></span>
                    <span className="w-0.75 h-2 bg-brand-400 rounded animate-[pulse_0.9s_infinite]"></span>
                  </div>
                </div>
              )}

              {/* Action Trigger / Choices Panel */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col gap-2 min-h-[120px] justify-center">
                {currentNode && currentNode.options ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                      {currentNodeId === "start" ? "INITIATE DEMO" : "SELECT YOUR RESPONSE"}
                    </p>
                    {currentNode.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt.nextNodeId, opt.text)}
                        className={`w-full text-left p-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-between group ${
                          currentNodeId === "start"
                            ? "bg-brand-600 hover:bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-600/15"
                            : "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-200"
                        }`}
                      >
                        <span>{opt.text}</span>
                        {currentNodeId === "start" ? (
                          <Play className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Restart Simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
