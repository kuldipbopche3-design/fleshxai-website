import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'UGC Ads That Convert',
    description: 'Authentic, human-driven content that builds trust and drives purchases. We handle casting, scripting, and editing — delivering feed-native ads that feel real, not produced.',
    icon: Play,
    image: '/portfolio_ugc_1.webp',
    tag: 'Trust-Driven',
    gradient: 'from-[#FFCBE3]/40 to-[#FFF0F5]/80',
    iconBg: 'bg-[#FF1A75]/10',
    iconColor: 'text-[#FF1A75]'
  },
  {
    title: '3D Product Visuals',
    description: 'Hyper-realistic visuals that make your product impossible to scroll past. Flawless lighting, cinematic angles, and surreal environments — built to capture attention and hold it.',
    icon: Sparkles,
    image: '/portfolio_3d_2.webp',
    tag: 'Next-Gen Creative',
    gradient: 'from-[#D9F059]/30 to-[#EAF5A4]/80',
    iconBg: 'bg-[#b6cd23]/20',
    iconColor: 'text-[#8b9e14]'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-cream-dark relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">What We Build</h2>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-px bg-ink/20 mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer relative"
            >
              {/* Vibrant shadow behind the box */}
              <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]" />

              <div className={`relative overflow-hidden rounded-[24px] md:rounded-[32px] mb-8 md:mb-10 aspect-[4/5] shadow-2xl shadow-ink/5 border border-white/80 bg-gradient-to-br ${service.gradient}`}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-ink shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
                >
                  {service.tag}
                </motion.div>
              </div>

              <div className="flex items-start gap-4 px-2 relative z-10">
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.5 }}
                  className={`mt-1 p-3 rounded-full ${service.iconBg} ${service.iconColor} shadow-inner flex-shrink-0`}
                >
                  <service.icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4 text-ink transition-colors group-hover:text-ink/80">{service.title}</h3>
                  <p className="text-ink-light leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#work"
                    className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium border-b border-ink/30 pb-1 hover:border-ink transition-colors inline-block mt-2"
                  >
                    Learn More
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
