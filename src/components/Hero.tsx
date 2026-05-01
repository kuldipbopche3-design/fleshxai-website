import { motion } from 'motion/react';
import Highlight from './Highlight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export default function Hero() {
  return (
    <section className="relative pt-[100px] pb-24 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center min-h-[90vh] justify-center h-[751px]">
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/beauty_hero_bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'normal'
        }}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-0 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cream/50 to-cream z-0 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="text-xs uppercase tracking-[0.2em] mb-8 h-[20px] w-[329px] text-[#ffffff] font-bold bg-[#ffc0e9] rounded-[50px] pl-0 pt-[3px] mx-auto">
          Performance Creatives for D2C Brands
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.05] tracking-tight mb-8">
          <span style={{ color: '#605f60' }}>We Create Ads That </span><Highlight><span className="italic font-light pr-2 text-[#8e4848]">Actually Convert.</span></Highlight>
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-12 w-full max-w-lg mx-auto">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#call"
            className="w-full sm:w-auto px-8 py-5 bg-ink text-white rounded-full text-xs uppercase tracking-[0.15em] font-medium shadow-[0_0_40px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_-5px_rgba(0,0,0,0.5)] hover:bg-ink-light transition-all flex items-center justify-center"
          >
            Get Your First Ad Concept
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(5.9%, 5.5%, 6.3%, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="w-full sm:w-auto px-8 py-5 bg-transparent border border-ink/20 text-ink rounded-full text-xs uppercase tracking-[0.15em] font-medium hover:border-ink/40 transition-all flex items-center justify-center"
          >
            See Real Results
          </motion.a>
        </motion.div>
      </motion.div>

    </section>
  );
}
