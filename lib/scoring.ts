export interface ScoreEntry {
  verbId: string;
  tense: string;
  register: string;
  person: string;
  correct: number;
  incorrect: number;
  lastSeen: number;
  streak: number;
}

export type ScoreStore = Record<string, ScoreEntry>;

export function getKey(verbId: string, tense: string, register: string, person: string): string {
  return `${verbId}:${tense}:${register}:${person}`;
}

export function getOrCreate(store: ScoreStore, verbId: string, tense: string, register: string, person: string): ScoreEntry {
  const key = getKey(verbId, tense, register, person);
  if (!store[key]) {
    store[key] = { verbId, tense, register, person, correct: 0, incorrect: 0, lastSeen: 0, streak: 0 };
  }
  return store[key];
}

export function recordResult(store: ScoreStore, verbId: string, tense: string, register: string, person: string, correct: boolean): ScoreStore {
  const updated = { ...store };
  const entry = { ...getOrCreate(updated, verbId, tense, register, person) };
  if (correct) {
    entry.correct += 1;
    entry.streak += 1;
  } else {
    entry.incorrect += 1;
    entry.streak = 0;
  }
  entry.lastSeen = Date.now();
  updated[getKey(verbId, tense, register, person)] = entry;
  return updated;
}

export function loadScores(): ScoreStore {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('cymraeg-scores') || '{}');
  } catch {
    return {};
  }
}

export function saveScores(store: ScoreStore): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cymraeg-scores', JSON.stringify(store));
}