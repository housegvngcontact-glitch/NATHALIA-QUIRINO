
import { motion } from 'motion/react';
import { Award, Compass, Timer, Activity } from 'lucide-react';
import { LocalPhoto } from '../types';

interface AboutProps {
  photos: LocalPhoto[];
}

export const About = ({ photos }: AboutProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      id="trajetoria" 
      className="py-24 bg-[#121316] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Visual Composition */}
        <div className="grid grid-cols-2 gap-4 relative">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-[#1A1B1F] rounded-sm overflow-hidden border border-white/10 group">
              <img 
                src={photos[1].originalPath} 
                alt="Nathalia Quirino - Corrida" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                loading="lazy" 
              />
            </div>
            <div className="aspect-square bg-[#C81D31] rounded-sm flex items-center justify-center p-8">
              <p className="text-white font-display font-bold text-3xl italic uppercase leading-tight">Ciência do Esporte</p>
            </div>
          </div>
          <div className="pt-12 space-y-4">
            <div className="aspect-square bg-[#212328] rounded-sm border border-white/10 flex flex-col items-center justify-center p-6 text-center">
              <Award className="w-10 h-10 text-[#C81D31] mb-2" />
              <p className="text-white font-bold text-sm uppercase tracking-widest">Pós-Graduada</p>
              <p className="text-neutral-500 text-[10px] uppercase font-mono">Nutrição Clínica</p>
            </div>
            <div className="aspect-[3/4] bg-[#1A1B1F] rounded-sm overflow-hidden border border-white/10 group">
              <img 
                src={photos[2].originalPath} 
                alt="Nathalia Quirino - Performance" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-8">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
            <span className="text-[#C81D31] font-mono text-[10px] tracking-widest uppercase font-bold">Trajetória e Rigor</span>
          </div>
          
          <h2 className="massive-title text-3xl md:text-5xl uppercase italic text-white leading-none">
            De Quem Entende O <span className="text-[#C81D31]">Corpo</span> Por Dentro E Por <span className="text-[#C81D31]">Fora</span>.
          </h2>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
            Minha base acadêmica foi forjada na nutrição clínica hospitalar, onde cada grama de macronutriente e cada micronutriente contam para a estabilização da vida. Essa responsabilidade técnica é o que levo para o consultório: o compromisso com a sua saúde a longo prazo.
            <br /><br />
            Ao mesmo tempo, minha alma é de atleta. Como competidora de fisiculturismo e judoca, entendo a psicologia do esforço e a necessidade de ver o resultado no espelho.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {[
              { icon: Compass, title: 'Foco Clínico', desc: 'Análise laboratorial profunda para máxima segurança.' },
              { icon: Timer, title: 'Ação Rápida', desc: 'Estratégias para resultados estéticos visíveis.' },
              { icon: Activity, title: 'Constância', desc: 'Suporte humanizado para você não desistir.' },
              { icon: Award, title: 'Autoridade', desc: 'Pós-graduada em Nutrição Clínica.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <item.icon className="w-5 h-5 text-[#C81D31] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">{item.title}</h4>
                  <p className="text-neutral-500 text-[10px] uppercase font-mono leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
};
