"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "./servicesData";
import { HERO_IMAGES, HERO_FOCUS, IMAGE_DIRECTION, SERVICE_CARD_MEDIA } from "../../lib/enframeImages";

function ServiceMedia({ id, label }) {
  const media = SERVICE_CARD_MEDIA[id] ?? IMAGE_DIRECTION.overview.main;
  return (
    <Image
      src={media.src}
      alt={label}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      style={{ objectPosition: media.position }}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 22vw"
    />
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/services/${service.id}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(34,25,19,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(34,25,19,0.12)]">
          <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden rounded-xl">
            <ServiceMedia id={service.id} label={service.title} />
          </div>

          <div className="flex flex-1 flex-col p-4 pt-3">
            <h3 className="font-sans font-semibold text-sm md:text-[15px] text-ink leading-snug line-clamp-2">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 font-sans text-xs text-inkMuted leading-relaxed line-clamp-2">
              {service.shortDesc}
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

export default function ServicesPage() {
  return (
    <div>
      <section id="services" className="relative min-h-[52vh] md:min-h-[58vh] overflow-hidden bg-ink">
        <Image
          src={HERO_IMAGES.services}
          alt=""
          fill
          className="object-cover opacity-50"
          style={{ objectPosition: HERO_FOCUS.services }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

        <div className="relative z-10 min-h-[52vh] md:min-h-[58vh] flex items-end">
          <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 pb-12 md:pb-16 pt-28">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Services
            </p>
            <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-paper tracking-[0.04em] leading-tight max-w-3xl">
              From planning to handover
            </h1>
            <p className="mt-4 font-sans text-base md:text-lg text-paper/85 max-w-xl leading-relaxed">
              Every part of your build, explained clearly — from the first site visit to the final
              keys.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-8 grid md:grid-cols-2 gap-4 md:gap-10 md:items-end">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                How we work
              </p>
              <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
                One clear path through your project
              </h2>
            </div>
            <p className="font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed md:text-right md:max-w-md md:ml-auto">
              Each card below covers a stage of construction. Open any service to see what is included,
              how we handle it, and the quality checks before we move on.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {[
              "Planning",
              "Site prep",
              "Structure",
              "Envelope",
              "Woodwork",
              "MEP",
              "Finishes",
              "Handover",
            ].map((stage) => (
              <span
                key={stage}
                className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-inkMuted"
              >
                {stage}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
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
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px] overflow-hidden rounded-2xl">
                <Image
                  src="https://i.pinimg.com/1200x/3f/bb/91/3fbb9131d15593e6c0a0c7bb26b43f57.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 50%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-center px-1 py-2 md:px-2 md:py-4 lg:py-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                  Next step
                </p>
                <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink leading-snug">
                  Ready to discuss your build?
                </h2>
                <p className="mt-4 font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed max-w-md">
                  Tell us about your site, timeline, and what you want to build. We&apos;ll help you
                  figure out where to start and walk you through every stage.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["15 years experience", "Clear scope", "Quality checks"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-inkMuted"
                    >
                      {item}
                    </span>
                  ))}
                </div>

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
                    href="/about"
                    className="inline-flex items-center justify-center px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-inkMuted transition-colors hover:text-accent"
                  >
                    About us →
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
