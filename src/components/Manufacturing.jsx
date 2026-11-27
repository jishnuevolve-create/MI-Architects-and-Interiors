import { useRef, useState } from 'react';
import { Check, Play } from 'lucide-react';
import Picture, { imageInfo } from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { asset } from '../lib/asset.js';

const points = [
  'Kitchens, wardrobes and custom furniture made in-house',
  'CNC panel processing, edge-banding and multi-boring machines',
  'Finishing and assembly checked before dispatch',
  'Installed on site by our own teams',
];

const strip = [
  { name: 'film/edge-banding', label: 'Edge-banding' },
  { name: 'film/panel-saw', label: 'Panel processing' },
  { name: 'film/finished-unit', label: 'Ready for site' },
];

export default function Manufacturing() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const poster = imageInfo('film/factory');

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="manufacturing" className="py-3 md:py-5">
      <div className="container-x !max-w-[1440px]">
        <div className="overflow-hidden rounded-[28px] border border-line bg-paper">
          <div className="grid lg:grid-cols-12">
            <Reveal className="mc p-7 sm:p-10 lg:col-span-5 lg:p-12 xl:p-14">
              <p className="eyebrow">Manufacturing</p>
              <h2 className="display mt-5 text-[34px] md:text-[44px] xl:text-[48px]">
                Built for <em className="text-bronze-deep">Precision &amp; Scale.</em>
              </h2>
              <p className="mt-6 text-[15.5px] leading-[1.8] text-ink">
                Our own modular furniture facility gives us control over quality, finish and timelines, from a single
                kitchen to a full commercial fit-out.
              </p>
              <ul className="mc-list mt-7 space-y-3.5">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-charcoal">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze text-white">
                      <Check size={12} strokeWidth={2.6} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Studio film, with the factory floor as its cover */}
            <Reveal delay={0.1} className="lg:col-span-7 lg:p-5 lg:pl-0">
              <div className="relative h-full min-h-[280px] overflow-hidden bg-charcoal lg:rounded-[20px]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={asset('/media/miarq-film.mp4')}
                  poster={poster ? `${poster.base}-1600.webp` : undefined}
                  preload="none"
                  playsInline
                  controls={playing}
                  aria-label="Studio film: our campus, design studio and furniture factory"
                />
                {!playing && (
                  <button
                    type="button"
                    onClick={play}
                    className="group absolute inset-0 flex items-end justify-between gap-4 bg-[linear-gradient(180deg,rgba(42,33,27,0)_45%,rgba(42,33,27,0.75)_100%)] p-5 text-left text-white md:p-8"
                    aria-label="Play the studio film (1 minute 22 seconds)"
                  >
                    <span>
                      <span className="block text-[11px] font-semibold tracking-[0.22em] text-white/75 uppercase">Watch · 1:22</span>
                      <span className="display mt-2 block text-[24px] md:text-[32px]">Inside our studio and factory</span>
                    </span>
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-paper text-espresso transition-transform duration-500 group-hover:scale-110 md:h-16 md:w-16">
                      <Play size={22} strokeWidth={1.6} className="ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
            </Reveal>
          </div>

          <ul className="grid grid-cols-3 gap-2 border-t border-line p-2 sm:gap-4 sm:p-5">
            {strip.map((f) => (
              <li key={f.name}>
                <Picture name={f.name} alt={f.label} sizes="33vw" className="aspect-[16/10] w-full rounded-[12px]" />
                <p className="mt-2 px-1 text-center text-[12px] text-ink/80 sm:text-[13px] md:text-left">{f.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
