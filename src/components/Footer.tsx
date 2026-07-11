
import { Instagram, Youtube, Mail, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  navigateToSection: (id: string, tab?: 'home' | 'editorial') => void;
}

export const Footer = ({ navigateToSection }: FooterProps) => {
  return (
    <footer className="bg-[#0D0E11] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C81D31]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white tracking-tight uppercase leading-none">
                NATHALIA <span className="text-[#C81D31]">QUIRINO</span>
              </h3>
              <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Nutricionista Clínica & Esportiva</p>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed font-sans pr-4">
              Unindo o rigor da nutrição clínica hospitalar com a vivência prática da alta performance atlética para transformar seu corpo e sua saúde.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/nutri.quirinonat/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#C81D31]/20 rounded-full transition-all group">
                <Instagram className="w-4 h-4 text-white group-hover:text-[#C81D31]" />
              </a>
              <a href="https://www.youtube.com/channel/UC5fV2pUa7HLnZBDhZtnlytQ" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#C81D31]/20 rounded-full transition-all group">
                <Youtube className="w-4 h-4 text-white group-hover:text-[#C81D31]" />
              </a>
              <a href="mailto:contato@nathaliaquirino.com.br" className="p-2 bg-white/5 hover:bg-[#C81D31]/20 rounded-full transition-all group">
                <Mail className="w-4 h-4 text-white group-hover:text-[#C81D31]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-[#C81D31] uppercase tracking-[0.2em] font-bold">Navegação</h4>
            <nav className="flex flex-col space-y-3">
              <button onClick={() => navigateToSection('home', 'home')} className="text-neutral-400 hover:text-white transition-colors text-xs uppercase font-bold text-left tracking-wider">Início</button>
              <button onClick={() => navigateToSection('servicos', 'home')} className="text-neutral-400 hover:text-white transition-colors text-xs uppercase font-bold text-left tracking-wider">Serviços de Precisão</button>
              <button onClick={() => navigateToSection('resultados', 'home')} className="text-neutral-400 hover:text-white transition-colors text-xs uppercase font-bold text-left tracking-wider">Resultados & Performance</button>
              <button onClick={() => navigateToSection('trajetoria', 'home')} className="text-neutral-400 hover:text-white transition-colors text-xs uppercase font-bold text-left tracking-wider">Sobre a Nutri</button>
              <button onClick={() => navigateToSection('dicas-receitas', 'editorial')} className="text-neutral-400 hover:text-white transition-colors text-xs uppercase font-bold text-left tracking-wider">Dicas & Receitas</button>
            </nav>
          </div>

          {/* Location & Contact */}
          <div id="localizacao" className="space-y-6">
            <h4 className="text-[10px] font-mono text-[#C81D31] uppercase tracking-[0.2em] font-bold">Unidade RJ</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C81D31] shrink-0 mt-0.5" />
                <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                  Rua Riachuelo, Lapa/Centro<br />Rio de Janeiro - RJ
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#C81D31] shrink-0 mt-0.5" />
                <p className="text-neutral-400 text-xs font-sans">contato@nathaliaquirino.com.br</p>
              </div>
              <a 
                href="https://api.whatsapp.com/send?phone=5521960193925"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[#C81D31] hover:text-white transition-colors text-[10px] font-mono uppercase font-bold tracking-widest border-b border-[#C81D31]/30 pb-1"
              >
                <span>Agendar no WhatsApp</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Institutional / Trust */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-[#C81D31] uppercase tracking-[0.2em] font-bold">Rigor Técnico</h4>
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-[#C81D31]" />
                <span className="text-[10px] text-white font-bold uppercase tracking-tight">Prescrição de Precisão</span>
              </div>
              <p className="text-neutral-500 text-[10px] leading-relaxed font-sans uppercase">
                Metodologia baseada em diretrizes clínicas internacionais e vivência atlética prática.
              </p>
              <div className="pt-2 border-t border-white/10">
                <p className="text-white font-display font-bold text-lg italic uppercase">CRN-4 12345</p>
              </div>
            </div>
          </div>

        </div>

        {/* Final Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
            © {new Date().getFullYear()} NATHALIA QUIRINO. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Termos de Uso</span>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
