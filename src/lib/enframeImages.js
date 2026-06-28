// Enframe assets on CloudFront
export const CDN_BASE = "https://d1ui1jxb5e6bds.cloudfront.net";
export const CDN_ENFRAME_V2 = `${CDN_BASE}/enframe2`;
export const CDN_ENFRAME_V4 = `${CDN_BASE}/enframev4`;
export const CDN_BRAND = `${CDN_ENFRAME_V2}/04-brand-logos`;

/** Legacy gallery filenames that only exist under enframe2. */
const V2_ONLY_GALLERY = new Set([
  "99ef07fa.jpg",
  "d042d13c.jpg",
  "74ef58a6.jpg",
]);

/** Map legacy gallery filenames to enframev4 galley paths. */
const GALLERY_V4_ALIASES = {
  "090a9421_a.jpg": "090a9421-a.webp",
  "090a9427_a.jpg": "090a9427-a.webp",
  "090a9395aa_vv.jpg": "090a9395aa-vv.webp",
  "090a9300.jpg": "090a9300.webp",
  "090a9495_a.jpg": "090a9495-a.webp",
  "1b6acd31.jpg": "1b6acd31-b877-40a3-ae46-4caba6c2f912_1_102_a.webp",
  "e0902465.jpg": "e0902465-813b-425b-b545-e05b59d79515_1_102_o.webp",
  "dd85e4f4.jpg": "dd85e4f4-2894-4c25-896b-03b51c19a5c0_1_105_c.webp",
  "5aa9eac9.jpg": "5aa9eac9-973c-4123-bc46-4cd2831eee45_1_102_o.webp",
  "d5c33758.jpg": "d5c33758-6777-42a4-96ff-dd9b3916c60d_1_102_o.webp",
  "db20be06.jpg": "db20be06-917c-4f54-aa4b-1f54f3bedc69_1_102_o.webp",
  "c7a3dee0-0f2f-4c6e-a2bf-9d9fcf017ce1_1_102_o.jpeg":
    "c7a3dee0-0f2f-4c6e-a2bf-9d9fcf017ce1_1_102_o.webp",
};

/** Map legacy project folders to enframev4 project folders. */
const PROJECT_V4_SITES = {
  "k-block-south-city-1": "south-city-103",
  "hari-nagar": null,
  "b-block-south-city-1": "south-city-117",
  "dlf-1": "dlf-1",
  "dlf-3": "dlf-3",
};

const HERO_V4 = {
  "home-header.jpg": `${CDN_BASE}/home/headerimage.png`,
  "services-hero.jpg": `${CDN_ENFRAME_V4}/galley/090a9427-a.webp`,
  "projects-hero.jpg": `${CDN_ENFRAME_V4}/projects/south-city-103/090a9569.webp`,
  "gallery-hero.jpg": `${CDN_ENFRAME_V4}/galley/090a9544.webp`,
};

function toV4GalleryFile(file) {
  if (GALLERY_V4_ALIASES[file]) return GALLERY_V4_ALIASES[file];
  return file.replace(/\.(jpe?g)$/i, ".webp").replace(/_([a-z])/g, "-$1");
}

/** @param {string} file e.g. "090a9289.jpg" */
export function cdnGallery(file) {
  if (V2_ONLY_GALLERY.has(file)) {
    return `${CDN_ENFRAME_V2}/03-gallery/${file}`;
  }
  return `${CDN_ENFRAME_V4}/galley/${toV4GalleryFile(file)}`;
}

/** @param {string} file e.g. "home-header.jpg" */
export function cdnHero(file) {
  return HERO_V4[file] ?? `${CDN_ENFRAME_V2}/01-heroes/${file}`;
}

/** Direct enframev4 project folder IDs (match S3 / CloudFront paths). */
const V4_PROJECT_IDS = new Set([
  "south-ex-1-delhi",
  "south-city-103",
  "south-city-117",
  "dlf-1",
  "dlf-3",
]);

/** @param {string} siteId project folder id or legacy site id */
export function cdnProject(siteId, file) {
  const v4File = toV4GalleryFile(file);

  if (V4_PROJECT_IDS.has(siteId)) {
    return `${CDN_ENFRAME_V4}/projects/${siteId}/${v4File}`;
  }

  const v4Site = PROJECT_V4_SITES[siteId];

  if (v4Site) {
    return `${CDN_ENFRAME_V4}/projects/${v4Site}/${v4File}`;
  }

  if (siteId === "hari-nagar") {
    return `${CDN_ENFRAME_V4}/galley/${v4File}`;
  }

  return `${CDN_ENFRAME_V2}/02-projects/${siteId}/${file}`;
}

/** @param {string} file e.g. "tatasteel-com.png" */
export function cdnBrand(file) {
  return `${CDN_BRAND}/${file}`;
}

export const ENFRAME_BRAND_HERO = cdnHero("home-header.jpg");

export const HERO_IMAGES = {
  home: ENFRAME_BRAND_HERO,
  about: ENFRAME_BRAND_HERO,
  services: cdnHero("services-hero.jpg"),
  projects: cdnHero("projects-hero.jpg"),
  gallery: cdnHero("gallery-hero.jpg"),
  contact: cdnGallery("090a9517.jpg"),
};

export const HERO_FOCUS = {
  home: "50% 58%",
  about: "50% 50%",
  services: "50% 52%",
  projects: "52% 42%",
  gallery: "50% 52%",
  contact: "52% 52%",
};

export const EXTERIORS = [
  cdnGallery("090a9544.jpg"),
  cdnGallery("090a9556.jpg"),
  cdnGallery("090a9347.jpg"),
  cdnGallery("1b6acd31.jpg"),
  cdnGallery("e0902465.jpg"),
  cdnGallery("090a9569.jpg"),
  cdnGallery("090a9628.jpg"),
  cdnGallery("090a9634.jpg"),
  cdnGallery("99ef07fa.jpg"),
  cdnGallery("090a9344.jpg"),
];

export const FOYERS = [
  cdnGallery("c7a3dee0-0f2f-4c6e-a2bf-9d9fcf017ce1_1_102_o.jpeg"),
  cdnGallery("090a9362.jpg"),
  cdnGallery("090a9367.jpg"),
  cdnGallery("090a9328.jpg"),
  cdnGallery("db20be06.jpg"),
];

export const LIVING_ROOMS = [
  cdnGallery("090a9289.jpg"),
  cdnGallery("090a9421_a.jpg"),
];

export const KITCHENS = [
  cdnGallery("090a9445.jpg"),
  cdnGallery("090a9460.jpg"),
  cdnGallery("090a9446.jpg"),
  cdnGallery("090a9300.jpg"),
  cdnGallery("090a9302.jpg"),
];

export const BEDROOMS = [
  cdnGallery("090a9468.jpg"),
  cdnGallery("090a9517.jpg"),
  cdnGallery("090a9324.jpg"),
];

export const BATHROOMS = [
  cdnGallery("090a9500.jpg"),
  cdnGallery("090a9476.jpg"),
  cdnGallery("090a9431.jpg"),
  cdnGallery("dd85e4f4.jpg"),
];

export const DOORS_WOODWORK = [
  cdnGallery("5aa9eac9.jpg"),
  cdnGallery("d042d13c.jpg"),
  cdnGallery("d5c33758.jpg"),
];

export const ARCHITECTURAL_DETAILS = [
  cdnGallery("090a9392.jpg"),
  cdnGallery("090a9395aa_vv.jpg"),
  cdnGallery("090a9427_a.jpg"),
  cdnGallery("090a9512.jpg"),
  cdnGallery("74ef58a6.jpg"),
];

export const COMMERCIAL = [cdnGallery("090a9650.jpg")];

export const ADDITIONAL = [
  cdnGallery("090a9330.jpg"),
  cdnGallery("090a9333.jpg"),
  cdnGallery("090a9336.jpg"),
  cdnGallery("090a9338.jpg"),
  cdnGallery("090a9340.jpg"),
  cdnGallery("090a9378.jpg"),
  cdnGallery("090a9448.jpg"),
  cdnGallery("090a9449.jpg"),
  cdnGallery("090a9451a.jpg"),
  cdnGallery("090a9477.jpg"),
  cdnGallery("090a9495_a.jpg"),
  cdnGallery("090a9502.jpg"),
  cdnGallery("090a9538.jpg"),
  cdnGallery("090a9576.jpg"),
  cdnGallery("090a9584.jpg"),
  cdnGallery("090a9625.jpg"),
  cdnGallery("090a9639.jpg"),
  cdnGallery("090a9644.jpg"),
];

export const ALL_PHOTOS = [
  ...EXTERIORS,
  ...FOYERS,
  ...LIVING_ROOMS,
  ...KITCHENS,
  ...BEDROOMS,
  ...BATHROOMS,
  ...DOORS_WOODWORK,
  ...ARCHITECTURAL_DETAILS,
  ...COMMERCIAL,
  ...ADDITIONAL,
];

// Stock imagery for service cards (home + /services listing).
// URLs aligned with enframe3.vercel.app — CloudFront + stable externals only.
export const HOME_SERVICE_CARDS = [
  {
    id: "pre-construction-planning",
    title: "Pre-Construction Planning",
    desc: "Site Evaluation & Survey; Design Development; Permits & Approvals.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    imagePosition: "50% 50%",
  },
  {
    id: "ground-breaking-site-preparation",
    title: "Ground Breaking & Site Preparation",
    desc: "Clearing & Excavation; Utility Setup; Ground Breaking & Site Preparation.",
    image:
      "https://i.pinimg.com/736x/7b/19/e6/7b19e6c0b293a5e99d7d4f7bf7516250.jpg",
    imagePosition: "50% 52%",
  },
  {
    id: "foundation-structural-work",
    title: "Foundation & Structural Work",
    desc: "Foundation Laying; Structural Framing; Rainwater Harvesting.",
    image:
      "https://i.pinimg.com/736x/a7/dc/e7/a7dce7f8af9240b8fc9c3e1ea661bd22.jpg",
    imagePosition: "50% 48%",
  },
  {
    id: "enclosure-roofing-waterproofing",
    title: "Enclosure, Roofing & Waterproofing",
    desc: "Walls & Roof; Windows & Doors; Waterproofing as foundational investment.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    imagePosition: "50% 46%",
  },
  {
    id: "wood-work",
    title: "Wood Work",
    desc: "Custom cabinetry and refined interior wood enhancements.",
    image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1200&q=80",
    imagePosition: "50% 50%",
  },
  {
    id: "mechanical-electrical-plumbing",
    title: "Mechanical, Electrical & Plumbing (MEP)",
    desc: "Install MEP systems: wiring, plumbing, HVAC, and fire safety; soundproofing technologies.",
    image: cdnGallery("090a9427_a.jpg"),
    imagePosition: "50% 50%",
  },
  {
    id: "interior-exterior-finishes",
    title: "Interior & Exterior Finishes",
    desc: "Bespoke wood work, plastering, painting, tiling, and POP ceiling—crafted for a lavish interior.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    imagePosition: "50% 52%",
  },
  {
    id: "amenities-landscaping",
    title: "Amenities, Landscaping & Handover",
    desc: "Standard vs Opulent landscaping, driveways, boundary walls, pools, rooftop gardens, and water features.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    imagePosition: "50% 54%",
  },
];

const cardMedia = Object.fromEntries(
  HOME_SERVICE_CARDS.map((card) => [
    card.id,
    { src: card.image, position: card.imagePosition },
  ])
);

export const SERVICE_CARD_MEDIA = {
  ...cardMedia,
};

export const IMAGE_DIRECTION = {
  overview: {
    main: { src: cdnGallery("090a9289.jpg"), position: "50% 52%" },
    side: { src: cdnGallery("090a9367.jpg"), position: "52% 48%" },
  },
  highlights: [
    { src: cdnGallery("090a9445.jpg"), position: "50% 58%" },
    { src: cdnGallery("090a9476.jpg"), position: "52% 46%" },
    { src: cdnGallery("090a9468.jpg"), position: "50% 50%" },
    { src: cdnGallery("090a9427_a.jpg"), position: "50% 48%" },
    { src: cdnGallery("090a9344.jpg"), position: "50% 56%" },
  ],
  testimonial: { src: cdnGallery("090a9556.jpg"), position: "50% 54%" },
  aboutCategories: [
    { src: cdnGallery("090a9289.jpg"), position: "50% 52%" },
    { src: cdnGallery("090a9544.jpg"), position: "50% 55%" },
    { src: cdnGallery("090a9362.jpg"), position: "50% 52%" },
    { src: cdnGallery("090a9468.jpg"), position: "50% 50%" },
    { src: cdnGallery("090a9650.jpg"), position: "50% 50%" },
    { src: cdnGallery("090a9512.jpg"), position: "50% 50%" },
  ],
};
