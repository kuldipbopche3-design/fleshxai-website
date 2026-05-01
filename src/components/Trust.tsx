import { motion } from 'motion/react';
import { Clock, TrendingUp, BarChart2 } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Ad-Ready in 5-7 Days',
    description: 'Speed matters in paid media. Get fully edited, platform-ready creatives delivered fast — no revisions, no delays, no excuses.',
    bg: 'bg-[#000000]',
    iconColor: 'text-[#d114e1]'
  },
  {
    icon: BarChart2,
    title: 'Built on Direct-Response',
    description: 'Every hook, script, and storyboard is engineered from proven D2C frameworks and live competitor data — not guesswork.',
    bg: 'bg-[#000000]',
    iconColor: 'text-[#0e10eb]'
  },
  {
    icon: TrendingUp,
    title: 'Engineered for ROAS',
    description: 'We don’t decorate ads — we engineer them. Every creative is optimized for hook rate, hold rate, and revenue, not just impressions.',
    bg: 'bg-[#000000]',
    iconColor: 'text-[#442bfa]'
  }
];

export default function Trust() {
  return (
    <section id="trust" className="py-24 md:py-32 px-6 relative bg-[#ff6a37] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url("/beauty_hero_bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'soft-light',
          opacity: 0.6
        }}
      />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[20px] pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              We don't just create content — <br />
              <span className="italic font-light text-ink/70">we engineer performance.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg font-light text-ink/80 leading-relaxed max-w-md"
            >
              Paid ads only work when the creative does. We combine 3D product visuals and authentic UGC to build trust, communicate value, and drive action — in the first 2 seconds.
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: -10 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100 }}
                className="group flex gap-6 bg-[#272626] rounded-[10px] min-h-[135px] pt-[15px] cursor-default border border-transparent hover:border-white/10 transition-colors shadow-lg hover:shadow-xl"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] ${benefit.bg} backdrop-blur-sm flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-300 mt-[20px] ml-[15px]`}
                  >
                    <benefit.icon className={`w-6 h-6 md:w-7 md:h-7 ${benefit.iconColor}`} strokeWidth={1.5} />
                  </motion.div>
                </div>
                <div className="pr-4 pb-4">
                  <h3 className="font-sans font-medium uppercase tracking-wider text-[#ffffff] mb-3 text-[13px] md:text-lg">
                    {benefit.title}
                  </h3>
                  <p className="font-light leading-relaxed text-[#ffffff]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
