"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import EnframeLogo from "./EnframeLogo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const original = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
      bodyPaddingRight: body.style.paddingRight,
    };

    if (open) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      html.style.overflow = original.htmlOverflow;
      body.style.overflow = original.bodyOverflow;
      body.style.touchAction = original.bodyTouchAction;
      body.style.paddingRight = original.bodyPaddingRight;
    }

    return () => {
      html.style.overflow = original.htmlOverflow;
      body.style.overflow = original.bodyOverflow;
      body.style.touchAction = original.bodyTouchAction;
      body.style.paddingRight = original.bodyPaddingRight;
    };
  }, [open]);

  const isLight = scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isLight
            ? "bg-paper/90 backdrop-blur-xl border-b border-ink/5"
            : "bg-gradient-to-b from-ink/55 via-ink/35 to-ink/20 backdrop-blur-lg border-b border-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.28)]"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className={`transition-colors duration-300 ${
              isLight ? "text-ink" : "text-white"
            }`}
          >
            <EnframeLogo className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[13px] transition-all duration-500 ease-out ${
                  isLight
                    ? "text-black hover:text-ink"
                    : "font-semibold text-white hover:text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex flex-col justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`block h-[2px] w-5 rounded-full transition-colors ${isLight ? "bg-ink" : "bg-white"}`} />
            <span className={`block h-[2px] w-5 rounded-full transition-colors ${isLight ? "bg-ink" : "bg-white"}`} />
            <span className={`block h-[2px] w-4 rounded-full transition-colors ${isLight ? "bg-ink" : "bg-white"}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/85 to-ink/95" />

            <div
              className="relative h-full flex flex-col px-6 pt-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setOpen(false)} className="text-paper">
                  <EnframeLogo className="h-9 w-auto" />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-paper/30 bg-paper/10 text-paper flex items-center justify-center"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="mt-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-paper/75">
                    Navigation
                  </span>
                </span>
              </div>

              <div className="mt-8 flex-1">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl border border-paper/20 bg-paper/10 px-5 py-4 transition-all duration-500 ease-out hover:bg-paper/15 hover:border-paper/35"
                    >
                      <span className="font-display text-2xl text-paper transition-colors duration-500 ease-out">
                        {link.label}
                      </span>
                      <span className="font-sans text-paper/70 group-hover:text-paper transition-all duration-500 ease-out group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
