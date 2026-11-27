import { ArrowRight } from 'lucide-react';
import Parallax from './ui/Parallax.jsx';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { CONTACT_URL } from '../lib/links.js';

export default function CtaBand() {
  return (
    <section aria-label="Start your project" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="relative isolate overflow-hidden rounded-[28px]">
          <div className="absolute inset-0 -z-10">
            <Parallax amount={10} className="h-full w-full">
              <Picture name="photos/residence-lounge" alt="" sizes="100vw" className="h-full w-full" />
            </Parallax>
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(42,33,27,0.92)_0%,rgba(74,51,38,0.82)_55%,rgba(74,51,38,0.55)_100%)]" />
          <Reveal className="flex flex-col items-center gap-6 px-7 py-12 text-center text-white sm:px-12 md:flex-row md:items-center md:text-left md:justify-between md:py-16 lg:px-16">
            <div>
              <h2 className="display text-[32px] md:text-[44px]">Let&rsquo;s Build Your Next Space.</h2>
              <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.7] text-white/80">
                Share your requirement and our team will get in touch with a tailored solution.
              </p>
            </div>
            <a href={CONTACT_URL} className="btn shrink-0 !rounded-full bg-paper text-espresso hover:bg-ivory">
              Start Your Project <ArrowRight size={16} strokeWidth={1.8} className="btn-arrow" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
