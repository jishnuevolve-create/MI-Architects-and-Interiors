import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnnotatedLayer from './ui/AnnotatedImage.jsx';
import { imageInfo } from './ui/Picture.jsx';
import { heroAnnotations } from '../data/content.js';
import { site } from '../data/site.js';

const ease = [0.22, 0.61, 0.36, 1];

function srcSet(name) {
  const e = imageInfo(name);
  return e.widths.map((w) => `${e.base}-${w}.webp ${w}w`).join(', ');
}

export default function Hero() {
  const wide = imageInfo('photos/residence-lounge');
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // As the hero scrolls away: the room eases closer and the copy lifts and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const copyY = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-white">
      {/* Photo and its annotations move together so the callouts stay on their objects. */}
      <motion.div
        className="absolute inset-0 -z-10 origin-top"
        style={reduce ? undefined : { scale: mediaScale, y: mediaY }}
      >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={srcSet('photos/residence-lounge-portrait')} sizes="100vw" />
          <img
            src={`${wide.base}-1490.webp`}
            srcSet={srcSet('photos/residence-lounge')}
            sizes="100vw"
            width={wide.width}
            height={wide.height}
            alt="Living lounge with a book-matched onyx feature wall, brass-inlaid stone panelling and a suspended brass chandelier"
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover object-[30%_center] md:object-center"
          />
        </picture>
        {/* Readability: darken the lower-left where the text sits, keep the room bright elsewhere. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,0.55)_0%,rgba(20,20,18,0)_22%),linear-gradient(20deg,rgba(20,20,18,0.88)_0%,rgba(20,20,18,0.55)_38%,rgba(20,20,18,0)_70%)]" />
      </motion.div>

      <div className="absolute inset-0 hidden md:block">
        <AnnotatedLayer points={heroAnnotations} imgWidth={wide.width} imgHeight={wide.height} delay={1.4} />
      </div>
      </motion.div>

      <motion.div
        className="container-x relative w-full pt-32 pb-16 md:pb-20 lg:pb-24"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-[900px]">
          <motion.p
            className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-white/80 uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <span className="h-px w-8 bg-bronze" />
            Design + Build<span className="hidden sm:inline"> · Turnkey Interiors</span> — {site.address.city}
          </motion.p>

          <h1 className="display text-[44px] sm:text-[56px] md:text-[64px] lg:text-[76px]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease }}
            >
              Designed with Intent.
            </motion.span>
            <motion.span
              className="block text-[#e9d9c4] italic"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.62, ease }}
            >
              Built to Last.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-white/85 md:text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
          >
            Residential, corporate, education, hospitality, retail and health spaces, designed in our studio and built by our own teams.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
          >
            <a href="#projects" className="btn btn-ghost-light">
              View Our Projects <ArrowRight size={16} strokeWidth={1.6} className="btn-arrow" />
            </a>
            <a href="#contact" className="btn btn-primary">
              Start Your Project
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute right-5 bottom-8 hidden flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:right-10 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Scroll to introduction"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-white"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}
