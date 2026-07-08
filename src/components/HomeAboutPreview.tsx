import React from "react";
import { Video, Code, ShieldCheck, Mail, PhoneCall, ArrowRight } from "lucide-react";

interface HomeAboutPreviewProps {
  onAboutUsClick: () => void;
}

export default function HomeAboutPreview({ onAboutUsClick }: HomeAboutPreviewProps) {
  return (
    <div className="bg-slate-950 text-slate-100 font-sans border-t border-slate-900">
      {/* 1. Profile & Biography / Mission Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Bio text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-brand-400 tracking-wider font-semibold uppercase">OUR MISSION</span>
              <h2 className="font-display text-3xl font-bold text-white">Elevating local clinics with custom voice agents</h2>
            </div>
            
            <p className="text-slate-400 leading-relaxed font-light text-sm">
              Flow AI Voice Agency was founded on a simple insight: local, high-value clinical practices lose significant revenue when calls go unanswered, yet human receptionist overhead is costly and subject to burnout.
            </p>
            <p className="text-slate-400 leading-relaxed font-light text-sm">
              Rather than selling generic chat templates or complex phone systems that clinics must set up themselves, we operate as a full-service, bespoke development agency. We design conversational flows, map availability boundaries, build calendar integrations, and verify latency parameters to ensure every call flows naturally.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2 p-4 bg-slate-900/40 border border-slate-900 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
                <h4 className="font-bold text-xs text-white">100% Secure</h4>
                <p className="text-[10px] text-slate-500 font-light leading-normal">Compliance ready layouts built on secure modern frameworks.</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-900/40 border border-slate-900 rounded-xl">
                <Code className="w-5 h-5 text-brand-400" />
                <h4 className="font-bold text-xs text-white">Custom Dev</h4>
                <p className="text-[10px] text-slate-500 font-light leading-normal">Bespoke REST & Calendar synchronization for your CRM.</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-900/40 border border-slate-900 rounded-xl">
                <Video className="w-5 h-5 text-brand-400" />
                <h4 className="font-bold text-xs text-white">Direct Audits</h4>
                <p className="text-[10px] text-slate-500 font-light leading-normal">Comprehensive analysis of missed call counts and ROI metrics.</p>
              </div>
            </div>

            {/* Trigger Button to full About Us page */}
            <div className="pt-4">
              <button
                onClick={onAboutUsClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-650 hover:bg-brand-550 text-white font-semibold text-xs rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Founder Graphic Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-900 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-6 relative">
              {/* Founder Avatar - Enlarged to w-36 h-36 */}
              <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-800 shadow-xl shadow-brand-600/10 bg-slate-950">
                <img 
                  src="/MyImg.png" 
                  alt="Kuldip Bopche" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">Kuldip Bopche</h3>
                <p className="text-xs text-slate-500 font-mono">Founder & Lead Automation Engineer</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                "We work directly with practitioners and practice managers to build reliable digital staff. When our clients deploy an AI receptionist, we ensure it matches their practice identity down to the treatment protocols."
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a href="mailto:kuldipbopche3@gmail.com" className="inline-flex items-center gap-2 text-xs text-brand-450 hover:text-brand-350 transition-colors font-mono">
                  <Mail className="w-4 h-4" /> kuldipbopche3@gmail.com
                </a>
                <a href="tel:+918962417150" className="inline-flex items-center gap-2 text-xs text-brand-450 hover:text-brand-350 transition-colors font-mono">
                  <PhoneCall className="w-4 h-4" /> +91 89624 17150
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Presentation Section */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Video className="w-6 h-6 text-brand-400" /> Watch Our Agency Presentation
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-md mx-auto">
              A comprehensive walkthrough of our voice technology system and agency capabilities.
            </p>
          </div>

          {/* Video Player */}
          <div className="relative border border-slate-800 rounded-3xl overflow-hidden bg-slate-950 aspect-video shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/3N7g2nN2x4Q?autoplay=0&rel=0&modestbranding=1"
              title="Watch Our Agency Presentation"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
