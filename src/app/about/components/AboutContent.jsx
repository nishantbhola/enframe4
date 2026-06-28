"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HERO_IMAGES,
  IMAGE_DIRECTION,
  cdnBrand,
  cdnProject,
} from "../../../lib/enframeImages";

export default function AboutContent() {
  const COMPANY_PARAGRAPHS = [
    "With 15 years of expertise, Enframe Constructions LLP is a trusted leader in residential, commercial, and industrial construction. We build with trust. We build with confidence.",
    "Built on quality craftsmanship and meticulous attention to detail, every project reflects our deep expertise. From residential homes to corporate facilities and industrial infrastructures, we deliver quality you can count on.",
    "Every project, big or small, is handled with precision, dedication, and an unwavering commitment to what we promise. At Enframe Constructions, we build more than structures — we build trust and lasting relationships.",
    "When you choose us, you're choosing a team that stands behind every brick, beam, and finish. We create spaces where dreams come to life.",
  ];

  const CAPABILITY_GROUPS = [
    {
      title: "Design & planning",
      items: [
        "Collaboration with renowned architects and interior designers.",
        "Bespoke design elements and advanced 3D visualizations.",
        "Detailed feasibility studies for high-end features.",
      ],
    },
    {
      title: "Site & structure",
      items: [
        "Advanced site management for enhanced privacy and security.",
        "Precision excavation equipment for unique architectural features.",
        "Top-tier materials—reinforced concrete, steel, and engineered wood.",
      ],
    },
    {
      title: "Envelope & systems",
      items: [
        "High-performance glazing and custom-designed windows and doors.",
        "Architectural roofing materials such as slate, copper, or green roofs.",
        "Smart home automation, advanced security, and energy-efficient systems.",
      ],
    },
    {
      title: "Interiors & finishes",
      items: [
        "Designer fixtures, imported fittings, and concealed technology.",
        "Imported marble, hardwood, and bespoke cabinetry for interiors.",
        "Custom lighting, designer wallpapers, and art installations.",
      ],
    },
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
    {
      title: "PEB (Pre Engineered Building)",
      desc: "Fast-track steel structures for factories, warehouses, and commercial builds with engineered design and on-site erection.",
      image: categoryImages[5].src,
      imagePosition: categoryImages[5].position,
    },
  ];

  const DELIVERY_SUMMARY =
    "Our delivery runs through eight defined services—from pre-construction planning and site preparation through structure, MEP, finishes, and final handover. Each stage has clear scope, quality checks, and documented outcomes.";

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
      <section id="about" className="relative min-h-[52vh] md:min-h-[58vh] overflow-hidden bg-ink">
        <Image
          src={HERO_IMAGES.about}
          alt=""
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

        <div className="relative z-10 min-h-[52vh] md:min-h-[58vh] flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-12 md:pb-16 pt-28">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              About us
            </p>
            <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-paper tracking-[0.04em] leading-tight max-w-3xl">
              Enframe Constructions LLP
            </h1>
            <p className="mt-4 font-sans font-semibold text-base md:text-lg text-paper/90 max-w-xl leading-relaxed">
              We build with trust.
              <span className="block text-accent mt-1">We build with confidence.</span>
            </p>
            <p className="mt-5 font-sans text-xs md:text-sm text-paper/60 tracking-wide">
              15 years · Residential · Commercial · Industrial
            </p>
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="bg-paper pt-14 md:pt-16 pb-8 md:pb-10">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Our story
            </p>
            <h2 className="mt-3 font-sans text-2xl md:text-3xl font-semibold text-ink tracking-tight">
              We build with trust.{" "}
              <span className="text-accent">We build with confidence.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.06 }}
            className="overflow-hidden rounded-3xl border border-ink/8 bg-cream shadow-[0_20px_50px_-20px_rgba(34,25,19,0.12)]"
          >
            <div className="grid lg:grid-cols-5">
              <div className="relative lg:col-span-2 aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={cdnProject("k-block-south-city-1", "090a9569.jpg")}
                  alt="Enframe construction project"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 38%" }}
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-cream/20" />
                <span className="absolute bottom-4 left-4 rounded-full bg-paper/92 backdrop-blur-sm px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-inkMuted">
                  South City 1 · Gurugram
                </span>
              </div>

              <div className="lg:col-span-3 px-7 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap gap-2 mb-7">
                  {["15 years", "Residential", "Commercial", "Industrial"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-inkMuted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-lg md:text-xl font-semibold text-ink leading-[1.55]">
                  {COMPANY_PARAGRAPHS[0]}
                </p>

                <div className="my-7 h-px bg-ink/8" />

                <div className="space-y-4 font-sans text-[15px] md:text-base text-ink/80 leading-[1.75]">
                  {COMPANY_PARAGRAPHS.slice(1).map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="bg-paper pb-14 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 border-t border-ink/8 pt-10 md:pt-12">
          <div className="mb-8 md:mb-10 grid md:grid-cols-2 gap-4 md:gap-10 md:items-end">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                What we build
              </p>
              <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
                Residential, commercial &amp; industrial categories
              </h2>
            </div>
            <p className="font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed md:text-right md:max-w-md md:ml-auto">
              From signature residences to commercial, factory, and PEB projects—we deliver with
              disciplined execution and refined outcomes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
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

      {/* WHAT WE DO */}
      <section id="process" className="bg-cream pb-12 md:pb-14">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 border-t border-ink/8 pt-10 md:pt-12">
          <div className="mb-8 grid md:grid-cols-2 gap-4 md:gap-10 md:items-end">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                What we do
              </p>
              <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight leading-snug">
                Construction enhancements &amp; delivery
              </h2>
            </div>
            <p className="font-sans text-sm md:text-[15px] text-inkMuted leading-relaxed md:text-right md:max-w-md md:ml-auto">
              Beyond our eight-stage delivery model, we layer in premium capabilities that elevate
              every residence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {CAPABILITY_GROUPS.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-2xl border border-ink/8 bg-paper px-5 py-5"
              >
                <h3 className="font-sans text-sm font-semibold text-ink">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item.slice(0, 32)}
                      className="flex gap-2.5 font-sans text-[13px] text-ink/75 leading-relaxed"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 md:mt-8 flex flex-col gap-5 rounded-2xl border border-ink/8 bg-paper px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8 md:py-7"
          >
            <p className="font-sans text-[15px] md:text-base text-ink/80 leading-relaxed">
              {DELIVERY_SUMMARY}
            </p>
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-accent transition-colors"
            >
              View services
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-paper pb-14 md:pb-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 border-t border-ink/8 pt-10 md:pt-12">
          <div className="mb-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
              Brands used
            </p>
            <h2 className="mt-3 font-sans text-xl md:text-2xl font-semibold text-ink tracking-tight">
              Leading material partners
            </h2>
            <p className="mt-3 font-sans text-sm text-inkMuted max-w-xl leading-relaxed">
              We select quality-grade brands to improve product life and reduce maintenance needs.
            </p>
          </div>

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
              Email us
            </a>
            <a
              href="tel:+919800000448"
              className="inline-block px-8 py-3.5 border border-stone/60 text-ink font-sans text-xs tracking-[0.18em] uppercase hover:bg-paper transition-colors"
            >
              WhatsApp
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

