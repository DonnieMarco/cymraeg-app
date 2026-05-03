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
  const candidates: { item: DrillItem; weight: number }[] = [];

  const tenses = verbModuleConfig.tenses as readonly Tense[];
  const registers = verbModuleConfig.registers as readonly Register[];
  const persons: Person[] = ['i', 'ti', 'e', 'hi', 'ni', 'chi', 'nhw'];

  for (const verb of VERBS.filter(v => !filterVerbId || v.id === filterVerbId)) {
    for (const tense of tenses) {
      for (const register of registers) {
        for (const person of persons) {
          const key = `${verb.id}:${tense}:${register}:${person}`;
          if (key === excludeKey) continue;

          const entry = getOrCreate(store, verb.id, tense, register, person);
          const w = weight(entry.correct, entry.incorrect, entry.streak, entry.lastSeen);

          const conj = verb.conjugations[register][tense][person];

          candidates.push({
            item: {
              verbId: verb.id,
              verbNoun: verb.verbNoun,
              verbEnglish: verb.english,
              tense,
              register,
              person,
              prompt: conj.english,
              answer: conj.welsh,
              alternatives: conj.alternatives,
            },
            weight: w,
          });
        }
      }
    }
  }

  // Weighted random selection — higher weight = more likely to be chosen
  const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const c of candidates) {
    rand -= c.weight;
    if (rand <= 0) return c.item;
  }

  // Fallback: return last candidate
  return candidates[candidates.length - 1].item;
}
