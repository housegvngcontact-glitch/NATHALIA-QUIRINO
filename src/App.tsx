
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// Icons
import { Instagram, Youtube } from 'lucide-react';

// Data
import { 
  servicesData, 
  recipesData, 
  faqData, 
  localPhotosData
} from './data';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { ResultsSection } from './components/Results';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Editorial } from './components/Editorial';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';

// Assets
import bgVideo from '../Videos e imagens/SaveInta.com_AQOsXjzEUa5ohlB2cACYe6sifmzxbxqoDRTIpvEafjy8SAEUbrzBSPVH4n51j1eIjmOXkzxHlXxhYiJz_g5905Miod5Bid9xq5KszdM.mp4';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRecipeTab, setActiveRecipeTab] = useState<'all' | 'dica' | 'receita'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  
  // UX States
  const [activeMainTab, setActiveMainTab] = useState<'home' | 'editorial'>('home');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerMax, setTimerMax] = useState<number>(300);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerRecipeId, setTimerRecipeId] = useState<string | null>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev <= 1 ? 0 : prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerActive, timerSeconds]);

  const startRecipeTimer = (recipeId: string, durationMinutes: number) => {
    const totalSeconds = durationMinutes * 60;
    setTimerRecipeId(recipeId);
    setTimerMax(totalSeconds);
    setTimerSeconds(totalSeconds);
    setTimerActive(true);
  };

  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 350;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const navigateToSection = (sectionId: string, mainTab: 'home' | 'editorial' = 'home') => {
    setActiveMainTab(mainTab);
    setMobileMenuOpen(false);
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  const formatTimerValue = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#121316] text-white font-sans selection:bg-[#C81D31]/30 relative overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#C81D31] z-[60] origin-left" style={{ scaleX }} />

      <Navbar 
        activeMainTab={activeMainTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        navigateToSection={navigateToSection} 
      />

      <AnimatePresence mode="wait">
        {activeMainTab === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Hero photo={localPhotosData[0]} />
            <Stats />

            {/* Social Links Bar */}
            <div className="bg-[#0D0E11] py-6 border-b border-white/5">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8">
                <a href="https://www.instagram.com/nutri.quirinonat/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs text-gray-400 hover:text-[#C81D31] transition-colors group">
                  <Instagram className="w-4 h-4 text-[#C81D31]" />
                  <span className="font-bold uppercase tracking-widest group-hover:text-white">Instagram</span>
                </a>
                <a href="https://www.youtube.com/channel/UC5fV2pUa7HLnZBDhZtnlytQ" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs text-gray-400 hover:text-rose-600 transition-colors group">
                  <Youtube className="w-4 h-4 text-rose-600" />
                  <span className="font-bold uppercase tracking-widest group-hover:text-white">YouTube</span>
                </a>
              </div>
            </div>

            <Services services={servicesData} />
            <ResultsSection photo={localPhotosData[0]} videoSrc={bgVideo} />
            <About photos={localPhotosData} />
            <Testimonials galleryRef={galleryRef} scrollGallery={scrollGallery} />
            <Faq faqData={faqData} expandedFaqIndex={expandedFaqIndex} toggleFaq={(i) => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)} />
          </motion.div>
        ) : (
          <motion.div
            key="editorial-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Editorial 
              recipes={recipesData as any}
              activeRecipeTab={activeRecipeTab}
              setActiveRecipeTab={setActiveRecipeTab}
              timerActive={timerActive}
              timerSeconds={timerSeconds}
              timerMax={timerMax}
              timerRecipeId={timerRecipeId}
              toggleTimer={() => setTimerActive(!timerActive)}
              resetTimer={() => { setTimerActive(false); setTimerSeconds(timerMax); }}
              startRecipeTimer={startRecipeTimer}
              formatTimerValue={formatTimerValue}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer navigateToSection={navigateToSection} />
    </div>
  );
}
