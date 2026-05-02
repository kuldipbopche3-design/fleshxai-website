import { motion } from 'motion/react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const socials = [
  {
    name: 'Instagram',
    handle: '@AXION_KD',
    url: 'https://www.instagram.com/AXION_KD',
    color: '#E1306C',
    gradient: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    handle: '@kuldip_bopche',
    url: 'https://twitter.com/kuldip_bopche',
    color: '#fff',
    gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.851L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Kuldeep Bopche',
    url: 'https://www.linkedin.com/in/kuldeep-bopche',
    color: '#fff',
    gradient: 'linear-gradient(135deg, #0077B5 0%, #005f8d 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@india-with-AI',
    url: 'https://www.youtube.com/@india-with-AI',
    color: '#fff',
    gradient: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    handle: 'kuldipbopche3',
    url: 'https://www.pinterest.com/kuldipbopche3',
    color: '#fff',
    gradient: 'linear-gradient(135deg, #E60023 0%, #ad081b 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Kuldeep Bopche',
    url: 'https://www.facebook.com/share/p/1CtWmp6xFY/',
    color: '#fff',
    gradient: 'linear-gradient(135deg, #1877F2 0%, #0d5bbf 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans text-cream overflow-x-hidden">
      <Nav />

      {/* ── Hero Bio ── */}
      <main className="pt-36 pb-0 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-14 lg:gap-20 items-center justify-center w-full mt-6 md:mt-0">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-5/12 flex flex-col items-center md:items-end"
          >
            <div className="relative group">
              {/* Glow ring */}
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'linear-gradient(135deg,#D9F059,#a3b800,#D9F059)', filter: 'blur(10px)' }}
              />
              <div className="relative rounded-[24px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)]">
                <img
                  src="/myimg.webp"
                  alt="Kuldeep — Founder, FleshxAI"
                  className="w-full max-w-sm object-cover rounded-[24px] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-[24px]" />
              </div>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30 mt-5 text-center md:text-right">
              Kuldeep — Founder, FleshxAI
            </p>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-7/12 max-w-[600px]"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-sans font-light uppercase tracking-[0.3em] text-[#D9F059]">About Me</span>
              <div className="w-10 h-px bg-[#D9F059]/40" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-[1.12]">
              Hi, I'm Kuldeep —<br />
              <span className="italic font-light text-white/50">3D Visual Designer & Founder.</span>
            </h1>

            <div className="space-y-5 text-[1.05rem] font-light leading-relaxed text-white/70">
              <p>
                Most D2C brands don't struggle with their product.<br />
                <span className="text-white font-medium">They struggle with how it's seen.</span>
              </p>
              <p>
                In today's scroll-heavy market, if your ad doesn't stop attention in the
                first second — <span className="text-white">it's ignored.</span>
              </p>
              <p className="pl-4 border-l-2 border-[#D9F059]/40 text-white/50 text-base italic">
                Flat creatives, basic product shots, and generic ads are the biggest reason
                your campaigns don't perform.
              </p>
              <p>
                <span className="text-[#D9F059] font-medium">That's where I come in.</span>
              </p>
              <p>
                I design <span className="text-white">high-impact 3D product visuals</span> specifically built for ads —
                not just to look good, but to capture attention, increase CTR, and improve conversions.
              </p>
              <p>
                From skincare to premium products, I turn your product into a visual that
                feels <span className="text-white">impossible to ignore.</span>
              </p>
              <p>
                And unlike traditional agencies, you don't need a huge budget to get
                high-end creatives. You get <span className="text-[#D9F059]">premium-level visuals</span>,
                with a performance-first mindset.
              </p>
              <p className="text-white/90 font-normal pt-2">
                If your ads aren't performing the way they should —{' '}
                <span className="text-[#D9F059]">we should fix that.</span>
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8 border-t border-white/10 pt-8">
              {[
                { num: '50+', label: 'Brands Served' },
                { num: '3x', label: 'Avg. ROAS Lift' },
                { num: '100%', label: 'Creative First' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-serif text-[#D9F059]">{num}</div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Connect With Me ── */}
      <section className="mt-28 pb-32 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-[#D9F059]/40" />
              <span className="text-[11px] font-sans font-light uppercase tracking-[0.3em] text-[#D9F059]">Connect With Me</span>
              <div className="w-12 h-px bg-[#D9F059]/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Let's Stay in Touch
            </h2>
            <p className="text-white/40 mt-4 text-base font-light">
              Follow the journey across every platform.
            </p>
          </motion.div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="about-social-card group"
                aria-label={`${social.name} — ${social.handle}`}
              >
                {/* Animated gradient border on hover */}
                <div
                  className="about-social-card__border"
                  style={{ background: social.gradient }}
                />

                <div className="about-social-card__inner">
                  {/* Icon bubble */}
                  <motion.div
                    className="about-social-card__icon"
                    style={{ background: social.gradient, color: social.color }}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {social.icon}
                  </motion.div>

                  {/* Text */}
                  <div className="mt-4">
                    <div className="about-social-card__platform">{social.name}</div>
                    <div className="about-social-card__handle">{social.handle}</div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="about-social-card__arrow"
                    initial={{ x: -4, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
