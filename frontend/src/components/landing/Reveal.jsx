import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.18 });
  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
