import React from "react";
import { Video, Code, ShieldCheck, Mail, ArrowRight, PhoneCall } from "lucide-react";

interface AboutUsPageProps {
  onBookDemoClick: () => void;
}

export default function AboutUsPage({ onBookDemoClick }: AboutUsPageProps) {
  const liveProjects = [
    {
      title: "Skinfinity Derma Receptionist",
      role: "Lead Voice Developer & Integrator",
      summary: "A bespoke AI booking receptionist answering dermatological treatment queries, screening medical history, and scheduling appointments directly into janeapp CRM.",
      impact: "Recovered $8,200 in cosmetic laser fees in its initial 2 weeks."
    },
    {
      title: "Apex MedSpa Outbound Recall Bot",
      role: "Conversational Architect",
      summary: "Outbound agent configured to automatically reach out to patients due for their 6-month Botox touchups, delivering custom booking links via conversational speech.",
      impact: "Re-engaged 28% of lapsed patients without manual staff outreach."
    }
  ];

  const socialLinks = [
    {
      platform: "Instagram",
      handle: "@AXION_KD",
      link: "https://www.instagram.com/AXION_KD",
      bgClass: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(238,42,123,0.35)]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      platform: "X / Twitter",
      handle: "@kuldip_bopche",
      link: "https://x.com/kuldip_bopche",
      bgClass: "bg-black border border-slate-800",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      platform: "LinkedIn",
      handle: "Kuldeep Bopche",
      link: "https://www.linkedin.com/posts/kuldeep-bopche-052026284_b2bsales-coldcalling-leadgeneration-share-7462547964364824576-xrWc/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEUPCr4BjBmTCXrn_dk2QEKHrEBJvWVSs_A",
      bgClass: "bg-[#0a66c2]",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(10,102,194,0.35)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      platform: "YouTube",
      handle: "@india-with-AI",
      link: "https://www.youtube.com/@india-with-AI",
      bgClass: "bg-[#ff0000]",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(255,0,0,0.35)]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      platform: "Pinterest",
      handle: "kuldipbopche3",
      link: "https://www.pinterest.com/kuldipbopche3",
      bgClass: "bg-[#e60023]",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(230,0,35,0.35)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.947-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.906 2.17-2.906 1.024 0 1.517.769 1.517 1.689 0 1.029-.656 2.57-.991 3.997-.283 1.195.597 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.211-.174.256-.402.15-1.504-.699-2.445-2.895-2.445-4.661 0-3.799 2.758-7.292 7.962-7.292 4.18 0 7.428 2.978 7.428 6.96 0 4.153-2.619 7.496-6.257 7.496-1.22 0-2.37-.635-2.762-1.38l-.752 2.868c-.272 1.045-1.013 2.351-1.511 3.161 1.12.32 2.3.49 3.52.49 6.621 0 11.988-5.367 11.988-11.987C24.004 5.367 18.638 0 12.017 0z" />
        </svg>
      )
    },
    {
      platform: "Facebook",
      handle: "Kuldeep Bopche",
      link: "https://www.facebook.com/share/p/1CtWmp6xFY/",
      bgClass: "bg-[#1877f2]",
      hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(24,119,242,0.35)]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Page Hero */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-950/20 via-slate-950 to-slate-950 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold bg-brand-950/40 border border-brand-850 px-3 py-1 rounded-full">
            ABOUT FLOW AI & FOUNDER
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Meet the Agency Driving Clinical Automation
          </h1>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            We are dedicated to building custom, secure, and highly conversation-accurate voice systems that save front-desk hours and elevate client conversion.
          </p>
        </div>
      </section>

      {/* Profile & Biography Section */}
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

            <div className="grid sm:grid-cols-3 gap-6 pt-6">
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
          </div>

          {/* Founder Graphic Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-900 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-6 relative">
              {/* Founder Avatar */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-800 shadow-xl shadow-brand-600/10 bg-slate-950">
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

      {/* Video Presentation Section */}
      <section className="py-20 bg-slate-900/30 border-t border-b border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Video className="w-6 h-6 text-brand-400" /> Watch Our Agency Presentation
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-md mx-auto">
              A comprehensive walkthrough of our voice technology system and agency capabilities.
            </p>
          </div>

          {/* Premium Video Player Container */}
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

      {/* Portfolio & Live Projects Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-brand-400 tracking-wider font-semibold uppercase">OUR PORTFOLIO</span>
          <h2 className="font-display text-3xl font-bold text-white">Recent Deployments & Live Cases</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
            We collaborate with clinic owners to transition scheduling tasks into automated assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {liveProjects.map((project, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl flex flex-col justify-between space-y-5 hover:border-slate-850 transition-colors">
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
                <p className="text-[10px] text-brand-400 font-mono tracking-wider">{project.role}</p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{project.summary}</p>
              </div>
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-3 py-1 rounded">
                  {project.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className="py-20 bg-[#07080a] border-t border-b border-slate-900 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Let's Stay in Touch
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-md mx-auto">
              Follow the journey across every platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative bg-[#0e1015] border border-slate-900/80 hover:border-slate-800 rounded-[24px] p-8 flex flex-col justify-between min-h-[170px] transition-all duration-300 hover:scale-[1.02] ${item.hoverShadow} overflow-hidden`}
              >
                {/* Brand Icon */}
                <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center text-white ${item.bgClass} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  {item.icon}
                </div>
                
                {/* Brand Info */}
                <div className="mt-8 space-y-1">
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {item.platform}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans tracking-wide">
                    {item.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Book Consultation CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-brand-950/15 border-t border-slate-900 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-3xl font-bold text-white">Let's build your agency solution</h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl mx-auto">
            Ready to secure your front-desk operations with a custom, low-latency receptionist? Schedule an agency consultation to audit your missed call volume.
          </p>
          <div className="pt-4">
            <button
              onClick={onBookDemoClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-brand-600/15 transition-all duration-300"
            >
              Get Free Operations Audit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
