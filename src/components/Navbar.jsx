import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import Logo from './ui/Logo.jsx';
import { navLinks, site } from '../data/site.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    // Observe every section so the indicator clears in sections that are not in the menu.
    const sections = [...document.querySelectorAll('main section[id]')];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <nav
          aria-label="Main"
          className={`pointer-events-auto relative mx-auto flex h-[60px] items-center justify-between rounded-full border pr-2 pl-5 transition-[max-width,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:h-[66px] md:pl-7 ${
            solid
              ? 'max-w-[1120px] border-line/80 bg-ivory/85 shadow-[0_14px_40px_-18px_rgba(36,37,34,0.35)] backdrop-blur-xl'
              : 'max-w-[1240px] border-white/20 bg-charcoal/25 backdrop-blur-md'
          }`}
        >
          <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo tone={solid ? 'dark' : 'light'} className="!h-[38px] md:!h-[44px]" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.id;
              const tone = solid
                ? isActive
                  ? 'text-ivory'
                  : 'text-ink hover:text-charcoal'
                : isActive
                  ? 'text-charcoal'
                  : 'text-white/85 hover:text-white';
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[13px] font-medium tracking-[0.06em] transition-colors duration-300 ${tone}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full ${solid ? 'bg-charcoal' : 'bg-ivory'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden !min-h-[46px] !rounded-full !px-6 sm:inline-flex">
              Get Free Quotation
            </a>
            <button
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                solid ? 'bg-charcoal text-ivory' : 'bg-white/15 text-white'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
            </button>
          </div>

          {/* Reading progress along the bottom edge of the pill */}
          <motion.span
            aria-hidden="true"
            className={`absolute right-10 -bottom-px left-10 h-px origin-left bg-bronze transition-opacity duration-500 ${
              solid && !open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ scaleX: scrollYProgress }}
          />
        </nav>
      </header>

      {/* Outside <header>: the pill's backdrop-filter would otherwise trap this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-3 top-[80px] bottom-3 z-40 overflow-y-auto rounded-[28px] border border-line bg-ivory shadow-[0_20px_60px_-20px_rgba(36,37,34,0.35)] md:inset-x-5 md:top-[94px] lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex min-h-full flex-col px-6 pt-3 pb-6">
              <ul>
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="display flex items-center justify-between py-4 text-[32px]"
                    >
                      {l.label}
                      <ArrowRight size={18} strokeWidth={1.4} className="text-bronze" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-8">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full !rounded-full">
                  Get Free Quotation
                </a>
                <a href={site.phones[0].href} className="btn w-full !rounded-full border border-line text-charcoal">
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
