
import { motion } from 'motion/react';

export const Stats = () => {
  const stats = [
    { label: 'Metodologia', value: '100% Individual', desc: 'Adaptado à sua rotina, treinos e exames clínicos.' },
    { label: 'Base Clínica', value: 'Rigor Hospitalar', desc: 'Segurança total com a saúde do seu metabolismo.' },
    { label: 'Prática Atlética', value: 'Judô / Fitness', desc: 'Vivência de quem sabe a dificuldade dos treinos.' },
    { label: 'Acompanhamento', value: 'Suporte Direto', desc: 'Suporte exclusivo por WhatsApp para sua constância.' },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
      className="bg-white/[0.02] text-white py-12 border-y border-white/10 shadow-sm relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`text-center space-y-1 ${i !== 0 ? 'md:border-l border-white/10' : ''}`}>
            <span className="block font-mono text-[#C81D31] text-[10px] md:text-xs uppercase tracking-widest font-bold">{stat.label}</span>
            <p className="text-xl md:text-3xl font-display font-bold tracking-tight text-white">{stat.value}</p>
            <p className="text-[10px] text-neutral-400 max-w-[200px] mx-auto leading-tight">{stat.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
