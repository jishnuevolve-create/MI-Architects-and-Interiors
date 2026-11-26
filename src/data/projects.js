/**
 * Portfolio, grouped by sector. Images are keys from src/data/image-manifest.json:
 *   "work/<project>/<nn>"  — photos supplied by the studio (assets-src/work/<project>/)
 *   "photos/<name>"        — photos from the company profile
 *
 * Titles and summaries describe only what the photographs show. Client names and
 * locations are left out unless they appear in the photos; add `location: '...'` to show one.
 *
 * To add a project: put its photos in assets-src/work/<slug>/01.jpg, 02.jpg …,
 * run `npm run images`, then add an entry below with the matching sector id.
 */

/** Gallery keys "work/<slug>/01" … "work/<slug>/NN". */
const shots = (slug, n) => Array.from({ length: n }, (_, i) => `work/${slug}/${String(i + 1).padStart(2, '0')}`);

export const sectors = [
  {
    id: 'residential',
    cover: 'work/garden-villa/01',
    name: 'Residential',
    intro: 'Villas, bungalows and apartments, from architecture and civil work through interiors, furniture and handover.',
    clients: [],
  },
  {
    id: 'corporate',
    cover: 'work/office-reception/01',
    name: 'Corporate',
    intro: 'Offices, receptions, cabins and boardrooms planned around how teams actually work.',
    clients: ['CBRE', 'Hitachi Energy', 'Voltas', 'Indian Potash Limited'],
  },
  {
    id: 'education',
    cover: 'work/institute-interiors/01',
    name: 'Education',
    intro: 'Meeting rooms, staff areas and public spaces for institutes, built to take daily use.',
    clients: [],
  },
  {
    id: 'hospitality',
    cover: null,
    name: 'Hospitality',
    intro: 'Guest-facing spaces where first impressions, durability and quick turnaround all matter.',
    clients: ['OYO'],
  },
  {
    id: 'retail',
    cover: 'work/laundry-studio/01',
    name: 'Retail',
    intro: 'Shops, studios and service counters where the space carries the brand.',
    clients: ['Calvin Klein', 'Pandora', 'French Connection'],
  },
  {
    id: 'health',
    cover: 'work/dental-clinic/01',
    name: 'Health',
    intro: 'Clinics and healthcare spaces that feel calm for patients and stay practical for staff.',
    clients: ['Sanjivani Hospital'],
  },
];

export const projects = [
  /* ---------- Residential ---------- */
  {
    slug: 'double-height-residence',
    sector: 'residential',
    title: 'Double-Height Residence',
    space: 'Living, dining & lounge',
    cover: 'work/double-height-residence/01',
    gallery: shots('double-height-residence', 4),
    summary:
      'A double-height living and dining space anchored by a full-height landscape artwork, with dark stone walls, cascading pendants and a lounge set against a deep blue panelled wall.',
    details: [
      'Full-height feature artwork across two levels',
      'Dark stone and textured stone wall cladding',
      'Cascading linear pendants over the dining table',
      'Lounge with a blue panelled feature wall',
    ],
  },
  {
    slug: 'garden-villa',
    sector: 'residential',
    title: 'Garden Villa',
    space: 'Architecture & interiors',
    cover: 'work/garden-villa/01',
    gallery: shots('garden-villa', 9),
    summary:
      'A two-storey villa with a deep timber-lined overhang, glass balustrades and a planted garden, carried through to calm, stone-floored interiors.',
    details: [
      'Cantilevered upper floor with a timber soffit',
      'Glass balustrade terrace',
      'Lacquered modular kitchen with glass-front wall units',
      'Fluted-panel bedroom and stone-clad headboard wall',
    ],
  },
  {
    slug: 'stone-and-timber-home',
    sector: 'residential',
    title: 'Stone & Timber Home',
    space: 'Living, bedrooms & stair',
    cover: 'work/stone-and-timber-home/01',
    gallery: shots('stone-and-timber-home', 10),
    summary:
      'Dark marble walls, warm timber ceilings and a stacked-stone planter wall, with a lit stair and upholstered bedrooms.',
    details: [
      'Book-matched dark marble feature walls',
      'Timber-slat ceilings and wall panelling',
      'Stacked-stone planter wall with floating shelves',
      'Upholstered headboards and full-height glass wardrobes',
    ],
  },
  {
    slug: 'residence-lounge',
    sector: 'residential',
    title: 'Onyx & Brass Residence',
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
    slug: 'apartment-handover',
    sector: 'residential',
    title: 'Apartment Fit-Out',
    space: 'Photographed at handover',
    cover: 'work/apartment-handover/01',
    gallery: shots('apartment-handover', 8),
    summary:
      'Photographed on handover day, before the furniture arrived: cove-lit ceilings, marble-effect feature walls, fluted panels and full-height glass wardrobes.',
    details: [
      'Cove-lit false ceilings in every room',
      'Marble-effect TV and feature walls',
      'Fluted and textured wall panels',
      'Glass-shuttered wardrobes and a timber puja unit',
    ],
  },
  {
    slug: 'stone-feature-apartment',
    sector: 'residential',
    title: 'Stone Feature Apartment',
    space: 'Living & kitchen',
    cover: 'work/stone-feature-apartment/01',
    gallery: shots('stone-feature-apartment', 4),
    summary:
      'An open living space with a split-stone feature wall framed by timber panels and lit edges, opening onto an island kitchen.',
    details: [
      'Split-stone feature wall with concealed lighting',
      'Timber-veneer wall panels',
      'Track and cove lighting',
      'Open island kitchen',
    ],
  },
  {
    slug: 'lounge-and-bar',
    sector: 'residential',
    title: 'Private Lounge & Bar',
    space: 'Entertainment floor',
    cover: 'work/lounge-and-bar/01',
    gallery: shots('lounge-and-bar', 5),
    summary:
      'An entertainment floor with a back-lit bar counter, a sculptural relief wall, timber flooring and tufted lounge seating.',
    details: [
      'Upholstered bar front with under-lighting',
      'Glass display units behind the bar',
      'Sculptural relief feature wall',
      'Timber flooring throughout',
    ],
  },
  {
    slug: 'entrance-foyer',
    sector: 'residential',
    title: 'Foyer & Meditation Corner',
    space: 'Apartment entrance',
    cover: 'work/entrance-foyer/01',
    gallery: shots('entrance-foyer', 4),
    summary:
      'A timber-screened entrance and a back-lit meditation niche with a copper disc set above a stone plinth.',
    details: [
      'Timber safety door and slatted screen',
      'Back-lit copper disc feature',
      'Stone plinth and marble flooring',
      'Timber-slat ceiling with cove light',
    ],
  },
  {
    slug: 'living-room',
    sector: 'residential',
    title: 'Family Living Room',
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
    slug: 'dining-room',
    sector: 'residential',
    title: 'Dining Space',
    space: 'Dining area',
    cover: 'photos/dining-room',
    gallery: ['photos/dining-room'],
    summary:
      'A stone-top dining table with curved upholstered chairs, set against a fluted wall panel and a single brass sconce.',
    details: ['Stone-top dining table', 'Curved upholstered chairs', 'Fluted wall panelling', 'Circular ring pendant'],
  },
  {
    slug: 'modular-kitchen',
    sector: 'residential',
    title: 'Modular Kitchen',
    space: 'L-shaped kitchen',
    cover: 'photos/modular-kitchen',
    gallery: ['photos/modular-kitchen'],
    summary:
      'An L-shaped kitchen in matte grey with slim black profile handles, glass-front upper cabinets and lighting under the wall units. Made in our own factory.',
    details: [
      'Matte grey base units with black profile handles',
      'Glass-front upper cabinets',
      'Under-cabinet LED lighting',
      'Continuous light stone countertop',
    ],
  },

  /* ---------- Corporate ---------- */
  {
    slug: 'office-reception',
    sector: 'corporate',
    title: 'Office Reception & Cabin',
    space: 'Reception and director cabin',
    cover: 'work/office-reception/01',
    gallery: shots('office-reception', 2),
    summary:
      'A reception with a curved timber-and-white desk, sculpted ceiling feature and yellow tufted seating, plus a cabin with a hexagonal wall feature.',
    details: [
      'Curved reception desk',
      'Sculpted back-lit ceiling panel',
      'Timber-panelled walls',
      'Hexagonal tile feature wall in the cabin',
    ],
  },
  {
    slug: 'corporate-office',
    sector: 'corporate',
    title: 'Corporate Office Floor',
    space: 'Workspace and entrance',
    cover: 'work/corporate-office/01',
    gallery: shots('corporate-office', 2),
    summary:
      'An open workspace with glass-partitioned cabins and ring pendants, entered past a branded reception wall.',
    details: ['Frosted glass cabin partitions', 'Ring pendant lighting', 'Open workstations', 'Branded entrance wall'],
  },
  {
    slug: 'boardroom',
    sector: 'corporate',
    title: 'Corporate Boardroom',
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

  /* ---------- Education ---------- */
  {
    slug: 'institute-interiors',
    sector: 'education',
    title: 'Institute Interiors',
    space: 'Foyer, meeting & staff rooms',
    cover: 'work/institute-interiors/01',
    gallery: shots('institute-interiors', 4),
    summary:
      'A double-height chequered foyer, meeting rooms with linear lighting and panelled walls, and a staff room with a colour-blocked acoustic wall.',
    details: [
      'Double-height foyer with timber-slat ceiling',
      'Long conference tables with integrated power',
      'Colour-blocked acoustic wall panels',
      'Glass-partitioned cabins',
    ],
  },

  /* ---------- Retail ---------- */
  {
    slug: 'laundry-studio',
    sector: 'retail',
    title: 'The Laundry Post',
    space: 'Premium laundry studio',
    cover: 'work/laundry-studio/01',
    gallery: shots('laundry-studio', 3),
    summary:
      'A premium laundry studio with a branded service counter, garment display rail and an arched welcome wall.',
    details: ['Branded service counter', 'Garment display system', 'Arched welcome wall', 'Track lighting'],
  },
  {
    slug: 'salon-studio',
    sector: 'retail',
    title: 'Salon & Wellness Studio',
    space: 'Styling and wash stations',
    cover: 'photos/salon-studio',
    gallery: ['photos/salon-studio'],
    summary:
      'Arched mirror niches, integrated shelving and soft blush tones give a compact service space a clear identity.',
    details: [
      'Arched mirror stations with back-lit edges',
      'Built-in display shelving within each niche',
      'Dedicated wash station zone',
      'Durable finishes chosen for daily use',
    ],
  },
  {
    slug: 'creamery',
    sector: 'retail',
    title: 'Thal Corner Creamery',
    space: 'Shopfront',
    cover: 'work/creamery/01',
    gallery: shots('creamery', 1),
    summary: 'A compact dessert shop with illuminated bilingual signage and a bright, colour-washed interior.',
    details: ['Illuminated shopfront signage', 'Glazed frontage', 'Colour-washed interior', 'Counter seating'],
  },

  /* ---------- Health ---------- */
  {
    slug: 'dental-clinic',
    sector: 'health',
    title: 'Dantam Dental Clinic',
    space: 'Reception & consultation',
    cover: 'work/dental-clinic/01',
    gallery: shots('dental-clinic', 4),
    summary:
      'Arched glazing, back-lit signage and soft neutral finishes for a welcoming reception and consultation rooms.',
    details: [
      'Arched glazed partitions and shopfront',
      'Back-lit circular brand sign',
      'Fluted timber accent panels',
      'Easy-clean light finishes',
    ],
  },
];

export const projectsBySector = (id) => projects.filter((p) => p.sector === id);
export const sectorName = (id) => sectors.find((s) => s.id === id)?.name ?? '';
