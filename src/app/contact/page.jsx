"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { HERO_FOCUS, HERO_IMAGES } from "../../lib/enframeImages";

function InfoItem({ label, children }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper/50 p-4">
      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-inkMuted">{label}</p>
      <div className="mt-2 font-serif text-black leading-relaxed">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-cream">
      <section className="relative min-h-[75vh] overflow-hidden bg-paper">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGES.contact}
            alt="Contact Enframe Constructions"
            fill
            className="object-cover"
            style={{ objectPosition: HERO_FOCUS.contact }}
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

        <div className="relative z-10 min-h-[75vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-14 pt-28 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-paper/15 backdrop-blur-md px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-paper">
                  Contact
                </span>
              </span>

              <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper max-w-4xl">
                Get in touch with us
              </h1>

              <p className="mt-5 max-w-xl font-serif text-paper/85 text-base md:text-lg leading-relaxed">
                Share your requirements and our team will connect with you for a consultation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-4 rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7"
            >
              <h2 className="font-display text-2xl text-ink">Contact details</h2>
              <p className="mt-3 font-serif text-black/75 leading-relaxed">
                Reach us via your preferred channel.
              </p>

              <div className="mt-6 space-y-3">
                <InfoItem label="Email">
                  <a
                    href="mailto:sales@enframeconstructions.com"
                    className="hover:text-ink transition-colors"
                  >
                    sales@enframeconstructions.com
                  </a>
                </InfoItem>

                <InfoItem label="WhatsApp">
                  <a
                    href="https://wa.me/919800000448"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ink transition-colors"
                  >
                    +91 9800000448
                  </a>
                </InfoItem>

                <InfoItem label="Office">
                  B-103 South City 1,
                  <br />
                  Gurugram, Haryana
                </InfoItem>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.03 }}
              className="lg:col-span-8 rounded-3xl border border-ink/10 bg-paper/60 backdrop-blur-sm p-7 lg:p-8"
            >
              <h2 className="font-display text-2xl text-ink">Send an enquiry</h2>
              <p className="mt-3 font-serif text-black/75 leading-relaxed">
                Fill the form and our team will get back to you shortly.
              </p>

              <form
                className="mt-7 grid md:grid-cols-2 gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label className="block">
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-inkMuted">
                    Full name
                  </span>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-inkMuted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>

                <label className="block">
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-inkMuted">
                    Phone number
                  </span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-inkMuted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-inkMuted">
                    Email address
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-inkMuted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-inkMuted">
                    Project brief
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project requirements"
                    className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-inkMuted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                  />
                </label>

                <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-paper font-sans text-xs tracking-[0.18em] uppercase hover:bg-accentDark transition-colors rounded-2xl"
                  >
                    Send enquiry
                  </button>
                  <span className="font-serif text-sm text-black/60">
                    We typically respond within one business day.
                  </span>
                </div>
              </form>

              {submitted ? (
                <p className="mt-5 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 font-serif text-ink">
                  Thank you. Your enquiry has been received and our team will contact you soon.
                </p>
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl overflow-hidden border border-ink/10 bg-paper"
          >
            <div className="px-6 md:px-8 py-5 border-b border-ink/10 bg-paper/80">
              <h3 className="font-display text-2xl text-ink">Visit our office</h3>
              <p className="mt-1 font-serif text-black/70">
                B-103 South City 1, Gurugram, Haryana
              </p>
            </div>
            <iframe
              title="Enframe office map"
              src="https://www.google.com/maps?q=B-103%20South%20City%201%20Gurugram%20Haryana&output=embed"
              className="w-full h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
