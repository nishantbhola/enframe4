"use client";

import Link from "next/link";
import { PROJECTS } from "../app/projects/projectsData";
import ProjectCard from "./ProjectCard";

const HOME_PROJECT_IDS = [
  "k-block-south-city-1-south-extn-1-delhi",
  "hari-nagar-delhi",
  "dlf-1-gurugram",
  "dlf-3-gurugram",
];

function Projects() {
  const featured = HOME_PROJECT_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(
    Boolean
  );

  return (
    <section
      id="projects"
      className="relative pt-10 md:pt-12 pb-14 md:pb-20 overflow-hidden bg-cream"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
              Residences
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal text-ink mt-4 tracking-[0.06em]">
              Selected works
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-inkMuted hover:text-accent transition-colors w-fit"
          >
            View all
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-7 lg:gap-8">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              tag={project.tag}
              image={project.image}
              imagePosition={project.imagePosition}
              href={`/projects/${project.id}`}
              index={i}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
