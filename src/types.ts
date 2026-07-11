
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

export interface FaqItem {
  question: string;
  answer: string;
}
