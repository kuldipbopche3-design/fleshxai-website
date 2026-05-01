import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';

const assets = [
  { type: 'UGC', badge: 'Skincare', src: '/video1.mp4' },
  { type: '3D AI', badge: 'Render', src: '/video2.mp4' },
  { type: 'UGC', badge: 'Testimonial', src: '/video3.mp4' },
  { type: '3D AI', badge: 'Product Focus', src: '/video4.mp4' },
  { type: 'UGC', badge: 'Routine', src: '/video5.mp4' },
  { type: '3D AI', badge: 'Animation', src: '/video7.mp4' },
  { type: 'UGC', badge: 'Review', src: '/video8.mp4' },
  { type: '3D AI', badge: 'Breakdown', src: '/video10.mp4' },
  { type: 'UGC', badge: 'Lifestyle', src: '/video11.mp4' },
];

// Duplicate items to ensure enough width for continuous infinity
// Using 14 items prevents exceeding the browser's simultaneous video playback limit (~16 videos)
const items = [...assets, ...assets].slice(0, 14);

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isPaused = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let scrollOffset = 0;
    
    const animate = () => {
      const isMobile = window.innerWidth < 768;
      const CARD_WIDTH = isMobile ? 220 : 280; 
      const CARD_HEIGHT = CARD_WIDTH * (16 / 9);
      const GAP = isMobile ? 20 : 30;
      const SPACING = CARD_WIDTH + GAP; 
      const TOTAL_WIDTH = items.length * SPACING;
      
      // Control the steepness of the arc (increased to allow wrapping with fewer items)
      const a = isMobile ? 0.0003 : 0.0002;

      if (!isPaused.current) {
        scrollOffset += 2.0; // Increased speed
        if (scrollOffset >= TOTAL_WIDTH) {
          scrollOffset -= TOTAL_WIDTH;
        }
      }
      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        let x = (i * SPACING - scrollOffset) % TOTAL_WIDTH;
        if (x < 0) x += TOTAL_WIDTH;
        
        // Map x to [-TOTAL_WIDTH/2, TOTAL_WIDTH/2] to center the parabola
        x -= TOTAL_WIDTH / 2;
        
        const y = a * x * x;
        const angleRad = Math.atan(2 * a * x);
        const angleDeg = angleRad * (180 / Math.PI);
        
        card.style.width = `${CARD_WIDTH}px`;
        card.style.height = `${CARD_HEIGHT}px`;
        card.style.transform = `translate3d(${x - CARD_WIDTH / 2}px, ${y}px, 0) rotate(${angleDeg}deg)`;

        // Smart Play/Pause to fix browser video decoder limit (blank screens)
        // Only play videos that are reasonably close to the center of the screen
        const isVisible = x > -1500 && x < 1500;
        if (card.dataset.visible !== String(isVisible)) {
          card.dataset.visible = String(isVisible);
          const videoEl = card.querySelector('video');
          if (videoEl) {
            if (isVisible) {
              const playPromise = videoEl.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            } else {
              videoEl.pause();
            }
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-cream py-4 border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Thumb-Stopping Assets</h2>
          <p className="text-ink-light font-light text-base md:text-lg max-w-xl mx-auto">
            We combine authentic UGC with hyper-realistic AI precision to engineer creatives that consistently outperform standard benchmarks.
          </p>
        </motion.div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[450px] md:h-[600px] flex justify-center text-[#ac8f8f]"
      >
        <div className="absolute top-0 flex items-start justify-center left-1/2">
          {items.map((item, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="absolute top-0 rounded-[28px] md:rounded-[36px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-ink/5 bg-cream-dark transition-shadow hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] group"
              style={{
                willChange: 'transform',
                transformOrigin: 'center center'
              }}
            >
              <video 
                autoPlay
                preload="none"
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              >
                <source src={item.src} type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent flex flex-col justify-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase font-bold text-ink tracking-[0.2em] shadow-sm">
                    {item.type}
                  </div>
                  <Play className="w-10 h-10 text-white opacity-95 fill-white drop-shadow-md" />
                </div>
                <div className="text-white mt-4 text-sm md:text-sm font-medium tracking-wide drop-shadow-md">
                  {item.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
