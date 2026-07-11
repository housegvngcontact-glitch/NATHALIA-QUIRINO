
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQItem } from '../data';

interface FaqProps {
  faqData: FAQItem[];
  expandedFaqIndex: number | null;
  toggleFaq: (index: number) => void;
}

export const Faq = ({ faqData, expandedFaqIndex, toggleFaq }: FaqProps) => {
  return (
    <section id="faq" className="py-24 bg-[#121316] relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-sm">
            <MessageSquare className="w-3.5 h-3.5 text-[#C81D31]" />
            <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest font-bold">Dúvidas Clínicas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase italic">Perguntas Frequentes</h2>
          <p className="text-neutral-500 text-sm font-sans">Esclarecimentos diretos sobre a metodologia de acompanhamento.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden transition-colors hover:border-white/10"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className={`text-sm md:text-base font-bold uppercase transition-colors ${expandedFaqIndex === index ? 'text-[#C81D31]' : 'text-white'}`}>
                  {item.question}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#C81D31] transition-transform duration-300 ${expandedFaqIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {expandedFaqIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed font-sans border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
