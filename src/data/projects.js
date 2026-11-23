/**
 * Portfolio. Images are keys from src/data/image-manifest.json ("photos/<file-name>").
 * All photographs are the studio's own work, taken from the company profile.
 *
 * Project names describe the space only. Locations and client names are left out
 * until the studio confirms them; add `location: '...'` to show one.
 * To add more photographs to a project, put them in assets-src/photos, run
 * `npm run images`, and append the keys to that project's `gallery`.
 */
export const projects = [
  {
    slug: 'residence-lounge',
    title: 'Onyx & Brass Residence',
    category: 'Residential Interiors',
    space: 'Formal living lounge',
    cover: 'photos/residence-lounge',
    gallery: ['photos/residence-lounge', 'photos/residence-lounge-portrait'],
    summary:
      'A formal lounge built around a book-matched onyx feature wall, with fluted stone panelling set between brass inlays.',
    details: [
      'Book-matched onyx feature wall',
      'Stone panelling with brass inlay strips',
      'Suspended brass chandelier in a stepped ceiling',
      'Sculptural brass console and accent pieces',
    ],
  },
  {
    slug: 'boardroom',
    title: 'Corporate Boardroom',
    category: 'Commercial Interiors',
    space: 'Meeting & conference room',
    cover: 'photos/boardroom',
    gallery: ['photos/boardroom'],
    summary:
      'A boardroom with a sculpted timber conference table, tan leather seating and a concealed linear light over the table.',
    details: [
      'Custom conference table in a deep walnut finish',
      'Textured plaster wall with a circular feature panel',
      'Linear pendant and cove lighting',
      'Large-format stone-look flooring',
    ],
  },
  {
    slug: 'salon-studio',
    title: 'Salon & Wellness Studio',
    category: 'Retail & Wellness',
    space: 'Styling and wash stations',
    cover: 'photos/salon-studio',
    gallery: ['photos/salon-studio'],
    summary:
      'Arched mirror niches, integrated shelving and soft blush tones give a compact service space a clear identity.',
    details: [
      'Arched mirror stations with backlit edges',
      'Built-in display shelving within each niche',
      'Dedicated wash station zone',
      'Durable finishes chosen for daily use',
    ],
  },
  {
    slug: 'living-room',
    title: 'Family Living Room',
    category: 'Living Spaces',
    space: 'Residential living area',
    cover: 'photos/living-room',
    gallery: ['photos/living-room'],
    summary:
      'Generous seating in soft neutrals, a nested stone-top coffee table and a marble-veined rug for an everyday family room.',
    details: [
      'Nested coffee tables with stone tops on timber bases',
      'Tan leather accent chairs',
      'Full-height sheer drapery',
      'Marble flooring with a patterned rug',
    ],
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen',
    category: 'Modular Kitchens',
    space: 'L-shaped kitchen',
    cover: 'photos/modular-kitchen',
    gallery: ['photos/modular-kitchen'],
    summary:
      'An L-shaped kitchen in matte grey with slim black profile handles, glass-front upper cabinets and lighting tucked under the wall units.',
    details: [
      'Matte grey base units with black profile handles',
      'Glass-front upper cabinets',
      'Under-cabinet LED lighting',
      'Continuous light stone countertop',
    ],
  },
  {
    slug: 'dining-room',
    title: 'Dining Space',
    category: 'Residential Interiors',
    space: 'Dining area',
    cover: 'photos/dining-room',
    gallery: ['photos/dining-room'],
    summary:
      'A stone-top dining table with curved upholstered chairs, set against a fluted wall panel and a single brass sconce.',
    details: [
      'Stone-top dining table',
      'Curved upholstered chairs',
      'Fluted wall panelling',
      'Circular ring pendant above the table',
    ],
  },
];
