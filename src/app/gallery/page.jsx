"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS } from "../projects/projectsData";
import { ALL_PHOTOS, HERO_FOCUS, HERO_IMAGES } from "../../lib/enframeImages";

const EXTRA_GALLERY_IMAGES = ALL_PHOTOS;

function GalleryCard({ item, idx, onOpen }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: (idx % 8) * 0.03 }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(idx)}
      className="relative overflow-hidden border border-ink/10 bg-paper rounded-3xl group text-left"
      aria-label={`Open gallery image ${idx + 1}`}
    >
      <motion.div
        initial={{
          clipPath: "inset(12% 10% 12% 10% round 1.2rem)",
          scale: 1.08,
          filter: "blur(10px)",
        }}
        whileInView={{
          clipPath: "inset(0% 0% 0% 0% round 0rem)",
          scale: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          duration: 0.95,
          delay: (idx % 8) * 0.03,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <Image
          src={item.src}
          alt={`Gallery image ${idx + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-paper/0 via-paper/30 to-paper/0 blur-[2px] transform -translate-x-full group-hover:translate-x-[430%] transition-transform duration-900" />
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function GalleryPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.58, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryItems = useMemo(() => {
    const listedProjectItems = PROJECTS.flatMap((project) => {
      const images = project.gallery?.length ? project.gallery : [project.image];
      return images.map((src) => ({ src, label: project.title }));
    });

    const extraItems = EXTRA_GALLERY_IMAGES.map((src) => ({
      src,
      label: "Gallery image",
    }));

    const seen = new Set();
    return [...extraItems, ...listedProjectItems].filter((item) => {
      if (!item.src || seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  }, []);

  const lightboxItems = useMemo(
    () =>
      galleryItems.map((item, idx) => ({
        src: item.src,
        label: item.label,
        index: idx + 1,
        total: galleryItems.length,
      })),
    [galleryItems]
  );

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % lightboxItems.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, lightboxItems.length]);

  const current = lightboxItems[activeIndex];

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-cream">
      <section ref={heroRef} className="relative min-h-[75vh] overflow-hidden bg-paper">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES.gallery}
            alt="Opulent living room — Enframe project gallery"
            fill
            className="object-cover"
            style={{ objectPosition: HERO_FOCUS.gallery }}
            priority
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/20"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 min-h-[75vh] flex items-end"
        >
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-14 pt-28 md:pb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-ink/35 px-4 py-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                Gallery
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="mt-6 font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper max-w-4xl"
            >
              Project gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 max-w-xl font-serif text-paper/85 text-base md:text-lg leading-relaxed"
            >
              A unified gallery of all project imagery.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {galleryItems.map((item, idx) => (
              <GalleryCard key={`${item.src}-${idx}`} item={item} idx={idx} onOpen={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[72vh] rounded-3xl overflow-hidden border border-paper/20 bg-paper"
              >
                <Image
                  src={current.src}
                  alt={`Gallery image ${current.index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 85vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper px-4 py-2 font-sans text-xs tracking-[0.18em] uppercase"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => setActiveIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper flex items-center justify-center"
                  aria-label="Previous image"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((i) => (i + 1) % lightboxItems.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper flex items-center justify-center"
                  aria-label="Next image"
                >
                  &rarr;
                </button>

                <div className="absolute left-6 bottom-6 right-6 z-10">
                  <div className="inline-flex items-center gap-3 rounded-full border border-paper/25 bg-paper/10 backdrop-blur-md px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                      Image {current.index} / {current.total}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-2xl text-paper leading-tight">
                    {current.label}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
