"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

function Testimonials() {
  const IMAGE = IMAGE_DIRECTION.testimonial;

  return (
    <section className="bg-paper border-t border-ink/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/10] lg:aspect-[5/4] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(34,25,19,0.12)]">
              <Image
                src={IMAGE.src}
                alt="Completed residence"
                fill
                className="object-cover"
                style={{ objectPosition: IMAGE.position }}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:pl-4"
          >
            <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
              Client voice
            </span>
            <blockquote className="mt-5 font-display text-2xl md:text-3xl lg:text-[2rem] leading-snug text-ink tracking-[0.02em]">
              &ldquo;They delivered exactly what was promised—without a single day lost.&rdquo;
            </blockquote>
            <p className="mt-6 font-sans text-xs tracking-[0.2em] uppercase text-inkMuted">
              Rahul & Kavita Sharma · Gurugram
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
