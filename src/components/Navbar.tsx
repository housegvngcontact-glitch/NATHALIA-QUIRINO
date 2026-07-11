
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeMainTab: 'home' | 'editorial';
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigateToSection: (sectionId: string, mainTab?: 'home' | 'editorial') => void;
}

export const Navbar = ({ 
  activeMainTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navigateToSection 
}: NavbarProps) => {
  return (
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
          <span className="editorial-label text-[9px] text-gray-400 mt-1 uppercase">
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#C81D31] transition-colors cursor-pointer"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#0D0E11] text-white z-40 px-6 py-8 flex flex-col space-y-6 lg:hidden border-t border-white/10 overflow-y-auto h-[calc(100vh-80px)]"
          >
            {[
              { id: 'home', label: 'Início', tab: 'home' as const },
              { id: 'servicos', label: 'Serviços', tab: 'home' as const },
              { id: 'resultados', label: 'Performance', tab: 'home' as const },
              { id: 'trajetoria', label: 'Sobre a Nutri', tab: 'home' as const },
              { id: 'dicas-receitas', label: 'Dicas & Receitas', tab: 'editorial' as const },
              { id: 'localizacao', label: 'Contato & Localização', tab: 'home' as const },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => navigateToSection(item.id, item.tab)} 
                className={`text-left text-lg font-medium border-b border-white/10 pb-3 transition-colors ${
                  activeMainTab === item.tab && item.id === 'home' ? 'text-[#C81D31]' : 'hover:text-[#C81D31]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6">
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C81D31] hover:bg-[#DE2036] text-white py-4 rounded-sm font-semibold tracking-wide uppercase text-center block text-sm"
              >
                Falar Conosco no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
