
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { LocalPhoto } from '../types';

interface HeroProps {
  photo: LocalPhoto;
}

export const Hero = ({ photo }: HeroProps) => {
  return (
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
          src={photo.originalPath} 
          alt="Nathalia Quirino" 
          className="w-full h-full object-cover object-[center_25%] md:object-[center_35%]" 
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
              className="btn-editorial flex items-center justify-center group"
            >
              <span>Agendar Minha Transformação</span>
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
