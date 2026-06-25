"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

function Overview() {
  const IMAGES = IMAGE_DIRECTION.overview;

  return (
    <section id="about" className="py-20 md:py-28 bg-paper overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
        >
          <div className="lg:col-span-5">
            <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
              The house
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.25rem] font-normal text-ink mt-5 tracking-[0.05em] leading-tight">
              Crafted for those who expect more.
            </h2>
            <p className="font-serif text-inkMuted text-base md:text-lg mt-6 leading-relaxed max-w-md">
              Nine years of building ultra-opulent residences across Delhi NCR—with discretion, precision, and an unwavering eye for detail.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 font-sans text-xs tracking-[0.2em] uppercase text-ink hover:text-accent transition-colors"
            >
              Our story
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <Image
                src={IMAGES.main.src}
                alt="Interior by Enframe"
                fill
                className="object-cover"
                style={{ objectPosition: IMAGES.main.position }}
                sizes="(max-width: 1024px) 50vw, 35vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mt-10">
              <Image
                src={IMAGES.side.src}
                alt="Architectural detail"
                fill
                className="object-cover"
                style={{ objectPosition: IMAGES.side.position }}
                sizes="(max-width: 1024px) 50vw, 30vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Overview;
