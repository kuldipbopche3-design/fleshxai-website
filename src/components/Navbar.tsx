import React, { useState, useEffect, useRef } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

interface NavbarProps {
  onBookDemoClick: () => void;
  onInteractiveDemoClick: () => void;
  currentPage: "home" | "testimonials" | "about";
  setCurrentPage: (page: "home" | "testimonials" | "about") => void;
}

export default function Navbar({ 
  onBookDemoClick, 
  onInteractiveDemoClick, 
  currentPage, 
  setCurrentPage 
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Auto-close mobile navbar on scroll if open
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (currentPage !== "home") {
      sessionStorage.setItem("scrollTarget", id);
      setCurrentPage("home");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    setCurrentPage("home");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navigateToPage = (page: "home" | "testimonials" | "about") => {
    setIsOpen(false);
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-900/80 shadow-2xl shadow-slate-950/20 py-0"
          : "bg-transparent border-b border-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-brand-200 transition-colors">
                  Flow <span className="text-brand-500">AI</span>
                </span>
                <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase leading-none">Voice Automation</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, "services")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleLinkClick(e, "how-it-works")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#interactive-demo"
              onClick={(e) => handleLinkClick(e, "interactive-demo")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Demo
            </a>
            <a
              href="#features"
              onClick={(e) => handleLinkClick(e, "features")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#roi-calculator"
              onClick={(e) => handleLinkClick(e, "roi-calculator")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors"
            >
              ROI Calculator
            </a>
            <a
              href="#faq"
              onClick={(e) => handleLinkClick(e, "faq")}
              className="text-xs xl:text-sm font-medium text-slate-305 hover:text-white transition-colors"
            >
              FAQ
            </a>
            
            {/* Added Pages links */}
            <button
              onClick={() => navigateToPage("testimonials")}
              className={`text-xs xl:text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "testimonials" 
                  ? "text-brand-400 font-semibold border-b border-brand-500 pb-0.5" 
                  : "text-slate-305 hover:text-white"
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className={`text-xs xl:text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "about" 
                  ? "text-brand-400 font-semibold border-b border-brand-500 pb-0.5" 
                  : "text-slate-305 hover:text-white"
              }`}
            >
              About Us
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <button
              onClick={onInteractiveDemoClick}
              className="px-3 xl:px-4 py-2 text-[10px] xl:text-xs font-mono tracking-wider uppercase text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-all cursor-pointer"
            >
              Try Sam
            </button>
            <button
              onClick={onBookDemoClick}
              className="px-4 xl:px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs xl:text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30 transition-all duration-300 cursor-pointer"
            >
              Book a Free Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={onBookDemoClick}
              className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all cursor-pointer"
            >
              Book Demo
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-850/80 focus:outline-none transition-all duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, "services")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleLinkClick(e, "how-it-works")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#interactive-demo"
              onClick={(e) => handleLinkClick(e, "interactive-demo")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Live Demo (Try Sam)
            </a>
            <a
              href="#features"
              onClick={(e) => handleLinkClick(e, "features")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Features
            </a>
            <a
              href="#roi-calculator"
              onClick={(e) => handleLinkClick(e, "roi-calculator")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              ROI Calculator
            </a>
            <a
              href="#faq"
              onClick={(e) => handleLinkClick(e, "faq")}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              FAQ
            </a>
            
            {/* Added Pages links for mobile */}
            <button
              onClick={() => navigateToPage("testimonials")}
              className={`w-full text-left block px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "testimonials"
                  ? "bg-brand-950/40 text-brand-400 font-semibold border-l-2 border-brand-500 pl-2"
                  : "text-slate-305 hover:text-white hover:bg-slate-800"
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => navigateToPage("about")}
              className={`w-full text-left block px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === "about"
                  ? "bg-brand-950/40 text-brand-400 font-semibold border-l-2 border-brand-500 pl-2"
                  : "text-slate-305 hover:text-white hover:bg-slate-800"
              }`}
            >
              About Us
            </button>
            
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookDemoClick();
                }}
                className="w-full py-2.5 text-center bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer"
              >
                Book a Free Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
