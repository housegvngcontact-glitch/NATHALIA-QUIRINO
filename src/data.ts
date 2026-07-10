export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  duration: string;
  target: string;
}

export interface Result {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface LocalPhoto {
  id: string;
  name: string;
  originalPath: string;
  description: string;
  fallbackText: string;
  placeholderUrl: string;
}

export interface Recipe {
  id: string;
  title: string;
  type: 'dica' | 'receita';
  imageDesc: string;
  prepTime: string;
  ingredients?: string[];
  steps: string[];
  benefit: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const servicesData: Service[] = [
  {
    id: 'presencial',
    title: 'Consulta Nutricional Presencial',
    subtitle: 'Rigor Clínico e Avaliação Face a Face',
    description: 'Realizada em nosso consultório físico no Rio de Janeiro. Ideal para quem busca um acompanhamento presencial completo com avaliação corporal detalhada, bioimpedância, análise cuidadosa de rotina e estruturação de plano sob medida.',
    highlights: [
      'Avaliação física completa em consultório',
      'Cardápio 100% individualizado para suas metas',
      'Suporte direto via WhatsApp para tirar dúvidas',
      'Acompanhamento de exames e saúde metabólica'
    ],
    duration: 'Atendimento com Hora Marcada',
    target: 'Emagrecimento, Ganho de Massa, Performance e Saúde Clínica'
  },
  {
    id: 'online',
    title: 'Consulta Nutricional Online',
    subtitle: 'Precisão Científica onde você estiver',
    description: 'Atendimento digital via videochamada para pacientes de todo o Brasil e do exterior. A mesma entrega minuciosa, escuta clínica profunda, plano de precisão estruturado e suporte pós-consulta ativo via WhatsApp.',
    highlights: [
      'Consulta remota por videochamada de alta qualidade',
      'Planejamento alimentar digital e dinâmico',
      'Suporte contínuo via WhatsApp para ajustes',
      'Perfeito para rotinas dinâmicas e de alta produtividade'
    ],
    duration: 'Atendimento Online Global',
    target: 'Resultados Estéticos e de Saúde sem Barreiras Geográficas'
  }
];

export const resultsData: Result[] = []; // Removido conforme solicitação de retirar fotos não fornecidas

import heroImg from './assets/img/hero.jpg';
import sobreImg from './assets/img/sobre.jpg';
import performanceImg from './assets/img/performance.jpg';

export const localPhotosData: LocalPhoto[] = [
  {
    id: 'hero-pic',
    name: 'Nathalia Clínica',
    originalPath: heroImg,
    description: 'Nathalia no consultório, transmitindo autoridade, sofisticação e acolhimento.',
    fallbackText: 'Nathalia Quirino - Nutricionista',
    placeholderUrl: heroImg
  },
  {
    id: 'sobre-pic',
    name: 'Consultório / Clínica',
    originalPath: heroImg,
    description: 'Nathalia no consultório em seu ambiente de atendimento.',
    fallbackText: 'Autoridade Clínica',
    placeholderUrl: heroImg
  },
  {
    id: 'judo-pic',
    name: 'Performance / Judô',
    originalPath: sobreImg,
    description: 'Nathalia praticando judô com kimono, demonstrando foco e disciplina de atleta.',
    fallbackText: 'Lutadora de Judô',
    placeholderUrl: sobreImg
  },
  {
    id: 'fitness-pic',
    name: 'Atleta / Fisiculturismo',
    originalPath: performanceImg,
    description: 'Nathalia em pose de fisiculturismo ou treinando na academia.',
    fallbackText: 'Atleta de Fisiculturismo',
    placeholderUrl: performanceImg
  }
];

export const recipesData: Recipe[] = [
  {
    id: 'hygiene-sponge',
    title: 'Como higienizar a sua esponja de lavar louça',
    type: 'dica',
    imageDesc: 'Esponja de louça apoiada sobre pedra de mármore clara com gotas d\'água cristalinas sob luz suave editorial.',
    prepTime: '5 minutos',
    benefit: 'Elimina 99.9% das bactérias que acumulam no material, protegendo seus utensílios e sua saúde intestinal.',
    steps: [
      'Prepare uma solução contendo 1 litro de água limpa e 2 colheres de sopa de água sanitária.',
      'Mergulhe completamente a esponja de lavar louça na solução.',
      'Deixe agir por 5 minutos para que a desinfecção ocorra por completo.',
      'Retire, enxágue levemente com água limpa e coloque para secar em um local arejado.'
    ]
  },
  {
    id: 'danoninho-inhame',
    title: 'Danoninho Natural de Inhame com Morango',
    type: 'receita',
    imageDesc: 'Creme aveludado de cor rosa pastel em pequena tigela cerâmica rústica, decorado com fatias de morango fresco sob iluminação natural quente.',
    prepTime: '15 min (mais tempo de geladeira)',
    ingredients: [
      '2 inhames médios cozidos',
      '250g de morangos frescos e higienizados'
    ],
    benefit: 'Altamente nutritivo, rico em fibras, sem adição de açúcares industriais ou conservantes químicos. Perfeito para saciedade e saúde digestiva.',
    steps: [
      'Descasque os inhames e cozinhe em água fervente até que estejam macios.',
      'Deixe o inhame esfriar um pouco antes do preparo.',
      'No liquidificador, bata o inhame cozido e os morangos frescos.',
      'Bata bem até atingir uma consistência homogênea, cremosa e de textura aveludada.',
      'Distribua em taças e mantenha sob refrigeração antes de servir.'
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    question: 'Como funciona a primeira consulta nutricional?',
    answer: 'A primeira consulta é uma conversa detalhada e profunda. Investigamos seu histórico de saúde, exames laboratoriais, rotina de trabalho e sono, além de mapear detalhadamente suas preferências gastronômicas. A partir disso, traçamos objetivos realistas e eu elaboro um plano alimentar 100% sob medida para você, entregue de forma prática.'
  },
  {
    question: 'O plano alimentar inclui alimentos caros ou difíceis de encontrar?',
    answer: 'De forma alguma. Minha filosofia nutricional é baseada em "comida de verdade" — arroz, feijão, carnes, ovos, frutas e vegetais acessíveis de feira e mercado. O foco é a praticidade absoluta.'
  },
  {
    question: 'Qual é a diferença entre a Consulta Presencial e a Consulta Online?',
    answer: 'A diferença principal é apenas o local físico do atendimento. Na consulta presencial, realizamos a conversa e a avaliação corporal completa em nosso consultório no Rio de Janeiro. Na consulta online, o atendimento ocorre por videoconferência com o mesmo nível de aprofundamento, precisão na prescrição e suporte pós-consulta via WhatsApp.'
  },
  {
    question: 'Não moro no Rio de Janeiro, posso fazer o acompanhamento online?',
    answer: 'Sim! Atendo pacientes de todo o Brasil e do exterior por videochamada. A entrega do plano alimentar digital de alta precisão e o suporte diário por WhatsApp garantem que você receba o mesmo nível de acompanhamento.'
  }
];

export const localSeoData = {
  mainTitle: 'Especialista em Nutrição Clínica e Alta Performance Esportiva no Rio de Janeiro',
  description: 'Atendimento presencial no coração do Rio de Janeiro (Rua Riachuelo, próximo à Lapa, Santa Teresa e Centro) ou online para todo o mundo. Especialista em emagrecimento saudável, hipertrofia muscular, reeducação alimentar prática e nutrição clínica de precisão.',
  neighborhoods: [
    'Centro',
    'Lapa',
    'Santa Teresa',
    'Glória',
    'Catete',
    'Flamengo',
    'Tijuca',
    'Botafogo'
  ],
  keywords: [
    'melhor nutricionista rj',
    'nutricionista esportivo centro rj',
    'nutricionista rua riachuelo rj',
    'emagrecimento definitivo rj',
    'dieta de ganho de massa rio de janeiro',
    'nutricionista hospitalar rj'
  ]
};
