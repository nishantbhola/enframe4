"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROJECTS, PROJECTS_BY_ID } from "../projectsData";

function Bullet({ text }) {
  return (
    <li className="flex items-start gap-2.5 font-sans text-sm text-ink/80 leading-relaxed">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
      <span>{text}</span>
    </li>
  );
}

function CheckList({ title, items }) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((line) => (
          <li
            key={line}
            className="flex items-start gap-2.5 font-sans text-sm text-ink/75 leading-relaxed"
          >
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full border border-accent"
              aria-hidden
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectGalleryThumb({ src, alt, idx, onClick, isActive }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: (idx % 8) * 0.03 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border text-left transition-colors ${
        isActive
          ? "border-accent ring-1 ring-accent/30"
          : "border-ink/10 hover:border-ink/25"
      }`}
    >
      <motion.div
        initial={{
          clipPath: "inset(12% 10% 12% 10% round 1rem)",
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
          duration: 0.75,
          delay: (idx % 8) * 0.03,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative aspect-video overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 200px"
        />
      </motion.div>
    </motion.button>
  );
}

export default function ProjectDetailPage({ params }) {
  const project = PROJECTS_BY_ID[params.projectId];
  const projectIndex = PROJECTS.findIndex((p) => p.id === params.projectId);
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < PROJECTS.length - 1
      ? PROJECTS[projectIndex + 1]
      : null;

  const gallery = useMemo(
    () => project?.images ?? project?.gallery ?? (project ? [project.image] : []),
    [project]
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

  if (!project) {
    return (
      <div className="bg-cream px-6 py-24">
        <h1 className="font-sans text-2xl font-semibold text-ink">Project not found</h1>
        <Link href="/projects" className="mt-4 inline-block font-sans text-sm text-accent">
          Back to projects
        </Link>
      </div>
    );
  }

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-cream min-h-screen">
      <header className="border-b border-ink/8 bg-paper pt-24 md:pt-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 gap-y-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-inkMuted transition-colors hover:text-accent"
            >
              <span aria-hidden="true">←</span>
              All projects
            </Link>
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-accent">
              {project.tag}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 md:mt-5"
          >
            <h1 className="font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
              {project.location}
            </h1>
            <p className="mt-2 font-sans text-sm text-inkMuted leading-relaxed">
              {project.tag}
            </p>
          </motion.div>
        </div>
      </header>

      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <article className="overflow-hidden rounded-3xl border border-ink/8 bg-paper shadow-[0_12px_40px_-16px_rgba(34,25,19,0.1)]">
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative block aspect-video w-full overflow-hidden text-left"
            >
              <motion.div
                initial={{
                  clipPath: "inset(10% 8% 10% 8% round 1.2rem)",
                  scale: 1.06,
                  filter: "blur(10px)",
                }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0% round 0rem)",
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={gallery[0]}
                  alt={project.location}
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ objectPosition: project.imagePosition }}
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100" />
              <span className="absolute bottom-4 right-4 rounded-full bg-paper/90 px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                View gallery
              </span>
            </button>

            {gallery.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border-t border-ink/8 bg-cream/40 p-3 md:p-4">
                {gallery.map((src, i) => (
                  <ProjectGalleryThumb
                    key={src + i}
                    src={src}
                    alt={`${project.location} ${i + 1}`}
                    idx={i}
                    onClick={() => openLightbox(i)}
                    isActive={activeIndex === i && lightboxOpen}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="p-6 md:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <h2 className="font-sans text-sm font-semibold text-ink">About this project</h2>
                  <p className="mt-2.5 font-sans text-[15px] text-ink/80 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="my-6 h-px bg-ink/8" />

                  <h2 className="font-sans text-sm font-semibold text-ink">How we built it</h2>
                  <p className="mt-2.5 font-sans text-[15px] text-ink/80 leading-relaxed">
                    {project.approachParagraph}
                  </p>

                  <div className="my-6 h-px bg-ink/8" />

                  <h2 className="font-sans text-sm font-semibold text-ink">Scope delivered</h2>
                  <ul className="mt-3 space-y-2.5">
                    {project.included.map((item) => (
                      <Bullet key={item} text={item} />
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-5">
                    <CheckList title="Key outcomes" items={project.outcomes} />
                  </div>
                  <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-5">
                    <CheckList title="Quality checks" items={project.qualityChecks} />
                  </div>
                  <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-5 sm:col-span-2 lg:col-span-1">
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                      Project details
                    </p>
                    <dl className="mt-3 space-y-3">
                      <div>
                        <dt className="font-sans text-xs text-inkMuted">Location</dt>
                        <dd className="mt-0.5 font-sans text-sm font-semibold text-ink">
                          {project.location}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-sans text-xs text-inkMuted">Category</dt>
                        <dd className="mt-0.5 font-sans text-sm font-semibold text-ink">
                          {project.tag}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>

            {(prevProject || nextProject) && (
              <div className="grid sm:grid-cols-2 border-t border-ink/8 bg-cream/40">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.id}`}
                    className="group border-b border-ink/8 px-5 py-4 transition-colors hover:bg-cream/80 sm:border-b-0 sm:border-r"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                      ← Previous
                    </p>
                    <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                      {prevProject.location}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden sm:block sm:border-r border-ink/8" />
                )}
                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.id}`}
                    className="group px-5 py-4 text-left transition-colors hover:bg-cream/80 sm:text-right"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                      Next →
                    </p>
                    <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                      {nextProject.location}
                    </p>
                  </Link>
                ) : null}
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper pb-12 md:pb-14">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 md:pt-12">
          <div className="flex flex-col items-center text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Get in touch
            </p>
            <p className="mt-3 font-sans text-base font-semibold text-ink">
              Interested in a build like this?
            </p>
            <p className="mt-2 font-sans text-sm text-inkMuted max-w-sm leading-relaxed">
              Tell us about your site and we&apos;ll discuss scope, timeline, and next steps.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:info@enframeconstructions.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-paper font-sans text-[10px] font-semibold uppercase tracking-[0.16em] hover:bg-accentDark transition-colors"
              >
                Email us
              </a>
              <a
                href="https://wa.me/919800000448"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-ink/15 bg-cream text-ink font-sans text-[10px] font-semibold uppercase tracking-[0.16em] hover:border-ink/30 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-inkMuted transition-colors hover:text-accent"
              >
                All projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        role="dialog"
        aria-modal={lightboxOpen}
        aria-hidden={!lightboxOpen}
        className={`fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm transition-opacity duration-200 ${
          lightboxOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setLightboxOpen(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-ink/10 bg-ink"
          >
            {gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.location} ${i + 1}`}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
                  lightboxOpen && i === activeIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-20 rounded-full bg-ink/50 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-sm"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length)
              }
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i + 1) % gallery.length)}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm"
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3">
              <p className="font-sans text-sm font-semibold text-paper truncate">
                {project.location}
              </p>
              <p className="shrink-0 font-sans text-[10px] uppercase tracking-[0.14em] text-paper/80">
                {activeIndex + 1} / {gallery.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
