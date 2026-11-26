/** Design process — the four stages from the studio's own "Our Approach" page. */
export const processSteps = [
  { title: 'Discover', text: 'We visit the site and understand your vision, how the space will be used and what matters most.' },
  { title: 'Design', text: 'Concepts, layouts, visuals and material selections, refined with you until every detail is agreed.' },
  { title: 'Plan', text: 'Costing, timelines, working drawings and resources, so the build starts with no open questions.' },
  { title: 'Build', text: 'Our site teams and factory execute the work, with progress tracking and quality checks throughout.' },
  { title: 'Deliver', text: 'A final walkthrough with you, snag fixes, and handover of a space that is ready to use.' },
];

/** Strengths — drawn from "Why work with us" and the manufacturing pages of the profile. */
export const strengths = [
  {
    title: 'Design and delivery under one roof',
    text: 'Architecture, interiors, fit-out, furniture and building services are planned together, so details do not get lost between contractors.',
  },
  {
    title: 'Our own furniture manufacturing unit',
    text: 'Kitchens, wardrobes and custom furniture are produced in-house on CNC, edge-banding and multi-boring machines, then fitted by our own site teams.',
  },
  {
    title: 'A dedicated project team',
    text: 'Project managers, designers and site engineers follow your project from drawings to handover, with regular progress tracking.',
  },
  {
    title: 'Materials chosen with care',
    text: 'Stone, timber, metal accents and lighting are selected to work together and to suit how each space will be used.',
  },
];

/** Annotations for the hero photograph (positions are % of the image box, desktop only). */
export const heroAnnotations = [
  { label: 'Book-matched onyx wall', x: 16, y: 24 },
  { label: 'Stone panelling, brass inlay', x: 46, y: 29 },
  { label: 'Suspended brass chandelier', x: 73, y: 21 },
];

/** Annotations for the kitchen photograph in the Details section. */
export const detailAnnotations = [
  { label: 'Under-cabinet lighting', x: 28, y: 18 },
  { label: 'Light stone countertop', x: 72, y: 44 },
  { label: 'Black profile handles', x: 39, y: 58 },
];

/** Instagram posts (images saved from the studio's profile; captions from the posts). */
export const instagramPosts = [
  { id: 'DbDxCOLifrR', type: 'p', image: 'instagram/DbDxCOLifrR', caption: 'Bedroom with large-scale mural panelling and soft neutral textures' },
  { id: 'DAEOvJ5Ngeq', type: 'reel', image: 'instagram/DAEOvJ5Ngeq', caption: 'A calm, modern bedroom with clean lines and soft textures' },
  { id: 'DbCzTqAiULq', type: 'p', image: 'instagram/DbCzTqAiULq', caption: 'Material palette for a foyer: stone, walnut, brass and copper' },
  { id: 'DYWQCYLp6Qk', type: 'reel', image: 'instagram/DYWQCYLp6Qk', caption: 'A dental clinic designed to feel calm and welcoming' },
  { id: 'Dauq3HViWNS', type: 'p', image: 'instagram/Dauq3HViWNS', caption: 'Design deck for a 4 BHK apartment' },
  { id: 'DQmh4eSDW38', type: 'reel', image: 'instagram/DQmh4eSDW38', caption: 'An art wall of 300 picture frames, installed on site' },
  { id: 'DaNB85DNBk_', type: 'reel', image: 'instagram/DaNB85DNBk_', caption: 'Custom jewellery display console in metal and curved glass' },
  { id: 'DgDbTCvTG92', type: 'reel', image: 'instagram/DgDbTCvTG92', caption: 'Bedroom with a panelled headboard wall and warm cove lighting' },
];
// Order matters: InstagramGallery places these into a fixed 5 x 4 mosaic.
// [0] portrait (large), [1] landscape, [2] portrait, [3] portrait, [4] landscape (large),
// [5] landscape, [6] portrait, [7] portrait.
