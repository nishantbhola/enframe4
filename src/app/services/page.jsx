"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES } from "./servicesData";
import { HERO_IMAGES, HERO_FOCUS, IMAGE_DIRECTION, SERVICE_CARD_MEDIA } from "../../lib/enframeImages";

function ServiceMedia({ id, label }) {
  const media = SERVICE_CARD_MEDIA[id] ?? IMAGE_DIRECTION.overview.main;
  return (
    <Image
      src={media.src}
      alt={label}
      fill
      className="object-cover"
      style={{ objectPosition: media.position }}
      sizes="(max-width: 768px) 100vw, 25vw"
    />
  );
}

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.78]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} id="services" className="relative min-h-[75vh] overflow-hidden bg-paper">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src={HERO_IMAGES.services}
            alt="Luxurious living room interior by Enframe Constructions"
            fill
            className="object-cover"
            style={{ objectPosition: HERO_FOCUS.services }}
            priority
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 min-h-[75vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-14 pt-28 md:pb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-ink/35 px-4 py-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                Our Services
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper mt-6 max-w-4xl"
            >
              From planning to opulent execution
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-serif text-paper/85 text-base md:text-lg mt-5 max-w-xl leading-relaxed"
            >
              Our structured eight-part approach, from site evaluation to handover.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">Services</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal mt-3 tracking-[0.06em] text-black">
                Full list of 8 services
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.03 }}
              className="font-serif text-black/80 max-w-3xl text-base md:text-lg mt-5 leading-relaxed"
            >
              Our ultra-opulent delivery model is built as a clear sequence—from pre-construction planning and
              disciplined site preparation to structural work, waterproofing, finishing, and final handover. Explore
              each service to understand what’s included, how we execute with precision, and what you can expect
              at every stage of your build.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                title: "Consultation",
                desc: "We start with requirements and scope alignment so the build plan feels clear from day one.",
              },
              {
                title: "Structured execution",
                desc: "Each stage has a disciplined flow—from foundations to finishes—so quality stays consistent.",
              },
              {
                title: "Final inspection",
                desc: "We complete with quality checks and handover documentation so nothing is left ambiguous.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-ink/10 bg-paper/55 backdrop-blur-sm p-7"
              >
                <h3 className="font-display text-lg text-ink">{card.title}</h3>
                <p className="font-serif text-black/80 text-sm mt-3 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link href={`/services/${s.id}`} className="block h-full">
                  <div className="bg-paper rounded-2xl overflow-hidden border border-ink/10 h-full">
                    <div className="relative aspect-[4/3]">
                      <ServiceMedia id={s.id} label={s.title} />
                      <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center">
                        {s.eyebrow}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink">{s.title}</h3>
                      <p className="font-serif text-black text-sm mt-2">{s.shortDesc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

