import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Places architectural-drawing style callouts over an `object-fit: cover` image.
 * Points are given as % of the ORIGINAL photo, so they stay on the right object
 * whatever the crop. Points that fall outside the visible crop are hidden.
 */
export default function AnnotatedLayer({ points, imgWidth, imgHeight, tone = 'light', delay = 0.8, className = '' }) {
  const ref = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const scale = Math.max(cw / imgWidth, ch / imgHeight);
      const w = imgWidth * scale;
      const h = imgHeight * scale;
      setBox({ cw, ch, w, h, ox: (cw - w) / 2, oy: (ch - h) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [imgWidth, imgHeight]);

  const textColor = tone === 'light' ? 'text-white' : 'text-charcoal';
  const lineColor = tone === 'light' ? 'bg-white/70' : 'bg-charcoal/60';

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {box &&
        points.map((p, i) => {
          const left = box.ox + (p.x / 100) * box.w;
          const top = box.oy + (p.y / 100) * box.h;
          if (left < 16 || top < 24 || left > box.cw - 16 || top > box.ch - 24) return null;
          // Labels near the right edge point left instead.
          const flip = p.side ? p.side === 'left' : left > box.cw * 0.62;
          return (
            <motion.div
              key={p.label}
              className={`absolute flex items-center ${flip ? 'flex-row-reverse' : ''}`}
              style={flip ? { right: box.cw - left - 4, top, translateY: '-50%' } : { left, top, translateY: '-50%', translateX: '-4px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + i * 0.18 }}
            >
              <span className="annotation-dot shrink-0" />
              <motion.span
                className={`mx-2 block h-px ${flip ? 'origin-right' : 'origin-left'} ${lineColor}`}
                style={{ width: 56 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: delay + 0.15 + i * 0.18, ease: [0.22, 0.61, 0.36, 1] }}
              />
              <span
                className={`annotation-label ${textColor} ${
                  tone === 'light' ? 'drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]' : 'bg-ivory/92 px-2.5 py-1.5'
                }`}
              >
                {p.label}
              </span>
            </motion.div>
          );
        })}
    </div>
  );
}
