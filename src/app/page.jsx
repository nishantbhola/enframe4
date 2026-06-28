"use client";
import Header from "../components/Header";
import HighlightGallery from "../components/HighlightGallery";
import SectionBridge from "../components/SectionBridge";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <HighlightGallery />
      <SectionBridge />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
