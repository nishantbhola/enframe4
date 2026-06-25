"use client";
import Header from "../components/Header";
import HighlightGallery from "../components/HighlightGallery";
import Overview from "../components/Overview";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <HighlightGallery />
      <Overview />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
}
