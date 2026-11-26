import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import rawManifest from '../../data/image-manifest.json';
import { asset } from '../../lib/asset.js';

// Same manifest, with each image path prefixed by the site's base path.
const manifest = Object.fromEntries(
  Object.entries(rawManifest).map(([key, entry]) => [key, { ...entry, base: asset(entry.base) }]),
);

/**
 * Responsive WebP image from the generated manifest. The photo is always visible; a tiny
 * blurred preview sits behind it only while it downloads, and is removed once it has loaded.
 * `name` is a manifest key such as "photos/living-room".
 * If the key is missing (photo not added yet) a clearly labelled placeholder is shown.
 */
export default function Picture({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  style,
  eager = false,
}) {
  const entry = manifest[name];
  const [loaded, setLoaded] = useState(false);
  const [drawn, setDrawn] = useState(0);
  const imgRef = useRef(null);
  const boxRef = useRef(null);
  const contain = imgClassName.includes('object-contain');

  // Pick the file by the size the photo is actually drawn at. A cropped (object-cover)
  // photo is drawn wider than its frame whenever its shape differs, so a frame-based
  // "sizes" hint makes the browser choose a file that is too small and looks soft.
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || !entry) return;
    const aspect = entry.width / entry.height;
    const measure = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return; // hidden: wait until it is shown
      const px = contain ? Math.min(w, h * aspect) : Math.max(w, h * aspect);
      const next = Math.ceil(px * 1.08); // headroom for hover zooms
      setDrawn((prev) => (Math.abs(next - prev) > prev * 0.1 ? next : prev));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [entry, contain]);

  // The load event can be missed (cached images, images that finished before React
  // attached its listener). Check the element directly so a downloaded photo always shows.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    const done = () => setLoaded(true);
    img.addEventListener('load', done);
    img.addEventListener('error', done);
    return () => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
    };
  }, [name, drawn]);

  if (!entry) {
    return (
      <div
        className={`flex items-center justify-center bg-cream text-center text-xs tracking-widest text-bronze-deep uppercase ${className}`}
        role="img"
        aria-label={`Photo placeholder: ${alt}`}
      >
        <span className="px-6">Photo to be added<br />{name}</span>
      </div>
    );
  }

  const srcSet = entry.widths.map((w) => `${entry.base}-${w}.webp ${w}w`).join(', ');
  const fallback = `${entry.base}-${entry.widths.at(-1)}.webp`;

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden bg-cream ${className}`}
      style={{
        backgroundImage: loaded ? undefined : `url(${entry.placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      <img
        ref={imgRef}
        src={drawn ? fallback : undefined}
        srcSet={drawn ? srcSet : undefined}
        sizes={drawn ? `${drawn}px` : sizes}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading="eager"
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : eager ? 'auto' : 'low'}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

export const imageInfo = (name) => manifest[name];
