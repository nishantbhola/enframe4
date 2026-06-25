"use client";

import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";
function HomeGallry() {
    
    const GALLERY = IMAGE_DIRECTION.homeGallery;

  return (
    <section className="py-6 bg-paper">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-2">
          {GALLERY.map((img, idx) => (
            <div key={`${img.src}-${idx}`} className="relative overflow-hidden aspect-square rounded-lg">
              <Image
                src={img.src}
                alt="Project gallery"
                fill
                className="object-cover"
                style={{ objectPosition: img.position }}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>
  )
}

export default HomeGallry