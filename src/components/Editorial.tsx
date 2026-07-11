import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Utensils, BookOpen, Clock, RotateCcw, Pause, Play, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';

interface EditorialProps {
  recipes: Recipe[];
  activeRecipeTab: 'all' | 'dica' | 'receita';
  setActiveRecipeTab: (tab: 'all' | 'dica' | 'receita') => void;
  timerActive: boolean;
  timerSeconds: number;
  timerMax: number;
  timerRecipeId: string | null;
  toggleTimer: () => void;
  resetTimer: () => void;
  startRecipeTimer: (id: string, mins: number) => void;
  formatTimerValue: (secs: number) => string;
}

export const Editorial = ({
  recipes,
  activeRecipeTab,
  setActiveRecipeTab,
  timerActive,
  timerSeconds,
  timerMax,
  timerRecipeId,
  toggleTimer,
  resetTimer,
  startRecipeTimer,
  formatTimerValue
}: EditorialProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = activeRecipeTab === 'all' 
    ? recipes 
    : recipes.filter(r => r.type === activeRecipeTab);

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      id="dicas-receitas" 
      className="py-24 bg-[#0D0E11]"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-12">
          <div className="max-w-2xl space-y-4">
            <span className="editorial-label text-[#C81D31] font-bold tracking-[0.2em] uppercase text-xs">Conteúdo Exclusivo</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold italic uppercase leading-none text-white">
              Cozinha <span className="text-neutral-500">De</span> <br /> Precisão
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-sans max-w-lg">
              Nutrição não precisa ser complexa. Aqui compartilho dicas práticas de higiene e receitas desenhadas para performance e saúde.
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-sm border border-white/10 self-start">
            {(['all', 'dica', 'receita'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveRecipeTab(tab)}
                className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest rounded-sm transition-all duration-300 ${
                  activeRecipeTab === tab ? 'bg-[#C81D31] text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'Ver Tudo' : tab === 'dica' ? 'Dicas' : 'Receitas'}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              key={recipe.id} 
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-[#16171B] border border-white/10 rounded-sm overflow-hidden flex flex-col hover:border-[#C81D31]/40 transition-all duration-500 cursor-pointer"
            >
              {/* Card Header Info */}
              <div className="p-6 pb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${recipe.type === 'dica' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                    {recipe.type === 'dica' ? 'Dica Prática' : 'Receita de Precisão'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-neutral-500 text-[10px] font-mono uppercase">
                  <Clock className="w-3 h-3" />
                  <span>{recipe.prepTime}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="px-6 flex-grow space-y-4">
                <h3 className="text-xl font-display font-bold text-white leading-tight uppercase group-hover:text-[#C81D31] transition-colors">{recipe.title}</h3>
                
                {/* Ingredients / Highlights Preview */}
                <div className="flex flex-wrap gap-2">
                  {(recipe.ingredients || []).slice(0, 2).map((item, i) => (
                    <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded-full text-neutral-400 uppercase font-mono tracking-tight">
                      {item.length > 25 ? item.substring(0, 25) + '...' : item}
                    </span>
                  ))}
                </div>

                <p className="text-neutral-500 text-xs leading-relaxed font-sans line-clamp-3 italic">
                  "{recipe.benefit}"
                </p>
              </div>

              {/* Footer / Actions */}
              <div className="p-6 pt-8 mt-auto flex items-center justify-between border-t border-white/5">
                <div className="flex items-center space-x-4">
                  {recipe.type === 'receita' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        startRecipeTimer(recipe.id, parseInt(recipe.prepTime) || 15);
                      }}
                      className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#C81D31]/10 rounded-sm text-neutral-400 hover:text-[#C81D31] transition-all"
                      title="Iniciar Cronômetro"
                    >
                      <Timer className="w-5 h-5" />
                    </button>
                  )}
                  <div className="flex items-center space-x-1">
                    <Utensils className="w-4 h-4 text-[#C81D31]" />
                    <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase tracking-widest">Fit</span>
                  </div>
                </div>
                
                <div className="text-[10px] font-mono text-[#C81D31] font-bold uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform h-10 px-2">
                  Ver Detalhes
                  <BookOpen className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedRecipe && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRecipe(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-[#16171B] border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1A1B20]">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${selectedRecipe.type === 'dica' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                      {selectedRecipe.type === 'dica' ? 'Dica Prática' : 'Receita de Precisão'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedRecipe(null)}
                    className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto p-8 space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase italic leading-none">{selectedRecipe.title}</h3>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center space-x-2 text-neutral-400 font-mono text-xs uppercase">
                        <Clock className="w-4 h-4 text-[#C81D31]" />
                        <span>Tempo: {selectedRecipe.prepTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column 1: Ingredients */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-display font-bold text-white uppercase tracking-tight flex items-center border-b border-[#C81D31]/30 pb-2">
                        <CheckCircle2 className="w-5 h-5 text-[#C81D31] mr-2" />
                        {selectedRecipe.type === 'receita' ? 'Ingredientes' : 'Pontos Chave'}
                      </h4>
                      <ul className="space-y-4">
                        {(selectedRecipe.ingredients || []).map((item, i) => (
                          <li key={i} className="flex items-start space-x-3 text-neutral-300 text-sm md:text-base font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C81D31] mt-2.5 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Steps */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-display font-bold text-white uppercase tracking-tight flex items-center border-b border-[#C81D31]/30 pb-2">
                        <Timer className="w-5 h-5 text-[#C81D31] mr-2" />
                        Passo a Passo
                      </h4>
                      <div className="space-y-6">
                        {selectedRecipe.steps.map((step, i) => (
                          <div key={i} className="flex space-x-4">
                            <span className="text-[#C81D31] font-mono text-lg font-bold">{(i + 1).toString().padStart(2, '0')}</span>
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefit Callout */}
                  <div className="bg-[#C81D31]/5 border border-[#C81D31]/20 p-6 rounded-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#C81D31]" />
                      <span className="text-[10px] font-mono text-[#C81D31] uppercase tracking-widest font-bold">Benefício Metabólico</span>
                    </div>
                    <p className="text-white text-sm md:text-base italic font-sans leading-relaxed">
                      "{selectedRecipe.benefit}"
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-white/10 bg-[#1A1B20] flex items-center justify-between">
                   <p className="text-[10px] font-mono text-neutral-500 uppercase">Consultoria Nutricional Nathalia Quirino</p>
                   {selectedRecipe.type === 'receita' && (
                     <button 
                       onClick={() => {
                         startRecipeTimer(selectedRecipe.id, parseInt(selectedRecipe.prepTime) || 15);
                         setSelectedRecipe(null);
                       }}
                       className="btn-editorial flex items-center"
                     >
                       <Timer className="w-4 h-4 mr-2" />
                       Iniciar Preparo
                     </button>
                   )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Timer UI (Only if active) */}
        {timerSeconds > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#16171B] border border-[#C81D31]/40 px-6 py-4 rounded-sm shadow-2xl flex items-center space-x-6 backdrop-blur-xl"
          >
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-[#C81D31] uppercase tracking-[0.2em] font-bold">Timer Ativo</span>
              <span className="text-2xl font-display font-bold tabular-nums text-white">{formatTimerValue(timerSeconds)}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTimer}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                {timerActive ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
