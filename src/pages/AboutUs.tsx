import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-cream font-sans text-ink selection:bg-blush-dark selection:text-ink overflow-x-hidden">
      <Nav />
      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto min-h-[70vh] flex items-center">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center justify-center w-full mt-10 md:mt-0">
          
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
            <div className="relative group rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out hover:scale-[1.025]">
              <img 
                src="/myimg.webp" 
                alt="Kuldeep - Founder, FleshxAI" 
                className="w-full max-w-sm object-cover rounded-[24px]"
              />
            </div>
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-ink/40 mt-6 text-center md:text-right md:mr-10">
              Kuldeep — Founder, FleshxAI
            </p>
          </div>

          <div className="w-full md:w-1/2 max-w-[600px]">
            <h1 className="text-4xl md:text-5xl font-serif mb-10 leading-[1.15]">
              Not Just Another Agency.<br/>
              <span className="italic font-light text-ink/60">A Creative Partner.</span>
            </h1>
            <div className="space-y-6 text-lg font-light leading-relaxed text-ink/80">
              <p>Hi, I’m Kuldeep.</p>
              <p>I started FleshxAI with one simple belief — most brands don’t lack good products, they lack attention.</p>
              <p>In today’s fast-scrolling world, if your content doesn’t capture attention instantly, it gets ignored.</p>
              <p>I specialize in creating high-impact 3D visuals and performance-driven creatives that not only look premium but also convert.</p>
              <p>Every project is crafted with precision, clarity, and a deep focus on results — no templates, no shortcuts.</p>
              <p>If you want your brand to stand out, not blend in — we should work together.</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
