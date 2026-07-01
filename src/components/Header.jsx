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
    <>
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
            Residential · Commercial · Industrial
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[4.25rem] leading-[0.95] tracking-[0.04em] text-paper max-w-3xl"
          >
            Enframe Constructions
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[7rem] md:text-[10rem] text-ink/[0.04] leading-none select-none pointer-events-none"
        >
          15
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                About us
              </p>
              <h2 className="mt-4 font-sans font-semibold text-2xl md:text-[1.75rem] text-ink leading-[1.2]">
                We build with trust.
                <span className="block mt-1.5 text-accent">We build with confidence.</span>
              </h2>
              <div className="mt-6 h-px w-20 bg-gradient-to-r from-accent/80 via-accent/30 to-transparent" />
              <p className="mt-5 font-sans font-semibold text-xs md:text-sm text-inkMuted tracking-wide">
                15 years · Residential · Commercial · Industrial
              </p>
            </div>

            <div className="lg:col-span-8 lg:pt-1">
              <div className="space-y-4 font-sans font-semibold text-[15px] md:text-base text-ink/85 leading-[1.75]">
                <p>
                  With 15 years of expertise, Enframe Constructions LLP is a trusted leader in
                  residential, commercial, and industrial construction. We build with trust. We
                  build with confidence.
                </p>
                <p>
                  Built on quality craftsmanship and meticulous attention to detail, every project
                  reflects our deep expertise. From residential homes to corporate facilities and
                  industrial infrastructures, we deliver quality you can count on.
                </p>
                <p>
                  Every project, big or small, is handled with precision, dedication, and an
                  unwavering commitment to what we promise. At Enframe Constructions, we build
                  more than structures — we build trust and lasting relationships.
                </p>
                <p>
                  When you choose us, you&apos;re choosing a team that stands behind every brick,
                  beam, and finish. We create spaces where dreams come to life.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Header;
