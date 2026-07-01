"use client";

import { motion } from "framer-motion";

const STEPS = [
  { label: "Plan", desc: "Site, design & approvals" },
  { label: "Structure", desc: "Foundation to envelope" },
  { label: "Systems", desc: "MEP & finishes" },
  { label: "Handover", desc: "Quality & keys" },
];

export default function SectionBridge() {
  return (
    <section className="bg-ink text-paper py-12 md:py-14">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-paper/45">
            From vision to delivery
          </p>
          <p className="mt-4 font-sans font-semibold text-base md:text-lg text-paper/90 leading-relaxed">
            The elevations above show the finish. What follows is how we build it — clearly,
            stage by stage.
          </p>
        </motion.div>

        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="text-center md:text-left md:px-4 md:border-l md:border-paper/10 first:md:border-l-0"
            >
              <p className="font-sans font-semibold text-sm text-paper">{step.label}</p>
              <p className="mt-1 font-sans text-xs text-paper/50">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
