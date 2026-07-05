import React from "react";
import { PhoneCall, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onBookDemoClick: () => void;
  setCurrentPage: (page: "home" | "testimonials" | "about") => void;
}

export default function Footer({ onBookDemoClick, setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setCurrentPage("home");
    // Short timeout to allow page layout to switch back to home
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 80);
  };

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, page: "home" | "testimonials" | "about") => {
    e.preventDefault();
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Desc (5 Columns) */}
          <div className="md:col-span-5 space-y-5">
            <a 
              href="#" 
              onClick={(e) => handlePageClick(e, "home")} 
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/10">
                <PhoneCall className="w-4.5 h-4.5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Flow <span className="text-brand-500">AI</span>
              </span>
            </a>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-light">
              We engineer premium, custom-trained conversational voice agents for appointment-based clinics. Our mission is simple: answer every call instantly, sync schedules smoothly, and recover your lost clinic revenue.
            </p>

            <div className="pt-2 text-xs font-mono space-y-1.5 text-slate-500">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-500" />
                <a href="mailto:kuldipbopche3@gmail.com" className="hover:text-white transition-colors">kuldipbopche3@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-brand-500" />
                <a href="tel:+918962417150" className="hover:text-white transition-colors">+91 89624 17150</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                <span>Austin, Texas • San Francisco, California</span>
              </p>
            </div>
          </div>

          {/* Column 2: Navigation (3 Columns) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">COMPANY NAVIGATION</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleLinkClick(e, "services")} 
                  className="hover:text-white transition-colors font-light"
                >
                  Niched Services
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => handleLinkClick(e, "how-it-works")} 
                  className="hover:text-white transition-colors font-light"
                >
                  Onboarding Timeline
                </a>
              </li>
              <li>
                <a 
                  href="#interactive-demo" 
                  onClick={(e) => handleLinkClick(e, "interactive-demo")} 
                  className="hover:text-white transition-colors font-light"
                >
                  Live Interactive Sam
                </a>
              </li>
              <li>
                <a 
                  href="#roi-calculator" 
                  onClick={(e) => handleLinkClick(e, "roi-calculator")} 
                  className="hover:text-white transition-colors font-light"
                >
                  Clinic ROI Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleLinkClick(e, "faq")} 
                  className="hover:text-white transition-colors font-light"
                >
                  Objections & FAQ
                </a>
              </li>
              <li className="pt-2 border-t border-slate-900/60">
                <a 
                  href="#" 
                  onClick={(e) => handlePageClick(e, "testimonials")} 
                  className="hover:text-white transition-colors font-semibold text-brand-400"
                >
                  Our Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handlePageClick(e, "about")} 
                  className="hover:text-white transition-colors font-semibold text-brand-400"
                >
                  About Our Founder
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Conversion Outreach (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">RECOVER YOUR OVERHEAD</h5>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Over 29% of your clinic calls are sliding to voicemail. Let Sam pick them up on the first ring and fill your calendar slots automatically.
            </p>
            <div>
              <button
                onClick={onBookDemoClick}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                Schedule Your System Demo
              </button>
            </div>
          </div>

        </div>

        {/* Legal and Copyright row */}
        <div className="pt-10 border-t border-slate-900 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-mono">
          <p>© {currentYear} Flow AI Voice Agency. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Clinical Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
