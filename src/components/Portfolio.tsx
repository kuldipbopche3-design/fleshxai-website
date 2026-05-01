import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';

const works = [
  { id: 1, type: 'UGC', image: '/portfolio_ugc_1.webp' },
  { id: 2, type: '3D Render', image: '/portfolio_3d_1.webp' },
  { id: 3, type: 'UGC', image: '/portfolio_ugc_2.webp' },
  { id: 4, type: '3D Render', image: '/portfolio_3d_2.webp' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function Portfolio() {
  return (
    <section id="work" className="py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Recent Campaigns</h2>
            <p className="text-ink-light font-light text-lg">
              Explore our latest high-performing creative assets built for the beauty industry's top disruptors.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mt-8 md:mt-0"
          >
            <button className="px-5 py-2.5 rounded-full border border-ink text-[10px] md:text-xs uppercase tracking-widest hover:bg-ink hover:text-white transition-all bg-ink text-white shadow-lg shadow-ink/10">All</button>
            <button className="px-5 py-2.5 rounded-full border border-ink/20 text-[10px] md:text-xs uppercase tracking-widest text-ink/70 hover:text-ink hover:border-ink hover:bg-ink/5 transition-all bg-white/50">UGC</button>
            <button className="px-5 py-2.5 rounded-full border border-ink/20 text-[10px] md:text-xs uppercase tracking-widest text-ink/70 hover:text-ink hover:border-ink hover:bg-ink/5 transition-all bg-white/50">3D AI</button>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {works.map((work) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              key={work.id}
              className="relative group cursor-pointer aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-cream-dark shadow-xl shadow-ink/5 border border-ink/5"
            >
              <img 
                src={work.image} 
                alt={`${work.type} Example`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-80" strokeWidth={1} />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest">
                {work.type}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
