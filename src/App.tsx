import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import Calculator from "./components/Calculator";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import Industries from "./components/Industries";
import WebsitesSection from "./components/WebsitesSection";
import Process from "./components/Process";
import CaseScenarios from "./components/CaseScenarios";
import FAQ from "./components/FAQ";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = (window.scrollY / totalHeight) * 100;
        setScrollPercent(percent);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set the dynamic custom CSS variable on the document root
  useEffect(() => {
    const getBrandColorForScroll = (percent: number) => {
      let hue = 206;
      let saturation = 93;
      let lightness = 86;

      if (percent <= 50) {
        const t = percent / 50;
        hue = 206 + (199 - 206) * t;
        saturation = 93 + (89 - 93) * t;
        lightness = 86 + (48 - 86) * t;
      } else {
        const t = (percent - 50) / 50;
        hue = 199 + (201 - 199) * t;
        saturation = 89 + (97 - 89) * t;
        lightness = 48 + (39 - 48) * t;
      }

      return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
    };

    const brandColor = getBrandColorForScroll(scrollPercent);
    document.documentElement.style.setProperty('--scrollbar-color', brandColor);
  }, [scrollPercent]);

  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      const offset = 80; // account for sticky navbar
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToInteractiveDemo = () => {
    const demoSection = document.getElementById("interactive-demo");
    if (demoSection) {
      const offset = 100; // offset
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Sticky Top-Tier Navigation */}
      <Navbar 
        onBookDemoClick={handleScrollToBooking} 
        onInteractiveDemoClick={handleScrollToInteractiveDemo}
      />

      {/* Main Core View Modules */}
      <main>
        {/* A. Hero Section with Interactive Live Telephone Simulator */}
        <Hero onBookDemoClick={handleScrollToBooking} />

        {/* B. Problem Section (The Silent Revenue Leak Stats) */}
        <ProblemSection />

        {/* C. Solution Section (Introducing Sam, the step-by-step call flow) */}
        <SolutionSection />

        {/* D. Interactive ROI Drag-and-Drop Calculator */}
        <Calculator />

        {/* E. Outcome-Driven Features Matrix */}
        <Features />

        {/* F. Before vs. After Comparison Table */}
        <Comparison />

        {/* G. Industries We Serve (Medical & Aesthetic Specialization) */}
        <Industries />

        {/* H. Secondary Service (Premium Conversion Websites Upsell) */}
        <WebsitesSection onBookDemoClick={handleScrollToBooking} />

        {/* I. Simple White-Glove Onboarding Map */}
        <Process />

        {/* J. Illustrative Social Proof Scenarios */}
        <CaseScenarios />

        {/* K. Confident Objection-Handling / FAQ Accordions */}
        <FAQ />

        {/* L. Interactive Calendar Scheduler & Lead Capture Forms */}
        <BookingForm />
      </main>

      {/* Modern Minimalist Footer */}
      <Footer onBookDemoClick={handleScrollToBooking} />

      {/* Right-side floating custom scrollbar indicator (small, elegant, changes color according to page) */}
      <div 
        className="fixed right-1 sm:right-2 top-1/2 -translate-y-1/2 h-[40vh] w-1 bg-slate-950/20 backdrop-blur-[2px] rounded-full z-[100]"
        id="custom-sidebar-scrollbar"
      >
        <div 
          className="absolute left-0 w-full h-8 rounded-full transition-all duration-150 ease-out"
          style={{
            top: `${scrollPercent}%`,
            transform: `translateY(-${scrollPercent}%)`,
            backgroundColor: `var(--scrollbar-color, hsl(199, 89%, 48%))`
          }}
        />
      </div>
    </div>
  );
}
