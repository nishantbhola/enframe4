"use client";

import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

function HighlightGallery() {

    const IMAGES = IMAGE_DIRECTION.highlights;

  return (
    <section className="pb-12 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-end justify-between gap-4"
          >
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                Craft & detail
              </p>
              <h2 className="mt-2 font-sans font-semibold text-xl md:text-2xl text-ink tracking-tight">
                Elevations & finishes
              </h2>
            </div>
            <p className="hidden sm:block font-sans text-xs text-inkMuted max-w-[200px] text-right leading-relaxed">
              A glimpse of the opulence we deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {IMAGES.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-xl aspect-[4/5] ${idx === 4 ? "hidden sm:block" : ""}`}
            >
              <Image
                src={img.src}
                alt="Opulent interior detail"
                fill
                className="object-cover"
                style={{ objectPosition: img.position }}
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </motion.div>
          ))}
          </div>
        </div>
      </section>
  )
}

export default HighlightGallery