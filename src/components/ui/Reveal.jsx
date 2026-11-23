import { motion } from 'framer-motion';

/** Fades content up once as it enters the viewport. Disabled automatically for reduced motion. */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
