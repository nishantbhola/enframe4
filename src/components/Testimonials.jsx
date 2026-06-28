"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_DIRECTION } from "../lib/enframeImages";

function Testimonials() {
  const image = IMAGE_DIRECTION.testimonial;

  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="mx-auto max-w-[960px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Client <span className="text-accent">voice</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-cream"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
              <Image
                src={image.src}
                alt="Completed residence"
                fill
                className="object-cover"
                style={{ objectPosition: image.position }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>

            <div className="flex flex-col justify-center px-7 py-9 md:px-10 md:py-12">
              <blockquote className="font-sans text-base font-semibold leading-relaxed text-ink md:text-lg md:leading-[1.65]">
                &ldquo;They delivered exactly what was promised—without a single day lost.&rdquo;
              </blockquote>

              <div className="mt-8 border-t border-ink/8 pt-6">
                <p className="font-sans text-sm font-semibold text-ink">
                  Rahul & Kavita Sharma
                </p>
                <p className="mt-1 font-sans text-xs text-inkMuted">Gurugram</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
