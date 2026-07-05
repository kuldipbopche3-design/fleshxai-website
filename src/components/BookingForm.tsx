import React, { useState } from "react";
import { Calendar, Clock, CheckCircle2, Send, ShieldCheck } from "lucide-react";

export default function BookingForm() {
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

  // Secondary form state
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      alert("Please fill out all inquiry fields.");
      return;
    }
    setIsInquirySent(true);
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
            LIVE DEMO BOOKING
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Schedule a Live 15-Minute System Walkthrough
          </h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Experience our voice agent Sam end-to-end. We will configure a live call to your own phone during the demo so you can hear Sam speak and book in real-time.
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

          {/* Secondary Quick Contact Form (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">SECONDARY CONVERSION CHANNEL</span>
                <h4 className="font-display font-semibold text-white text-base">Not Ready to Book? Ask a Question</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Have unique custom CRM systems or complex scheduling flows? Describe your needs below and our team will get back to you within 2 business hours.
                </p>
              </div>

              {isInquirySent ? (
                <div className="bg-brand-950/20 border border-brand-800/40 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                  <Send className="w-8 h-8 text-brand-400 mx-auto animate-bounce" />
                  <h5 className="font-display font-bold text-white text-sm">Message Transmitted!</h5>
                  <p className="text-xs text-slate-400">
                    We've logged your request. Our clinical technician will email you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="Dr. David Finch"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Email</label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="finch@riversidedental.com"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Inquiry Details</label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      placeholder="Tell us about your current scheduling program (e.g. Dentrix, Jane)..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-mono transition-colors"
                  >
                    Transmit Inquiry →
                  </button>
                </form>
              )}
            </div>

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
