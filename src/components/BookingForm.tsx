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
          
          {/* Main Booking Interface (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            {isBooked ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-2xl text-white">Your Demo is Scheduled!</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    We've sent a calendar invitation and pre-meeting questionnaire to <strong className="text-white">{formData.email}</strong>. Our clinical automation architect will call you on the scheduled time.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-sm mx-auto font-mono text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">CONFIRMED RESERVATION:</span>
                  <p className="text-white font-semibold">{scheduledDate}</p>
                  <p className="text-brand-400 font-semibold">{scheduledTime} (Eastern Standard Time)</p>
                  <p className="text-slate-500 text-[9px] pt-1 border-t border-slate-850 mt-2">Clinic Name: {formData.clinicName || "N/A"}</p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg text-xs font-mono transition-colors"
                >
                  Schedule Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-lg text-white">Select a Date & Time</h4>
                  
                  {/* Date Grid selection */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">AVAILABLE DAYS (JULY 2026):</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setScheduledDate(d)}
                          className={`py-2 px-1.5 rounded-lg border text-xs font-mono font-medium text-center transition-all ${
                            scheduledDate === d
                              ? "bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-600/10"
                              : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {d.split(", ")[1]}
                          <span className="block text-[8px] text-slate-500 mt-0.5">{d.split(", ")[0].slice(0, 3)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Grid selection */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">AVAILABLE EASTERN TIMES:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {times.map((t, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setScheduledTime(t)}
                          className={`py-2 rounded-lg border text-[11px] font-mono transition-all ${
                            scheduledTime === t
                              ? "bg-brand-600 border-brand-500 text-white shadow-md"
                              : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <h4 className="font-display font-semibold text-white text-sm">Enter Your Operational Details</h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Sarah Jenkins"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jenkins@skinclinic.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="555-0199"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-colors"
                      />
                    </div>

                    {/* Clinic Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Practice or Clinic Name</label>
                      <input
                        type="text"
                        value={formData.clinicName}
                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                        placeholder="Glow MedSpa Services"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Industry Select dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold uppercase font-mono tracking-wide">Primary Specialty</label>
                    <select
                      value={formData.currentInquiries}
                      onChange={(e) => setFormData({ ...formData, currentInquiries: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-colors"
                    >
                      <option value="medspa">MedSpa & Aesthetic Clinic</option>
                      <option value="dental">Dental Practice</option>
                      <option value="dermatology">Dermatology Clinic</option>
                      <option value="beauty">Beauty / Salon Practice</option>
                      <option value="other">Other Appointment-Based Business</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl shadow-lg transition-all text-sm"
                  >
                    Confirm Walkthrough for {scheduledDate} at {scheduledTime}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center font-mono flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-500" /> Transparent month-to-month agreement • White-glove setup • Results first
                  </p>
                </div>
              </form>
            )}
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
