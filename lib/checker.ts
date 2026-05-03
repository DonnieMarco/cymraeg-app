// checker.ts — client-side only, no API calls

export type CheckResult = 'correct' | 'accent_warning' | 'wrong';

export interface CheckResponse {
  result: CheckResult;
  message: string;
}

function normalise(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\u2018|\u2019/g, "'")  // smart single quotes
    .replace(/\u201C|\u201D/g, '"')  // smart double quotes
    .replace(/\s+/g, ' ')
    .replace(/[.,!?;:]+$/, '');
}

function stripAccents(s: string): string {
  return s
    .replace(/[ŵẃ]/g, 'w')
    .replace(/[ŷý]/g, 'y')
    .replace(/[îïí]/g, 'i')
    .replace(/[êéë]/g, 'e')
    .replace(/[ôóö]/g, 'o')
    .replace(/[âáä]/g, 'a')
    .replace(/[ûúü]/g, 'u');
}

// Common prefix swaps — informal ↔ formal, regional variants
const EQUIV_PREFIXES: [string, string][] = [
  // Present with yn
  ["dw i'n", "rydw i'n"],
  ["dw i'n", "rwy'n"],
  ["dwi'n", "dw i'n"],
  ["rwyt ti'n", "wyt ti'n"],
  ["dyn ni'n", "rydyn ni'n"],
  ["dyn ni'n", "ryn ni'n"],
  ["dych chi'n", "rydych chi'n"],
  ["dych chi'n", "ych chi'n"],
  ["maen nhw'n", "maent nhw'n"],
  ["mae e'n", "mae fo'n"],
  ["mae e'n", "mae o'n"],
  // Present without yn
  ["dw i", "rydw i"],
  ["dw i", "rwy"],
  ["dwi", "dw i"],
  ["rwyt ti", "wyt ti"],
  ["dyn ni", "rydyn ni"],
  ["dyn ni", "ryn ni"],
  ["dych chi", "rydych chi"],
  ["dych chi", "ych chi"],
  ["maen nhw", "maent nhw"],
  ["mae e", "mae fo"],
  ["mae e", "mae o"],
  // Past tense particles (Mi/Fe prefix — optional in colloquial)
  ["mi ddes i", "ddes i"],
  ["mi ddest ti", "ddest ti"],
  ["mi ddaeth e", "ddaeth e"],
  ["mi ddaeth hi", "ddaeth hi"],
  ["mi ddaethon ni", "ddaethon ni"],
  ["mi ddaethoch chi", "ddaethoch chi"],
  ["mi ddaethon nhw", "ddaethon nhw"],
  ["fe ddes i", "ddes i"],
  ["fe ddest ti", "ddest ti"],
  ["fe ddaeth e", "ddaeth e"],
  ["fe ddaeth hi", "ddaeth hi"],
  ["fe ddaethon ni", "ddaethon ni"],
  ["fe ddaethoch chi", "ddaethoch chi"],
  ["fe ddaethon nhw", "ddaethon nhw"],
  // Imperfect
  ["roeddwn i", "ro'n i"],
  ["roeddet ti", "ro't ti"],
  ["roedden ni", "ro'n ni"],
  ["roeddech chi", "ro'ch chi"],
  ["roedden nhw", "ro'n nhw"],
  // Negative imperfect
  ["doeddwn i ddim", "do'n i ddim"],
  ["doeddet ti ddim", "do't ti ddim"],
  ["doedden ni ddim", "do'n ni ddim"],
  ["doeddech chi ddim", "do'ch chi ddim"],
  ["doedden nhw ddim", "do'n nhw ddim"],
];

function expandVariants(answer: string): string[] {
  const norm = normalise(answer);
  const variants = new Set<string>([norm]);

  for (const [a, b] of EQUIV_PREFIXES) {
    const na = normalise(a);
    const nb = normalise(b);
    if (norm.startsWith(na)) {
      variants.add(nb + norm.slice(na.length));
    }
    if (norm.startsWith(nb)) {
      variants.add(na + norm.slice(nb.length));
    }
  }

  return Array.from(variants);
}

export function checkAnswer(
  userInput: string,
  answer: string,
  alternatives?: string[]
): CheckResponse {
  const userNorm = normalise(userInput);
  const allAccepted = [answer, ...(alternatives || [])].flatMap(expandVariants);

  // Exact match (after normalisation)
  if (allAccepted.includes(userNorm)) {
    return { result: 'correct', message: 'Cywir! Da iawn!' };
  }

  // Accent-stripped match
  const userStripped = stripAccents(userNorm);
  const strippedAccepted = allAccepted.map(stripAccents);
  if (strippedAccepted.includes(userStripped)) {
    // Find what the correct accented version was
    const correctIdx = strippedAccepted.indexOf(userStripped);
    const correctVersion = allAccepted[correctIdx];
    return {
      result: 'accent_warning',
      message: `Almost! Watch the accents: ${correctVersion}`,
    };
  }

  // Wrong
  return {
    result: 'wrong',
    message: `The correct answer is: ${answer}`,
  };
}

export default checkAnswer;
