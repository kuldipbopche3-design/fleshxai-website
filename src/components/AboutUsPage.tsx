import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle, Video, Code, ShieldCheck, Mail, ArrowRight } from "lucide-react";

interface AboutUsPageProps {
  onBookDemoClick: () => void;
}

export default function AboutUsPage({ onBookDemoClick }: AboutUsPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Video helpers
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((current / dur) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVol = parseFloat(e.target.value);
    videoRef.current.volume = newVol;
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Manage control visibility on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

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
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-xl shadow-brand-600/10">
                <span className="font-display font-extrabold text-2xl tracking-wide">KB</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">Kuldip Bopche</h3>
                <p className="text-xs text-slate-500 font-mono">Founder & Lead Automation Engineer</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                "We work directly with practitioners and practice managers to build reliable digital staff. When our clients deploy an AI receptionist, we ensure it matches their practice identity down to the treatment protocols."
              </p>
              <div className="pt-2">
                <a href="mailto:support@flowvoice.ai" className="inline-flex items-center gap-2 text-xs text-brand-450 hover:text-brand-350 transition-colors font-mono">
                  <Mail className="w-4 h-4" /> support@flowvoice.ai
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
          <div 
            className="relative border border-slate-800 rounded-3xl overflow-hidden bg-slate-950 aspect-video shadow-2xl group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            <video
              ref={videoRef}
              src="/Last Peak lavel Viceo 2.0.mp4"
              className="w-full h-full object-cover"
              onClick={handlePlayPause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              playsInline
            />

            {/* Play Button Overlay (Big, Center) */}
            {!isPlaying && (
              <button 
                onClick={handlePlayPause}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center hover:scale-105 hover:bg-brand-500 shadow-xl shadow-brand-600/20 transition-all duration-300 z-10 cursor-pointer"
                aria-label="Play presentation video"
              >
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </button>
            )}

            {/* Premium Custom Control Bar Overlay */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex flex-col gap-3 transition-opacity duration-300 z-20 ${
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Progress Bar (Scrubber) */}
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleScrub}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none hover:h-1.5 transition-all"
                  style={{
                    background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${progress}%, #1e293b ${progress}%, #1e293b 100%)`
                  }}
                />
              </div>

              {/* Bottom Buttons Row */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button 
                    onClick={handlePlayPause}
                    className="p-1 hover:text-brand-400 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleMute}
                      className="p-1 hover:text-brand-400 transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none"
                    />
                  </div>

                  {/* Time Counters */}
                  <span className="text-xs font-mono text-slate-400">
                    {currentTime} / {duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Fullscreen Button */}
                  <button 
                    onClick={handleFullscreen}
                    className="p-1 hover:text-brand-400 transition-colors cursor-pointer"
                    title="Maximize Video"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
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
