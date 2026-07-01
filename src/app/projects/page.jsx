"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import { PROJECTS } from "./projectsData";
import { HERO_IMAGES, HERO_FOCUS } from "../../lib/enframeImages";

export default function ProjectsPage() {
  return (
    <div className="bg-cream">
      <section className="relative min-h-[52vh] md:min-h-[58vh] overflow-hidden bg-ink">
        <Image
          src={HERO_IMAGES.projects}
          alt=""
          fill
          className="object-cover opacity-50"
          style={{ objectPosition: HERO_FOCUS.projects }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

        <div className="relative z-10 min-h-[52vh] md:min-h-[58vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-12 md:pb-16 pt-28">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Projects
            </p>
            <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-paper tracking-[0.04em] leading-tight max-w-3xl">
              Homes we have delivered
            </h1>
            <p className="mt-4 font-sans text-base md:text-lg text-paper/85 max-w-xl leading-relaxed">
              A selection from our portfolio across Gurugram and Delhi. Open any project to see
              photos and scope.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-8 grid md:grid-cols-2 gap-4 md:gap-10 md:items-end">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                Portfolio
              </p>
              <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
                Residential builds across NCR
              </h2>
            </div>
            <p className="font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed md:text-right md:max-w-md md:ml-auto">
              Each project reflects our focus on quality craftsmanship, clear execution, and
              disciplined handover.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {PROJECTS.map((project, idx) => (
              <ProjectCard
                key={project.id}
                title="View project"
                image={project.image}
                imagePosition={project.imagePosition}
                href={`/projects/${project.id}`}
                index={idx}
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-ink/8 bg-cream shadow-[0_20px_50px_-20px_rgba(34,25,19,0.12)]"
          >
            <div className="grid lg:grid-cols-2 gap-5 p-4 md:p-5 lg:gap-6 lg:p-6">
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[280px] overflow-hidden rounded-2xl">
                <Image
                  src={HERO_IMAGES.projects}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: HERO_FOCUS.projects }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-center px-1 py-2 md:px-2 md:py-4 lg:py-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                  Next step
                </p>
                <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink leading-snug">
                  Planning your own build?
                </h2>
                <p className="mt-4 font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed max-w-md">
                  Share your site and vision — we&apos;ll discuss scope, timeline, and how we can
                  deliver for you.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href="mailto:info@enframeconstructions.com"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-paper font-sans text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-accentDark transition-colors"
                  >
                    Email us
                  </a>
                  <a
                    href="https://wa.me/919800000448"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3.5 border border-ink/15 bg-paper text-ink font-sans text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-ink/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-inkMuted transition-colors hover:text-accent"
                  >
                    Our services →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
