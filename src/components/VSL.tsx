import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ end, duration = 2.5, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function VSL() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // PERFORMANCE FIX: Only autoplay the VSL video when it's actually visible on screen.
  // This prevents a 3.5 MB video from decoding before the user scrolls to it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Assign src lazily, then play
          if (!video.src || video.src === window.location.href) {
            video.src = '/video7.mp4';
            video.load();
          }
          const playPromise = video.play();
          if (playPromise !== undefined) playPromise.catch(() => {});
        } else {
          if (!video.paused) video.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-[#0B0D14] text-white relative overflow-hidden" id="vsl">
      {/* Decorative sparks — using CSS animation instead of Framer Motion to avoid JS overhead */}
      <div className="absolute top-20 right-[5%] md:right-[15%] opacity-80 z-0 animate-spin-slow">
        <svg width="84" height="84" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 0L35.4328 22.8687L54.6274 7.37258L42.277 28.5672L64 32L42.277 35.4328L54.6274 56.6274L35.4328 41.1313L32 64L28.5672 41.1313L9.37258 56.6274L21.723 35.4328L0 32L21.723 28.5672L9.37258 7.37258L28.5672 22.8687L32 0Z" fill="#D9F059"/>
        </svg>
      </div>

      <div className="absolute bottom-40 left-[2%] md:left-[8%] opacity-60 scale-75 z-0 animate-spin-slow-reverse">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 0L35.4328 22.8687L54.6274 7.37258L42.277 28.5672L64 32L42.277 35.4328L54.6274 56.6274L35.4328 41.1313L32 64L28.5672 41.1313L9.37258 56.6274L21.723 35.4328L0 32L21.723 28.5672L9.37258 7.37258L28.5672 22.8687L32 0Z" fill="#d90467"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 mx-auto leading-tight"
        >
          Stop Running Ads on <span className="text-white/50 italic">Creatives That Don't Convert.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-16"
        >
          High-converting ads aren't luck — they're built. See how we combine 3D product visuals and authentic UGC to maximize ROAS for D2C brands.
        </motion.p>

        {/* VSL Player Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 40 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="relative w-full aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden bg-black shadow-2xl shadow-black/80 border border-white/10 group cursor-pointer mb-20"
           onClick={handleVideoClick}
        >
          {/* PERFORMANCE FIX: src is set lazily by IntersectionObserver above */}
          <video
            ref={videoRef}
            loop
            muted={isMuted}
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
          {isMuted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-[&:hover]:scale-110 transition-transform duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-2 drop-shadow-lg" fill="white" />
              </div>
            </div>
          )}
          {isMuted && (
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white pointer-events-none border border-white/10">
              Click to Unmute
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="text-5xl md:text-7xl font-sans font-black text-[#D9F059] mb-4 drop-shadow-[0_0_20px_rgba(217,240,89,0.2)] tracking-tighter">
              <AnimatedCounter prefix="$" end={10} suffix="M+" />
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-white/60">Ad Spend Managed For Clients</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="text-5xl md:text-7xl font-sans font-black text-white mb-4 tracking-tighter">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-white/60">Views Generated</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="text-5xl md:text-7xl font-sans font-black text-[#D9F059] mb-4 drop-shadow-[0_0_20px_rgba(217,240,89,0.2)] tracking-tighter">
              <AnimatedCounter end={40} suffix="%" />
            </div>
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-white/60">Avg ROAS Increase</div>
          </motion.div>
        </div>

        {/* Gradient Lightning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-block p-[3px] rounded-[16px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:-translate-y-1 transition-all duration-300"
        >
          <a
            href="https://calendly.com/kuldipbopche3/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-12 py-5 bg-[#0B0D14] text-white font-sans font-black text-lg md:text-xl uppercase tracking-wider rounded-[13px] hover:bg-black transition-colors"
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
