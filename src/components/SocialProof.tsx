import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "Aura completely transformed our ad creatives. The 3D and UGC split-testing reduced our CPA by 42% in the first month.",
    author: "Sarah L.",
    role: "CMO, Glow Botanica",
    avatar: "/avatar_1.webp"
  },
  {
    quote: "We struggled to get high-quality UGC that actually converted. Aura's creators were authentic and the scripts were data-backed. True professionals.",
    author: "Jessica M.",
    role: "Founder, Bare Skin",
    avatar: "/avatar_2.webp"
  },
  {
    quote: "The speed and quality of delivery are unmatched. Our ROAS has doubled since we started using FleshxAI's creative frameworks.",
    author: "Michael T.",
    role: "Director of Growth, Lumen",
    avatar: "/avatar_3.webp"
  },
  {
    quote: "Finally, a team that understands direct-response within the beauty niche. Highly recommend to any brand looking to scale.",
    author: "Emma W.",
    role: "Marketing Head, Verve",
    avatar: "/avatar_4.webp"
  }
];

export default function SocialProof() {
  // Duplicate array for seamless infinite scrolling
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 md:py-32 bg-cream border-t border-ink/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blush/20 via-cream to-cream opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] font-medium mb-8 text-[#060606]">Trusted by brands scaling revenue with performance-driven creatives</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            {/* Using text placeholders instead of images for brands for a clean look */}
            <span className="font-serif text-2xl">LUMIÈRE</span>
            <span className="font-sans font-bold text-xl uppercase tracking-widest">Aesthetica</span>
            <span className="font-serif italic text-2xl">Botanique</span>
            <span className="font-sans font-light text-xl uppercase tracking-[0.3em]">Pure</span>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-24 w-full overflow-hidden">
        {/* Fading edges for the effect */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee gap-8 px-4">
          {infiniteTestimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-[#000000] p-10 md:p-14 w-[350px] md:w-[450px] shrink-0 rounded-[10px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/10 flex flex-col justify-between h-auto"
            >
              <div className="text-4xl font-serif text-blush-dark mb-4">"</div>
              <p className="text-lg md:text-xl font-light leading-relaxed mb-8 text-[#ffffff]">
                {test.quote}
              </p>
              <div className="flex items-center gap-4">
                <img src={test.avatar} alt={test.author} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-[#ffffff] text-sm">{test.author}</div>
                  <div className="text-xs text-[#ffffff]/60 uppercase tracking-wider">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
