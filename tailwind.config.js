/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F3EC",     // main page background (warm ivory)
        cream: "#EFE7DC",     // section background (soft beige)
        ink: "#221913",       // primary text (deep brown-black)
        inkMuted: "#7B6D63",  // muted text
        stone: "#B4A599",     // light borders / subtle text
        accent: "#B45B5B",    // muted rose accent
        accentDark: "#8E4444",// deeper rose
        navy: "#F3ECE3",      // light neutral band (used where bg-navy remains)
      },
      fontFamily: {
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 6vw, 5.2rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.1rem, 4vw, 3.6rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
