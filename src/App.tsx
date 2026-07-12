import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PricingPage from "./components/PricingPage";
import SolutionSection from "./components/SolutionSection";
import Calculator from "./components/Calculator";
import Comparison from "./components/Comparison";
import SpecsPage from "./components/SpecsPage";
import HomeAboutPreview from "./components/HomeAboutPreview";
import Process from "./components/Process";
import CaseScenarios from "./components/CaseScenarios";
import FAQ from "./components/FAQ";
import WorkflowShowcase from "./components/WorkflowShowcase";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import TestimonialsPage from "./components/TestimonialsPage";
import AboutUsPage from "./components/AboutUsPage";

import VoiceWidget from "./components/VoiceWidget";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "testimonials" | "about" | "specs" | "pricing">("home");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVoiceWidgetOpen, setIsVoiceWidgetOpen] = useState(false);
  const [triggerCallEvent, setTriggerCallEvent] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleRingSamClick = () => {
    setTriggerCallEvent(true);
    // Reset trigger after short duration to allow subsequent triggers
    setTimeout(() => setTriggerCallEvent(false), 200);
  };

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

  // Handle redirect + scroll on page routing transitions
  useEffect(() => {
    if (currentPage === "home") {
      const target = sessionStorage.getItem("scrollTarget");
      if (target) {
        sessionStorage.removeItem("scrollTarget");
        const timer = setTimeout(() => {
          const element = document.getElementById(target);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 150); // delay to let Home DOM settle
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const handleScrollToBooking = () => {
    window.open("https://calendly.com/kuldipbopche3/30min", "_blank", "noopener,noreferrer");
  };

  const handleScrollToInteractiveDemo = () => {
    handleRingSamClick();
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Sticky Top-Tier Navigation */}
      <Navbar 
        onBookDemoClick={handleScrollToBooking} 
        onInteractiveDemoClick={handleScrollToInteractiveDemo}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Render Modules */}
      <main>
        {currentPage === "home" && (
          <>
            {/* A. Hero Section with Interactive Live Telephone Simulator */}
            <Hero 
              onBookDemoClick={handleScrollToBooking} 
              onRingSamClick={handleRingSamClick}
              isCallActive={isCallActive}
            />



            {/* C. Solution Section (Introducing Sam, the step-by-step call flow) */}
            <SolutionSection />

            {/* D. Interactive ROI Drag-and-Drop Calculator */}
            <Calculator />

            {/* F. Before vs. After Comparison Table */}
            <Comparison />

            {/* Preview of About Us sections on the home screen */}
            <HomeAboutPreview onAboutUsClick={() => setCurrentPage("about")} />

            {/* I. Simple White-Glove Onboarding Map */}
            <Process />

            {/* J. Illustrative Social Proof Scenarios */}
            <CaseScenarios />

            {/* K. AI Workflow Proof Screenshots */}
            <WorkflowShowcase />

            {/* L. Confident Objection-Handling / FAQ Accordions */}
            <FAQ />

            {/* L. Interactive Calendar Scheduler & Lead Capture Forms */}
            <BookingForm />
          </>
        )}

        {currentPage === "testimonials" && (
          <TestimonialsPage onBookDemoClick={handleScrollToBooking} />
        )}

        {currentPage === "about" && (
          <AboutUsPage onBookDemoClick={handleScrollToBooking} />
        )}

        {currentPage === "specs" && (
          <SpecsPage onBookDemoClick={handleScrollToBooking} />
        )}

        {currentPage === "pricing" && (
          <PricingPage onBookDemoClick={handleScrollToBooking} />
        )}
      </main>

      {/* Modern Minimalist Footer */}
      <Footer 
        onBookDemoClick={handleScrollToBooking} 
        onInteractiveDemoClick={handleScrollToInteractiveDemo}
        setCurrentPage={setCurrentPage}
      />

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

      {/* Floating AI Voice Agent Widget */}
      <VoiceWidget 
        isOpen={isVoiceWidgetOpen}
        setIsOpen={setIsVoiceWidgetOpen}
        triggerCallEvent={triggerCallEvent}
        onCallStateChange={setIsCallActive}
      />
    </div>
  );
}
