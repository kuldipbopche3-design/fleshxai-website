import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import VSL from './components/VSL';
import Services from './components/Services';
import Trust from './components/Trust';
import Portfolio from './components/Portfolio';
import CaseStudies from './components/CaseStudies';
import VideoGallery from './components/VideoGallery';
import SocialProof from './components/SocialProof';
import Call from './components/Call';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import AboutUs from './pages/AboutUs';

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).targetId) {
      const targetId = (location.state as any).targetId;
      // We use a small timeout to let the DOM paint first
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      // Clear the state so it doesn't trigger again on reload
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-cream font-sans text-ink selection:bg-blush-dark selection:text-ink overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Carousel />
        <VSL />
        <Services />
        <Trust />
        <Portfolio />
        <CaseStudies />
        <VideoGallery />
        <Pricing />
        <SocialProof />
        <Call />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}


