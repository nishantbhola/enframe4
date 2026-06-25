import AboutContent from "./components/AboutContent";

export const metadata = {
  title: "About Enframe Constructions | Opulent Home Construction in Gurugram",
  description:
    "Enframe Constructions is a professionally managed real estate construction company delivering ultra-opulent homes with rigorous safety, quality standards, and expert execution from inception to handover.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Enframe Constructions",
    description:
      "Learn about our profile, opulent construction enhancements, and structured delivery process.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

