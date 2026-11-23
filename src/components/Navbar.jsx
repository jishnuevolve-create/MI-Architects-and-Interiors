import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import Logo from './ui/Logo.jsx';
import { navLinks, site } from '../data/site.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-ivory/88 shadow-[0_1px_0_rgba(36,37,34,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-[68px] items-center justify-between md:h-[76px]" aria-label="Main">
        <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo tone={solid ? 'dark' : 'light'} className="transition-opacity" />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative py-2 text-[13px] font-medium tracking-[0.06em] transition-colors ${
                  solid ? 'text-ink hover:text-charcoal' : 'text-white/85 hover:text-white'
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute -bottom-0.5 left-0 h-px w-full ${solid ? 'bg-bronze' : 'bg-white'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
            Get Free Quotation
          </a>
          <button
            type="button"
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${solid ? 'text-charcoal' : 'text-white'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>
    </header>

      {/* Outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-ivory md:top-[76px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-x flex min-h-full flex-col pt-6 pb-10">
              <ul className="border-t border-line">
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
                      className="display flex items-center justify-between py-4 text-[34px]"
                    >
                      {l.label}
                      <ArrowRight size={18} strokeWidth={1.4} className="text-bronze" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-10">
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Get Free Quotation
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
