import Link from "next/link";
import EnframeLogo from "./EnframeLogo";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

function SocialIcon({ label }) {
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H8v3h2.6v8h2.9Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
      <path d="M6.2 8.2A2.2 2.2 0 1 1 6.2 3.8a2.2 2.2 0 0 1 0 4.4ZM4.3 9.9h3.8V20H4.3V9.9Zm5.8 0h3.6v1.4h.1c.5-1 1.8-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V20H18v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V20h-3.8V9.9Z" />
    </svg>
  );
}

function FooterLabel({ children }) {
  return (
    <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-paper/45 mb-3">
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8 md:py-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-paper/12 to-transparent mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-block text-paper/90 hover:text-paper transition-colors">
              <EnframeLogo className="h-14 sm:h-16 md:h-[4.5rem] w-auto" />
            </Link>
            <p className="mt-3 font-sans text-sm sm:text-base font-medium tracking-[0.06em] text-paper/85">
              Enframe Constructions
            </p>
            <p className="mt-2 font-serif text-sm text-paper/50 leading-relaxed max-w-xs hidden sm:block">
              Ultra-opulent residences, pan India.
            </p>
            <div className="flex items-center gap-2.5 mt-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/55 hover:text-paper hover:border-paper/30 transition-colors"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <FooterLabel>Explore</FooterLabel>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] text-paper/70 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <FooterLabel>Studio</FooterLabel>
            <address className="not-italic space-y-1.5 text-[13px] text-paper/70 leading-relaxed">
              <p>B-103 South City 1, Gurugram</p>
              <a href="https://wa.me/919800000448" target="_blank" rel="noreferrer" className="block hover:text-accent transition-colors">
                +91 9800000448
              </a>
              <a href="mailto:sales@enframeconstructions.com" className="block hover:text-accent transition-colors break-all">
                sales@enframeconstructions.com
              </a>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-paper/10 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[10px] tracking-[0.14em] uppercase text-paper/35">
          <p>&copy; {new Date().getFullYear()} Enframe Constructions</p>
          <p className="hidden sm:block">Opulent homes, quietly perfected.</p>
        </div>
      </div>
    </footer>
  );
}
