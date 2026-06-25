"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  HERO_IMAGES,
  IMAGE_DIRECTION,
  cdnBrand,
  cdnProject,
} from "../../../lib/enframeImages";

function SectionIntro({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-paper/40 px-4 py-2 backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-sans text-black text-[11px] uppercase tracking-[0.3em]">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.04 }}
        className="font-display text-2xl md:text-3xl lg:text-[2rem] font-normal tracking-[0.06em] text-ink mt-5"
      >
        {title}
      </motion.h2>
      {desc ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-serif text-black/80 text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
        >
          {desc}
        </motion.p>
      ) : null}
    </div>
  );
}

export default function AboutContent() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.78]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const PROFILE_TEXT =
    "Enframe Constructions is a professionally managed real estate construction company with over 9 years of rich experience in managing real estate projects from inception to final execution. Our expertise spans every phase of development, including land acquisition, design collaboration, construction, interiors, ancillary products & services (air conditioning), home automation and final handover. We pride ourselves on delivering high-quality residential and commercial projects on time and within budget.";

  const DEDICATION_TEXT =
    "Our dedicated team excels at coordinating with architects, engineers, contractors, and other stakeholders to ensure seamless project execution. We maintain rigorous safety and quality standards throughout the process, while continuously seeking opportunities for innovation and process improvement. At Enframe Constructions, our commitment to excellence drives us to exceed client expectations and deliver outstanding results on every project.";

  const ENHANCEMENTS = [
    "We collaborate with renowned architects and interior designers.",
    "Incorporate bespoke design elements and advanced 3D visualizations.",
    "Conduct detailed feasibility studies for high-end features.",
    "Implement advanced site management processes for enhanced privacy and security.",
    "Use precision equipment for excavation to accommodate unique architectural features.",
    "Use top-tier materials (reinforced concrete, steel, engineered wood) for construction.",
    "Install high-performance glazing and custom-designed windows/doors.",
    "Use architectural roofing materials (slate, copper, or green roofs).",
    "Integrate smart home automation, advanced security, and energy-efficient systems.",
    "Use designer fixtures, imported fittings, and concealed technology.",
    "Use imported marble, hardwood, and bespoke cabinetry for interiors.",
    "Incorporate custom lighting, designer wallpapers, and art installations.",
  ];

  const categoryImages = IMAGE_DIRECTION.aboutCategories;
  const HOME_CATEGORIES = [
    {
      title: "Opulent Residences",
      desc: "Signature homes with refined detailing and private client delivery.",
      image: categoryImages[0].src,
      imagePosition: categoryImages[0].position,
    },
    {
      title: "Villas & Farm Estates",
      desc: "Large-format lifestyle builds with curated architecture and landscape.",
      image: categoryImages[1].src,
      imagePosition: categoryImages[1].position,
    },
    {
      title: "Independent Floors",
      desc: "Premium floor-wise residences executed with consistent quality control.",
      image: categoryImages[2].src,
      imagePosition: categoryImages[2].position,
    },
    {
      title: "Simplex & Duplex Homes",
      desc: "Multi-level residences with polished planning and finish harmony.",
      image: categoryImages[3].src,
      imagePosition: categoryImages[3].position,
    },
    {
      title: "Commercial Spaces",
      desc: "High-performance commercial execution with elevated design language.",
      image: categoryImages[4].src,
      imagePosition: categoryImages[4].position,
    },
    {
      title: "Factories & Industrial Units",
      desc: "Robust industrial development with safety-first and process-led execution.",
      image: categoryImages[5].src,
      imagePosition: categoryImages[5].position,
    },
  ];

  const DELIVERY_STEPS = [
    {
      num: "01",
      title: "Pre-Construction Planning",
      desc: "Define feasibility, design intent, and approvals before site mobilization.",
      bullets: ["Site assessment & survey", "Design coordination & permits"],
    },
    {
      num: "02",
      title: "Site Preparation & Ground Breaking",
      desc: "Prepare land, access, and utilities for controlled structural start.",
      bullets: ["Clearing & excavation", "Temporary utility setup"],
    },
    {
      num: "03",
      title: "Foundation & Structural Frame",
      desc: "Execute load-bearing core and frame geometry with precision.",
      bullets: ["Foundation execution", "Structural framing"],
    },
    {
      num: "04",
      title: "Enclosure, Roofing & Waterproofing",
      desc: "Build the weather-safe envelope before interior closure begins.",
      bullets: ["Walls, roof, windows, doors", "Envelope waterproofing"],
    },
    {
      num: "05",
      title: "MEP & Safety Systems",
      desc: "Integrate electrical, plumbing, HVAC, and safety systems in sequence.",
      bullets: ["MEP routing & installation", "HVAC + fire safety checks"],
    },
    {
      num: "06",
      title: "Interior Craft & Woodwork",
      desc: "Deliver premium interiors with coordinated material and detailing standards.",
      bullets: ["Cabinetry, wardrobes, ceilings", "Plaster, paint, tile, fit-outs"],
    },
    {
      num: "07",
      title: "Exterior Finishes & Landscape",
      desc: "Complete facade language and outdoor environment for final character.",
      bullets: ["Facade cladding & detailing", "Landscape, boundary, amenities"],
    },
    {
      num: "08",
      title: "Final Quality Review & Handover",
      desc: "Close with inspection sign-off, documentation, and key handover.",
      bullets: ["Final quality verification", "Client handover package"],
    },
  ];

  const BRAND_LOGOS = [
    { name: "TATA Steel", domain: "tatasteel.com" },
    { name: "Jindal Panther", domain: "jindalpanther.com" },
    { name: "Rathi", domain: "rathisteel.com" },
    { name: "Ultratech", domain: "ultratechcement.com" },
    { name: "JK Cement", domain: "jkcement.com" },
    { name: "Supreme", domain: "supreme.co.in" },
    { name: "Astral Pipes", domain: "astralpipes.com" },
    { name: "Polycab", domain: "polycab.com" },
    { name: "KEI", domain: "kei-ind.com" },
    { name: "Legrand", domain: "legrand.com" },
    { name: "TOTO", domain: "totousa.com" },
    { name: "Kohler", domain: "kohler.com" },
    { name: "Grohe", domain: "grohe.com" },
    { name: "Jaquar", domain: "jaquar.com" },
    { name: "Schuco", domain: "schuco.com" },
    { name: "Fenesta", domain: "fenesta.com" },
    { name: "Hettich", domain: "hettich.com" },
    { name: "Hafele", domain: "hafele.com" },
    { name: "Yale", domain: "yalehome.com" },
    { name: "Philips", domain: "philips.com" },
    { name: "Panasonic", domain: "panasonic.com" },
    { name: "Asian Paints", domain: "asianpaints.com" },
  ];

  const logoFilenameFromDomain = (domain) =>
    cdnBrand(`${domain.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.png`);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} id="about" className="relative min-h-[75vh] overflow-hidden bg-paper">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_IMAGES.about}
            alt="Enframe hero background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/15"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 min-h-[75vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-14 pt-28 md:pb-20">
            <div className="inline-flex items-center gap-3 rounded-full border border-paper/35 bg-ink/35 backdrop-blur-md px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-paper">
                About Us
              </p>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="mt-6 font-display text-4xl md:text-5xl lg:text-[4rem] leading-[0.92] tracking-[0.03em] text-paper max-w-4xl"
            >
              Building homes, delivering excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-5 font-serif text-paper/85 text-base md:text-lg max-w-xl leading-relaxed"
            >
              Over 9 years of opulent residential and commercial construction, from inception to handover.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* PROFILE */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionIntro
            eyebrow="Our Profile"
            title="Professionally managed construction"
            desc="A structured build approach supported by safety, quality standards, and disciplined execution."
          />

          <div className="grid lg:grid-cols-12 gap-14 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <p className="font-serif text-black/85 text-base md:text-lg leading-relaxed">
                {PROFILE_TEXT}
              </p>
              <p className="font-serif text-black/85 text-base md:text-lg mt-5 leading-relaxed">
                {DEDICATION_TEXT}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-cream aspect-[16/11]">
                <Image
                  src={cdnProject("k-block-south-city-1", "090a9569.jpg")}
                  alt="South City luxury facade"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 52%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 md:py-32 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionIntro
            eyebrow="What we Build?"
            title="Opulent residential, commercial and industrial categories"
            desc="From signature residences to commercial and factory projects, we deliver with disciplined execution and refined outcomes."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {HOME_CATEGORIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                className="rounded-2xl border border-ink/10 bg-cream/60 backdrop-blur-sm px-5 py-5"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: c.imagePosition }}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-accent/90 text-paper text-xs font-semibold flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg text-ink mt-4">{c.title}</h3>
                <p className="font-serif text-black/80 text-sm mt-2 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionIntro
            eyebrow="Delivery process"
            title="From planning to handover"
            desc="An eight-stage delivery framework that keeps execution clear, controlled, and consistent."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DELIVERY_STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.02 }}
                className="rounded-2xl border border-ink/10 bg-paper/70 backdrop-blur-sm p-5 h-full"
              >
                <div className="w-9 h-9 rounded-full bg-accent text-paper flex items-center justify-center text-xs font-semibold">
                  {s.num}
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-[1.05rem] text-ink leading-snug">{s.title}</h3>
                  <p className="font-serif text-black/75 text-sm mt-2 leading-relaxed">{s.desc}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 font-serif text-black/80 text-sm">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-24 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionIntro
            eyebrow="Brands used"
            title="Leading material partners"
            desc="We select opulence-grade brands to improve product life and reduce maintenance needs."
          />

          <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-cream/50 py-10">
            <div className="marquee-track">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="inline-flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper/80 px-6 py-4 min-w-[240px] mr-5"
                >
                  <img
                    src={logoFilenameFromDomain(brand.domain)}
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg object-contain bg-white p-1.5"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain_url=https://${brand.domain}`;
                    }}
                  />
                  <span className="font-sans text-sm text-black/85 tracking-[0.02em] whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAST PROJECTS SECTION COMMENTED OUT AS REQUESTED
      <section className="py-24 bg-cream">
        ...
      </section>
      */}

      {/* CONTACT */}
      <section id="contact" className="relative py-24 md:py-32 bg-cream overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-ink/5 via-transparent to-ink/5" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center"
        >
          <h2 className="font-display text-2xl md:text-4xl font-normal tracking-[0.06em] text-ink">
            Book an Opulent Site Consultation
          </h2>
          <p className="font-serif text-black/80 text-sm md:text-base mt-6 max-w-2xl mx-auto leading-relaxed">
            B-103 South City 1, Gurugram, Haryana · WhatsApp / email connect for a structured discussion and execution roadmap.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@enframeconstructions.com"
              className="inline-block px-8 py-3.5 bg-accent text-paper font-sans text-xs tracking-[0.18em] uppercase hover:bg-accentDark transition-colors"
            >
              info@enframeconstructions.com
            </a>
            <a
              href="tel:+919735003555"
              className="inline-block px-8 py-3.5 border border-stone/60 text-ink font-sans text-xs tracking-[0.18em] uppercase hover:bg-paper transition-colors"
            >
              +91 9735003555
            </a>
          </div>
        </motion.div>
      </section>
      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: brand-marquee 42s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes brand-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

