"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, SERVICES_BY_ID } from "../servicesData";
import { IMAGE_DIRECTION, SERVICE_CARD_MEDIA } from "../../../lib/enframeImages";

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

export default function ServiceDetailPage({ params }) {
  const service = SERVICES_BY_ID[params.serviceId];
  const serviceIndex = SERVICES.findIndex((s) => s.id === params.serviceId);
  const prevService = serviceIndex > 0 ? SERVICES[serviceIndex - 1] : null;
  const nextService =
    serviceIndex >= 0 && serviceIndex < SERVICES.length - 1
      ? SERVICES[serviceIndex + 1]
      : null;

  if (!service) {
    return (
      <div className="bg-cream px-6 py-24">
        <h1 className="font-sans text-2xl font-semibold text-ink">Service not found</h1>
        <Link href="/services" className="mt-4 inline-block font-sans text-sm text-accent">
          Back to services
        </Link>
      </div>
    );
  }

  const media = SERVICE_CARD_MEDIA[service.id] ?? IMAGE_DIRECTION.overview.main;

  return (
    <div className="bg-cream min-h-screen">
      <header className="border-b border-ink/8 bg-paper pt-24 md:pt-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 gap-y-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-inkMuted transition-colors hover:text-accent"
            >
              <span aria-hidden="true">←</span>
              All services
            </Link>
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-accent">
              Services
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 md:mt-5"
          >
            <h1 className="font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
              {service.title}
            </h1>
            <p className="mt-2 font-sans text-sm text-inkMuted leading-relaxed max-w-2xl">
              {service.shortDesc}
            </p>
          </motion.div>
        </div>
      </header>

      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.article
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-ink/8 bg-paper shadow-[0_12px_40px_-16px_rgba(34,25,19,0.1)]"
          >
            <div className="relative aspect-video w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={media.src}
                alt={service.title}
                fill
                className="object-cover"
                style={{ objectPosition: media.position }}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <h2 className="font-sans text-sm font-semibold text-ink">How we handle this</h2>
                  <p className="mt-2.5 font-sans text-[15px] text-ink/80 leading-relaxed">
                    {service.approachParagraph}
                  </p>

                  <div className="my-6 h-px bg-ink/8" />

                  <h2 className="font-sans text-sm font-semibold text-ink">What&apos;s included</h2>
                  <ul className="mt-3 space-y-2.5">
                    {service.bullets.map((b) => (
                      <Bullet key={b} text={b} />
                    ))}
                  </ul>
                  <p className="mt-4 font-sans text-sm text-inkMuted leading-relaxed">
                    {service.detailsParagraph}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-5">
                    <CheckList title="What you get" items={service.outcomes} />
                  </div>
                  <div className="rounded-2xl border border-ink/8 bg-cream px-5 py-5">
                    <CheckList title="Quality checks" items={service.qualityChecks} />
                  </div>
                </div>
              </div>
            </div>

            {(prevService || nextService) && (
              <div className="grid sm:grid-cols-2 border-t border-ink/8 bg-cream/40">
                {prevService ? (
                  <Link
                    href={`/services/${prevService.id}`}
                    className="group border-b border-ink/8 px-5 py-4 transition-colors hover:bg-cream/80 sm:border-b-0 sm:border-r"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                      ← Previous
                    </p>
                    <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                      {prevService.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden sm:block sm:border-r border-ink/8" />
                )}
                {nextService ? (
                  <Link
                    href={`/services/${nextService.id}`}
                    className="group px-5 py-4 text-left transition-colors hover:bg-cream/80 sm:text-right"
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-inkMuted">
                      Next →
                    </p>
                    <p className="mt-1 font-sans text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                      {nextService.title}
                    </p>
                  </Link>
                ) : null}
              </div>
            )}
          </motion.article>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper pb-12 md:pb-14">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 md:pt-12">
          <div className="flex flex-col items-center text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Get in touch
            </p>
            <p className="mt-3 font-sans text-base font-semibold text-ink">
              Want to know how this fits your project?
            </p>
            <p className="mt-2 font-sans text-sm text-inkMuted max-w-sm leading-relaxed">
              We&apos;ll walk you through scope, timeline, and what happens at this stage.
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
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-inkMuted transition-colors hover:text-accent"
              >
                All services →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
