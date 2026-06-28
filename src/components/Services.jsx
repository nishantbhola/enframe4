"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICE_CARDS } from "../lib/enframeImages";

function ServiceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/services/${item.id}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(34,25,19,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(34,25,19,0.12)]">
          <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: item.imagePosition }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
            />
          </div>

          <div className="flex flex-1 flex-col p-4 pt-3">
            <h3 className="font-sans font-semibold text-sm md:text-[15px] text-ink leading-snug line-clamp-2">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 font-sans text-xs text-inkMuted leading-relaxed line-clamp-2">
              {item.desc}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
              <span className="font-sans text-xs font-semibold text-ink">View details</span>
              <span className="text-ink transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="bg-cream py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Services
            </p>
            <h2 className="mt-2 font-sans font-semibold text-xl md:text-2xl text-ink tracking-tight">
              From planning to handover
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted transition-colors hover:text-accent"
          >
            All
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICE_CARDS.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
