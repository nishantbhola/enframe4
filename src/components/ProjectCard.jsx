"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  tag,
  image,
  imagePosition = "50% 52%",
  href,
  index,
  priority = false,
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="block group" aria-label={`Open ${title}`}>
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink shadow-[0_6px_28px_rgba(34,25,19,0.1),0_2px_8px_rgba(34,25,19,0.06)] group-hover:shadow-[0_16px_48px_rgba(34,25,19,0.16),0_4px_12px_rgba(34,25,19,0.08)] transition-shadow duration-500"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            style={{ objectPosition: imagePosition }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/[0.08] transition-opacity duration-500 group-hover:from-ink/88" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.12] pointer-events-none" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
            <span className="inline-flex items-center rounded-full border border-paper/25 bg-paper/15 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-paper">
              {tag}
            </span>
            <span className="font-display text-paper/35 text-xl md:text-2xl leading-none select-none">
              {num}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <h3 className="font-display text-lg md:text-xl text-paper leading-snug tracking-[0.02em] max-w-[95%]">
              {title}
            </h3>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
