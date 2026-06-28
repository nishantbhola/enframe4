"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  image,
  imagePosition = "50% 52%",
  href,
  index,
  priority = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="group block"
        aria-label={title ? `View project: ${title}` : "View project"}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(34,25,19,0.08)] transition-shadow duration-300 group-hover:shadow-[0_8px_32px_rgba(34,25,19,0.14)]">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ objectPosition: imagePosition }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        </div>
      </Link>
    </motion.div>
  );
}
