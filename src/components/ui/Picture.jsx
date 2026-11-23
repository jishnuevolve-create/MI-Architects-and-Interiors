import { useState } from 'react';
import manifest from '../../data/image-manifest.json';

/**
 * Responsive WebP image from the generated manifest.
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
}) {
  const entry = manifest[name];
  const [loaded, setLoaded] = useState(false);

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
      className={`relative overflow-hidden bg-cream ${className}`}
      style={{
        backgroundImage: loaded ? undefined : `url(${entry.placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
    >
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded || priority ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}

export const imageInfo = (name) => manifest[name];
