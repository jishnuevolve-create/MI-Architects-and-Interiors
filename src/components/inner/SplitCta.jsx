import { ArrowRight, Phone } from 'lucide-react';
import Parallax from '../ui/Parallax.jsx';
import Picture from '../ui/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { site } from '../../data/site.js';
import { CONTACT_URL } from '../../lib/links.js';

/** Closing invitation for inner pages: espresso panel with a photograph. */
export default function SplitCta({ title = 'Have a space in mind?', accent = 'Let’s build it together.', image = 'photos/residence-lounge' }) {
  return (
    <section aria-label="Start your project" className="py-4 md:py-6">
      <div className="container-x !max-w-[1440px]">
        <div className="grid overflow-hidden rounded-[32px] bg-espresso text-white lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="eyebrow !text-[#e2c393] before:!bg-[#e2c393]">Start your project</p>
            <h2 className="display mt-6 text-[34px] leading-[1.1] md:text-[48px]">
              {title} <em className="block text-[#e2c393]">{accent}</em>
            </h2>
            <p className="mt-6 max-w-[440px] text-[15.5px] leading-[1.75] text-white/75">
              Share your requirement and our team will get in touch with a tailored plan, timeline and estimate.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CONTACT_URL} className="btn !rounded-full bg-paper text-espresso hover:bg-ivory">
                Start Your Project <ArrowRight size={16} strokeWidth={1.8} className="btn-arrow" />
              </a>
              <a href={site.phones[0].href} className="btn !rounded-full border border-white/30 text-white hover:bg-white/10">
                <Phone size={15} strokeWidth={1.7} /> {site.phones[0].label}
              </a>
            </div>
          </Reveal>
          <Parallax amount={8} className="min-h-[280px] lg:min-h-[520px]">
            <Picture name={image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
