"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EnframeLogo from "./EnframeLogo";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 border-b border-ink/8 bg-paper ${
          open ? "z-[70]" : "z-50"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:h-20">
          <Link href="/" className="text-ink" onClick={close}>
            <EnframeLogo className="h-10 w-auto" />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[13px] text-ink hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute block h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute block h-[2px] w-5 rounded-full bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-[2px] w-5 rounded-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/25"
            aria-label="Close menu"
            onClick={close}
          />

          <div className="relative flex h-full flex-col bg-cream px-6 pb-8 pt-5">
            <nav className="flex flex-1 flex-col justify-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-2xl bg-paper px-5 py-4 shadow-[0_4px_16px_rgba(34,25,19,0.06)] active:scale-[0.99] transition-transform"
                >
                  <span className="font-sans text-base font-semibold text-ink">
                    {link.label}
                  </span>
                  <span className="text-inkMuted">→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/8 pt-6">
              <a
                href="mailto:info@enframeconstructions.com"
                onClick={close}
                className="flex items-center justify-center rounded-xl bg-accent px-4 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-paper"
              >
                Email
              </a>
              <a
                href="https://wa.me/919800000448"
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="flex items-center justify-center rounded-xl border border-ink/15 bg-paper px-4 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
