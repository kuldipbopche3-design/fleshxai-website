import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const cases = [
  {
    company: "Hismile (Oral Care)",
    metric: "+2.1x ROAS",
    subtitle: "3D Visual Advertising",
    problem: "Low ad engagement — users were scrolling past product ads without stopping or understanding the offer.",
    solution: <><span className="text-[#D9F059]">3D</span> scroll-stopping product visuals with bold colors and looping motion. Instant visual clarity engineered within the first 2 seconds of viewing.</>,
    result: [
      "Scaled globally through paid social.",
      "Significantly higher ad recall and engagement.",
      "Creative became the #1 growth driver."
    ]
  },
  {
    company: "Rhode Skin (Beauty)",
    metric: "+3M Views Generated",
    subtitle: "UGC + Product Visual Strategy",
    problem: "Needed to build trust and clearly show product experience in an oversaturated skincare market.",
    solution: <><span className="text-[#D9F059]">UGC</span>-native content combined with aesthetic close-up product visuals. Real application shots, natural lighting, minimal editing — designed to feel organic, not advertised.</>,
    result: [
      "Multiple product sell-outs post-launch.",
      "High engagement across Reels and TikTok.",
      "Strong community-driven demand."
    ]
  },
  {
    company: "D2C Skincare Brand",
    metric: "+120% ROAS Increase",
    subtitle: "Creative-First Ad Strategy",
    problem: "Generic ads blending into the feed — no differentiation, low CTR, and rising CPA.",
    solution: <>Combined high-converting <span className="text-[#D9F059]">3D visuals</span> with authentic <span className="text-[#D9F059]">UGC creatives</span> in a split-test framework. Iterated fast based on performance data.</>,
    result: [
      "120% average ROAS improvement in 60 days.",
      "CPA dropped 40% within the first month.",
      "Creatives scaled to $50k/mo ad spend."
    ]
  }
];

// Removed containerVariants and itemVariants for individual card animations

export default function CaseStudies() {
  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-[#000000] text-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-sans font-light text-xl uppercase tracking-[0.3em] text-[#D9F059]">Case Studies</span>
            <div className="w-12 h-[1px] bg-[#D9F059]/50"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif">Real Results, Not Just Pretty Ads.</h2>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {cases.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="grid lg:grid-cols-12 gap-8 md:gap-12 bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 transition-colors"
            >
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12 flex flex-col justify-center">
                <h3 className="text-2xl font-serif mb-2">{study.company}</h3>
                <div className="text-3xl lg:text-4xl font-bold text-[#D9F059] mb-4 leading-tight">{study.metric}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{study.subtitle}</div>
              </div>

              <div className="lg:col-span-8 flex flex-col justify-center gap-8">
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div> Problem
                  </h4>
                  <p className="text-lg leading-relaxed text-white/80">{study.problem}</p>
                </div>
                
                <div className="pl-6 border-l border-white/10">
                  <h4 className="text-sm uppercase tracking-widest text-[#D9F059]/70 mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> Solution
                  </h4>
                  <p className="text-lg leading-relaxed text-white/80">{study.solution}</p>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> Result
                  </h4>
                  <div className="text-xl font-medium leading-relaxed">
                    <ul className="space-y-2">
                      {study.result.map((res, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#D9F059]/70 mt-1.5 text-sm">✦</span>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-white/40 italic">
            "Brand examples represent observed public campaigns and creative strategies. Individual results vary based on budget, product, and market."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
