function normalise(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/'/g, "'")   // normalise smart apostrophes
    .replace(/'/g, "'")
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .replace(/[.,!?]$/, ''); // strip trailing punctuation
}

// Common present tense prefix swaps — Duolingo vs formal
const EQUIV_PREFIXES: [string, string][] = [
  ["dw i'n", "rydw i'n"],
  ["dw i'n", "rwy'n"],
  ["rwyt ti'n", "wyt ti'n"],
  ["dyn ni'n", "rydyn ni'n"],
  ["dyn ni'n", "ryn ni'n"],
  ["dych chi'n", "rydych chi'n"],
  ["dych chi'n", "ych chi'n"],
  ["maen nhw'n", "maent nhw'n"],
  ["mae e'n", "mae fo'n"],
  ["mae e'n", "mae o'n"],
  // without yn
  ["dw i", "rydw i"],
  ["dw i", "rwy"],
  ["rwyt ti", "wyt ti"],
  ["dyn ni", "rydyn ni"],
  ["dyn ni", "ryn ni"],
  ["dych chi", "rydych chi"],
  ["dych chi", "ych chi"],
  ["maen nhw", "maent nhw"],
  ["mae e", "mae fo"],
  ["mae e", "mae o"],
];

function expandVariants(answer: string): string[] {
  const norm = normalise(answer);
  const variants = new Set<string>([norm]);

  for (const [a, b] of EQUIV_PREFIXES) {
    if (norm.startsWith(normalise(a))) {
      variants.add(norm.replace(normalise(a), normalise(b)));
    }
    if (norm.startsWith(normalise(b))) {
      variants.add(norm.replace(normalise(b), normalise(a)));
    }
  }

  return Array.from(variants);
}

export function checkAnswer(userInput: string, answer: string, alternatives?: string[]): boolean {
  const userNorm = normalise(userInput);
  const allAccepted = [answer, ...(alternatives || [])].flatMap(expandVariants);
  return allAccepted.includes(userNorm);
}
