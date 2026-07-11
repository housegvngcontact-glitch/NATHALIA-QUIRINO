
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { LocalPhoto } from '../types';

interface ResultsProps {
  photo: LocalPhoto;
  videoSrc: string;
}

export const ResultsSection = ({ photo, videoSrc }: ResultsProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      id="resultados" 
      className="bg-[#121316] border-y border-white/5 py-24 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#C81D31]/5 rounded-full blur-[140px] transform-gpu pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#C81D31] font-mono text-xs tracking-widest uppercase font-bold block">Prática de Alto Nível</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase italic leading-tight">
              Vivência Real Que Valida A Teoria
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              Minha atuação clínica é reforçada por anos de tatame no Judô e disciplina no fisiculturismo. Eu sei o que é buscar o limite da performance mantendo o rigor com a saúde.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-sm bg-[#C81D31]/10 border border-[#C81D31]/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#C81D31]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase">Fisiculturismo & Judô</h4>
                  <p className="text-neutral-500 text-xs uppercase font-mono tracking-tight">Experiência prática no esporte</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="aspect-video bg-[#1A1B1F] rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
              <video 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                autoPlay 
                muted 
                loop 
                playsInline
                poster={photo.originalPath}
              >
                <source src={videoSrc} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
              <div className="absolute top-4 right-4 bg-[#121316]/80 border border-white/10 backdrop-blur-sm px-3 py-1 rounded-sm text-white font-mono text-[9px] uppercase tracking-wider">
                Performance em Foco
              </div>
            </div>
            
            {/* Floating Card Decorative */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-2xl hidden md:block max-w-[200px] border-l-4 border-[#C81D31]">
              <p className="text-[#121316] font-display font-bold text-xl italic uppercase leading-none">Estética & Saúde</p>
              <p className="text-neutral-500 text-[10px] uppercase font-mono mt-2 leading-tight">O equilíbrio perfeito entre o visual e o metabólico.</p>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
