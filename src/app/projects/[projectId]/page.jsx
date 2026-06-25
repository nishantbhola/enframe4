"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROJECTS_BY_ID } from "../projectsData";

function Bullet({ text }) {
  return (
    <li className="flex items-start gap-2 font-serif text-black/85 text-sm">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
      <span>{text}</span>
    </li>
  );
}

export default function ProjectDetailPage({ params }) {
  const project = PROJECTS_BY_ID[params.projectId];

  if (!project) {
    return (
      <div className="py-24 px-6">
        <h1 className="font-display text-3xl text-ink">Project not found</h1>
        <Link href="/projects" className="text-accent underline mt-4 inline-block">
          Back to projects
        </Link>
      </div>
    );
  }

  const gallery = useMemo(
    () => project.gallery ?? [project.image],
    [project.gallery, project.image]
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, gallery.length]);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden bg-paper">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={`${project.title} hero`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

        <div className="relative z-10 min-h-[75vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-14 pt-28 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-paper/15 px-4 py-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                  {project.eyebrow}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper mt-6">
                {project.title}
              </h1>
              <p className="font-serif text-paper/85 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
                {project.tag} &mdash; {project.location}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RENDER + GALLERY */}
      <section className="py-24 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-paper/15 px-4 py-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-ink">
                Project render + gallery
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal mt-5 tracking-[0.06em] text-ink">
              {project.title}
            </h2>
            <p className="font-serif text-black/80 mt-4 max-w-3xl leading-relaxed">
              An opulent render gallery with an immersive lightbox viewer.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Main media */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(0);
                  setLightboxOpen(true);
                }}
                className="w-full text-left"
              >
                <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-cream/40">
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={gallery[0]}
                      alt={`${project.title} render`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <div className="inline-flex items-center gap-3 rounded-full border border-paper/25 bg-paper/10 backdrop-blur-md px-4 py-2">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                          View gallery
                        </span>
                      </div>
                      <p className="mt-4 font-display text-2xl text-paper leading-tight">
                        {project.tag}
                      </p>
                      <p className="mt-2 font-serif text-paper/85 text-sm">
                        Location: {project.location}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Thumbnails */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {gallery.slice(0, 4).map((src, i) => (
                  <motion.button
                    key={src + i}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.03 }}
                    onClick={() => {
                      setActiveIndex(i);
                      setLightboxOpen(true);
                    }}
                    className={`relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      activeIndex === i
                        ? "border-accent/40 ring-1 ring-accent/30 shadow-md"
                        : "border-ink/10 bg-cream/30"
                    }`}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={src}
                        alt={`${project.title} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Extra thumbnail row */}
              {gallery.length > 4 ? (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {gallery.slice(4).map((src, j) => (
                    <button
                      key={src + j}
                      type="button"
                      onClick={() => {
                        setActiveIndex(j + 4);
                        setLightboxOpen(true);
                      }}
                      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-cream/30 text-left"
                    >
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={src}
                          alt={`${project.title} thumbnail ${j + 5}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-md"
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
                className="relative w-full max-w-5xl h-[70vh] rounded-3xl overflow-hidden border border-ink/10 bg-paper"
              >
                <Image
                  src={gallery[activeIndex]}
                  alt={`${project.title} image ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

                {/* close */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper px-4 py-2 font-sans text-xs tracking-[0.18em] uppercase"
                >
                  Close
                </button>

                {/* prev/next */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (i) => (i - 1 + gallery.length) % gallery.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper flex items-center justify-center"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((i) => (i + 1) % gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-paper/20 backdrop-blur-md border border-paper/30 text-paper flex items-center justify-center"
                  aria-label="Next image"
                >
                  →
                </button>

                {/* caption */}
                <div className="absolute left-6 bottom-6 right-6 z-10">
                  <div className="inline-flex items-center gap-3 rounded-full border border-paper/25 bg-paper/10 backdrop-blur-md px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                      Image {activeIndex + 1} / {gallery.length}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-2xl text-paper leading-tight">
                    {project.title}
                  </p>
                  <p className="mt-2 font-serif text-paper/85 text-sm">
                    {project.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* CONTENT */}
      <section className=" bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-ink/10 bg-paper/45 backdrop-blur-sm p-8 lg:p-10"
          >
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-accent">
                  Project narrative
                </p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink leading-[0.98]">
                  Designed as an opulent showcase, built for long-term performance
                </h2>
                <p className="mt-6 font-serif text-black/85 leading-relaxed text-base md:text-lg">
                  {project.overview}
                </p>

                <div className="mt-8">
                  <h3 className="font-display text-xl text-ink">Execution approach</h3>
                  <p className="mt-3 font-serif text-black/80 leading-relaxed">
                    {project.approachParagraph}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-ink/10 bg-paper/45 p-6">
                  <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-inkMuted">
                    Project facts
                  </p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                        Reference
                      </p>
                      <p className="font-serif text-black">{project.eyebrow}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                        Location
                      </p>
                      <p className="font-serif text-black">{project.location}</p>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                        Category
                      </p>
                      <p className="font-serif text-black">{project.tag}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6">
                <h3 className="font-display text-xl text-ink">Scope delivered</h3>
                <ul className="mt-4 space-y-2">
                  {project.included.map((item) => (
                    <Bullet key={item} text={item} />
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-display text-xl text-ink">Key outcomes</h3>
                <ul className="mt-4 space-y-2">
                  {project.outcomes.map((item) => (
                    <Bullet key={item} text={item} />
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.03 }}
              className="lg:col-span-8 rounded-3xl border border-ink/10 bg-paper/45 backdrop-blur-sm p-7"
            >
              <h3 className="font-display text-2xl text-ink">Quality checkpoints</h3>
              <p className="mt-3 font-serif text-black/75 leading-relaxed">
                Every stage is reviewed for finish, systems, and handover readiness.
              </p>
              <ul className="mt-5 space-y-2">
                {project.qualityChecks.map((q) => (
                  <Bullet key={q} text={q} />
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="lg:col-span-4 rounded-3xl border border-ink/10 bg-paper/45 backdrop-blur-sm p-7"
            >
              <h3 className="font-display text-xl text-ink">Next step</h3>
              <p className="mt-3 font-serif text-black/75 leading-relaxed">
                Explore our delivery philosophy or continue to other showcased projects.
              </p>
              <div className="mt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-accent text-paper font-sans text-xs tracking-[0.18em] uppercase hover:bg-accentDark transition-colors rounded-2xl"
                >
                  Learn our process
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 border border-stone/60 text-ink font-sans text-xs tracking-[0.18em] uppercase hover:bg-paper transition-colors rounded-2xl mt-3"
                >
                  Back to projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

