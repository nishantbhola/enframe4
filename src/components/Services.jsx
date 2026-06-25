"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICE_CARDS } from "../lib/enframeImages";

function Services() {
  return (
    <section id="services" className="pt-20 md:pt-28 pb-10 md:pb-12 bg-cream text-ink">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
              Opulent Construction Enhancements
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal mt-4 tracking-[0.06em]">
              From Planning to Sumptuous Handover
            </h2>
          </div>
          <p className="font-serif text-black max-w-md text-base md:text-lg">
            A structured build approach designed for quality, safety, and opulent output—on time and within budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOME_SERVICE_CARDS.map((item, i) => (
            <Link key={item.id} href={`/services/${item.id}`} className="block h-full">
              <motion.article
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-paper rounded-2xl overflow-hidden border border-ink/10 h-full shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: item.imagePosition }}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display text-lg leading-tight">{item.title}</h3>
                  <p className="font-serif text-black/85 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Services;
