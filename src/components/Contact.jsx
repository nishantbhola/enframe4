"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Contact() {
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
            Enquire
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal tracking-[0.04em] leading-tight">
            Begin your residence.
          </h2>
          <p className="mt-5 font-serif text-paper/65 text-base md:text-lg leading-relaxed">
            A private conversation to understand your site, vision, and timeline.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="mailto:info@enframeconstructions.com"
              className="inline-block w-full sm:w-auto px-10 py-3.5 bg-accent text-paper font-sans text-[11px] tracking-[0.22em] uppercase hover:bg-accentDark transition-colors"
            >
              Email us
            </Link>
            <Link
              href="https://wa.me/919800000448"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full sm:w-auto px-10 py-3.5 border border-paper/30 text-paper font-sans text-[11px] tracking-[0.22em] uppercase hover:border-paper hover:bg-paper/10 transition-colors"
            >
              WhatsApp
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
