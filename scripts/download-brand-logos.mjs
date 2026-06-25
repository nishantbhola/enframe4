#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BRANDS = [
  { name: "TATA Steel", domain: "tatasteel.com" },
  { name: "Jindal Panther", domain: "jindalpanther.com" },
  { name: "Rathi", domain: "rathisteel.com" },
  { name: "Ultratech", domain: "ultratechcement.com" },
  { name: "JK Cement", domain: "jkcement.com" },
  { name: "Supreme", domain: "supreme.co.in" },
  { name: "Astral Pipes", domain: "astralpipes.com" },
  { name: "Polycab", domain: "polycab.com" },
  { name: "KEI", domain: "kei-ind.com" },
  { name: "Legrand", domain: "legrand.com" },
  { name: "TOTO", domain: "totousa.com" },
  { name: "Kohler", domain: "kohler.com" },
  { name: "Grohe", domain: "grohe.com" },
  { name: "Jaquar", domain: "jaquar.com" },
  { name: "Schuco", domain: "schuco.com" },
  { name: "Fenesta", domain: "fenesta.com" },
  { name: "Hettich", domain: "hettich.com" },
  { name: "Hafele", domain: "hafele.com" },
  { name: "Yale", domain: "yalehome.com" },
  { name: "Philips", domain: "philips.com" },
  { name: "Panasonic", domain: "panasonic.com" },
  { name: "Asian Paints", domain: "asianpaints.com" },
];

const slug = (domain) => domain.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

async function download(url, { allowImageOnErrorStatus = false } = {}) {
  const res = await fetch(url, { redirect: "follow" });
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok && !(allowImageOnErrorStatus && contentType.startsWith("image/"))) {
    throw new Error(`HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function main() {
  const outDir = path.resolve("public/brand-logos");
  await mkdir(outDir, { recursive: true });

  let ok = 0;
  let fallback = 0;
  let failed = 0;

  for (const brand of BRANDS) {
    const file = path.join(outDir, `${slug(brand.domain)}.png`);
    const primary = `https://logo.clearbit.com/${brand.domain}?size=256`;
    const secondary = `https://www.google.com/s2/favicons?sz=256&domain=${brand.domain}`;

    try {
      const data = await download(primary);
      await writeFile(file, data);
      ok += 1;
      console.log(`OK       ${brand.name}`);
      continue;
    } catch {}

    try {
      const data = await download(secondary, { allowImageOnErrorStatus: true });
      await writeFile(file, data);
      fallback += 1;
      console.log(`FALLBACK ${brand.name}`);
    } catch {
      failed += 1;
      console.log(`FAILED   ${brand.name}`);
    }
  }

  console.log(`\nSaved logos in: ${outDir}`);
  console.log(`Primary: ${ok}, Fallback: ${fallback}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
