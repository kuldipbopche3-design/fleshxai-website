import React from "react";
import { Star, MessageSquare, ArrowRight, ExternalLink, TrendingUp, Users, CheckCircle } from "lucide-react";

interface TestimonialsPageProps {
  onBookDemoClick: () => void;
}

export default function TestimonialsPage({ onBookDemoClick }: TestimonialsPageProps) {
  const caseStudies = [
    {
      title: "MedSpa Lead Rescue Boost",
      metric: "$12,450",
      label: "Revenue Recovered (30 Days)",
      clinic: "Glow Aesthetic Spa, Austin",
      details: "Before Flow AI, Glow Spa was losing after-hours leads to competitors. By deploying Sam, their digital receptionist, they answered 100% of missed calls and scheduled premium treatments overnight.",
      stats: [
        { name: "Inbound calls answered", value: "184" },
        { name: "Appointments booked", value: "27" },
        { name: "Conversion rate", value: "14.6%" }
      ],
      tag: "MedSpa Specialization"
    },
    {
      title: "Dental Office Call-Load Reduction",
      metric: "45%",
      label: "Reduction in Desk Call Load",
      clinic: "Riverside Dental Practice, SF",
      details: "During peak morning hours, receptionist staff were overwhelmed with checking in patients and answering calls. Sam stepped in as backup, handling parking FAQs, booking hygiene cleanings, and transferring emergencies.",
      stats: [
        { name: "Average hold time", value: "0s (down from 3m)" },
        { name: "Overflow calls resolved", value: "112" },
        { name: "Staff stress rating", value: "Decreased by 60%" }
      ],
      tag: "Dental Care Specialization"
    },
    {
      title: "Dermatology Clinic Patient Acquisition",
      metric: "+32%",
      label: "Increase in New Patient Bookings",
      clinic: "Apex Dermatology Center, Chicago",
      details: "Apex Dermatology struggled with patient drop-offs during lunch hours and weekends. Flow AI's Missed-Call Auto-Rescue text campaign instantly reached out to dropped callers with booking links.",
      stats: [
        { name: "Auto-rescue SMS sent", value: "156" },
        { name: "SMS response rate", value: "42%" },
        { name: "New patients scheduled", value: "54" }
      ],
      tag: "Dermatology Clinic Specialization"
    }
  ];

  const testimonials = [
    {
      quote: "Flow AI completely changed our business. Sam sounds so natural that patients frequently thank him for his help! We have recovered thousands in treatments that would have gone to voicemail.",
      author: "Dr. Amanda Ross, MD",
      role: "Founder & Chief Medical Director",
      clinic: "Ross Medical Spa & Wellness",
      rating: 5,
      avatarInitials: "AR"
    },
    {
      quote: "Our receptionists were drowning on Monday mornings. Now, Sam answers the backup lines and schedules cleanings straight into our Dentrix system. The ROI was clear within the first week.",
      author: "Sarah Jenkins, RDH",
      role: "Lead Practice Administrator",
      clinic: "Riverside Family Dentistry",
      rating: 5,
      avatarInitials: "SJ"
    },
    {
      quote: "As a busy dermatologist, I don't have time to worry about missed calls. Sam handles booking inquiries, coordinates insurance screening, and schedules skin checks flawlessly 24/7.",
      author: "Dr. Neil Vance, FAAD",
      role: "Director of Dermatology",
      clinic: "Apex Dermatology Clinics",
      rating: 5,
      avatarInitials: "NV"
    }
  ];

  const liveProjects = [
    {
      name: "MedSpa Virtual Assistant (V1.2)",
      description: "Custom-trained voice agent optimized for cosmetic injectables, FAQs, and Google Calendar syncing.",
      status: "Active & Live",
      metrics: "Average 45 calls/day • 98.4% uptime",
      link: "#",
      tech: ["React", "Gemini Live API", "Twilio API", "WebSockets"]
    },
    {
      name: "Dental Clinic Scheduling Agent (V2.0)",
      description: "Integrates directly with Dentrix calendars to manage booking, rescheduling, and insurance screening.",
      status: "Active & Live",
      metrics: "Average 68 calls/day • 99.2% accuracy",
      link: "#",
      tech: ["TypeScript", "Express", "Google Calendar API", "Vite"]
    },
    {
      name: "Wellness & Chiropractic Intake Agent (V1.0)",
      description: "Low-latency reception agent designed for chiropractic intake, symptom classification, and payment links.",
      status: "Beta Testing",
      metrics: "Average 20 calls/day • 94% user trust score",
      link: "#",
      tech: ["React", "NodeJS", "Twilio Voice API", "Stripe API"]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Page Header */}
      <section className="relative py-20 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-950/20 via-slate-950 to-slate-950 opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold bg-brand-950/40 border border-brand-850 px-3 py-1 rounded-full">
            IMPACT & SOCIAL PROOF
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Measurable Results for Growing Clinics
          </h1>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            See how Flow AI Voice Agency helps medical, dental, and aesthetic practices recover missed revenue, lower administrative stress, and deliver instant 24/7 patient support.
          </p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-display text-3xl font-bold text-white">Client Case Studies</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
            Real data collected from active deployments over a 30-day monitoring period.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-800 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="space-y-4">
                <span className="font-mono text-[10px] tracking-widest text-brand-400 font-bold bg-brand-950/30 border border-brand-900/50 px-2 py-0.5 rounded">
                  {study.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-300 transition-colors">{study.title}</h3>
                <p className="text-[11px] text-slate-500 font-mono italic">{study.clinic}</p>
                <p className="text-xs text-slate-450 font-light leading-relaxed">{study.details}</p>
                
                {/* Highlights */}
                <div className="py-4 border-t border-b border-slate-900/60 my-4 space-y-2">
                  <div className="text-4xl font-extrabold tracking-tight text-white font-display flex items-baseline gap-1">
                    {study.metric}
                    <span className="text-xs text-slate-400 font-normal font-sans">{study.label}</span>
                  </div>
                </div>

                {/* Substats */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Metrics Achieved</p>
                  {study.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-light">{stat.name}</span>
                      <span className="font-semibold text-emerald-400 font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-20 bg-slate-900/30 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-display text-3xl font-bold text-white">What Practice Owners Say</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
              We build long-term relationships with leading clinics by delivering consistent value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-900 p-8 rounded-2xl hover:border-slate-800 transition-colors flex flex-col justify-between space-y-6">
                {/* Rating & Quote */}
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="text-slate-350 text-sm font-light leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-900">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white font-bold text-sm tracking-wide">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">{t.author}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{t.role}</p>
                    <p className="text-[10px] text-brand-400 font-mono font-medium">{t.clinic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Projects & Portfolio */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-display text-3xl font-bold text-white">Live Project Showcase</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
            Check out some of our active systems currently facilitating patient call automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {liveProjects.map((project, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {project.status}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-650" />
                </div>
                <h4 className="font-display font-bold text-white text-base">{project.name}</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{project.description}</p>
                <div className="text-[10px] text-slate-500 font-mono">
                  {project.metrics}
                </div>
              </div>

              {/* Technologies & Links */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="inline-flex items-center gap-1.5 text-xs text-brand-450 hover:text-brand-350 transition-colors font-medium">
                  Verify Live Connection <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Identity Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-brand-950/15 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md shadow-brand-500/10">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white">Flow AI Voice Agency</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-light">
            We operate as a premium, specialized voice automation agency. Our integrations are designed, built, and maintained in-house. We do not white-label generic software or use third-party call centers. Every customer receives a custom voice configuration integrated directly into their CRM.
          </p>
          <div className="pt-4 flex justify-center gap-6 text-xs text-slate-500 font-mono">
            <span>• HIPAA & Compliance Ready</span>
            <span>• Full In-House Development</span>
            <span>• Secure API Implementations</span>
          </div>
          <div className="pt-6">
            <button
              onClick={onBookDemoClick}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-brand-600/15 hover:shadow-brand-500/20 transition-all duration-300"
            >
              Book an Agency Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
