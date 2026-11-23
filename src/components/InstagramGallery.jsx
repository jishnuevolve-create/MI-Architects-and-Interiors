import { ArrowUpRight } from 'lucide-react';
import Picture from './ui/Picture.jsx';
import Reveal from './ui/Reveal.jsx';
import { InstagramIcon } from './ui/BrandIcons.jsx';
import { instagramPosts } from '../data/content.js';
import { site } from '../data/site.js';

/*
 * Fixed mosaic, 5 columns x 4 rows on desktop, matched to each image's orientation.
 * Mobile: 2 columns, first tile large, the landscape frame-wall tile full width.
 */
const tileShape = [
  'col-span-2 row-span-2 md:col-start-1 md:row-start-1',
  'md:col-span-2 md:col-start-3 md:row-start-1',
  'md:row-span-2 md:col-start-5 md:row-start-1',
  'md:row-span-2 md:col-start-3 md:row-start-2',
  'md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-3',
  'col-span-2 md:col-start-3 md:row-start-4',
  'md:row-span-2 md:col-start-5 md:row-start-3',
  'md:row-span-2 md:col-start-4 md:row-start-2',
];

export default function InstagramGallery() {
  return (
    <section id="instagram" className="bg-cream/60 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <InstagramIcon size={14} /> {site.instagram.handle}
            </p>
            <h2 className="display mt-5 text-[42px] md:text-[60px]">
              More Spaces. <em className="text-bronze-deep">More Inspiration.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Follow Our Journey <ArrowUpRight size={16} strokeWidth={1.6} className="btn-arrow" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid auto-rows-[44vw] grid-cols-2 gap-3 md:auto-rows-[190px] md:grid-cols-5 md:gap-4 lg:auto-rows-[220px]">
          {instagramPosts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={(i % 5) * 0.05} className={tileShape[i] ?? ''}>
              <a
                href={`https://www.instagram.com/${post.type}/${post.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full overflow-hidden"
                aria-label={`Open on Instagram: ${post.caption}`}
              >
                <Picture
                  name={post.image}
                  alt={post.caption}
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-[13px] leading-snug text-white">{post.caption}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
