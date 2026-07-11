
import { RefObject } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  age: string;
  location: string;
  objective: string;
  result: string;
  text: string;
  stars: number;
  tag: string;
  image: string;
}

interface TestimonialsProps {
  galleryRef: RefObject<HTMLDivElement | null>;
  scrollGallery: (direction: 'left' | 'right') => void;
}

const testimonials: Testimonial[] = [
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
];

export const Testimonials = ({ galleryRef, scrollGallery }: TestimonialsProps) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#C81D31]">
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Depoimentos Reais</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase italic">
            Histórias de Sucesso
          </h3>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block mr-2">
            <div className="flex items-center space-x-1 justify-end text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Excelência Clínica</span>
          </div>
          
          <button 
            onClick={() => scrollGallery('left')}
            className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#C81D31]/40 hover:bg-[#C81D31]/10 rounded-sm text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scrollGallery('right')}
            className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#C81D31]/40 hover:bg-[#C81D31]/10 rounded-sm text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div 
        ref={galleryRef}
        className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
      >
        {testimonials.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="min-w-[280px] sm:min-w-[320px] bg-[#212328]/60 backdrop-blur-md border border-white/10 p-5 rounded-sm flex flex-col justify-between space-y-4 snap-start hover:border-[#C81D31]/40 transition-all duration-300 group"
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
                 <img 
                   src={item.image} 
                   alt={item.name} 
                   referrerPolicy="no-referrer"
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                   loading="lazy" 
                   decoding="async" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#212328] via-transparent to-transparent opacity-60"></div>
              </div>

              <p className="text-gray-300 text-xs font-sans leading-relaxed italic line-clamp-3">
                "{item.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
