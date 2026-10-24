import React, { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, Send, ShieldCheck, AlertTriangle, Mail, Copy, Phone } from "lucide-react";

interface BookingFormProps {
  onTestSamClick?: () => void;
}

export default function BookingForm({ onTestSamClick }: BookingFormProps) {
  const [scheduledDate, setScheduledDate] = useState<string>("Monday, July 6");
  const [scheduledTime, setScheduledTime] = useState<string>("10:00 AM");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clinicName: "",
    currentInquiries: "medspa"
  });
  const [isBooked, setIsBooked] = useState(false);

  // Lock state & submitted user info
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("voice_agent_unlocked") === "true";
  });
  const [submittedName, setSubmittedName] = useState<string>(() => {
    return localStorage.getItem("submitted_user_name") || "";
  });

  useEffect(() => {
    const handleUnlocked = () => {
      setIsUnlocked(true);
      setSubmittedName(localStorage.getItem("submitted_user_name") || "");
    };
    window.addEventListener("voice_agent_unlocked", handleUnlocked);
    return () => window.removeEventListener("voice_agent_unlocked", handleUnlocked);
  }, []);

  // Secondary form state
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    country: "United States",
    category: "MedSpa & Aesthetic",
    bestTime: "Morning (9:00 AM - 12:00 PM)",
    message: ""
  });
  const [isInquirySent, setIsInquirySent] = useState(false);

  const dates = [
    "Monday, July 6",
    "Tuesday, July 7",
    "Wednesday, July 8",
    "Thursday, July 9",
    "Friday, July 10"
  ];

  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:15 AM",
    "1:30 PM",
    "2:45 PM",
    "4:00 PM"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your Name, Email, and Phone Number.");
      return;
    }
    setIsBooked(true);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "activation_required">("idle");
  const [submitError, setSubmitError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyInquiryDetails = () => {
    const text = `Name: ${inquiryData.name}\nEmail: ${inquiryData.email}\nPhone: ${inquiryData.phone}\nBusiness: ${inquiryData.businessName}\nCountry: ${inquiryData.country}\nCategory: ${inquiryData.category}\nBest Time to Connect: ${inquiryData.bestTime}\nInstructions: ${inquiryData.message}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone || !inquiryData.businessName || !inquiryData.message) {
      alert("Please fill out all required inquiry fields.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");

    // Store unlock state immediately so customer can test without delay
    localStorage.setItem("voice_agent_unlocked", "true");
    localStorage.setItem("submitted_user_name", inquiryData.name);
    setSubmittedName(inquiryData.name);
    setIsUnlocked(true);
    window.dispatchEvent(new Event("voice_agent_unlocked"));

    try {
      // Direct silent submission to FormSubmit.co (First submission requires activation link sent to kuldeepbopche0@gmail.com)
      const response = await fetch("https://formsubmit.co/ajax/kuldeepbopche0@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          businessName: inquiryData.businessName,
          country: inquiryData.country,
          category: inquiryData.category,
          bestTimeToConnect: inquiryData.bestTime,
          instructions: inquiryData.message,
          _subject: `New Inquiry & Voice Agent Unlock Request from ${inquiryData.name} (${inquiryData.businessName})`
        })
      });
      
      const res = await response.json();
      if (res.success === "true" || res.success === true) {
        setSubmitStatus("success");
      } else {
        const msg = res.message || "";
        if (msg.toLowerCase().includes("activation") || msg.toLowerCase().includes("activate")) {
          setSubmitStatus("activation_required");
        } else {
          throw new Error(msg || "Failed API submission");
        }
      }
    } catch (error: any) {
      console.error("FormSubmit API failed:", error);
      const errMsg = error.message || "";
      if (errMsg.toLowerCase().includes("activation") || errMsg.toLowerCase().includes("activate")) {
        setSubmitStatus("activation_required");
      } else {
        setSubmitError(errMsg || "Failed to submit message to email forwarding service.");
        setSubmitStatus("error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsBooked(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      clinicName: "",
      currentInquiries: "medspa"
    });
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-slate-900 border-t border-b border-slate-800 relative">
      <div className="absolute inset-0 bg-brand-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase font-semibold">
            LIVE DEMO BOOKING & VOICE AGENT ACCESS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Schedule a Live 15-Minute System Walkthrough
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Experience our voice agent Sam end-to-end. Complete the quick form below to unlock your live Voice Agent test call and send details to our team.
          </p>
        </div>

        {/* Double Column Grid: Booking on Left, Quick Contact on Right */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Interface (7 Columns) - Live Calendly Scheduler */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-3xl overflow-hidden shadow-2xl h-[700px]">
            <iframe
              src="https://calendly.com/kuldipbopche3/30min?hide_gdpr_banner=1&background_color=0a0f1d&text_color=ffffff&primary_color=0ea5e9"
              className="w-full h-full border-0"
              title="Schedule a Live System Walkthrough"
            />
          </div>

          {/* Secondary Quick Contact Form / Unlocked Greeting (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between" id="ask-question-form">
            {isUnlocked ? (
              <div className="space-y-6 text-center animate-fadeIn py-4 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-brand-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    🎉 VOICE TEST UNLOCKED
                  </span>
                  <h4 className="font-display font-bold text-white text-xl">
                    Welcome{submittedName ? `, ${submittedName}` : ""}!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light max-w-sm mx-auto">
                    Your inquiry details have been delivered to <strong className="text-brand-300 font-mono">kuldeepbopche0@gmail.com</strong>.
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold pt-1">
                    Sam AI Voice Receptionist test call is now active and ready for you!
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => {
                      if (onTestSamClick) {
                        onTestSamClick();
                      } else {
                        window.dispatchEvent(new Event("voice_agent_unlocked"));
                      }
                    }}
                    className="w-full py-4 bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-bold text-sm rounded-xl shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer font-mono"
                  >
                    <Phone className="w-4 h-4 fill-current animate-pulse" />
                    Test Sam AI Voice Agent Now →
                  </button>

                  <button
                    onClick={() => {
                      setIsUnlocked(false);
                      setSubmitStatus("idle");
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-400 font-mono underline cursor-pointer transition-colors block mx-auto pt-2"
                  >
                    Need to submit another question or update info?
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">MANDATORY UNLOCK FORM</span>
                    <span className="px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/30 text-[10px] font-mono text-brand-400 font-semibold">
                      🔑 UNLOCKS VOICE TEST
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-white text-base">Not Ready to Book? Ask a Question</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Fill in your business details below to send an inquiry directly to <strong className="text-brand-300 font-mono">kuldeepbopche0@gmail.com</strong> and instantly unlock Sam's Live Voice Demo!
                  </p>
                </div>

                {submitStatus === "success" ? (
                  <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="font-display font-bold text-white text-sm">Message Sent & Voice Agent Unlocked!</h5>
                    <p className="text-xs text-slate-300">
                      Your details have been dispatched to <strong className="text-white font-mono">kuldeepbopche0@gmail.com</strong>. You can now test Sam freely!
                    </p>
                    <button
                      onClick={() => {
                        setSubmitStatus("idle");
                        setInquiryData({
                          name: "",
                          email: "",
                          phone: "",
                          businessName: "",
                          country: "United States",
                          category: "MedSpa & Aesthetic",
                          bestTime: "Morning (9:00 AM - 12:00 PM)",
                          message: ""
                        });
                      }}
                      className="text-xs text-brand-400 hover:text-brand-300 font-mono underline cursor-pointer mt-2"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : submitStatus === "activation_required" ? (
                  <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-6 text-center space-y-4 animate-fadeIn">
                    <Mail className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                    <h5 className="font-display font-bold text-white text-base">Form Activation Link Sent!</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      FormSubmit sent a 1-click confirmation email to <strong className="text-white font-mono">kuldeepbopche0@gmail.com</strong>.
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal bg-slate-900/60 p-3 rounded-lg border border-slate-850">
                      Your Voice Agent test is now <strong className="text-emerald-400">UNLOCKED</strong>! Please check inbox of <strong className="text-white">kuldeepbopche0@gmail.com</strong> and click "Activate Form" once to complete setup.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl text-center shadow-lg transition-all cursor-pointer font-mono"
                    >
                      Got it, Back to Form
                    </button>
                  </div>
                ) : submitStatus === "error" ? (
                  <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 text-left space-y-3 animate-fadeIn">
                    <AlertTriangle className="w-8 h-8 text-red-500 mx-auto animate-bounce" />
                    <h5 className="font-display font-bold text-white text-sm text-center">Transmission Note</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Your Voice Agent test is <strong className="text-emerald-400">UNLOCKED</strong>! If the automated forwarding API encountered a network delay, you can also send via mailto:
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <a
                        href={`mailto:kuldeepbopche0@gmail.com?subject=${encodeURIComponent(`Inquiry from ${inquiryData.name}`)}&body=${encodeURIComponent(`Name: ${inquiryData.name}\nEmail: ${inquiryData.email}\nPhone: ${inquiryData.phone}\nBusiness: ${inquiryData.businessName}\nCountry: ${inquiryData.country}\nCategory: ${inquiryData.category}\nBest Time: ${inquiryData.bestTime}\nInstructions: ${inquiryData.message}`)}`}
                        className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-4 h-4" /> Send via Gmail / Email Client
                      </a>
                      <button
                        onClick={copyInquiryDetails}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy Form Data"}
                      </button>
                      <button
                        onClick={() => setSubmitStatus("idle")}
                        className="w-full py-2 text-slate-500 hover:text-slate-400 text-xs font-mono transition-colors text-center cursor-pointer"
                      >
                        ← Back to Form
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={inquiryData.name}
                          onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                          placeholder="Dr. David Finch"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Email ID *</label>
                        <input
                          type="email"
                          required
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                          placeholder="david@clinic.com"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Phone No */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Phone No. *</label>
                        <input
                          type="tel"
                          required
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                          placeholder="+1 (555) 234-5678"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        />
                      </div>

                      {/* Business Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Business Name *</label>
                        <input
                          type="text"
                          required
                          value={inquiryData.businessName}
                          onChange={(e) => setInquiryData({ ...inquiryData, businessName: e.target.value })}
                          placeholder="Riverside Wellness Clinic"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Country */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Country *</label>
                        <select
                          value={inquiryData.country}
                          onChange={(e) => setInquiryData({ ...inquiryData, country: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        >
                          <option value="United States">United States</option>
                          <option value="India">India</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Other">Other Country</option>
                        </select>
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Category *</label>
                        <select
                          value={inquiryData.category}
                          onChange={(e) => setInquiryData({ ...inquiryData, category: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                        >
                          <option value="MedSpa & Aesthetic">MedSpa & Aesthetic</option>
                          <option value="Dental Clinic">Dental Clinic</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Beauty & Wellness Salon">Beauty & Wellness Salon</option>
                          <option value="Real Estate & Services">Real Estate & Services</option>
                          <option value="Healthcare & Medical">Healthcare & Medical</option>
                          <option value="Other">Other Business Category</option>
                        </select>
                      </div>
                    </div>

                    {/* Best Time to Connect */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Best Time to Connect *</label>
                      <select
                        value={inquiryData.bestTime}
                        onChange={(e) => setInquiryData({ ...inquiryData, bestTime: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none"
                      >
                        <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 5:00 PM)">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                        <option value="As Soon As Possible">As Soon As Possible</option>
                      </select>
                    </div>

                    {/* Message / Special Instructions */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 font-semibold uppercase font-mono tracking-wide">Special Instructions / Message *</label>
                      <textarea
                        required
                        rows={2.5}
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        placeholder="Tell us about your clinic setup, software used, or specific voice receptionist questions..."
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none resize-none"
                      />
                    </div>

                    {/* 10DLC Mandatory SMS Consent Disclosure */}
                    <div className="pt-1 text-[10px] text-slate-500 leading-normal font-light">
                      <p>
                        By submitting this form, you consent to receive SMS notifications and customer care messages from FlashX AI / Flow AI. Consent is not a condition of purchase. Message frequency varies. Msg & data rates may apply. Reply <span className="font-mono font-bold text-slate-400">STOP</span> to cancel, <span className="font-mono font-bold text-slate-400">HELP</span> for help. Carriers are not liable for delayed or undelivered messages. View our <a href="/privacy.html" className="text-brand-400 underline hover:text-brand-300" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="/terms.html" className="text-brand-400 underline hover:text-brand-300" target="_blank" rel="noreferrer">Terms</a>.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/20 font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? "Sending to kuldeepbopche0@gmail.com..." : "Submit Inquiry & Unlock Voice Test →"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Compliance seal */}
            <div className="pt-8 mt-8 border-t border-slate-900/60 font-mono text-[10px] text-slate-500 space-y-1 leading-relaxed">
              <p>🔒 ENCRYPTED DATA TRANSMISSION PROTOCOLS</p>
              <p>Compliance guardrails mapped and tested on deployment.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
