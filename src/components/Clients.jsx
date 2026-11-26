import Reveal from './ui/Reveal.jsx';
import { site } from '../data/site.js';

/** Client names from the company profile, shown as text (no third-party logos). */
export default function Clients() {
  const names = site.clients;
  return (
    <section id="clients" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="overflow-hidden rounded-[28px] border border-line bg-paper py-10 md:py-12">
          <Reveal className="px-6 sm:px-10 lg:px-12">
            <p className="eyebrow">Our clients</p>
            <h2 className="display mt-4 text-[30px] md:text-[40px]">
              Trusted by <em className="text-bronze-deep">Leading Brands.</em>
            </h2>
          </Reveal>
          {/* Slow marquee; pauses on hover and stops for reduced motion */}
          <div className="group relative mt-9 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex w-max animate-[marquee_48s_linear_infinite] gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-16">
              {[...names, ...names].map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  aria-hidden={i >= names.length ? 'true' : undefined}
                  className="display text-[24px] whitespace-nowrap text-charcoal/80 md:text-[30px]"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
