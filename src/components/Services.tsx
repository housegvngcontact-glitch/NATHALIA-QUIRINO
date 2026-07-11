
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

export const Services = ({ services }: ServicesProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      id="servicos" 
      className="py-24 max-w-7xl mx-auto px-6 relative"
    >
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#C81D31]/5 rounded-full blur-[120px] transform-gpu pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
        <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold">Acompanhamentos de Precisão</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase italic">
          Estratégias Desenhadas Para Evolução Real
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
          Planos alimentares baseados em rigor científico e adaptados à realidade do seu dia a dia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="bg-[#212328]/60 backdrop-blur-md border border-white/10 rounded-sm p-8 flex flex-col justify-between shadow-2xl hover:border-[#C81D31]/40 transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 group-hover:bg-[#C81D31] transition-colors"></div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="editorial-label text-[10px] bg-white/5 text-gray-300 py-1 px-3 rounded-sm font-bold uppercase">
                  {index === 0 ? 'Presencial RJ' : 'Atendimento Global'}
                </span>
                <span className="text-[#C81D31] font-mono text-xs font-semibold">{service.duration}</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight uppercase">{service.title}</h3>
                <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">{service.subtitle}</p>
              </div>

              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-sans">
                {service.description}
              </p>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="editorial-label text-[#C81D31] font-bold tracking-wider mb-2 text-xs uppercase">O que está incluso:</p>
                {service.highlights.map((h, i) => (
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
                className={`w-full py-4 rounded-sm text-center font-bold text-xs tracking-wider uppercase block transition-all duration-300 ${
                  index === 0 
                  ? 'bg-white/[0.04] border border-white/10 text-white hover:bg-[#C81D31] hover:border-[#C81D31]' 
                  : 'bg-[#C81D31] text-white hover:bg-[#A61729]'
                }`}
              >
                Falar Conosco no WhatsApp
              </a>
              <p className="text-center text-[10px] text-neutral-500 mt-2.5">Indicado para {service.target}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
