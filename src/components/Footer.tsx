import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#181818] text-cream py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">

        <div className="max-w-xs">
          <img src="/logo.png" alt="FleshxAI" className="h-10 mb-6" />
          <p className="text-cream/60 font-light text-sm mb-8 leading-relaxed">
            Elevating D2C beauty brands through high-converting UGC and breathtaking 3D product visuals.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/flesh_and_flow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/kuldeep-bopche" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:gap-24">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/40 mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light text-cream/80">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-cream/40 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-cream/80">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a
                  href="mailto:bopchekuldeep1@gmail.com"
                  className="hover:text-white transition-colors break-all leading-snug"
                >
                  bopchekuldeep1@gmail.com
                </a>
              </li>
              <li>Seoni, Madhya Pradesh</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-cream/40">
        <p>&copy; {new Date().getFullYear()} FleshxAI. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
