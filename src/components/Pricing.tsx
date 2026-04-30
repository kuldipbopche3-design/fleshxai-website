import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$149',
    originalPrice: '$199',
    discount: '25% OFF',
    description: 'Perfect for brands just starting to scale with paid social.',
    subDescription: 'Perfect for brands testing high-converting creatives without high agency costs.',
    features: [
      '5+1 videos (1080p)',
      '10 2k images',
      '2 Iterations per video',
      'Scriptwriting & Storyboarding',
      '7-10 Business Days Delivery',
      'Dedicated Account Manager'
    ],
    highlight: false,
    cta: 'Get Started',
    bgColor: 'bg-[#f14dbb]'
  },
  {
    name: 'Growth',
    price: '$299',
    originalPrice: '$399',
    discount: '25% OFF',
    description: 'Our most popular tier for aggressive scaling and testing.',
    subDescription: 'Designed for brands serious about scaling performance.',
    features: [
      '10+2 videos (High Quality 4k)',
      '20+ 2k images',
      'Up to 3 revisions per video',
      'Advanced Competitor Analysis',
      '5-7 Business Days Delivery',
      'Weekly Strategy Calls',
      'Thumb-stop Optimization'
    ],
    highlight: true,
    cta: 'Scale Now',
    bgColor: 'bg-ink'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subPrice: 'Starting from $800',
    description: 'High-volume creative production for established industry leaders.',
    subDescription: 'Built for brands that demand volume, speed, and creative excellence.',
    features: [
      '20+ Custom Video Ads',
      'Multi-platform Adaptation (TikTok, Meta, YT)',
      'UGC Sourcing & Management',
      '48-hour Rush Delivery Available',
      'Daily Slack Communication',
      'Creative Director Access'
    ],
    highlight: false,
    cta: 'Let\'s Talk',
    bgColor: 'bg-[#d479df]'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 bg-cream border-t border-ink/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-sans font-light text-xl uppercase tracking-[0.3em]">Plans</span>
            <div className="w-12 h-[1px] bg-ink/20"></div>
            <span className="font-sans font-light text-xl uppercase tracking-[0.3em]">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Invest in Conversion</h2>
          <p className="text-xl font-light text-ink/70 max-w-2xl mx-auto">
            Transparent pricing for direct-response creative that actually moves the needle. No hidden fees.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className={`relative p-8 md:p-10 rounded-[10px] border ${tier.highlight
                ? `${tier.bgColor} text-white shadow-2xl border-ink scale-100 lg:scale-105 z-10`
                : `${tier.bgColor} text-ink border-ink/10 shadow-sm`
                }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#D9F059] text-ink text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-serif mb-2">{tier.name}</h3>
                <p className={`text-sm ${tier.highlight ? 'text-white/70' : 'text-ink/70'}`}>
                  {tier.description}
                </p>
                {tier.subDescription && (
                  <p className={`text-sm mt-3 font-medium ${tier.highlight ? 'text-white/90' : 'text-ink/90'}`}>
                    {tier.subDescription}
                  </p>
                )}
              </div>

              <div className="mb-8">
                {tier.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-lg line-through ${tier.highlight ? 'text-white/50' : 'text-ink/40'}`}>{tier.originalPrice}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tier.highlight ? 'bg-white/20 text-white' : 'bg-ink/10 text-ink'}`}>{tier.discount}</span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className={`text-sm ${tier.highlight ? 'text-white/70' : 'text-ink/70'}`}>/month</span>}
                </div>
                {tier.subPrice && (
                  <div className={`text-sm mt-1 font-medium ${tier.highlight ? 'text-white/70' : 'text-ink/70'}`}>
                    {tier.subPrice}
                  </div>
                )}
              </div>

              <ul className="mb-10 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-[#D9F059]' : 'text-ink'}`} />
                    <span className="text-sm leading-tight pt-0.5">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:8962417150"
                className={`block text-center w-full py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${tier.highlight
                  ? 'bg-[#D9F059] text-ink hover:bg-[#cbe24c] hover:shadow-[0_0_20px_rgba(217,240,89,0.5)]'
                  : 'bg-ink text-cream hover:bg-ink-light'
                  }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto bg-ink text-cream rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-center mb-12">Why brands are switching to AI-powered creatives</h3>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-cream/40">Traditional creative agencies typically charge:</h4>
              <ul className="space-y-4 text-cream/70 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-cream/40">•</span>
                  <span>$500 – $2000+ per video</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cream/40">•</span>
                  <span>2–4 weeks production time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cream/40">•</span>
                  <span>Limited testing flexibility</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#D9F059]">With our AI-powered creative system:</h4>
              <ul className="space-y-4 text-cream">
                <li className="flex items-start gap-3">
                  <span className="text-[#D9F059]">•</span>
                  <span>High-quality ad creatives at a fraction of the cost</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D9F059]">•</span>
                  <span>Faster turnaround (days, not weeks)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D9F059]">•</span>
                  <span>Built for rapid testing and scaling</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center border-t border-cream/10 pt-8">
            <p className="text-xl md:text-2xl font-serif text-cream italic">"More creatives. Faster testing. Better performance."</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
