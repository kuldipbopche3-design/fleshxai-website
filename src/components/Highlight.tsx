import { motion } from 'motion/react';
import { ReactNode } from 'react';

export default function Highlight({ children, color = '#d90467', delay = 0.5 }: { children: ReactNode, color?: string, delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <motion.svg
        className="absolute left-[50%] bottom-[0%] -translate-x-[50%] translate-y-[40%] w-[105%] h-[35%] pointer-events-none z-0 overflow-visible md:translate-y-[30%]"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.path
          d="M 5,10 C 60,18 140,18 195,8 C 140,15 60,15 10,12"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          style={{ vectorEffect: 'non-scaling-stroke' }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </motion.svg>
    </span>
  );
}
