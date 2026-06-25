"use client";

import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

function HighlightGallery() {

    const IMAGES = IMAGE_DIRECTION.highlights;

  return (
    <section className="py-8 md:py-10 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
      </section>
  )
}

export default HighlightGallery