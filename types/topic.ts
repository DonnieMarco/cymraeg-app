// types/topic.ts — shared types for all topic modules

export interface DrillExercise {
  id: string;
  prompt: string;          // English prompt shown to learner
  answer: string;          // Primary correct answer
  alternatives?: string[]; // Other accepted answers
  hint?: string;           // Optional hint shown after first wrong attempt
  tags?: string[];         // For filtering: e.g. ['nasal-mutation', 'fy']
}

export interface GrammarNote {
  title: string;
  titleCy?: string;
  explanation: string;     // Short English explanation
  examples: { cy: string; en: string }[];
}

export interface TopicModule {
  id: string;
  slug: string;
  title: string;           // Welsh title
  titleEn: string;         // English title
  icon: string;
  cefr: 'A1' | 'A2' | 'B1';
  status: 'drill' | 'reference' | 'coming_soon';
  mynediadUnits?: number[];
  duolingoSection?: number;
  duolingoUnits?: number[];
  grammar: GrammarNote[];
  exercises: DrillExercise[];
}
