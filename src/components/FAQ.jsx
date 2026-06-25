"use client";

import React, { useState } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
function FAQ() {
    const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="py-24 bg-paper">
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-14">
      <div>
        <span className="font-sans text-accent text-[11px] uppercase tracking-[0.3em]">
          FAQ
        </span>
        <h2 className="font-display text-2xl md:text-3xl lg:text-[2rem] mt-3 font-normal tracking-[0.06em]">
          What clients ask first
        </h2>
      </div>
      <div className="space-y-2">
        {[
          [
            "What do you build?",
            "Ultra-opulent homes including Villas, Simplex & Duplex Homes, Farm Houses, and Independent Floors—crafted from inception to final execution.",
          ],
          [
            "How do you ensure quality and safety?",
            "We maintain rigorous safety and quality standards throughout the process, with quality checks across systems and finishes, and a final inspection with handover documentation.",
          ],
          [
            "Do you use top-tier materials?",
            "Yes. We use reinforced concrete, steel, and engineered wood with high-performance glazing and precision-built custom windows/doors—plus designer fixtures for a cohesive finish.",
          ],
          [
            "What about smart home automation and security?",
            "We integrate smart home automation, advanced security, and energy-efficient systems—supported by concealed technology and precision site execution.",
          ],
        ].map(([q, a], i) => {
          const active = i === openFaq;
          return (
            <div key={q} className="border-b border-ink/10">
              <button
                type="button"
                className="w-full py-5 flex items-center justify-between text-left"
                onClick={() => setOpenFaq(active ? null : i)}
              >
                <span className="font-display text-base md:text-lg">{q}</span>
                <span className="text-accent">{active ? "−" : "+"}</span>
              </button>
              {active ? <p className="pb-5 font-serif text-black leading-relaxed">{a}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  </section>
  )
}

export default FAQ