import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const baseLinks = ['Services', 'Work', 'Campaigns', 'Trust', 'Pricing'];
  const links = location.pathname === '/about' ? ['Home', ...baseLinks] : ['About Us', ...baseLinks];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (item === 'About Us') {
      navigate('/about');
      return;
    }

    if (item === 'Home') {
      navigate('/');
      return;
    }

    const targetId = item.toLowerCase();

    if (location.pathname !== '/') {
      navigate('/', { state: { targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { targetId: 'call' } });
    } else {
      const element = document.getElementById('call');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-4 sm:mt-6 px-4 pointer-events-none">

        {/* Desktop Nav */}
        <motion.nav
          animate={{
            backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.95)' : 'rgba(10, 10, 10, 0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.15)' : 'none',
            padding: scrolled ? '12px 24px' : '16px 24px',
            borderRadius: scrolled ? '100px' : '0px',
            width: scrolled ? 'auto' : '100%',
            border: scrolled ? '1px solid rgba(26,26,26,0.08)' : '1px solid transparent',
            color: scrolled ? '#1A1A1A' : '#FDFBF7',
          }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
          style={{ willChange: 'transform, background-color, color' }}
          className="hidden md:flex relative items-center justify-between w-full max-w-7xl mx-auto pointer-events-auto"
        >
          <Link to="/" className="text-xl md:text-2xl font-serif font-bold mr-8 focus:outline-none shrink-0 transition-colors duration-300" style={{ textDecoration: 'none', color: 'inherit' }}>
            FleshxAI
          </Link>

          <div className="flex items-center space-x-8">
            {links.map((item) => (
              <a
                key={item}
                href={item === 'About Us' ? '/about' : item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, item)}
                className="text-xs uppercase tracking-[0.15em] font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {item}
              </a>
            ))}
            <div className="ml-4 p-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 inline-block shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <a
                href="https://calendly.com/kuldipbopche3/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-2.5 text-[10px] uppercase tracking-[0.15em] font-medium transition-all rounded-full bg-ink text-cream hover:bg-ink-light whitespace-nowrap"
              >
                Book a Call
              </a>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Dynamic Island Nav */}
        <motion.nav
          ref={menuRef}
          layout
          animate={{
            width: isOpen ? 280 : 131,
            height: isOpen ? 'auto' : 35,
            borderRadius: isOpen ? 32 : 24,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="md:hidden overflow-hidden bg-ink/95 backdrop-blur-xl text-cream pointer-events-auto shadow-2xl flex flex-col mx-auto cursor-pointer border border-white/10"
          onClick={() => !isOpen && setIsOpen(true)}
        >
          <motion.div layout className="flex items-center justify-center w-full h-[40px] text-[#fdf7fc] shrink-0 relative" onClick={(e) => { if (isOpen) { e.stopPropagation(); setIsOpen(false); } }}>
            {isOpen ? (
              <div className="w-12 h-1.5 rounded-full bg-white/20 mt-2 mb-2 absolute bottom-2" />
            ) : (
              <div className="flex items-center gap-2 h-[25px]">
                <span className="w-1.5 h-1.5 bg-[#D9F059] rounded-full animate-pulse shadow-[0_0_8px_#D9F059]"></span>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold mt-[1px]">Menu</span>
              </div>
            )}
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center space-y-6 pt-2 pb-6 px-6"
              >
                <Link to="/" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-xl font-serif tracking-widest font-bold uppercase mb-2 border-b border-white/10 pb-4 w-full text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                  FleshxAI
                </Link>
                {links.map((item, index) => (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    key={item}
                    href={item === 'About Us' ? '/about' : item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="text-sm uppercase tracking-[0.2em] font-medium opacity-80 hover:opacity-100 hover:text-[#D9F059] transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="https://calendly.com/kuldipbopche3/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-[2px] rounded-[16px] mt-2 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(56,189,248,0.4)] block"
                >
                  <div className="px-6 py-3.5 bg-ink text-white text-xs uppercase tracking-[0.2em] font-bold rounded-[14px] w-full text-center hover:bg-ink-light transition-colors">
                    Book a Call
                  </div>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

      </div>
    </>
  );
}
