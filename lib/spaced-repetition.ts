import { ScoreStore, getOrCreate } from './scoring';
import { VERBS, Person, Tense, Register } from '../data/modules/verbs/verbs';
import { verbModuleConfig } from '../data/modules/verbs/config';

export interface DrillItem {
  verbId: string;
  verbNoun: string;
  verbEnglish: string;
  tense: Tense;
  register: Register;
  person: Person;
  prompt: string;
  answer: string;
  alternatives?: string[];
}

function weight(correct: number, incorrect: number, streak: number, lastSeen: number): number {
  const total = correct + incorrect;
  if (total === 0) return 10; // unseen = high priority
  const accuracy = correct / total;
  const recency = Math.min((Date.now() - lastSeen) / 1000 / 60 / 60, 24); // hours since seen, cap at 24
  const streakBonus = Math.max(0, 5 - streak); // lower weight as streak grows
  return (1 - accuracy) * 8 + recency * 0.5 + streakBonus;
}

export function getNextDrillItem(store: ScoreStore, excludeKey?: string, filterVerbId?: string): DrillItem {
  const items: { item: DrillItem; w: number }[] = [];

  for (const verb of VERBS.filter(v => !filterVerbId || v.id === filterVerbId)) {
    for (const tense of verbModuleConfig.tenses) {
      for (const register of verbModuleConfig.registers) {
        for (const { id: person } of verbModuleConfig.persons) {
          const key = `${verb.id}:${tense}:${register}:${person}`;
          if (key === excludeKey) continue;
          const conj = verb.conjugations[register][tense][person as Person];
          const entry = getOrCreate(store, verb.id, tense, register, person);
          const w = weight(entry.correct, entry.incorrect, entry.streak, entry.lastSeen);
          items.push({
            item: {
              verbId: verb.id,
              verbNoun: verb.verbNoun,
              verbEnglish: verb.english,
              tense,
              register,
              person: person as Person,
              prompt: `${conj.english}`,
              answer: conj.welsh,
              alternatives: conj.alternatives,
            },
            w,
          });
        }
      }
    }
  }

  // Weighted random selection
  const totalWeight = items.reduce((sum, i) => sum + i.w, 0);
  let rand = Math.random() * totalWeight;
  for (const { item, w } of items) {
    rand -= w;
    if (rand <= 0) return item;
  }
  return items[0].item;
}