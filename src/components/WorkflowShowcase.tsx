import React, { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, CalendarCheck, MessageCircle, Mail, BellRing, ChevronLeft, ChevronRight, DatabaseZap } from "lucide-react";

interface WorkflowStep {
  id: number;
  src: string;
  alt: string;
  label: string;
  caption: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  tag: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    src: "/img4.png",
    alt: "Google Calendar appointment automatically created by AI receptionist",
    label: "Calendar Updated",
    caption: "Google Calendar instantly creates a confirmed appointment event — zero manual entry required by staff.",
    icon: <CalendarCheck className="w-4 h-4" />,
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10 border-emerald-500/20",
    tag: "STEP 01 · CALENDAR",
  },
  {
    id: 2,
    src: "/img1.jpeg",
    alt: "SMS confirmation sent to patient from AI receptionist",
    label: "SMS Confirmation",
    caption: "A branded SMS confirmation is dispatched to the patient's phone within seconds of booking.",
    icon: <MessageCircle className="w-4 h-4" />,
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/10 border-sky-500/20",
    tag: "STEP 02 · SMS",
  },
  {
    id: 3,
    src: "/img3.jpeg",
    alt: "WhatsApp confirmation sent to patient from AI receptionist",
    label: "WhatsApp Confirmation",
    caption: "A WhatsApp message delivers rich appointment details directly inside the patient's preferred chat.",
    icon: <MessageCircle className="w-4 h-4" />,
    accentColor: "text-green-400",
    accentBg: "bg-green-500/10 border-green-500/20",
    tag: "STEP 03 · WHATSAPP",
  },
  {
    id: 4,
    src: "/img2.jpeg",
    alt: "Email confirmation sent to patient from AI receptionist",
    label: "Email Confirmation",
    caption: "A professional email confirmation is sent to the patient with full appointment details — no copy-paste, no manual drafting.",
    icon: <Mail className="w-4 h-4" />,
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500/10 border-violet-500/20",
    tag: "STEP 04 · EMAIL",
  },
  {
    id: 5,
    src: "/img%205.png",
    alt: "Clinic staff CRM dashboard updated with new patient appointment in real time",
    label: "Staff Dashboard Updated",
    caption: "The clinic's patient database is updated in real time — staff see the new booking instantly without lifting a finger.",
    icon: <DatabaseZap className="w-4 h-4" />,
    accentColor: "text-amber-400",
    accentBg: "bg-amber-500/10 border-amber-500/20",
    tag: "STEP 05 · STAFF ALERT",
  },
];

export default function WorkflowShowcase() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxVisible(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex(null);
      document.body.style.overflow = "";
    }, 250);
  }, []);

  // Navigate in lightbox
  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % WORKFLOW_STEPS.length));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + WORKFLOW_STEPS.length) % WORKFLOW_STEPS.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* ─── Main Section ─── */}
      <section
        id="workflow-showcase"
        className="py-20 md:py-28 bg-slate-950 relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 10%, rgba(14,165,233,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Section Header ── */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
            <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5">
              <BellRing className="w-3.5 h-3.5" />
              LIVE AUTOMATION PROOF
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Every Appointment.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fully Automated.
              </span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
              The moment a patient books an appointment, our AI Voice Receptionist
              automatically updates Google Calendar, sends confirmation via SMS,
              WhatsApp, and Email, and instantly notifies the clinic staff—without
              any manual work.
            </p>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="group bg-slate-900/40 border border-slate-800 hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(14,165,233,0.08)] flex flex-col"
              >
                {/* ── Image Area ── */}
                <button
                  id={`workflow-card-${step.id}`}
                  type="button"
                  aria-label={`View full size: ${step.alt}`}
                  onClick={() => openLightbox(idx)}
                  className="relative block w-full overflow-hidden bg-slate-900 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={step.src}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <ZoomIn className="w-4 h-4 text-slate-900" />
                    </div>
                  </div>
                </button>

                {/* ── Card Body ── */}
                <div className="flex flex-col flex-1 p-4 gap-3">
                  {/* Tag */}
                  <span
                    className={`inline-flex items-center gap-1.5 self-start font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border ${step.accentBg} ${step.accentColor}`}
                  >
                    {step.icon}
                    {step.tag}
                  </span>

                  {/* Label */}
                  <h4 className="font-display font-bold text-sm text-white leading-snug">
                    {step.label}
                  </h4>

                  {/* Caption */}
                  <p className="text-xs text-slate-400 font-light leading-relaxed flex-1">
                    {step.caption}
                  </p>

                  {/* Step number */}
                  <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-600 tracking-wider">
                      AUTOMATION STEP {idx + 1} OF {WORKFLOW_STEPS.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => openLightbox(idx)}
                      className="text-[10px] font-mono text-brand-400 hover:text-brand-300 transition-colors cursor-pointer"
                    >
                      VIEW ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Automation Badge ── */}
          <div className="mt-14 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-brand-950/60 to-slate-900/60 border border-brand-800/30 rounded-2xl p-5 md:p-6 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <BellRing className="w-4 h-4 text-brand-400" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display font-semibold text-white text-sm">
                  100% Hands-Free After Booking
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  From Google Calendar update to patient SMS, WhatsApp, Email, staff alert, and
                  CRM sync — every step shown above triggers automatically within seconds
                  of a call ending. No human intervention. No missed confirmations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{
            backgroundColor: "rgba(2, 6, 23, 0.95)",
            opacity: isLightboxVisible ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
          onClick={closeLightbox}
        >
          {/* Inner container – stops propagation so clicking image doesn't close */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-4"
            style={{
              transform: isLightboxVisible ? "scale(1)" : "scale(0.95)",
              transition: "transform 0.25s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="lightbox-close-btn"
              type="button"
              aria-label="Close lightbox"
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Nav: prev */}
            <button
              id="lightbox-prev-btn"
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full ml-[-12px] w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                key={lightboxIndex}
                src={WORKFLOW_STEPS[lightboxIndex].src}
                alt={WORKFLOW_STEPS[lightboxIndex].alt}
                className="w-full h-auto object-contain max-h-[75vh]"
                style={{ display: "block" }}
              />
            </div>

            {/* Caption bar */}
            <div className="w-full flex items-start justify-between gap-4 px-1">
              <div className="space-y-0.5">
                <p className="font-display font-semibold text-white text-sm">
                  {WORKFLOW_STEPS[lightboxIndex].label}
                </p>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {WORKFLOW_STEPS[lightboxIndex].caption}
                </p>
              </div>
              <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-1">
                {lightboxIndex + 1} / {WORKFLOW_STEPS.length}
              </span>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {WORKFLOW_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  id={`lightbox-thumb-${step.id}`}
                  type="button"
                  aria-label={`View ${step.label}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0"
                  style={{
                    borderColor: idx === lightboxIndex ? "#0ea5e9" : "rgba(51,65,85,0.6)",
                    opacity: idx === lightboxIndex ? 1 : 0.5,
                  }}
                >
                  <img
                    src={step.src}
                    alt={step.label}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Nav: next */}
          <button
            id="lightbox-next-btn"
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
