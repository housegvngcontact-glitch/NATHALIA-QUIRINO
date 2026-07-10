import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// Assets moved to public folder for Vercel deployment support
import { 
  Award, 
  Zap, 
  Heart, 
  Utensils, 
  BookOpen, 
  Clock, 
  MapPin, 
  Instagram, 
  Youtube, 
  Mail, 
  ArrowUpRight, 
  ChevronDown, 
  Sparkles, 
  Check, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  Flame, 
  FileCode, 
  Compass,
  ArrowRight,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Star,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { 
  servicesData, 
  recipesData, 
  faqData, 
  localPhotosData,
  localSeoData
} from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRecipeTab, setActiveRecipeTab] = useState<'all' | 'dica' | 'receita'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  
  // High-End UX states
  const [activeMainTab, setActiveMainTab] = useState<'home' | 'editorial'>('home');
  const [recipeScale, setRecipeScale] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerMax, setTimerMax] = useState<number>(300); // Default 5 mins
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerRecipeId, setTimerRecipeId] = useState<string | null>(null);

  // Timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  const startRecipeTimer = (recipeId: string, durationMinutes: number) => {
    const totalSeconds = durationMinutes * 60;
    setTimerRecipeId(recipeId);
    setTimerMax(totalSeconds);
    setTimerSeconds(totalSeconds);
    setTimerActive(true);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(timerMax);
  };

  const formatTimerValue = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
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
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-white font-sans selection:bg-[#C81D31]/30 selection:text-white relative overflow-hidden">
      
      {/* ⚡ FLOATING NAV BAR */}
      <header className="sticky top-0 z-50 bg-[#121316]/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => navigateToSection('home', 'home')} 
            className="flex flex-col items-start leading-none group text-left cursor-pointer"
          >
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#C81D31] transition-colors">
              NATHALIA <span className="text-[#C81D31]">QUIRINO</span>
            </span>
            <span className="editorial-label text-[9px] text-gray-400 mt-1">
              NUTRICIONISTA CLÍNICA
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-gray-300">
            <button 
              onClick={() => navigateToSection('home', 'home')} 
              className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeMainTab === 'home' ? 'text-[#C81D31] font-extrabold' : 'hover:text-[#C81D31]'
              }`}
            >
              Início
            </button>
            <button onClick={() => navigateToSection('servicos', 'home')} className="text-xs font-bold uppercase tracking-widest hover:text-[#C81D31] transition-colors cursor-pointer">Serviços</button>
            <button onClick={() => navigateToSection('resultados', 'home')} className="text-xs font-bold uppercase tracking-widest hover:text-[#C81D31] transition-colors cursor-pointer">Performance</button>
            <button onClick={() => navigateToSection('trajetoria', 'home')} className="text-xs font-bold uppercase tracking-widest hover:text-[#C81D31] transition-colors cursor-pointer">Sobre a Nutri</button>
            <button 
              onClick={() => navigateToSection('dicas-receitas', 'editorial')} 
              className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeMainTab === 'editorial' ? 'text-[#C81D31] font-extrabold' : 'hover:text-[#C81D31]'
              }`}
            >
              Dicas & Receitas
            </button>
            <button onClick={() => navigateToSection('localizacao', 'home')} className="text-xs font-bold uppercase tracking-widest hover:text-[#C81D31] transition-colors cursor-pointer">Contato</button>
          </nav>

          {/* CTAs Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://api.whatsapp.com/send?phone=5521960193925" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-editorial"
            >
              <span>Agendar Consulta</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C81D31] transition-colors cursor-pointer"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#0D0E11] text-white z-40 px-6 py-8 flex flex-col space-y-6 lg:hidden border-t border-white/10 overflow-y-auto"
          >
            <button 
              onClick={() => navigateToSection('home', 'home')} 
              className={`text-left text-lg font-medium border-b border-white/10 pb-3 transition-colors ${
                activeMainTab === 'home' ? 'text-[#C81D31]' : 'hover:text-[#C81D31]'
              }`}
            >
              Início
            </button>
            <button onClick={() => navigateToSection('servicos', 'home')} className="text-left text-lg font-medium border-b border-white/10 pb-3 hover:text-[#C81D31] transition-colors">Serviços</button>
            <button onClick={() => navigateToSection('resultados', 'home')} className="text-left text-lg font-medium border-b border-white/10 pb-3 hover:text-[#C81D31] transition-colors">Performance</button>
            <button onClick={() => navigateToSection('trajetoria', 'home')} className="text-left text-lg font-medium border-b border-white/10 pb-3 hover:text-[#C81D31] transition-colors">Sobre a Nutri</button>
            <button 
              onClick={() => navigateToSection('dicas-receitas', 'editorial')} 
              className={`text-left text-lg font-medium border-b border-white/10 pb-3 transition-colors ${
                activeMainTab === 'editorial' ? 'text-[#C81D31]' : 'hover:text-[#C81D31]'
              }`}
            >
              Dicas & Receitas
            </button>
            <button onClick={() => navigateToSection('localizacao', 'home')} className="text-left text-lg font-medium border-b border-white/10 pb-3 hover:text-[#C81D31] transition-colors">Contato & Localização</button>

            <div className="pt-6 flex flex-col space-y-4">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C81D31] hover:bg-[#DE2036] text-white py-4 rounded-sm font-semibold tracking-wide uppercase text-center block text-sm shadow-lg shadow-orange-500/10"
              >
                Falar Conosco no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeMainTab === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* 🚀 HERO SECTION: DUALIDADE DE FORÇA */}
            <motion.section 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1 }} 
              id="home" 
              className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
            >
              {/* Massive Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={localPhotosData[0].originalPath} 
                  alt="Nathalia Quirino" 
                  className="w-full h-full object-cover object-[center_20%] md:object-top"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  decoding="async"
                />
                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#16171B]/95 via-[#16171B]/80 md:via-[#16171B]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#16171B] via-[#16171B]/40 to-transparent"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 md:grid-cols-2">
                
                {/* Copywriter / Text Column */}
                <div className="space-y-8 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 border-b-2 border-[#C81D31] pb-1">
                    <Sparkles className="w-4 h-4 text-[#C81D31]" />
                    <span className="editorial-label text-white font-bold">Conceito: Dualidade de Força</span>
                  </div>

                  <h1 className="massive-title uppercase italic text-white leading-none mb-6">
                    A Precisão do <span className="text-[#C81D31]">Rigor Clínico</span>.<br className="hidden md:inline" />
                    A Força da <span className="text-[#C81D31]">Performance</span>.
                  </h1>

                  <p className="text-base md:text-lg text-gray-300 font-sans leading-relaxed max-w-xl">
                    Sou <strong>Nathalia Quirino</strong>. Uno a responsabilidade científica de quem atuou na nutrição clínica hospitalar — lidando com quadros críticos que exigem extremo cuidado metabólico — com a vivência real das lutas de judô e dos palcos de fisiculturismo. 
                    <br /><br />
                    Minha prescrição não é um pedaço de papel estático. É uma metodologia desenhada para quem exige resultados estéticos rápidos e duradouros, sem sabotar a saúde interna.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <a 
                      href="https://api.whatsapp.com/send?phone=5521960193925" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      id="hero-cta-main"
                      className="btn-editorial"
                    >
                      <span>Agendar Consulta</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </a>

                    <a 
                      href="#servicos" 
                      className="btn-editorial-outline"
                    >
                      <span>Conhecer Metodologia</span>
                    </a>
                  </div>

                  {/* Direct Links Social Proof */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Acesse também:</span>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="https://www.instagram.com/nutri.quirinonat/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-1 text-xs text-gray-300 hover:text-[#C81D31] transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-[#C81D31]" />
                        <span className="font-semibold">@nutri.quirinonat</span>
                      </a>
                      <a 
                        href="https://www.youtube.com/channel/UC5fV2pUa7HLnZBDhZtnlytQ" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-1 text-xs text-gray-300 hover:text-rose-600 transition-colors"
                      >
                        <Youtube className="w-4 h-4 text-rose-600" />
                        <span className="font-semibold">Canal YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Optional right side empty space for the image to breathe */}
                <div className="hidden md:block"></div>
                
              </div>
            </motion.section>

      {/* 📊 CLINICALLY DRIVEN STATS BLOCK */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="bg-white/[0.02] text-white py-12 border-y border-white/10 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="text-center space-y-1">
            <span className="block font-mono text-[#C81D31] text-xs uppercase tracking-widest font-bold">Metodologia</span>
            <p className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">100% Individual</p>
            <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">Adaptado à sua rotina, rotina de treinos e exames clínicos.</p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="block font-mono text-[#C81D31] text-xs uppercase tracking-widest font-bold">Base Clínica</span>
            <p className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">Rigor Hospitalar</p>
            <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">Segurança total com a saúde do seu fígado, rins e metabolismo.</p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="block font-mono text-[#C81D31] text-xs uppercase tracking-widest font-bold">Prática Atlética</span>
            <p className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">Judô / Fitness</p>
            <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">Vivência de quem sabe a dificuldade da rotina de treinos.</p>
          </div>

          <div className="text-center space-y-1 border-l border-white/10">
            <span className="block font-mono text-[#C81D31] text-xs uppercase tracking-widest font-bold">Acompanhamento</span>
            <p className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">Suporte Direto</p>
            <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">Suporte exclusivo por WhatsApp para blindar sua constância.</p>
          </div>

        </div>
      </motion.section>

      {/* 🧬 METODOLOGIAS DE ACOMPANHAMENTO */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="servicos" className="py-24 max-w-7xl mx-auto px-6 relative">
        {/* Subtle decorative glowing background spot */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#C81D31]/5 rounded-full blur-[120px] transform-gpu pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
          <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold">Acompanhamentos de Precisão</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase italic">
            Estratégias Desenhadas Para Evolução Real
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
            Planos alimentares baseados em rigor científico e adaptados à realidade do seu dia a dia. Escolha o formato ideal para a sua rotina.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
          
          {/* Card 1: Consulta Nutricional Presencial */}
          <div className="bg-[#212328]/60 backdrop-blur-md border border-white/10 rounded-sm p-8 flex flex-col justify-between shadow-2xl hover:border-[#C81D31]/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#C81D31] transition-colors"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="editorial-label text-[10px] bg-white/5 text-gray-300 py-1 px-3 rounded-sm font-bold">Presencial RJ</span>
                <span className="text-[#C81D31] font-mono text-xs font-semibold">{servicesData[0].duration}</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight uppercase">{servicesData[0].title}</h3>
                <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">{servicesData[0].subtitle}</p>
              </div>

              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-sans">
                {servicesData[0].description}
              </p>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="editorial-label text-[#C81D31] font-bold tracking-wider mb-2 text-xs uppercase">O que está incluso:</p>
                {servicesData[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-[#C81D31] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925" 
                target="_blank" 
                rel="noopener noreferrer"
                id="cta-servico-presencial"
                className="w-full bg-white/[0.04] border border-white/10 text-white hover:bg-[#C81D31] hover:border-[#C81D31] py-4 rounded-sm text-center font-bold text-xs tracking-wider uppercase block transition-all duration-300"
              >
                Falar Conosco no WhatsApp
              </a>
              <p className="text-center text-[10px] text-neutral-500 mt-2.5">Indicado para {servicesData[0].target}</p>
            </div>
          </div>

          {/* Card 2: Consulta Nutricional Online */}
          <div className="bg-[#212328]/60 backdrop-blur-md border border-white/10 rounded-sm p-8 flex flex-col justify-between shadow-2xl hover:border-[#C81D31]/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#C81D31] transition-colors"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="editorial-label text-[10px] bg-[#C81D31]/10 text-[#C81D31] py-1 px-3 rounded-sm font-bold">Atendimento Global</span>
                <span className="text-[#C81D31] font-mono text-xs font-semibold">{servicesData[1].duration}</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight uppercase">{servicesData[1].title}</h3>
                <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">{servicesData[1].subtitle}</p>
              </div>

              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-sans">
                {servicesData[1].description}
              </p>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="editorial-label text-[#C81D31] font-bold tracking-wider mb-2 text-xs uppercase">O que está incluso:</p>
                {servicesData[1].highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-[#C81D31] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925" 
                target="_blank" 
                rel="noopener noreferrer"
                id="cta-servico-online"
                className="w-full bg-[#C81D31] text-white hover:bg-[#A61729] py-4 rounded-sm text-center font-bold text-xs tracking-wider uppercase block transition-all duration-300"
              >
                Falar Conosco no WhatsApp
              </a>
              <p className="text-center text-[10px] text-neutral-500 mt-2.5">Indicado para {servicesData[1].target}</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 📸 VIVÊNCIA E PERFORMANCE (VIDEO & CONCEPT) */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="resultados" className="bg-[#121316] border-y border-white/5 py-24 overflow-hidden relative">
        {/* Soft elegant radial glowing backdrop */}
        <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#C81D31]/5 rounded-full blur-[140px] transform-gpu pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Copywriter Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">Prática de Alto Nível</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase italic leading-tight">
                Vivência Real Que Valida A Teoria
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
                A melhor estratégia nutricional não vem apenas de artigos científicos — vem da fusão perfeita entre a ciência rígida e a vivência diária.
                <br /><br />
                Como lutadora ativa de Judô e atleta focada, eu compreendo a exata dificuldade de manter a consistência, os desafios de conciliar rotina, treinos intensos e o planejamento alimentar necessário para obter resultados estéticos e de força de verdade. 
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=5521960193925" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-editorial inline-flex items-center justify-center text-center"
                >
                  <span>Iniciar Minha Evolução</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            </div>

            {/* Video Player Column */}
            <div className="lg:col-span-7">
              <div className="border border-white/10 p-3 bg-white/[0.02] rounded-sm relative">
                <div className="aspect-[16/9] rounded-sm overflow-hidden bg-neutral-950 relative shadow-2xl">
                  <video 
                    src="/video/SaveInta.com_AQOsXjzEUa5ohlB2cACYe6sifmzxbxqoDRTIpvEafjy8SAEUbrzBSPVH4n51j1eIjmOXkzxHlXxhYiJz_g5905Miod5Bid9xq5KszdM.mp4" 
                    className="w-full h-full object-cover"
                    controls
                    loop
                    muted
                    playsInline
                    poster="/imagem/SaveInta.com_729544048_18604630963014871_6694892131638525913_n.jpg"
                  />
                  <div className="absolute top-4 right-4 bg-[#121316]/80 border border-white/10 backdrop-blur-sm px-3 py-1 rounded-sm text-white font-mono text-[9px] uppercase tracking-wider">
                    Vídeo Exclusivo
                  </div>
                </div>
              </div>
              <p className="text-center text-[11px] text-neutral-500 font-mono mt-3">
                🎬 Aperte o play para conferir a vivência prática e o foco de Nathalia Quirino.
              </p>
            </div>

          </div>

          {/* 🌟 PROVAS SOCIAIS: DEPOIMENTOS DE PACIENTES */}
          <div className="mt-24 pt-16 border-t border-white/5 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[#C81D31]">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">Depoimentos Reais de Pacientes</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase italic">
                  Provas Sociais & Histórias de Sucesso
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm max-w-xl font-sans">
                  Resultados práticos de pessoas reais que integraram rigor científico e disciplina para emagrecer, ganhar massa e recuperar a saúde.
                </p>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block mr-2">
                  <div className="flex items-center space-x-1 justify-end text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">Excelência Nutricional</span>
                </div>
                
                <button 
                  onClick={() => scrollGallery('left')}
                  className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#C81D31]/40 hover:bg-[#C81D31]/10 rounded-sm text-white transition-colors cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollGallery('right')}
                  className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#C81D31]/40 hover:bg-[#C81D31]/10 rounded-sm text-white transition-colors cursor-pointer"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Testimonials Slider Container */}
            <div 
              ref={galleryRef}
              className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
            >
              {[
                {
                  name: "Paciente 1",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Emagrecimento & Reeducação Alimentar",
                  result: "Emagrecimento",
                  text: "Uma mudança incrível de composição corporal, priorizando a perda de gordura e manutenção da massa magra com comida de verdade.",
                  stars: 5,
                  tag: "Emagrecimento",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/549485541_18078939464495070_7167340875126025666_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=103&ig_cache_key=MjQ1Mzk1NDI3NzkyMDg0ODYzOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEyNDIuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=P2SsR3vuBEsQ7kNvwEyD-oq&_nc_oc=Adq5i0maU0hXkyj1pcpwc_JkWGF9N10GFtCVVgTRXSVJJSRiFpQB2ZUwZZHS_XM3UdA7PcbjjPEGEY43DgDygZSl&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQC4iQa55gQYoNQBMqdEadItKhHDJRh5N4Pd8I3OplVDQg&oe=6A572EE2"
                },
                {
                  name: "Paciente 2",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Hipertrofia & Disposição para Treinos",
                  result: "Definição",
                  text: "Protocolo nutricional focado em densidade muscular e definição, aliado à performance nos treinos intensos diários.",
                  stars: 5,
                  tag: "Hipertrofia",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/551172492_18079124678304820_1370414004233368566_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=107&ig_cache_key=MjUzMTQ5NTQ4MTIwOTk5Njc3NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEyNDIuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=a4tURwF1gkUQ7kNvwH1m85f&_nc_oc=AdolnJypjRC7_y7qpEq-3qBavluUMeALA0FW8XMYquMjwPXcx4S2rLX02b3p1fovPjmdee5PB2bA28pp48FNu0XI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQCTzGmz33SXpLQTwnVK1FZNwE721STXMkQ-A78-cR78Ag&oe=6A570CA7"
                },
                {
                  name: "Paciente 3",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Saúde Clínica & Regulação Metabólica",
                  result: "Mudança Corporal",
                  text: "Além da visível melhora estética, exames clínicos perfeitos e muita energia para o dia a dia. Nutrição com base científica.",
                  stars: 5,
                  tag: "Performance",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/571155811_18108779191595728_3307279836678289190_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=104&ig_cache_key=MjY3NzkwMjc0NTcxMDA1MjA5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEyNDIuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=T-qNFex53yYQ7kNvwGs8asw&_nc_oc=AdoHzxZw_vTYipr7_O6X239PPGsmcRvHS-cRC8Ew87tQwpiLcobEfJc-X9iHox97m4wHFKBMuG9oTZfauNBp4gKl&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQDCl5hOtzuF-JtnZUKuN3WTXiT50drCCPX_ghssBslxVw&oe=6A571930"
                },
                {
                  name: "Paciente 4",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Performance Esportiva & Definição",
                  result: "Composição Corporal",
                  text: "Reestruturação completa da alimentação para garantir saciedade, performance metabólica e uma definição impressionante.",
                  stars: 5,
                  tag: "Saúde Integrativa",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/581132946_18289893283278038_600493320419025168_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=102&ig_cache_key=Mjk4MzgzODcyNzAwNjA1NTM4NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEyNDIuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=fu9hd8_rfwEQ7kNvwGXHbG7&_nc_oc=Adq-tcI7_7t8yje0sEJws4s2L6zzy4MO_I97-Ec-EZRTtotnikBSsicFXiZ4FALIdUvGiVWdFM4k_9i_wybemr5R&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQAZkKCVMZte0uEBcMAMa5IROmY_l9TTQ3fEWQM7DnrDwQ&oe=6A573670"
                },
                {
                  name: "Paciente 5",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Saúde & Estética",
                  result: "Vitalidade & Forma",
                  text: "Alcançando o equilíbrio perfeito entre o corpo dos sonhos e exames excelentes. Nutrição que respeita a individualidade.",
                  stars: 5,
                  tag: "Resultados",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/566877348_18093644905655603_5291044603055282924_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=110&ig_cache_key=MzA4MzE1MDUxMzU3NTc0MjExOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEyNDIuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=TXTNflvyScoQ7kNvwE6oCga&_nc_oc=AdoxneGzssFTtjkKBoTFER7jjdWqwFbncNVkbXIHv3-YIPUx5wBny92FTZ6WJJaAvpqAb-exKstWqFs25qZ2ZAyt&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQBWU5840MChPTE8yB6AsIhYN4UPcctCfgsTEkJq6i_88Q&oe=6A57380F"
                },
                {
                  name: "Paciente 6",
                  age: "Resultado",
                  location: "Evolução",
                  objective: "Reconstrução Metabólica",
                  result: "Qualidade de Vida",
                  text: "Transformação que vai muito além do espelho. Protocolo focado em restabelecer a saúde e otimizar a máquina humana.",
                  stars: 5,
                  tag: "Transformação",
                  image: "https://instagram.fgig20-1.fna.fbcdn.net/v/t51.82787-15/565027825_18074760917154184_4232637953774717387_n.jpg?stp=dst-jpg_e35_p480x480_tt6&_nc_cat=108&ig_cache_key=Mzc0NDgwNjgxNzIxNTEyMjA0Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjExNzAuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=gvmWlb0MMWgQ7kNvwEAZBap&_nc_oc=AdrH502KGzGFl3Y8Ly-1FBEHxGfur0FcQG2i6UUo6cCpLRGfIYw-njG5izpG6Q2WdCOymgUhtB7fqTlIrUWnxXmO&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fgig20-1.fna&_nc_gid=lhFlBrFxmg6ENN3AXyu_rg&_nc_ss=7a22e&oh=00_AQDEP94ev2y-qxgtF_wCn165LJBIuyBXfdj9YrklDQ9iwA&oe=6A57060B"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                  className="min-w-[280px] sm:min-w-[320px] bg-[#212328]/60 backdrop-blur-md border border-white/10 p-5 rounded-sm flex flex-col justify-between space-y-4 snap-start hover:border-[#C81D31]/40 hover:bg-[#C81D31]/5 transition-all duration-300 text-white cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-wider bg-[#C81D31]/15 text-[#C81D31] px-2.5 py-1 rounded-sm font-bold">
                        {item.tag}
                      </span>
                      <div className="flex items-center space-x-1 text-amber-500">
                        {[...Array(item.stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/10 relative">
                       <motion.img 
                         whileHover={{ scale: 1.05 }}
                         transition={{ duration: 0.4 }}
                         src={item.image} 
                         alt={item.name} 
                         className="w-full h-full object-cover" 
                         referrerPolicy="no-referrer" 
                         loading="lazy"
                         decoding="async"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#212328] via-transparent to-transparent opacity-60"></div>
                    </div>

                    <p className="text-gray-300 text-xs font-sans leading-relaxed italic line-clamp-3 group-hover:text-white transition-colors">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs text-white">{item.name}</h4>
                      <p className="text-[9px] text-neutral-400 font-mono mt-0.5">{item.age} • {item.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-[#C81D31] font-bold block uppercase tracking-wide">Resultado</span>
                      <span className="text-[10px] text-white font-semibold block">{item.result}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-2">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/[0.02] border border-white/10 hover:border-[#C81D31] hover:bg-[#C81D31]/10 text-white font-mono text-[10px] uppercase font-bold tracking-wider py-3.5 px-6 rounded-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#C81D31]" />
                <span>Iniciar Minha Evolução Personalizada</span>
              </a>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 🥋 ABOUT/TRAJETÓRIA: CONCEITO "DUALIDADE DE FORÇA" */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1 }} 
        id="trajetoria" 
        className="py-24 relative overflow-hidden bg-[#121316]"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
            <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">A Profissional por Trás do Método</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-white mb-6">
              O Rigor da Ciência.<br/> A Disciplina do Esporte.
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              Minha formação une o rigor acadêmico-hospitalar com a prática esportiva de alto nível. Eu não prescrevo apenas o que li em livros; prescrevo o que a ciência valida e o que eu mesma vivo no dia a dia.
            </p>
          </div>

          {/* New Clean Apple-like layout for Duality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Clinical Authority Block (Image Background) */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group min-h-[500px] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={localPhotosData[3].placeholderUrl} 
                  alt="Clínica" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#C81D31]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">Autoridade Clínica</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                  Precisão Científica e Responsabilidade
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-sans max-w-sm">
                  Atuei em quadros de extrema delicadeza no ambiente hospitalar. Respeito a integridade do seu metabolismo, porque sua saúde interna é inegociável.
                </p>
              </div>
            </motion.div>

            {/* Practical Performance Block (Image Background) */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group min-h-[500px] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={localPhotosData[2].placeholderUrl} 
                  alt="Performance" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mb-2">
                  <Flame className="w-4 h-4 text-[#C81D31]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">Alta Performance</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                  A Prática da Constância e Disciplina
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-sans max-w-sm">
                  Sou atleta dedicada de Fisiculturismo e lutadora de Judô. Conheço os bastidores da disciplina alimentar para manter constância mesmo em dias cansados.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Core Philosophie Quote */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 relative overflow-hidden rounded-2xl p-px bg-gradient-to-b from-white/10 to-transparent"
          >
            <div className="bg-[#16171B] backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center space-y-6">
              <span className="text-[#C81D31] font-mono text-[10px] uppercase tracking-widest block font-bold">Minha Filosofia Nutricional</span>
              <p className="text-xl md:text-2xl font-display font-medium leading-relaxed italic text-white max-w-3xl mx-auto">
                "Dieta sustentável é aquela estruturada de forma inteligente, onde a comida de verdade atua no seu metabolismo e a consistência gera a mudança estética."
              </p>
              <span className="text-xs font-mono text-neutral-500 block">— Nathalia Quirino, Nutricionista Clínica</span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* 🙋‍♀️ FAQ SECTION */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="py-24 bg-[#121316] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">Dúvidas Frequentes</span>
            <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
              Perguntas e Respostas sobre o Método
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Respostas diretas e transparentes para as dúvidas mais comuns de novos pacientes.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#1A1C20] border border-white/10 rounded-sm overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    id={`faq-btn-${idx}`}
                    className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-display font-bold text-sm md:text-base text-white">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#C81D31] shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-neutral-300 leading-relaxed border-t border-white/5 font-sans bg-[#121316]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="bg-[#1A1C20] border border-white/10 p-8 rounded-sm text-center mt-12 space-y-4 shadow-md">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-tight">Sua dúvida não foi listada aqui?</h4>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Sem problemas. Meu suporte direto por WhatsApp está pronto para lhe responder de forma personalizada em poucos minutos.
            </p>
            <a 
              href="https://api.whatsapp.com/send?phone=5521960193925" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex bg-[#C81D31] hover:bg-[#DE2036] text-white font-semibold text-[10px] tracking-wider uppercase px-6 py-3.5 rounded-sm transition-colors cursor-pointer shadow-lg shadow-orange-500/10"
            >
              Falar com Suporte WhatsApp
            </a>
          </div>

        </div>
      </motion.section>

      {/* 🗺️ LOCALIZAÇÃO, AGENDA E MAPA FÍSICO */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="localizacao" className="py-24 border-t border-white/5 bg-[#121316]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Hours and physical location info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">Rio de Janeiro</span>
              <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                Consultório Presencial & Agenda
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                Estou localizada em uma região de facílimo acesso no Rio de Janeiro, no coração do corredor clínico e cultural, atendendo pacientes presenciais do Centro, Tijuca, Lapa, Glória e Botafogo.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-[#1A1C20] p-6 rounded-sm border border-white/10 space-y-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C81D31] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-tight text-white">Nosso Endereço Físico</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed font-sans">
                    Rua Riachuelo, 366 <br />
                    Rio de Janeiro, RJ — CEP 20230-014
                  </p>
                  <span className="text-[10px] text-neutral-500 block mt-1 font-mono">Próximo a Lapa, Glória e conexões do Metrô</span>
                </div>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Clock className="w-4 h-4 text-[#C81D31]" />
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">Horários de Atendimento</h4>
              </div>

              <div className="border border-white/10 rounded-sm overflow-hidden bg-[#1A1C20] shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 font-semibold text-neutral-300">Terça, Quinta e Sexta-feira</td>
                      <td className="py-3 px-4 text-right text-white font-mono font-semibold">09:00h às 18:00h</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 font-semibold text-neutral-300">Quarta-feira</td>
                      <td className="py-3 px-4 text-right text-white font-mono font-semibold">09:00h às 13:00h</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 font-semibold text-neutral-300">Sábado</td>
                      <td className="py-3 px-4 text-right text-white font-mono font-semibold">09:00h às 14:00h</td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 font-semibold text-neutral-500">Domingo e Segunda-feira</td>
                      <td className="py-3 px-4 text-right text-neutral-500 font-mono">Fechado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right: Embedded Interactive Map or custom Local Map Visualizer */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-[#1A1C20] rounded-sm border border-white/10 p-4 h-full flex flex-col justify-between space-y-4 shadow-sm">
              
              {/* Clean Map Iframe placeholder with deep search link */}
              <div className="w-full aspect-[16/10] lg:aspect-square bg-[#121316] rounded-sm overflow-hidden relative border border-white/5">
                <iframe
                  title="Mapa Local Nutri Nathalia Quirino"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Rua%20Riachuelo,%20366,%20Rio%20de%20Janeiro&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
                
                {/* Visual marker overlay */}
                <div className="absolute bottom-3 right-3 bg-[#121316]/90 backdrop-blur-sm border border-white/10 text-white px-3 py-1.5 rounded-sm text-[10px] font-mono flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-[#C81D31]" />
                  <span>Rua Riachuelo, 366</span>
                </div>
              </div>

              {/* Geographic neighborhoods targeted (important for Local SEO search indexing) */}
              <div className="p-2 space-y-2">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Bairros vizinhos de fácil acesso presencial:</p>
                <div className="flex flex-wrap gap-1.5">
                  {localSeoData.neighborhoods.map((n, i) => (
                    <span key={i} className="bg-white/[0.04] border border-white/10 text-neutral-300 text-[10px] font-sans px-2.5 py-1 rounded-sm">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Navigation link */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Rua+Riachuelo+366+Rio+de+Janeiro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white/[0.04] border border-white/10 hover:bg-[#C81D31] hover:border-[#C81D31] hover:text-white text-white py-4 rounded-sm text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Traçar Rota no Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>
      </motion.section>

          </motion.div>
        ) : (
          <motion.div
            key="editorial-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* 🥗 SEÇÃO EXCLUSIVA DE DICAS E RECEITAS ATUALIZADA (SEO/AEO/GEO) */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} id="dicas-receitas" className="py-16 md:py-24 relative overflow-hidden text-white bg-[#121316]">
              {/* Soft decorative background glow */}
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C81D31]/10 rounded-full blur-[140px] transform-gpu pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] transform-gpu pointer-events-none" />
              
              {/* Decorative Floating Particles (Framer Motion) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Floating Circle with "Fibras" */}
                <motion.div
                  animate={{ y: [0, -25, 0], x: [0, 10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="absolute top-20 right-[15%] border border-white/10 bg-white/[0.03] backdrop-blur-md text-[#C81D31] text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg hidden lg:flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#C81D31] animate-pulse" />
                  <span>Fibras Nutritivas</span>
                </motion.div>

                {/* Floating Circle with "Micronutrientes" */}
                <motion.div
                  animate={{ y: [0, 20, 0], x: [0, -15, 0], rotate: [0, -8, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-40 left-[10%] border border-white/10 bg-white/[0.03] backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg hidden lg:flex items-center space-x-1.5"
                >
                  <Check className="w-3 h-3 text-[#C81D31]" />
                  <span>Micronutrientes</span>
                </motion.div>

                {/* Floating Circle with "Sabor & Saciedade" */}
                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, -10, 0], rotate: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                  className="absolute top-[45%] right-[8%] border border-white/10 bg-white/[0.03] backdrop-blur-md text-gray-300 text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg hidden lg:flex items-center space-x-1.5"
                >
                  <Activity className="w-3 h-3 text-[#C81D31]" />
                  <span>Alta Saciedade</span>
                </motion.div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Heading */}
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                  <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">
                    Conteúdo Editorial Saudável
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase italic leading-tight">
                    Mini-Portal de Dicas & Receitas de Alta Nutrição
                  </h1>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans">
                    Ciência prática desenhada para a sua rotina doméstica. Aprenda técnicas avançadas de higiene e prepare receitas funcionais deliciosas prescritas pela Nutri.
                  </p>

                  {/* Tabs for filtering recipes with beautiful pill slider animation */}
                  <div className="inline-flex bg-white/[0.03] p-1 rounded-sm border border-white/10 mt-6">
                    <button
                      onClick={() => setActiveRecipeTab('all')}
                      className={`py-2.5 px-6 rounded-sm font-mono text-xs transition-all cursor-pointer font-bold ${
                        activeRecipeTab === 'all' ? 'bg-[#C81D31] text-white shadow-lg shadow-orange-500/10' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Todos os Conteúdos
                    </button>
                    <button
                      onClick={() => setActiveRecipeTab('dica')}
                      className={`py-2.5 px-6 rounded-sm font-mono text-xs transition-all cursor-pointer font-bold ${
                        activeRecipeTab === 'dica' ? 'bg-[#C81D31] text-white shadow-lg shadow-orange-500/10' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Dicas de Higiene
                    </button>
                    <button
                      onClick={() => setActiveRecipeTab('receita')}
                      className={`py-2.5 px-6 rounded-sm font-mono text-xs transition-all cursor-pointer font-bold ${
                        activeRecipeTab === 'receita' ? 'bg-[#C81D31] text-white shadow-lg shadow-orange-500/10' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Receitas Saudáveis
                    </button>
                  </div>
                </div>

                {/* Grid Layout of Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                  
                  {/* Card 1: Dica Higiene */}
                  {(activeRecipeTab === 'all' || activeRecipeTab === 'dica') && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="bg-[#1A1C20] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#C81D31]/30 transition-all duration-300"
                    >
                      <div className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase bg-neutral-800 text-gray-300 py-1 px-3 rounded-sm font-semibold tracking-wider">
                            Higiene Prática
                          </span>
                          <span className="text-neutral-400 font-mono text-xs flex items-center space-x-1.5">
                            <Clock className="w-4 h-4 text-[#C81D31]" />
                            <span>{recipesData[0].prepTime}</span>
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase italic">
                            {recipesData[0].title}
                          </h3>
                        </div>

                        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-sans border-l-2 border-[#C81D31] pl-3 italic">
                          {recipesData[0].benefit}
                        </p>

                        <div className="border-t border-white/10 pt-6 space-y-4">
                          <p className="text-xs font-mono text-white uppercase font-bold tracking-wider flex items-center space-x-2">
                            <Utensils className="w-4 h-4 text-[#C81D31]" />
                            <span>Passo a Passo de Higienização</span>
                          </p>
                          <ol className="space-y-3">
                            {recipesData[0].steps.map((step, i) => (
                              <li key={i} className="flex items-start space-x-3 text-xs md:text-sm text-neutral-300 font-sans">
                                <span className="font-mono font-bold text-[#C81D31] shrink-0 bg-[#C81D31]/15 w-6 h-6 rounded-sm flex items-center justify-center text-[11px]">
                                  {i + 1}
                                </span>
                                <span className="leading-relaxed pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <div className="bg-[#121316] p-6 border-t border-white/10 space-y-4">
                        {/* Integrated Timer */}
                        {timerRecipeId === 'hygiene-sponge' ? (
                          <div className="bg-[#121316] border border-[#C81D31]/30 rounded-sm p-4 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-[#C81D31] font-bold flex items-center space-x-1.5 uppercase tracking-wide">
                                <Timer className={`w-4 h-4 ${timerActive ? 'animate-spin' : ''}`} />
                                <span>Timer de Desinfecção</span>
                              </span>
                              {timerSeconds === 0 ? (
                                <span className="bg-[#C81D31] text-white px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase font-bold">Concluído!</span>
                              ) : (
                                <span className="text-neutral-400 font-mono">Restam {timerSeconds}s</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 w-2/3">
                                <p className="text-2xl font-mono font-black text-white">{formatTimerValue(timerSeconds)}</p>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                  <div className="bg-[#C81D31] h-full transition-all duration-1000" style={{ width: `${(timerSeconds / timerMax) * 100}%` }} />
                                </div>
                              </div>
                              <div className="flex space-x-1.5">
                                <button 
                                  onClick={toggleTimer}
                                  className="p-2.5 bg-white/[0.04] hover:bg-[#C81D31] border border-white/10 rounded-sm transition-colors cursor-pointer"
                                >
                                  {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                </button>
                                <button 
                                  onClick={resetTimer}
                                  className="p-2.5 bg-white/[0.04] hover:bg-neutral-800 border border-white/10 rounded-sm transition-colors cursor-pointer"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            {timerSeconds === 0 && (
                              <p className="text-[10px] text-emerald-400 font-mono font-semibold text-center mt-1">
                                ✓ Esponja estéril! Pode enxaguar e usar.
                              </p>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => startRecipeTimer('hygiene-sponge', 5)}
                            className="w-full bg-white/[0.02] hover:bg-[#C81D31]/10 border border-white/10 hover:border-[#C81D31]/40 py-3 rounded-sm text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all flex items-center justify-center space-x-2 cursor-pointer"
                          >
                            <Timer className="w-4 h-4 text-[#C81D31]" />
                            <span>Iniciar Cronômetro (5 minutos)</span>
                          </button>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <span>Preservando integridade microbiológica</span>
                          <a 
                            href="https://api.whatsapp.com/send?phone=5521960193925" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#C81D31] hover:text-[#DE2036] font-bold flex items-center space-x-1"
                          >
                            <span>Mais Dicas</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Card 2: Danoninho de Inhame */}
                  {(activeRecipeTab === 'all' || activeRecipeTab === 'receita') && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="bg-[#1A1C20] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#C81D31]/30 transition-all duration-300"
                    >
                      <div className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase bg-[#C81D31]/15 text-[#C81D31] py-1 px-3 rounded-sm font-bold tracking-wider">
                            Doce Saudável
                          </span>
                          <span className="text-neutral-400 font-mono text-xs flex items-center space-x-1.5">
                            <Clock className="w-4 h-4 text-[#C81D31]" />
                            <span>{recipesData[1].prepTime}</span>
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-display font-bold text-white tracking-tight uppercase italic">
                            {recipesData[1].title}
                          </h3>
                        </div>

                        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-sans border-l-2 border-[#C81D31] pl-3 italic">
                          {recipesData[1].benefit}
                        </p>

                        {/* Stateful Servings Scaler */}
                        <div className="bg-white/[0.02] p-5 rounded-sm border border-white/10 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <p className="text-xs font-mono text-white uppercase font-bold tracking-wider flex items-center space-x-1.5 break-words">
                              <BookOpen className="w-3.5 h-3.5 text-[#C81D31] shrink-0" />
                              <span className="flex-1">Ingredientes Dinâmicos</span>
                            </p>
                            
                            {/* Scaler controller */}
                            <div className="flex items-center justify-between sm:justify-start space-x-2 bg-black/40 px-3 py-1.5 rounded-sm border border-white/5 w-full sm:w-auto">
                              <button 
                                onClick={() => setRecipeScale(Math.max(1, recipeScale - 1))}
                                className="w-5 h-5 rounded-sm bg-white/5 hover:bg-[#C81D31] text-white flex items-center justify-center text-xs font-bold font-mono transition-colors cursor-pointer shrink-0"
                              >
                                -
                              </button>
                              <span className="text-[10px] sm:text-xs font-mono text-white font-bold text-center flex-1 sm:w-20">
                                {recipeScale === 1 ? '1x (Padrão)' : `${recipeScale}x`}
                              </span>
                              <button 
                                onClick={() => setRecipeScale(Math.min(6, recipeScale + 1))}
                                className="w-5 h-5 rounded-sm bg-white/5 hover:bg-[#C81D31] text-white flex items-center justify-center text-xs font-bold font-mono transition-colors cursor-pointer shrink-0"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <ul className="grid grid-cols-1 gap-2 text-xs md:text-sm text-neutral-300 font-sans border-t border-white/5 pt-3">
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <Check className="w-4 h-4 text-[#C81D31] shrink-0" />
                                <span className="truncate">Inhames médios cozidos</span>
                              </div>
                              <span className="font-mono font-bold text-white text-xs bg-white/5 px-2 py-0.5 rounded-sm">
                                {2 * recipeScale} un
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <Check className="w-4 h-4 text-[#C81D31] shrink-0" />
                                <span className="truncate">Morangos frescos e higienizados</span>
                              </div>
                              <span className="font-mono font-bold text-white text-xs bg-white/5 px-2 py-0.5 rounded-sm">
                                {250 * recipeScale}g
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="border-t border-white/10 pt-6 space-y-4">
                          <p className="text-xs font-mono text-white uppercase font-bold tracking-wider flex items-center space-x-2">
                            <Utensils className="w-4 h-4 text-[#C81D31]" />
                            <span>Modo de Preparo</span>
                          </p>
                          <ol className="space-y-3">
                            {recipesData[1].steps.map((step, i) => (
                              <li key={i} className="flex items-start space-x-3 text-xs md:text-sm text-neutral-300 font-sans">
                                <span className="font-mono font-bold text-[#C81D31] shrink-0 bg-[#C81D31]/15 w-6 h-6 rounded-sm flex items-center justify-center text-[11px]">
                                  {i + 1}
                                </span>
                                <span className="leading-relaxed pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <div className="bg-[#121316] p-6 border-t border-white/10 space-y-4">
                        <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-sm text-xs text-neutral-400 font-sans leading-relaxed">
                          💡 <strong>Tempo de Refrigeração:</strong> Para obter a textura ideal e cremosa de Danoninho natural, deixe o creme na geladeira por aproximadamente <strong>1 a 2 horas</strong> antes de servir.
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <span>100% livre de açúcares industriais</span>
                          <a 
                            href="https://api.whatsapp.com/send?phone=5521960193925" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#C81D31] hover:text-[#DE2036] font-bold flex items-center space-x-1"
                          >
                            <span>Mais Receitas</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📞 CONVERSION HUB: CONTATOS INTEGRADOS */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="bg-[#121316] text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Column 1: Mission */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-xl tracking-tight text-white uppercase italic">NATHALIA <span className="text-[#C81D31]">QUIRINO</span></h3>
              <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Nutrição Clínica & Performance</p>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed font-sans">
              Aliando o rigor científico hospitalar necessário para cuidar da sua saúde interna à vivência prática para buscar a estética e longevidade que você deseja.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.instagram.com/nutri.quirinonat/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1A1C20] border border-white/10 hover:border-[#C81D31] hover:bg-[#C81D31]/10 rounded-sm text-neutral-400 hover:text-[#C81D31] transition-all"
                aria-label="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/channel/UC5fV2pUa7HLnZBDhZtnlytQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1A1C20] border border-white/10 hover:border-rose-500 hover:bg-rose-500/10 rounded-sm text-neutral-400 hover:text-rose-500 transition-all"
                aria-label="Canal YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Direct Contact details */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-sm text-[#C81D31] uppercase tracking-wider">Canais Diretos</h4>
            
            <div className="space-y-4">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-emerald-500/10 rounded-sm text-emerald-600 group-hover:bg-emerald-500/20 transition-all">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">WhatsApp Principal</span>
                  <span className="text-xs font-semibold">+55 (21) 96019-3925</span>
                </div>
              </a>

              <a 
                href="mailto:nutrinathaliabrandao@gmail.com" 
                className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="p-2 bg-blue-500/10 rounded-sm text-blue-500 group-hover:bg-blue-500/20 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">E-mail Corporativo</span>
                  <span className="text-xs font-semibold">nutrinathaliabrandao@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Conversion Accelerator */}
          <div className="space-y-6 bg-[#1A1C20] p-6 rounded-sm border border-white/10 shadow-sm">
            <span className="text-[#C81D31] font-mono text-[10px] uppercase font-bold tracking-widest block">Agendamento Fácil</span>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">Pronto para dar o primeiro passo?</h4>
            <p className="text-neutral-400 text-xs leading-relaxed font-sans">
              O agendamento no consultório ou online é realizado em poucos minutos através de nossa central direta de atendimento no WhatsApp.
            </p>
            <a 
              href="https://api.whatsapp.com/send?phone=5521960193925" 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-cta-whatsapp"
              className="w-full bg-[#C81D31] hover:bg-[#DE2036] text-white py-3.5 rounded-sm text-center font-bold text-xs uppercase tracking-wider block transition-colors cursor-pointer shadow-lg shadow-orange-500/10"
            >
              Iniciar Agendamento no WhatsApp
            </a>
          </div>

        </div>
      </motion.section>

      {/* 📜 BOTTOM FOOTER BAR */}
      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#121316] py-8 border-t border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C81D31]/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-[11px] gap-4 relative z-10">
          <p>© {new Date().getFullYear()} Nathalia Quirino Nutricionista. Todos os direitos reservados.</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">
            Rio de Janeiro — Centro, Lapa, Santa Teresa
          </p>
          <div className="flex space-x-4">
            <a href="#servicos" className="hover:text-[#C81D31] transition-colors uppercase tracking-wider font-bold text-neutral-400">Serviços</a>
            <a href="#resultados" className="hover:text-[#C81D31] transition-colors uppercase tracking-wider font-bold text-neutral-400">Resultados</a>
          </div>
        </div>
      </motion.footer>

    </div>
  );
}
