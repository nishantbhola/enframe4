#!/usr/bin/env node
/**
 * Builds aws-upload/ from local public/ sources for S3 / CloudFront deployment.
 * Run: node scripts/prepare-aws-upload.mjs
 *
 * Note: Site images are served from CloudFront (see src/lib/enframeImages.js).
 * Restore public/enframe-photos and public/brand-logos from backup before re-running.
 */

import { createHash } from "crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { basename, dirname, extname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "aws-upload");

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function safeFileName(filePath) {
  let name = basename(filePath);
  let ext = "";
  const extRe = /\.(jpe?g|png|webp|gif)$/i;
  while (extRe.test(name)) {
    const match = name.match(extRe);
    ext = match[0].toLowerCase();
    name = name.slice(0, -ext.length);
  }
  const slug = name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
  return `${slug}${ext}`;
}

function fileHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 16);
}

function copyTo(destDir, srcPath, destName) {
  if (!existsSync(srcPath)) return null;
  ensureDir(destDir);
  const dest = join(destDir, destName);
  copyFileSync(srcPath, dest);
  const rel = relative(OUT, dest).replace(/\\/g, "/");
  return { localPath: rel, bytes: statSync(dest).size };
}

function walkImages(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkImages(full, files);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const manifest = {
  generatedAt: new Date().toISOString(),
  suggestedS3Prefix: "enframe2/",
  suggestedCloudFrontBase: "https://d1ui1jxb5e6bds.cloudfront.net/enframe2/",
  folders: {},
  heroes: {},
  projects: {},
  brandLogos: [],
  gallery: { count: 0, dedupedFrom: 0 },
  externalUrls: [],
  missingLocal: [],
};

// Clean output (keep README if re-run)
if (existsSync(OUT)) {
  const { rmSync } = await import("fs");
  rmSync(OUT, { recursive: true, force: true });
}
ensureDir(OUT);

// --- Heroes (used on page headers) ---
const heroes = [
  {
    key: "home",
    src: join(PUBLIC, "headerimage.06f00962216f4e821a06.jpg"),
    dest: "home-header.jpg",
    note: "Home + About hero (replace CloudFront headerimage.png)",
  },
  {
    key: "services",
    src: join(PUBLIC, "headerimage.06f00962216f4e821a06.jpg"),
    dest: "services-hero.jpg",
  },
  {
    key: "projects",
    src: join(PUBLIC, "enframe-photos/1/090A9512.jpg.jpeg"),
    dest: "projects-hero.jpg",
  },
  {
    key: "gallery",
    src: join(PUBLIC, "enframe-photos/090a9289.jpg"),
    dest: "gallery-hero.jpg",
  },
];

const heroDir = join(OUT, "01-heroes");
for (const h of heroes) {
  const r = copyTo(heroDir, h.src, h.dest);
  if (r) manifest.heroes[h.key] = { ...r, file: h.dest, note: h.note };
  else manifest.missingLocal.push({ role: `hero:${h.key}`, expected: h.src });
}

// --- Projects by site ---
const projectSites = [
  {
    id: "k-block-south-city-1",
    label: "K Block, South City 1",
    dir: join(PUBLIC, "enframe-photos/south city 1 "),
  },
  {
    id: "hari-nagar",
    label: "Hari Nagar",
    dir: join(PUBLIC, "enframe-photos/1"),
  },
  {
    id: "b-block-south-city-1",
    label: "B Block, South City 1",
    dir: join(PUBLIC, "enframe-photos/south city 1 "),
  },
  {
    id: "dlf-1",
    label: "DLF 1, Gurugram",
    dir: join(PUBLIC, "enframe-photos/dlf 1"),
  },
  {
    id: "dlf-3",
    label: "DLF 3, Gurugram",
    dir: join(PUBLIC, "enframe-photos/dlf3"),
  },
];

for (const site of projectSites) {
  const destDir = join(OUT, "02-projects", site.id);
  const files = walkImages(site.dir);
  manifest.projects[site.id] = { label: site.label, files: [] };
  for (const f of files) {
    if (f.includes(".DS_Store")) continue;
    const name = safeFileName(f);
    const r = copyTo(destDir, f, name);
    if (r) manifest.projects[site.id].files.push(name);
  }
}

// Hari Nagar also uses root-level photos in app — copy referenced extras
const hariExtras = ["1b6acd31.jpg", "090a9445.jpg", "090a9460.jpg", "090a9468.jpg", "090a9500.jpg"];
for (const name of hariExtras) {
  copyTo(join(OUT, "02-projects/hari-nagar"), join(PUBLIC, "enframe-photos", name), name);
  if (!manifest.projects["hari-nagar"].files.includes(name))
    manifest.projects["hari-nagar"].files.push(name);
}

// K-block extras from root enframe-photos
const kBlockExtras = ["090a9544.jpg", "090a9556.jpg", "090a9289.jpg", "090a9362.jpg", "090a9367.jpg"];
for (const name of kBlockExtras) {
  copyTo(join(OUT, "02-projects/k-block-south-city-1"), join(PUBLIC, "enframe-photos", name), name);
  if (!manifest.projects["k-block-south-city-1"].files.includes(name))
    manifest.projects["k-block-south-city-1"].files.push(name);
}

// --- Gallery: all unique photos (deduped) ---
const galleryDir = join(OUT, "03-gallery");
const seenHashes = new Map();
const allPhotos = walkImages(join(PUBLIC, "enframe-photos"));
manifest.gallery.dedupedFrom = allPhotos.length;

for (const f of allPhotos) {
  if (f.includes(".DS_Store")) continue;
  const hash = fileHash(f);
  if (seenHashes.has(hash)) continue;
  seenHashes.set(hash, true);
  let destName = safeFileName(f);
  let i = 1;
  while (existsSync(join(galleryDir, destName))) {
    const ext = extname(destName);
    const base = basename(destName, ext);
    destName = `${base}-${i}${ext}`;
    i++;
  }
  copyTo(galleryDir, f, destName);
  manifest.gallery.count++;
}

// --- Brand logos ---
const brandSrc = join(PUBLIC, "brand-logos");
if (existsSync(brandSrc)) {
  const brandOut = join(OUT, "04-brand-logos");
  for (const f of readdirSync(brandSrc)) {
    if (!/\.png$/i.test(f)) continue;
    copyTo(brandOut, join(brandSrc, f), f);
    manifest.brandLogos.push(f);
  }
}

// --- External URLs still used in code (manual download) ---
manifest.externalUrls = [
  {
    usedIn: "Header.jsx, AboutContent hero",
    url: "https://d1ui1jxb5e6bds.cloudfront.net/home/headerimage.png",
    localReplacement: "01-heroes/home-header.jpg",
  },
  {
    usedIn: "HOME_SERVICE_CARDS (services grid)",
    urls: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    note: "Replace with real Enframe photos in 03-gallery/ then update enframeImages.js",
  },
  {
    usedIn: "AboutContent categories",
    urls: [
      "https://i.pinimg.com/736x/1d/9f/1a/1d9f1a70f452c346d823c2528ff0a9ad.jpg",
      "https://i.pinimg.com/736x/ee/21/b0/ee21b022b3ea10efd47c6915a02d4d59.jpg",
      "https://i.pinimg.com/1200x/b6/66/39/b666395982ea4a4341f71e4ebaf03a03.jpg",
      "https://i.pinimg.com/736x/d5/dd/0a/d5dd0a70223b106fd53889cb90d75b65.jpg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://i.pinimg.com/1200x/56/50/be/5650be40c6753f192ee47bd1f3486972.jpg",
    ],
    note: "Download and add to 05-about-categories/ if you want them on AWS",
  },
];

manifest.folders = {
  "01-heroes": "Page header images (upload as enframe2/01-heroes/)",
  "02-projects": "Per-project folders matching site locations",
  "03-gallery": "Deduped full photo set for gallery page",
  "04-brand-logos": "Partner brand logos for About page",
};

writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));

const readme = `# Enframe AWS Upload Package

Generated: ${manifest.generatedAt}

Upload this folder to S3, then serve via CloudFront.

## Folder structure

| Folder | Purpose | Suggested S3 path |
|--------|---------|-------------------|
| \`01-heroes/\` | Page header images | \`s3://YOUR_BUCKET/enframe2/01-heroes/\` |
| \`02-projects/\` | Photos grouped by project/site | \`s3://YOUR_BUCKET/enframe2/02-projects/{site-id}/\` |
| \`03-gallery/\` | All unique project photos (deduped) | \`s3://YOUR_BUCKET/enframe2/03-gallery/\` |
| \`04-brand-logos/\` | Brand partner logos | \`s3://YOUR_BUCKET/enframe2/04-brand-logos/\` |

See \`manifest.json\` for file lists and external URLs still used in code.

## Upload with AWS CLI

\`\`\`bash
# Configure once
export AWS_BUCKET=your-bucket-name
export AWS_REGION=ap-south-1

# Sync entire package (recommended)
aws s3 sync ./aws-upload/01-heroes s3://$AWS_BUCKET/enframe2/01-heroes --region $AWS_REGION
aws s3 sync ./aws-upload/02-projects s3://$AWS_BUCKET/enframe2/02-projects --region $AWS_REGION
aws s3 sync ./aws-upload/03-gallery s3://$AWS_BUCKET/enframe2/03-gallery --region $AWS_REGION
aws s3 sync ./aws-upload/04-brand-logos s3://$AWS_BUCKET/enframe2/04-brand-logos --region $AWS_REGION

# Or sync everything under one prefix
aws s3 sync ./aws-upload s3://$AWS_BUCKET/enframe2 --region $AWS_REGION \\
  --exclude "manifest.json" --exclude "README.md"
\`\`\`

## After upload

1. Create / attach a CloudFront distribution pointing at the bucket.
2. Update \`src/lib/enframeImages.js\` to use your CDN base URL instead of \`/enframe-photos/...\`.
3. Replace Unsplash / Pinterest URLs listed in \`manifest.json → externalUrls\` with real photos from \`03-gallery/\`.

## Stats

- Heroes: ${Object.keys(manifest.heroes).length} files
- Gallery (deduped): ${manifest.gallery.count} files (from ${manifest.gallery.dedupedFrom} scattered paths)
- Brand logos: ${manifest.brandLogos.length} files
- Missing local files: ${manifest.missingLocal.length}
`;

writeFileSync(join(OUT, "README.md"), readme);

console.log(`\n✓ AWS upload package ready: ${OUT}`);
console.log(`  Heroes: ${Object.keys(manifest.heroes).length}`);
console.log(`  Gallery: ${manifest.gallery.count} unique images`);
console.log(`  Brand logos: ${manifest.brandLogos.length}`);
if (manifest.missingLocal.length) {
  console.log(`  Missing: ${manifest.missingLocal.length} (see manifest.json)`);
}
