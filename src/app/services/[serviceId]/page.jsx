"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES_BY_ID } from "../servicesData";

function Bullet({ text }) {
  return (
    <li className="flex items-start gap-2 font-serif text-black/85 text-sm">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
      <span>{text}</span>
    </li>
  );
}

function CheckList({ title, items }) {
  return (
    <div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((line) => (
          <li key={line} className="flex items-start gap-2 font-serif text-black/85 text-sm">
            <span className="mt-2 w-1.5 h-1.5 rounded-full border border-accent bg-transparent shrink-0" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetailPage({ params }) {
  const service = SERVICES_BY_ID[params.serviceId];

  if (!service) {
    return (
      <div className="py-24 px-6 bg-cream">
        <h1 className="font-display text-3xl text-ink">Service not found</h1>
        <Link href="/services" className="text-accent underline mt-4 inline-block">
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      {/* HEADER */}
      <section className="border-b border-ink/10 bg-paper pt-28 md:pt-32 pb-14 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-black/55 hover:text-accent transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            All services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent text-paper font-sans text-sm font-semibold">
                {service.eyebrow}
              </span>
              <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
                Service {service.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-[3.25rem] leading-[0.95] tracking-[0.04em] text-ink mt-6 max-w-3xl">
              {service.title}
            </h1>
            <p className="font-serif text-black/80 text-base md:text-lg mt-5 max-w-2xl leading-relaxed">
              {service.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7"
              >
                <h2 className="font-display text-2xl text-ink">Our approach</h2>
                <p className="font-serif text-black/85 mt-4 leading-relaxed">
                  {service.approachParagraph}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.04 }}
                className="rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7"
              >
                <h2 className="font-display text-2xl text-ink">What’s included</h2>
                <ul className="mt-5 space-y-2">
                  {service.bullets.map((b) => (
                    <Bullet key={b} text={b} />
                  ))}
                </ul>
                <p className="font-serif text-black/85 mt-6 leading-relaxed border-t border-ink/10 pt-6">
                  {service.detailsParagraph}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7 space-y-8">
                <CheckList title="What you can expect" items={service.outcomes} />
                <CheckList title="Quality verification" items={service.qualityChecks} />
              </div>

              <div className="rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 bg-accent text-paper font-sans text-xs tracking-[0.18em] uppercase hover:bg-accentDark transition-colors rounded-2xl"
                >
                  Learn more about us
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 border border-stone/60 text-ink font-sans text-xs tracking-[0.18em] uppercase hover:bg-paper transition-colors rounded-2xl mt-3"
                >
                  Back to all services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
