import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function IntakeCalculator() {
  const [gender, setGender] = useState<'masculino' | 'feminino'>('feminino');
  const [weight, setWeight] = useState<string>('65');
  const [height, setHeight] = useState<string>('165');
  const [age, setAge] = useState<string>('28');
  const [activity, setActivity] = useState<string>('1.375'); // Moderadamente ativo
  const [goal, setGoal] = useState<'perda' | 'ganho' | 'saude'>('perda');
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    targetProtein: number;
  } | null>(null);

  const calculateMetabolism = (e: FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    // BMR using Harris-Benedict (Revised)
    let bmr = 0;
    if (gender === 'masculino') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    const tdee = bmr * act;
    let targetCalories = tdee;
    let targetProtein = w * 2.0; // Standard 2.0g/kg for performance/clinical fitness

    if (goal === 'perda') {
      targetCalories = tdee - 450; // Moderate deficit
      targetProtein = w * 2.2; // Keep protein higher in deficit to spare muscle
    } else if (goal === 'ganho') {
      targetCalories = tdee + 350; // Moderate surplus
      targetProtein = w * 1.8; // Standard build
    } else {
      targetProtein = w * 1.6; // Maintenance & wellness
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      targetProtein: Math.round(targetProtein),
    });
  };

  const resetCalculator = () => {
    setResult(null);
  };

  const getWhatsAppMessageUrl = () => {
    if (!result) return 'https://api.whatsapp.com/send?phone=5521960193925';
    const goalText = goal === 'perda' ? 'Emagrecimento / Definição' : goal === 'ganho' ? 'Hipertrofia / Ganho de Massa' : 'Saúde / Reeducação';
    const text = `Olá Nutri Nathalia! Realizei o diagnóstico metabólico no seu site. 
Meus dados: Gênero ${gender === 'masculino' ? 'M' : 'F'}, Peso ${weight}kg, Altura ${height}cm, Idade ${age} anos.
Meu objetivo é: ${goalText}.
Meu gasto estimado deu ${result.tdee} kcal e a meta calculada foi de ${result.targetCalories} kcal com ${result.targetProtein}g de proteína.
Gostaria de agendar uma consulta individualizada para desenhar o plano de verdade!`;
    return `https://api.whatsapp.com/send?phone=5521960193925&text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="diagnostico-metabolico" className="bg-white text-neutral-900 p-6 md:p-10 rounded-sm border border-neutral-200/80 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D45B34]/5 rounded-none blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <p className="text-neutral-600 text-sm mb-8 font-sans max-w-2xl leading-relaxed">
        Este é um cálculo de estimativa metabólica científica (Fórmula Harris-Benedict). No consultório, refinamos esses dados cruzando com bioimpedância de precisão e exames clínicos.
      </p>

      {!result ? (
        <form onSubmit={calculateMetabolism} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              id="calc-gender-female"
              onClick={() => setGender('feminino')}
              className={`py-3 px-4 rounded-sm border text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                gender === 'feminino'
                  ? 'border-[#D45B34] bg-[#D45B34]/10 text-[#D45B34] shadow-sm font-bold'
                  : 'border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-800'
              }`}
            >
              Feminino
            </button>
            <button
              type="button"
              id="calc-gender-male"
              onClick={() => setGender('masculino')}
              className={`py-3 px-4 rounded-sm border text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                gender === 'masculino'
                  ? 'border-[#D45B34] bg-[#D45B34]/10 text-[#D45B34] shadow-sm font-bold'
                  : 'border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-800'
              }`}
            >
              Masculino
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="calc-weight" className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">Peso (kg)</label>
              <input
                type="number"
                id="calc-weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-sm py-3 px-4 text-neutral-900 text-base font-mono focus:outline-none focus:border-[#D45B34] transition-all"
                placeholder="65"
              />
            </div>
            <div>
              <label htmlFor="calc-height" className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">Altura (cm)</label>
              <input
                type="number"
                id="calc-height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-sm py-3 px-4 text-neutral-900 text-base font-mono focus:outline-none focus:border-[#D45B34] transition-all"
                placeholder="165"
              />
            </div>
            <div>
              <label htmlFor="calc-age" className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">Idade (Anos)</label>
              <input
                type="number"
                id="calc-age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full bg-neutral-50 border border-neutral-200 rounded-sm py-3 px-4 text-neutral-900 text-base font-mono focus:outline-none focus:border-[#D45B34] transition-all"
                placeholder="28"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="calc-activity" className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">Nível de Atividade</label>
              <select
                id="calc-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-sm py-3 px-4 text-neutral-900 text-sm focus:outline-none focus:border-[#D45B34] transition-all"
              >
                <option value="1.2" className="bg-white text-neutral-900">Sedentário (Pouco ou nenhum exercício)</option>
                <option value="1.375" className="bg-white text-neutral-900">Levemente Ativo (Exercício leve 1-3 dias/semana)</option>
                <option value="1.55" className="bg-white text-neutral-900">Moderadamente Ativo (Exercício moderado 3-5 dias/semana)</option>
                <option value="1.725" className="bg-white text-neutral-900">Altamente Ativo (Exercício intenso 6-7 dias/semana)</option>
                <option value="1.9" className="bg-white text-neutral-900">Extremamente Ativo (Atleta, treinos duplos diários)</option>
              </select>
            </div>
            <div>
              <label htmlFor="calc-goal" className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">Seu Objetivo Principal</label>
              <select
                id="calc-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-sm py-3 px-4 text-neutral-900 text-sm focus:outline-none focus:border-[#D45B34] transition-all"
              >
                <option value="perda" className="bg-white text-neutral-900">Emagrecimento / Definição Muscular</option>
                <option value="ganho" className="bg-white text-neutral-900">Hipertrofia / Ganho de Massa Magra</option>
                <option value="saude" className="bg-white text-neutral-900">Reeducação Alimentar & Performance Clínica</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            id="btn-calculate"
            className="w-full bg-[#D45B34] hover:bg-[#c24e29] text-white py-4 px-6 rounded-sm font-semibold tracking-wider uppercase text-xs hover:scale-[1.01] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>Realizar Diagnóstico Metabólico</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-100 text-center">
              <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-1">Gasto Calórico Estimado</span>
              <p className="text-3xl font-display font-bold text-neutral-900 tracking-tight">
                {result.tdee} <span className="text-xs text-neutral-500 font-sans font-normal">kcal/dia</span>
              </p>
              <p className="text-xs text-neutral-400 mt-2">Energia total para manter o peso atual.</p>
            </div>

            <div className="bg-orange-50/50 p-5 rounded-sm border border-[#D45B34]/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D45B34] text-white text-[9px] font-mono px-2 py-0.5 rounded-none">Meta Sugerida</div>
              <span className="text-neutral-600 text-xs font-mono uppercase tracking-wider block mb-1">Meta Calórica Diária</span>
              <p className="text-3xl font-display font-bold text-[#D45B34] tracking-tight">
                {result.targetCalories} <span className="text-xs text-neutral-500 font-sans font-normal">kcal/dia</span>
              </p>
              <p className="text-xs text-neutral-400 mt-2">Calculada para induzir o seu objetivo.</p>
            </div>

            <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-100 text-center">
              <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block mb-1">Meta de Proteína</span>
              <p className="text-3xl font-display font-bold text-neutral-900 tracking-tight">
                {result.targetProtein}g <span className="text-xs text-neutral-500 font-sans font-normal">/dia</span>
              </p>
              <p className="text-xs text-neutral-400 mt-2">Para preservar massa e manter saciedade.</p>
            </div>
          </div>

          <div className="bg-[#D45B34]/5 p-5 rounded-sm border border-[#D45B34]/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-left">
              <Zap className="w-5 h-5 text-[#D45B34] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">E agora, como colocar em prática?</h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                  Saber os números é apenas 5% do processo. O verdadeiro segredo está em converter essas calorias em refeições práticas e saborosas do seu dia a dia, sem passar fome e sem abrir mão do que gosta.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-calc-whatsapp"
              className="flex-1 bg-[#D45B34] hover:bg-[#c24e29] text-white py-4 px-6 rounded-sm font-semibold tracking-wider uppercase text-xs hover:scale-[1.01] transition-all duration-300 flex items-center justify-center space-x-2 text-center"
            >
              <span>Enviar Diagnóstico para a Nutri & Agendar</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <button
              type="button"
              id="btn-recalculate"
              onClick={resetCalculator}
              className="py-4 px-6 rounded-sm border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-600 font-semibold tracking-wider uppercase text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refazer Cálculo</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
