function normalise(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.,!?]$/, '');
}

const EQUIV_PREFIXES: [string, string][] = [
  ["dw i'n", "rydw i'n"],
  ["dw i'n", "rwy'n"],
  ["dwi'n", "dw i'n"],
  ["dwi'n", "rydw i'n"],
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
  ["dwi", "dw i"],
  ["dwi", "rydw i"],
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

export function checkAnswer(userInput: string, answer: string, alternatives?: string[]): boolean {
  const userNorm = normalise(userInput);
  const allAccepted = [answer, ...(alternatives || [])].flatMap(expandVariants);
  return allAccepted.includes(userNorm);
}
