import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const videos = [
  { src: '/mamaearth.in 2.0.mp4', label: 'Mamaearth Campaign 1', brand: 'Mamaearth' },
  { src: '/mamaearth.in2.1.mp4', label: 'Mamaearth Campaign 2', brand: 'Mamaearth' },
  { src: '/mamaearth.in2.2.mp4', label: 'Mamaearth Campaign 3', brand: 'Mamaearth' },
  { src: '/video7.mp4', label: 'Brand Campaign', brand: 'Campaign 04' },
  { src: '/video8.mp4', label: 'Brand Campaign', brand: 'Campaign 05' },
  { src: '/video2.mp4', label: 'Brand Campaign', brand: 'Campaign 06' },
  { src: '/video1.mp4', label: 'Brand Campaign', brand: 'Campaign 07' },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="video-gallery-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-gallery-card__inner" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          className="video-gallery-card__video"
          playsInline
          preload="metadata"
          onEnded={handleEnded}
        />

        {/* Overlay gradient */}
        <div
          className="video-gallery-card__overlay"
          style={{ opacity: isHovered || !isPlaying ? 1 : 0 }}
        />

        {/* Play / Pause button */}
        <motion.div
          className="video-gallery-card__play-btn"
          animate={{ scale: isHovered || !isPlaying ? 1 : 0, opacity: isHovered || !isPlaying ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white translate-x-0.5" />
          )}
        </motion.div>

        {/* Mute button */}
        {isPlaying && (
          <button
            className="video-gallery-card__mute-btn"
            onClick={toggleMute}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}

        {/* Label */}
        <div className="video-gallery-card__label">
          <span className="video-gallery-card__brand">{video.brand}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoGallery() {
  return (
    <section id="campaigns" className="video-gallery-section">
      <div className="video-gallery-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="video-gallery-header"
        >
          <div className="video-gallery-eyebrow">
            <span>Recent Campaigns</span>
            <div className="video-gallery-eyebrow-line" />
          </div>
          <h2 className="video-gallery-title">
            Ads That <span className="video-gallery-title--accent">Stop the Scroll.</span>
          </h2>
          <p className="video-gallery-subtitle">
            Click any video to watch the full creative in action.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="video-gallery-grid">
          {videos.map((video, i) => (
            <VideoCard key={video.src} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
