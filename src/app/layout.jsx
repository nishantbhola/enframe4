import "./globals.css";
import { DM_Serif_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Enframe Construction | Premier Construction & Interior Design",
  description:
    "25+ years of excellence. Turnkey interiors and construction across NCR — design, build, and craft spaces that last.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
