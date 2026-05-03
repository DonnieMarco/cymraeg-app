export type Person = 'i' | 'ti' | 'e' | 'hi' | 'ni' | 'chi' | 'nhw';
export type Tense = 'present' | 'imperfect' | 'past' | 'future' | 'conditional';
export type Register = 'informal' | 'formal';

export interface Conjugation {
  welsh: string;
  english: string;
  alternatives?: string[];
}

export type ConjugationTable = Record<Person, Conjugation>;
export type TenseTable = Record<Tense, ConjugationTable>;
export type RegisterTable = Record<Register, TenseTable>;

export interface Verb {
  id: string;
  verbNoun: string;
  english: string;
  conjugations: RegisterTable;
}

// ── Helpers ──────────────────────────────────────────────────────────────

const PERSONS: Person[] = ['i', 'ti', 'e', 'hi', 'ni', 'chi', 'nhw'];

const SUBJ: Record<Person, string> = {
  i: 'I', ti: 'you', e: 'he', hi: 'she', ni: 'we', chi: 'you', nhw: 'they',
};

// Present tense of bod (informal) — periphrastic base
const INF_PRES: Record<Person, string> = {
  i: "dw i'n", ti: "rwyt ti'n", e: "mae e'n", hi: "mae hi'n",
  ni: "dyn ni'n", chi: "dych chi'n", nhw: "maen nhw'n",
};

// Present tense of bod (formal)
const FORM_PRES: Record<Person, string> = {
  i: "rydw i'n", ti: "rwyt ti'n", e: "mae e'n", hi: "mae hi'n",
  ni: "rydyn ni'n", chi: "rydych chi'n", nhw: "maen nhw'n",
};

// Imperfect of bod (informal) — "I was/used to"
const INF_IMPERF: Record<Person, string> = {
  i: "ro'n i'n", ti: "ro't ti'n", e: "roedd e'n", hi: "roedd hi'n",
  ni: "ro'n ni'n", chi: "ro'ch chi'n", nhw: "ro'n nhw'n",
};

// Imperfect of bod (formal)
const FORM_IMPERF: Record<Person, string> = {
  i: "roeddwn i'n", ti: "roeddet ti'n", e: "roedd e'n", hi: "roedd hi'n",
  ni: "roedden ni'n", chi: "roeddech chi'n", nhw: "roedden nhw'n",
};

// Future of bod (informal) — periphrastic future
const INF_FUT: Record<Person, string> = {
  i: "bydda i'n", ti: "byddi di'n", e: "bydd e'n", hi: "bydd hi'n",
  ni: "byddwn ni'n", chi: "byddwch chi'n", nhw: "byddan nhw'n",
};

// Future of bod (formal)
const FORM_FUT: Record<Person, string> = {
  i: "byddaf i'n", ti: "byddi di'n", e: "bydd e'n", hi: "bydd hi'n",
  ni: "byddwn ni'n", chi: "byddwch chi'n", nhw: "byddant nhw'n",
};

// Conditional of bod (informal)
const INF_COND: Record<Person, string> = {
  i: "baswn i'n", ti: "baset ti'n", e: "basai fe'n", hi: "basai hi'n",
  ni: "basen ni'n", chi: "basech chi'n", nhw: "basen nhw'n",
};

// Conditional of bod (formal)
const FORM_COND: Record<Person, string> = {
  i: "baswn i'n", ti: "baset ti'n", e: "basai ef yn", hi: "basai hi'n",
  ni: "basen ni'n", chi: "basech chi'n", nhw: "basent hwy'n",
};

// ── English helpers ──────────────────────────────────────────────────────

function thirdPersonPresent(english: string): string {
  if (english === 'be able to') return 'is able to';
  if (english === 'wait/stay') return 'waits/stays';
  if (english === 'do/make') return 'does/makes';
  if (english === 'go') return 'goes';
  if (english === 'have/get') return 'has/gets';
  if (english === 'come') return 'comes';
  if (english.endsWith('ch')) return english + 'es';
  if (english.endsWith('sh')) return english + 'es';
  if (english.endsWith('ss')) return english + 'es';
  if (english.endsWith('y')) return english.slice(0, -1) + 'ies';
  return english + 's';
}

function presEng(p: Person, eng: string): string {
  return (p === 'e' || p === 'hi')
    ? `${SUBJ[p]} ${thirdPersonPresent(eng)}`
    : `${SUBJ[p]} ${eng}`;
}

function imperfEng(p: Person, eng: string): string {
  const wasWere = (p === 'i' || p === 'e' || p === 'hi') ? 'was' : 'were';
  return `${SUBJ[p]} ${wasWere} ${eng.endsWith('e') ? eng.slice(0, -1) + 'ing' : eng + 'ing'}`;
}

function condEng(p: Person, eng: string): string {
  return `${SUBJ[p]} would ${eng}`;
}

// ── Periphrastic verb builder ────────────────────────────────────────────
// Builds all 5 tenses using bod + yn + verbnoun for present, imperfect,
// future and conditional. Past tense uses supplied inflected forms.

function periph(
  id: string,
  verbNoun: string,
  english: string,
  pastForms: Record<Person, string>,
  pastEnglish: string,
  pastAlts?: Partial<Record<Person, string[]>>,
  futureAlts?: Partial<Record<Person, string[]>>,
): Verb {
  return {
    id,
    verbNoun,
    english: `to ${english}`,
    conjugations: {
      informal: {
        present: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_PRES[p]} ${verbNoun}`,
          english: presEng(p, english),
        }])) as ConjugationTable,

        imperfect: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_IMPERF[p]} ${verbNoun}`,
          english: imperfEng(p, english),
        }])) as ConjugationTable,

        past: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: pastForms[p],
          english: `${SUBJ[p]} ${pastEnglish}`,
          ...(pastAlts?.[p] ? { alternatives: pastAlts[p] } : {}),
        }])) as ConjugationTable,

        future: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_FUT[p]} ${verbNoun}`,
          english: `${SUBJ[p]} will ${english}`,
          ...(futureAlts?.[p] ? { alternatives: futureAlts[p] } : {}),
        }])) as ConjugationTable,

        conditional: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_COND[p]} ${verbNoun}`,
          english: condEng(p, english),
        }])) as ConjugationTable,
      },
      formal: {
        present: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${FORM_PRES[p]} ${verbNoun}`,
          english: presEng(p, english),
        }])) as ConjugationTable,

        imperfect: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${FORM_IMPERF[p]} ${verbNoun}`,
          english: imperfEng(p, english),
        }])) as ConjugationTable,

        past: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: pastForms[p],
          english: `${SUBJ[p]} ${pastEnglish}`,
          ...(pastAlts?.[p] ? { alternatives: pastAlts[p] } : {}),
        }])) as ConjugationTable,

        future: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${FORM_FUT[p]} ${verbNoun}`,
          english: `${SUBJ[p]} will ${english}`,
          ...(futureAlts?.[p] ? { alternatives: futureAlts[p] } : {}),
        }])) as ConjugationTable,

        conditional: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${FORM_COND[p]} ${verbNoun}`,
          english: condEng(p, english),
        }])) as ConjugationTable,
      },
    },
  };
}

// ── BOD (to be) — fully manual ───────────────────────────────────────────

const bod: Verb = {
  id: 'bod', verbNoun: 'bod', english: 'to be',
  conjugations: {
    informal: {
      present: {
        i:   { welsh: "dw i'n",       english: 'I am',        alternatives: ["rydw i'n"] },
        ti:  { welsh: "rwyt ti'n",    english: 'you are' },
        e:   { welsh: "mae e'n",      english: 'he is' },
        hi:  { welsh: "mae hi'n",     english: 'she is' },
        ni:  { welsh: "dyn ni'n",     english: 'we are',      alternatives: ["rydyn ni'n"] },
        chi: { welsh: "dych chi'n",   english: 'you are',     alternatives: ["rydych chi'n"] },
        nhw: { welsh: "maen nhw'n",   english: 'they are' },
      },
      imperfect: {
        i:   { welsh: "ro'n i'n",     english: 'I was',       alternatives: ["roeddwn i'n"] },
        ti:  { welsh: "ro't ti'n",    english: 'you were',    alternatives: ["roeddet ti'n"] },
        e:   { welsh: "roedd e'n",    english: 'he was' },
        hi:  { welsh: "roedd hi'n",   english: 'she was' },
        ni:  { welsh: "ro'n ni'n",    english: 'we were',     alternatives: ["roedden ni'n"] },
        chi: { welsh: "ro'ch chi'n",  english: 'you were',    alternatives: ["roeddech chi'n"] },
        nhw: { welsh: "ro'n nhw'n",   english: 'they were',   alternatives: ["roedden nhw'n"] },
      },
      past: {
        i:   { welsh: "bues i",       english: 'I was/have been' },
        ti:  { welsh: "buest ti",     english: 'you were/have been' },
        e:   { welsh: "buodd e",      english: 'he was/has been' },
        hi:  { welsh: "buodd hi",     english: 'she was/has been' },
        ni:  { welsh: "buon ni",      english: 'we were/have been' },
        chi: { welsh: "buoch chi",    english: 'you were/have been' },
        nhw: { welsh: "buon nhw",     english: 'they were/have been' },
      },
      future: {
        i:   { welsh: "bydda i'n",    english: 'I will be' },
        ti:  { welsh: "byddi di'n",   english: 'you will be' },
        e:   { welsh: "bydd e'n",     english: 'he will be' },
        hi:  { welsh: "bydd hi'n",    english: 'she will be' },
        ni:  { welsh: "byddwn ni'n",  english: 'we will be' },
        chi: { welsh: "byddwch chi'n",english: 'you will be' },
        nhw: { welsh: "byddan nhw'n", english: 'they will be' },
      },
      conditional: {
        i:   { welsh: "baswn i'n",    english: 'I would be' },
        ti:  { welsh: "baset ti'n",   english: 'you would be' },
        e:   { welsh: "basai fe'n",   english: 'he would be' },
        hi:  { welsh: "basai hi'n",   english: 'she would be' },
        ni:  { welsh: "basen ni'n",   english: 'we would be' },
        chi: { welsh: "basech chi'n", english: 'you would be' },
        nhw: { welsh: "basen nhw'n",  english: 'they would be' },
      },
    },
    formal: {
      present: {
        i:   { welsh: "rydw i'n",      english: 'I am' },
        ti:  { welsh: "rwyt ti'n",     english: 'you are' },
        e:   { welsh: "mae e'n",       english: 'he is' },
        hi:  { welsh: "mae hi'n",      english: 'she is' },
        ni:  { welsh: "rydyn ni'n",    english: 'we are' },
        chi: { welsh: "rydych chi'n",  english: 'you are' },
        nhw: { welsh: "maen nhw'n",    english: 'they are' },
      },
      imperfect: {
        i:   { welsh: "roeddwn i'n",   english: 'I was' },
        ti:  { welsh: "roeddet ti'n",  english: 'you were' },
        e:   { welsh: "roedd e'n",     english: 'he was' },
        hi:  { welsh: "roedd hi'n",    english: 'she was' },
        ni:  { welsh: "roedden ni'n",  english: 'we were' },
        chi: { welsh: "roeddech chi'n",english: 'you were' },
        nhw: { welsh: "roedden nhw'n", english: 'they were' },
      },
      past: {
        i:   { welsh: "bûm i",        english: 'I was/have been' },
        ti:  { welsh: "buost ti",     english: 'you were/have been' },
        e:   { welsh: "bu e",         english: 'he was/has been' },
        hi:  { welsh: "bu hi",        english: 'she was/has been' },
        ni:  { welsh: "buom ni",      english: 'we were/have been' },
        chi: { welsh: "buoch chi",    english: 'you were/have been' },
        nhw: { welsh: "buont hwy",    english: 'they were/have been' },
      },
      future: {
        i:   { welsh: "byddaf i'n",    english: 'I will be' },
        ti:  { welsh: "byddi di'n",    english: 'you will be' },
        e:   { welsh: "bydd e'n",      english: 'he will be' },
        hi:  { welsh: "bydd hi'n",     english: 'she will be' },
        ni:  { welsh: "byddwn ni'n",   english: 'we will be' },
        chi: { welsh: "byddwch chi'n", english: 'you will be' },
        nhw: { welsh: "byddant hwy'n", english: 'they will be' },
      },
      conditional: {
        i:   { welsh: "baswn i'n",     english: 'I would be' },
        ti:  { welsh: "baset ti'n",    english: 'you would be' },
        e:   { welsh: "basai ef yn",   english: 'he would be' },
        hi:  { welsh: "basai hi'n",    english: 'she would be' },
        ni:  { welsh: "basen ni'n",    english: 'we would be' },
        chi: { welsh: "basech chi'n",  english: 'you would be' },
        nhw: { welsh: "basent hwy'n",  english: 'they would be' },
      },
    },
  },
};

// ── MYND (to go) — irregular ─────────────────────────────────────────────
// Short-form past (De Cymru): es i, est ti, aeth e/hi, aethon ni, aethoch chi, aethon nhw
// Short-form future: af i, ei di, aiff e/hi, awn ni, ewch chi, ân nhw

const mynd = periph('mynd', 'mynd', 'go',
  { i: 'es i', ti: 'est ti', e: 'aeth e', hi: 'aeth hi', ni: 'aethon ni', chi: 'aethoch chi', nhw: 'aethon nhw' },
  'went',
  { i: ['ethon i'] },
  // Short-form future alternatives
  { i: ['af i', 'a i'], ti: ['ei di'], e: ['aiff e', 'eith e'], hi: ['aiff hi', 'eith hi'], ni: ['awn ni'], chi: ['ewch chi'], nhw: ['ân nhw'] },
);

// ── DOD (to come) — irregular ────────────────────────────────────────────
// Short-form past (De Cymru): des i, dest ti, daeth e/hi, daethon ni, daethoch chi, daethon nhw
// Short-form future: dof i, doi di, daw e/hi, down ni, dewch chi, dôn nhw

const dod = periph('dod', 'dod', 'come',
  { i: 'des i', ti: 'dest ti', e: 'daeth e', hi: 'daeth hi', ni: 'daethon ni', chi: 'daethoch chi', nhw: 'daethon nhw' },
  'came',
  undefined,
  { i: ['dof i', 'do i'], ti: ['doi di'], e: ['daw e'], hi: ['daw hi'], ni: ['down ni'], chi: ['dewch chi'], nhw: ["dôn nhw"] },
);

// ── GWNEUD (to do/make) — irregular ──────────────────────────────────────
// Short-form past (De Cymru): gwnes i / wnes i, gwnest ti / wnest ti, etc.
// Short-form future: gwna i, gwnei di, gwnaiff e/hi, gwnawn ni, gwnewch chi, gwnân nhw

const gwneud = periph('gwneud', 'gwneud', 'do/make',
  { i: 'gwnes i', ti: 'gwnest ti', e: 'gwnaeth e', hi: 'gwnaeth hi', ni: 'gwnaethon ni', chi: 'gwnaethoch chi', nhw: 'gwnaethon nhw' },
  'did/made',
  { i: ['wnes i'], ti: ['wnest ti'], e: ['wnaeth e'], hi: ['wnaeth hi'], ni: ['wnaethon ni'], chi: ['wnaethoch chi'], nhw: ['wnaethon nhw'] },
  { i: ['gwna i'], ti: ['gwnei di'], e: ['gwnaiff e'], hi: ['gwnaiff hi'], ni: ['gwnawn ni'], chi: ['gwnewch chi'], nhw: ['gwnân nhw'] },
);

// ── CAEL (to have/get) — irregular ───────────────────────────────────────
// Short-form past (De Cymru): ces i / ges i, cest ti / gest ti, etc.
// Short-form future: ca i / ga i, cei di / gei di, caiff e/hi, cawn ni, cewch chi, cân nhw

const cael = periph('cael', 'cael', 'have/get',
  { i: 'ces i', ti: 'cest ti', e: 'cafodd e', hi: 'cafodd hi', ni: 'cawson ni', chi: 'cawsoch chi', nhw: 'cawson nhw' },
  'had/got',
  { i: ['ges i'], ti: ['gest ti'], e: ['gafodd e'], hi: ['gafodd hi'], ni: ['gawson ni'], chi: ['gawsoch chi'], nhw: ['gawson nhw'] },
  { i: ['ca i', 'ga i'], ti: ['cei di', 'gei di'], e: ['caiff e', 'ceith e'], hi: ['caiff hi', 'ceith hi'], ni: ['cawn ni'], chi: ['cewch chi'], nhw: ['cân nhw'] },
);

// ── Regular verbs ────────────────────────────────────────────────────────
// Past forms verified against De Cymru coursebooks (Mynediad/Sylfaen)
// Both -es i and -ais i forms included where applicable

const hoffi   = periph('hoffi',   'hoffi',   'like',
  { i: "hoffes i",     ti: "hoffest ti",    e: "hoffodd e",   hi: "hoffodd hi",   ni: "hoffon ni",    chi: "hoffoch chi",   nhw: "hoffon nhw" },
  'liked',
  { i: ['hoffais i'] });

const gallu   = periph('gallu',   'gallu',   'be able to',
  { i: "galles i",     ti: "gallest ti",    e: "gallodd e",   hi: "gallodd hi",   ni: "gallon ni",    chi: "galloch chi",   nhw: "gallon nhw" },
  'could',
  { i: ['gallais i'] });

const gweld   = periph('gweld',   'gweld',   'see',
  { i: "gweles i",     ti: "gwelest ti",    e: "gwelodd e",   hi: "gwelodd hi",   ni: "gwelon ni",    chi: "gweloch chi",   nhw: "gwelon nhw" },
  'saw',
  { i: ['gwelais i'] });

const siarad  = periph('siarad',  'siarad',  'speak',
  { i: "siarades i",   ti: "siaradest ti",  e: "siaradodd e",  hi: "siaradodd hi",  ni: "siaradon ni",  chi: "siaradoch chi", nhw: "siaradon nhw" },
  'spoke',
  { i: ['siaradais i'] });

const bwyta   = periph('bwyta',   'bwyta',   'eat',
  { i: "bwytais i",    ti: "bwytaist ti",   e: "bwytaodd e",  hi: "bwytaodd hi",  ni: "bwytaon ni",   chi: "bwytaoch chi",  nhw: "bwytaon nhw" },
  'ate',
  { i: ['bwytes i'], ti: ['bwytest ti'] });

const yfed    = periph('yfed',    'yfed',    'drink',
  { i: "yfes i",       ti: "yfest ti",      e: "yfodd e",     hi: "yfodd hi",     ni: "yfon ni",      chi: "yfoch chi",     nhw: "yfon nhw" },
  'drank',
  { i: ['yfais i'] });

const gweithio = periph('gweithio', 'gweithio', 'work',
  { i: "gweithies i",  ti: "gweithiest ti", e: "gweithiodd e", hi: "gweithiodd hi", ni: "gweithion ni", chi: "gweithioch chi", nhw: "gweithion nhw" },
  'worked',
  { i: ['gweithiais i'] });

const chwarae = periph('chwarae', 'chwarae', 'play',
  { i: "chwaraees i",  ti: "chwaraeest ti", e: "chwaraeodd e", hi: "chwaraeodd hi", ni: "chwaraeon ni", chi: "chwaraeoch chi", nhw: "chwaraeon nhw" },
  'played',
  { i: ['chwaraeais i'] });

const dysgu   = periph('dysgu',   'dysgu',   'learn/teach',
  { i: "dysges i",     ti: "dysgest ti",    e: "dysgodd e",   hi: "dysgodd hi",   ni: "dysgon ni",    chi: "dysgoch chi",   nhw: "dysgon nhw" },
  'learned/taught',
  { i: ['dysgais i'] });

const prynu   = periph('prynu',   'prynu',   'buy',
  { i: "brynes i",     ti: "brynest ti",    e: "brynodd e",   hi: "brynodd hi",   ni: "brynon ni",    chi: "brynoch chi",   nhw: "brynon nhw" },
  'bought',
  { i: ['brynais i'], ti: ['brynaist ti'] });

const aros    = periph('aros',    'aros',    'wait/stay',
  { i: "arhoses i",    ti: "arhosest ti",   e: "arhosodd e",  hi: "arhosodd hi",  ni: "arhoson ni",   chi: "arhosoch chi",  nhw: "arhoson nhw" },
  'waited/stayed',
  { i: ['arhosais i'] });

const canu    = periph('canu',    'canu',    'sing',
  { i: "canes i",      ti: "canest ti",     e: "canodd e",    hi: "canodd hi",    ni: "canon ni",     chi: "canoch chi",    nhw: "canon nhw" },
  'sang',
  { i: ['canais i'] });

const coginio = periph('coginio', 'coginio', 'cook',
  { i: "coginies i",   ti: "coginiest ti",  e: "coginiodd e", hi: "coginiodd hi", ni: "coginion ni",  chi: "coginioch chi", nhw: "coginion nhw" },
  'cooked',
  { i: ['coginiais i'] });

const dechrau = periph('dechrau', 'dechrau', 'start',
  { i: "dechreues i",  ti: "dechreuest ti", e: "dechreuodd e", hi: "dechreuodd hi", ni: "dechreuon ni", chi: "dechreuoch chi", nhw: "dechreuon nhw" },
  'started',
  { i: ['dechreuais i'] });

const gorffen = periph('gorffen', 'gorffen', 'finish',
  { i: "gorffennes i", ti: "gorffennest ti", e: "gorffennodd e", hi: "gorffennodd hi", ni: "gorffennon ni", chi: "gorffennoch chi", nhw: "gorffennon nhw" },
  'finished',
  { i: ['gorffennais i'] });

const darllen = periph('darllen', 'darllen', 'read',
  { i: "darllenes i",  ti: "darllenest ti", e: "darllenodd e", hi: "darllenodd hi", ni: "darllenon ni", chi: "darllenoch chi", nhw: "darllenon nhw" },
  'read',
  { i: ['darllenais i'] });

const meddwl  = periph('meddwl',  'meddwl',  'think',
  { i: "meddylies i",  ti: "meddyliest ti", e: "meddyliodd e", hi: "meddyliodd hi", ni: "meddylion ni", chi: "meddylioch chi", nhw: "meddylion nhw" },
  'thought',
  { i: ['meddyliais i'] });

const talu    = periph('talu',    'talu',    'pay',
  { i: "tales i",      ti: "talest ti",     e: "talodd e",    hi: "talodd hi",    ni: "talon ni",     chi: "taloch chi",    nhw: "talon nhw" },
  'paid',
  { i: ['talais i'] });

const gyrru   = periph('gyrru',   'gyrru',   'drive/send',
  { i: "gyrres i",     ti: "gyrrest ti",    e: "gyrrodd e",   hi: "gyrrodd hi",   ni: "gyrron ni",    chi: "gyrroch chi",   nhw: "gyrron nhw" },
  'drove/sent',
  { i: ['gyrrais i'] });

const cerdded = periph('cerdded', 'cerdded', 'walk',
  { i: "cerddes i",    ti: "cerddest ti",   e: "cerddodd e",  hi: "cerddodd hi",  ni: "cerddon ni",   chi: "cerddoch chi",  nhw: "cerddon nhw" },
  'walked',
  { i: ['cerddais i'] });

const rhedeg  = periph('rhedeg',  'rhedeg',  'run',
  { i: "rhedes i",     ti: "rhedest ti",    e: "rhedodd e",   hi: "rhedodd hi",   ni: "rhedon ni",    chi: "rhedoch chi",   nhw: "rhedon nhw" },
  'ran',
  { i: ['rhedais i'] });

const ysgrifennu = periph('ysgrifennu', 'ysgrifennu', 'write',
  { i: "ysgrifennes i", ti: "ysgrifennest ti", e: "ysgrifennodd e", hi: "ysgrifennodd hi", ni: "ysgrifennon ni", chi: "ysgrifennoch chi", nhw: "ysgrifennon nhw" },
  'wrote',
  { i: ['ysgrifennais i'] });

const cyrraedd = periph('cyrraedd', 'cyrraedd', 'arrive',
  { i: "cyrhaeddes i", ti: "cyrhaeddest ti", e: "cyrhaeddodd e", hi: "cyrhaeddodd e", ni: "cyrhaeddon ni", chi: "cyrhaeddoch chi", nhw: "cyrhaeddon nhw" },
  'arrived',
  { i: ['cyrhaeddais i'] });

// gwybod/adnabod — stative verbs: use imperfect of bod for colloquial past
const gwybod  = periph('gwybod',  'gwybod',  'know (fact)',
  { i: "ro'n i'n gwybod", ti: "ro't ti'n gwybod", e: "roedd e'n gwybod", hi: "roedd hi'n gwybod", ni: "ro'n ni'n gwybod", chi: "ro'ch chi'n gwybod", nhw: "ro'n nhw'n gwybod" },
  'knew',
  { i: ["roeddwn i'n gwybod"], ti: ["roeddet ti'n gwybod"], ni: ["roedden ni'n gwybod"], chi: ["roeddech chi'n gwybod"], nhw: ["roedden nhw'n gwybod"] });

const adnabod = periph('adnabod', 'adnabod', 'know (person)',
  { i: "ro'n i'n adnabod", ti: "ro't ti'n adnabod", e: "roedd e'n adnabod", hi: "roedd hi'n adnabod", ni: "ro'n ni'n adnabod", chi: "ro'ch chi'n adnabod", nhw: "ro'n nhw'n adnabod" },
  'knew',
  { i: ["roeddwn i'n adnabod"], ti: ["roeddet ti'n adnabod"], ni: ["roedden ni'n adnabod"], chi: ["roeddech chi'n adnabod"], nhw: ["roedden nhw'n adnabod"] });

// ── Export ────────────────────────────────────────────────────────────────

export const VERBS: Verb[] = [
  bod, mynd, dod, gwneud, cael,
  hoffi, gallu, gweld, siarad, bwyta, yfed,
  gweithio, chwarae, dysgu, prynu, aros,
  canu, coginio, dechrau, gorffen, darllen, meddwl,
  talu, gyrru, cerdded, rhedeg, ysgrifennu, cyrraedd,
  gwybod, adnabod,
];

export default VERBS;