import { motion } from 'motion/react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import Highlight from './Highlight';

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const formItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function Call() {
  return (
    <section id="call" className="py-24 md:py-32 px-6 bg-[#6e938e] text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-cream/50 mb-6">Start Your Project</div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.15] mb-8">
              Let's create something <Highlight color="#D9F059"><span className="italic font-light px-2">extraordinary.</span></Highlight>
            </h2>
            <p className="text-lg font-light text-cream/70 mb-12 max-w-md leading-relaxed mt-4">
              Book a free strategy session to discuss how we can increase your ROAS with high-performing UGC and 3D visual assets.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-cream/80 border-b border-cream/10 pb-6">
                <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center bg-cream/5">
                  <Mail className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-1">Email Us</h4>
                  <p className="font-light">bopchekuldeep1@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-cream/80 border-b border-cream/10 pb-6">
                <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center bg-cream/5">
                  <Calendar className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-1">Book a Time</h4>
                  <p className="font-light">Pick a slot on our calendar</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative"
          >
            <h3 className="font-serif text-3xl mb-8">Quick Inquiry</h3>
            <motion.form
              variants={formContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={formItemVariants}>
                <label className="block text-[10px] uppercase tracking-widest text-cream/60 mb-2">Your Name</label>
                <input type="text" className="w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:outline-none focus:border-blush transition-colors placeholder:text-cream/20 font-light" placeholder="Jane Doe" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-[10px] uppercase tracking-widest text-cream/60 mb-2">Brand/Company URL</label>
                <input type="text" className="w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:outline-none focus:border-blush transition-colors placeholder:text-cream/20 font-light" placeholder="yourbrand.com" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label className="block text-[10px] uppercase tracking-widest text-cream/60 mb-2">Monthly Ad Spend</label>
                <select className="w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:outline-none focus:border-blush transition-colors cursor-pointer font-light appearance-none">
                  <option value="" className="text-ink">Select range...</option>
                  <option value="1" className="text-ink">Under $10k</option>
                  <option value="2" className="text-ink">$10k - $50k</option>
                  <option value="3" className="text-ink">$50k+</option>
                </select>
              </motion.div>
              <motion.a
                variants={formItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://calendly.com/kuldipbopche3/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 py-5 bg-cream text-ink text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-blush hover:shadow-[0_0_30px_rgba(255,192,233,0.3)] transition-all flex justify-center items-center gap-3 group"
              >
                Request Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
