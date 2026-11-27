import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import { projects, sectorName } from '../data/projects.js';
import { contactLink } from '../lib/links.js';

export default function ProjectDetail({ index, onClose, onNavigate }) {
  const project = projects[index];
  const [shot, setShot] = useState(0);
  const dialogRef = useRef(null);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  useEffect(() => setShot(0), [index]);

  useEffect(() => {
    const lastFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(index + 1);
      if (e.key === 'ArrowLeft') onNavigate(index - 1);
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = dialogRef.current.querySelectorAll('button, a[href]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      lastFocus?.focus?.();
    };
  }, [index, onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-charcoal/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        tabIndex={-1}
        className="absolute inset-0 overflow-y-auto bg-ivory outline-none md:inset-y-4 md:right-4 md:left-auto md:w-[min(1180px,calc(100vw-32px))]"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-line bg-ivory/95 px-5 backdrop-blur md:px-8">
          <p className="eyebrow">
            {sectorName(project.sector)} — {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-charcoal hover:text-bronze-deep"
            aria-label="Close project"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-10 p-5 md:p-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-8">
              <Picture
                key={project.gallery[shot]}
                name={project.gallery[shot]}
                alt={`${project.title} — photograph ${shot + 1}`}
                sizes="(min-width: 1024px) 760px, 100vw"
                priority
                className="aspect-[4/3] w-full"
                imgClassName="!object-contain"
              />
              {project.gallery.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {project.gallery.map((g, i) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={`Show photograph ${i + 1}`}
                      aria-pressed={shot === i}
                      className={`w-24 transition-opacity ${shot === i ? 'opacity-100 ring-1 ring-bronze ring-offset-2 ring-offset-ivory' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <Picture name={g} alt="" sizes="96px" className="aspect-[4/3] w-full" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <h2 id="project-title" className="display text-[30px] md:text-[36px]">
                {project.title}
              </h2>
              <p className="mt-2 text-[13px] tracking-wide text-ink/70">
                {project.space}
                {project.location ? ` · ${project.location}` : ''}
              </p>
              <p className="mt-6 text-[16px] leading-[1.75] text-ink">{project.summary}</p>

              <h3 className="eyebrow mt-10">Key details</h3>
              <ul className="mt-4 border-t border-line">
                {project.details.map((d) => (
                  <li key={d} className="flex gap-3 border-b border-line py-3 text-[14.5px] text-ink">
                    <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-bronze" />
                    {d}
                  </li>
                ))}
              </ul>

              <a href={contactLink({ project: project.title, sector: project.sector })} className="btn btn-dark mt-10 w-full">
                Plan a space like this
              </a>
            </div>
          </motion.article>
        </AnimatePresence>

        <nav className="grid grid-cols-2 border-t border-line" aria-label="Other projects">
          <button
            type="button"
            onClick={() => onNavigate(index - 1)}
            className="group flex items-center gap-4 p-5 text-left hover:bg-cream md:p-8"
          >
            <ArrowLeft size={18} strokeWidth={1.4} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-[11px] tracking-[0.2em] text-ink/60 uppercase">Previous</span>
              <span className="display mt-1 block text-[17px] md:text-[20px]">{prev.title}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate(index + 1)}
            className="group flex items-center justify-end gap-4 border-l border-line p-5 text-right hover:bg-cream md:p-8"
          >
            <span>
              <span className="block text-[11px] tracking-[0.2em] text-ink/60 uppercase">Next</span>
              <span className="display mt-1 block text-[17px] md:text-[20px]">{next.title}</span>
            </span>
            <ArrowRight size={18} strokeWidth={1.4} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        </nav>
      </motion.div>
    </motion.div>
  );
}
