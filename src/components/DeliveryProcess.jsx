"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

const DELIVERY_STEPS = [
  {
    num: "01",
    title: "Pre-Construction Planning",
    desc: "Site Evaluation & Survey, Design Development, and Permits & Approvals.",
    image: IMAGE_DIRECTION.delivery[0].src,
    imagePosition: IMAGE_DIRECTION.delivery[0].position,
  },
  {
    num: "02",
    title: "Ground Breaking & Site Preparation",
    desc: "Clearing & Excavation and Utility Setup for seamless ground works.",
    image: IMAGE_DIRECTION.delivery[1].src,
    imagePosition: IMAGE_DIRECTION.delivery[1].position,
  },
  {
    num: "03",
    title: "Foundation, Structural Work & Waterproofing",
    desc: "Foundation Laying, Structural Framing, Rainwater Harvesting, Enclosure & Waterproofing.",
    image: IMAGE_DIRECTION.delivery[2].src,
    imagePosition: IMAGE_DIRECTION.delivery[2].position,
  },
  {
    num: "04",
    title: "Enclosure to Final Handover",
    desc: "MEP systems, Interior Finishes, Exterior Finishes, Amenities & Landscaping, Quality Checks & Handover.",
    image: IMAGE_DIRECTION.delivery[3].src,
    imagePosition: IMAGE_DIRECTION.delivery[3].position,
  },
];

function DeliveryProcess() {
  return (
    <section id="delivery" className="pt-20 md:pt-28 pb-10 md:pb-12 bg-cream text-ink">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
              Delivery process
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal mt-4 tracking-[0.06em]">
              From brief to handover
            </h2>
          </div>
          <p className="font-serif text-black max-w-md text-base md:text-lg">
            A clear, phased path from first brief to final keys—managed with precision at every milestone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DELIVERY_STEPS.map((step, i) => (
            <motion.article
              key={step.title}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-paper rounded-2xl overflow-hidden border border-ink/10 h-full shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: step.imagePosition }}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold">
                  {step.num}
                </span>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg leading-tight">{step.title}</h3>
                <p className="font-serif text-black/85 text-sm mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default DeliveryProcess;
