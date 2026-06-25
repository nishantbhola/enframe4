"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HERO_FOCUS, HERO_IMAGES } from "../lib/enframeImages";

function Header() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.72]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[85vh] lg:min-h-screen overflow-hidden bg-paper"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGES.home}
          alt="Opulent residence by Enframe Constructions"
          fill
          className="object-cover"
          style={{ objectPosition: HERO_FOCUS.home }}
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent"
      />
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 min-h-[85vh] lg:min-h-screen flex items-end"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24 pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-[10px] tracking-[0.35em] uppercase text-paper/70"
          >
            Enframe Constructions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] tracking-[0.04em] text-paper max-w-2xl"
          >
            Opulent homes,
            <br />
            quietly perfected.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10"
          >
            <Link
              href="/projects"
              className="inline-block px-9 py-3.5 bg-accent text-paper font-sans text-[11px] tracking-[0.22em] uppercase hover:bg-accentDark transition-colors"
            >
              View residences
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Header;
