import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Crops its children and drifts them vertically as the frame passes through the viewport.
 * Give the frame its size (e.g. an aspect class); children should fill it (h-full w-full).
 * `amount` is the drift in % of the frame height, each way. Off for reduced motion.
 */
export default function Parallax({ children, amount = 8, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The layer is (100 + 2·amount)% tall, so a drift of amount·0.8 of its own height stays inside the overscan.
  const drift = amount * 0.8;
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `-${amount}%`, bottom: `-${amount}%`, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
