import { site } from '../../data/site.js';
import { asset } from '../../lib/asset.js';

/**
 * The studio's supplied monogram (made transparent, not redrawn) beside the company name
 * set in type. Replace with the final MiArq Spaces logo file when it is available.
 * `tone`: "dark" for light backgrounds, "light" for dark ones. `tagline` adds the
 * "Design · Build · Manufacture" line on wide screens.
 */
export default function Logo({ tone = 'dark', tagline = false, className = '' }) {
  const light = tone === 'light';
  return (
    <span className={`flex items-center ${className}`}>
      <img
        src={asset(light ? '/brand/logo-mark-light.png' : '/brand/logo-mark-dark.png')}
        alt=""
        width="49"
        height="52"
        className="h-[34px] w-auto md:h-[40px]"
      />
      <span className="ml-2.5 flex flex-col leading-none">
        <span className={`display text-[24px] font-bold tracking-[-0.01em] md:text-[28px] ${light ? 'text-[#d9b98a]' : 'text-bronze'}`}>
          MiArq
        </span>
        <span className={`mt-1 text-[9px] font-semibold tracking-[0.62em] uppercase ${light ? 'text-white/80' : 'text-bronze-deep'}`}>
          Spaces
        </span>
      </span>
      {tagline && (
        <span
          className={`ml-6 hidden border-l pl-6 text-[10.5px] font-semibold tracking-[0.24em] uppercase xl:block ${
            light ? 'border-white/30 text-white/80' : 'border-bronze/40 text-ink'
          }`}
        >
          {site.tagline}
        </span>
      )}
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
