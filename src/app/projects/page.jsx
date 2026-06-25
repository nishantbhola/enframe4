"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import ProjectCard from "../../components/ProjectCard";
import { PROJECTS } from "./projectsData";
import { HERO_IMAGES, HERO_FOCUS } from "../../lib/enframeImages";

export default function ProjectsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.58, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <div className="bg-cream">
      <section ref={heroRef} className="relative min-h-[75vh] overflow-hidden bg-paper">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES.projects}
            alt="Luxurious interior foyer by Enframe Constructions"
            fill
            className="object-cover"
            style={{ objectPosition: HERO_FOCUS.projects }}
            sizes="100vw"
            priority
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
                Our Projects
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="mt-6 font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper max-w-4xl"
            >
              Opulent homes we have delivered
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 max-w-xl font-serif text-paper/85 text-base md:text-lg leading-relaxed"
            >
              A curated selection from our portfolio. Tap any card to explore the full story.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 lg:py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-5 md:gap-7 lg:gap-8">
            {PROJECTS.map((project, idx) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                tag={project.tag}
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
    </div>
  );
}
