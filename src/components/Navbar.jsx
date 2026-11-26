import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import Logo from './ui/Logo.jsx';
import { navLinks, site } from '../data/site.js';
import { sectors } from '../data/projects.js';
import { showSector } from '../lib/sectorEvents.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const dropRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSectorsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the sectors menu on outside click.
  useEffect(() => {
    if (!sectorsOpen) return;
    const onDown = (e) => !dropRef.current?.contains(e.target) && setSectorsOpen(false);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [sectorsOpen]);

  const pickSector = (id) => {
    setSectorsOpen(false);
    setOpen(false);
    showSector(id);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <nav
          aria-label="Main"
          className={`pointer-events-auto relative mx-auto flex h-[64px] max-w-[1400px] items-center justify-between rounded-full border pr-2 pl-5 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 md:h-[72px] md:pr-3 md:pl-7 ${
            scrolled || open
              ? 'border-line bg-paper/92 shadow-[0_16px_40px_-20px_rgba(42,33,27,0.4)]'
              : 'border-line/70 bg-paper/80 shadow-[0_10px_30px_-24px_rgba(42,33,27,0.35)]'
          }`}
        >
          <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo tagline />
          </a>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((l) => {
              const isActive = active === l.id;
              if (l.id === 'sectors') {
                return (
                  <li key={l.id} ref={dropRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={sectorsOpen}
                      aria-haspopup="true"
                      onClick={() => setSectorsOpen((v) => !v)}
                      className={`relative flex items-center gap-1 py-2 text-[14.5px] font-medium transition-colors ${
                        isActive ? 'text-charcoal' : 'text-ink hover:text-charcoal'
                      }`}
                    >
                      {l.label}
                      <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
                      {isActive && <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-bronze" />}
                    </button>
                    <AnimatePresence>
                      {sectorsOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-[0_20px_50px_-20px_rgba(42,33,27,0.4)]"
                        >
                          {sectors.map((s) => (
                            <li key={s.id}>
                              <button
                                type="button"
                                onClick={() => pickSector(s.id)}
                                className="flex w-full items-center justify-between px-5 py-2.5 text-left text-[14px] text-ink hover:bg-cream hover:text-charcoal"
                              >
                                {s.name}
                                <ArrowRight size={14} strokeWidth={1.6} className="text-bronze" />
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-2 text-[14.5px] font-medium transition-colors ${
                      isActive ? 'text-charcoal' : 'text-ink hover:text-charcoal'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-bronze"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-dark hidden !min-h-[48px] !rounded-full !px-6 !text-[14px] sm:inline-flex">
              Start Your Project <ArrowRight size={15} strokeWidth={1.8} className="btn-arrow" />
            </a>
            <button
              type="button"
              className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-charcoal lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
          {/* Reading progress along the bottom edge of the bar */}
          <motion.span
            aria-hidden="true"
            className={`absolute right-10 -bottom-px left-10 h-[2px] origin-left rounded-full bg-bronze transition-opacity duration-500 ${
              scrolled && !open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ scaleX: scrollYProgress }}
          />
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-3 top-[84px] bottom-3 z-40 overflow-y-auto rounded-[28px] border border-line bg-paper shadow-[0_24px_60px_-24px_rgba(42,33,27,0.4)] md:inset-x-5 md:top-[100px] lg:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex min-h-full flex-col px-6 pt-3 pb-6">
              <ul>
                {navLinks
                  .filter((l) => l.id !== 'sectors')
                  .map((l, i) => (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04 }}
                      className="border-b border-line"
                    >
                      <a href={`#${l.id}`} onClick={() => setOpen(false)} className="display flex items-center justify-between py-4 text-[26px]">
                        {l.label}
                        <ArrowRight size={18} strokeWidth={1.4} className="text-bronze" />
                      </a>
                    </motion.li>
                  ))}
              </ul>
              <p className="eyebrow mt-8">Sectors</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => pickSector(s.id)}
                    className="rounded-full border border-line bg-paper px-4 py-2 text-[14px] text-ink"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="mt-auto space-y-3 pt-10">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-dark w-full">
                  Start Your Project <ArrowRight size={16} strokeWidth={1.8} />
                </a>
                <a href={site.phones[0].href} className="btn w-full border border-line text-charcoal">
                  <Phone size={16} strokeWidth={1.6} /> Call {site.phones[0].label}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
