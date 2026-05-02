export type Person = 'i' | 'ti' | 'e' | 'hi' | 'ni' | 'chi' | 'nhw';
export type Tense = 'present' | 'past' | 'future';
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

const PERSONS: Person[] = ['i', 'ti', 'e', 'hi', 'ni', 'chi', 'nhw'];

const SUBJ: Record<Person, string> = {
  i: 'I', ti: 'you', e: 'he', hi: 'she', ni: 'we', chi: 'you', nhw: 'they',
};

const INF_PRES: Record<Person, string> = {
  i: "dw i'n", ti: "rwyt ti'n", e: "mae e'n", hi: "mae hi'n",
  ni: "dyn ni'n", chi: "dych chi'n", nhw: "maen nhw'n",
};

const FORM_PRES: Record<Person, string> = {
  i: "rydw i'n", ti: "rwyt ti'n", e: "mae e'n", hi: "mae hi'n",
  ni: "rydyn ni'n", chi: "rydych chi'n", nhw: "maen nhw'n",
};

const INF_FUT: Record<Person, string> = {
  i: "bydda i'n", ti: "byddi di'n", e: "bydd e'n", hi: "bydd hi'n",
  ni: "byddwn ni'n", chi: "byddwch chi'n", nhw: "byddan nhw'n",
};

function periph(
  id: string,
  verbNoun: string,
  english: string,
  pastForms: Record<Person, string>,
  pastEnglish: string,
  pastAlts?: Partial<Record<Person, string[]>>,
): Verb {
  return {
    id, verbNoun, english: `to ${english}`,
    conjugations: {
      informal: {
        present: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_PRES[p]} ${verbNoun}`,
          english: `${SUBJ[p]} ${english}`,
        }])) as ConjugationTable,
        past: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: pastForms[p],
          english: `${SUBJ[p]} ${pastEnglish}`,
          alternatives: pastAlts?.[p],
        }])) as ConjugationTable,
        future: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_FUT[p]} ${verbNoun}`,
          english: `${SUBJ[p]} will ${english}`,
        }])) as ConjugationTable,
      },
      formal: {
        present: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${FORM_PRES[p]} ${verbNoun}`,
          english: `${SUBJ[p]} ${english}`,
        }])) as ConjugationTable,
        past: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: pastForms[p],
          english: `${SUBJ[p]} ${pastEnglish}`,
          alternatives: pastAlts?.[p],
        }])) as ConjugationTable,
        future: Object.fromEntries(PERSONS.map(p => [p, {
          welsh: `${INF_FUT[p]} ${verbNoun}`,
          english: `${SUBJ[p]} will ${english}`,
        }])) as ConjugationTable,
      },
    },
  };
}

// ── bod (to be) ── irregular, fully manual ─────────────────────────────────
const bod: Verb = {
  id: 'bod', verbNoun: 'bod', english: 'to be',
  conjugations: {
    informal: {
      present: {
        i:   { welsh: 'dw i',       english: 'I am',        alternatives: ['rydw i'] },
        ti:  { welsh: 'rwyt ti',    english: 'you are',     alternatives: ['wyt ti'] },
        e:   { welsh: 'mae e',      english: 'he is',       alternatives: ['mae fo'] },
        hi:  { welsh: 'mae hi',     english: 'she is' },
        ni:  { welsh: 'dyn ni',     english: 'we are',      alternatives: ['rydyn ni'] },
        chi: { welsh: 'dych chi',   english: 'you are',     alternatives: ['rydych chi'] },
        nhw: { welsh: 'maen nhw',   english: 'they are' },
      },
      past: {
        i:   { welsh: 'roeddwn i',    english: 'I was' },
        ti:  { welsh: 'roeddet ti',   english: 'you were' },
        e:   { welsh: 'roedd e',      english: 'he was' },
        hi:  { welsh: 'roedd hi',     english: 'she was' },
        ni:  { welsh: 'roedden ni',   english: 'we were' },
        chi: { welsh: 'roeddech chi', english: 'you were' },
        nhw: { welsh: 'roedden nhw',  english: 'they were' },
      },
      future: {
        i:   { welsh: 'bydda i',      english: 'I will be' },
        ti:  { welsh: 'byddi di',     english: 'you will be' },
        e:   { welsh: 'bydd e',       english: 'he will be' },
        hi:  { welsh: 'bydd hi',      english: 'she will be' },
        ni:  { welsh: 'byddwn ni',    english: 'we will be' },
        chi: { welsh: 'byddwch chi',  english: 'you will be' },
        nhw: { welsh: 'byddan nhw',   english: 'they will be' },
      },
    },
    formal: {
      present: {
        i:   { welsh: 'rydw i',       english: 'I am' },
        ti:  { welsh: 'rwyt ti',      english: 'you are' },
        e:   { welsh: 'y mae e',      english: 'he is' },
        hi:  { welsh: 'y mae hi',     english: 'she is' },
        ni:  { welsh: 'rydyn ni',     english: 'we are' },
        chi: { welsh: 'rydych chi',   english: 'you are' },
        nhw: { welsh: 'y maent nhw',  english: 'they are', alternatives: ['maent nhw'] },
      },
      past: {
        i:   { welsh: 'bûm i',     english: 'I was' },
        ti:  { welsh: 'buost ti',  english: 'you were' },
        e:   { welsh: 'bu e',      english: 'he was',  alternatives: ['bu ef'] },
        hi:  { welsh: 'bu hi',     english: 'she was' },
        ni:  { welsh: 'buon ni',   english: 'we were' },
        chi: { welsh: 'buoch chi', english: 'you were' },
        nhw: { welsh: 'buon nhw',  english: 'they were' },
      },
      future: {
        i:   { welsh: 'byddaf i',    english: 'I will be', alternatives: ['bydda i'] },
        ti:  { welsh: 'byddi di',    english: 'you will be' },
        e:   { welsh: 'bydd e',      english: 'he will be' },
        hi:  { welsh: 'bydd hi',     english: 'she will be' },
        ni:  { welsh: 'byddwn ni',   english: 'we will be' },
        chi: { welsh: 'byddwch chi', english: 'you will be' },
        nhw: { welsh: 'byddan nhw',  english: 'they will be' },
      },
    },
  },
};

// ── regular verbs ──────────────────────────────────────────────────────────
const mynd    = periph('mynd',    'mynd',    'go',         { i:'es i',          ti:'est ti',         e:'aeth e',       hi:'aeth hi',       ni:'aethon ni',    chi:'aethoch chi',   nhw:'aethon nhw'    }, 'went');
const dod     = periph('dod',     'dod',     'come',       { i:'des i',         ti:'dest ti',        e:'daeth e',      hi:'daeth hi',      ni:'daethon ni',   chi:'daethoch chi',  nhw:'daethon nhw'   }, 'came');
const gwneud  = periph('gwneud',  'gwneud',  'do',         { i:'gwnes i',       ti:'gwnest ti',      e:'gwnaeth e',    hi:'gwnaeth hi',    ni:'gwnaethon ni', chi:'gwnaethoch chi',nhw:'gwnaethon nhw' }, 'did');
const cael    = periph('cael',    'cael',    'have',       { i:'ces i',         ti:'cest ti',        e:'cafodd e',     hi:'cafodd hi',     ni:'cawson ni',    chi:'cawsoch chi',   nhw:'cawson nhw'    }, 'had');
const hoffi   = periph('hoffi',   'hoffi',   'like',       { i:'hoffes i',      ti:'hoffest ti',     e:'hoffodd e',    hi:'hoffodd hi',    ni:'hoffon ni',    chi:'hoffoch chi',   nhw:'hoffon nhw'    }, 'liked');
const gallu   = periph('gallu',   'gallu',   'be able to', { i:'gallais i',     ti:'gallaist ti',    e:'gallodd e',    hi:'gallodd hi',    ni:'gallon ni',    chi:'galloch chi',   nhw:'gallon nhw'    }, 'was able to', { i:['galles i'], ti:['gallest ti'] });
const gweld   = periph('gweld',   'gweld',   'see',        { i:'gweles i',      ti:'gwelest ti',     e:'gwelodd e',    hi:'gwelodd hi',    ni:'gwelon ni',    chi:'gweloch chi',   nhw:'gwelon nhw'    }, 'saw',         { i:['gwelais i'] });
const siarad  = periph('siarad',  'siarad',  'speak',      { i:'siaredes i',    ti:'siaradest ti',   e:'siaradodd e',  hi:'siaradodd hi',  ni:'siaradon ni',  chi:'siaradoch chi', nhw:'siaradon nhw'  }, 'spoke');
const bwyta   = periph('bwyta',   'bwyta',   'eat',        { i:'bwytes i',      ti:'bwytest ti',     e:'bwytodd e',    hi:'bwytodd hi',    ni:'bwyton ni',    chi:'bwytoch chi',   nhw:'bwyton nhw'    }, 'ate');
const yfed    = periph('yfed',    'yfed',    'drink',      { i:'yfes i',        ti:'yfest ti',       e:'yfodd e',      hi:'yfodd hi',      ni:'yfon ni',      chi:'yfoch chi',     nhw:'yfon nhw'      }, 'drank');
const gweithio= periph('gweithio','gweithio','work',       { i:'gweithies i',   ti:'gweithiest ti',  e:'gweithiodd e', hi:'gweithiodd hi', ni:'gweithion ni', chi:'gweithioch chi',nhw:'gweithion nhw' }, 'worked');
const chwarae = periph('chwarae', 'chwarae', 'play',       { i:'chwaraeais i',  ti:'chwaraeaist ti', e:'chwaraeodd e', hi:'chwaraeodd hi', ni:'chwaraeon ni', chi:'chwaraech chi', nhw:'chwaraeon nhw' }, 'played',      { i:['chwaraees i'] });
const dysgu   = periph('dysgu',   'dysgu',   'learn',      { i:'dysges i',      ti:'dysgaist ti',    e:'dysgodd e',    hi:'dysgodd hi',    ni:'dysgon ni',    chi:'dysgoch chi',   nhw:'dysgon nhw'    }, 'learned',     { i:['dysgais i'], ti:['dysgest ti'] });
const prynu   = periph('prynu',   'prynu',   'buy',        { i:'prynais i',     ti:'prynaist ti',    e:'prynodd e',    hi:'prynodd hi',    ni:'prynon ni',    chi:'prynoch chi',   nhw:'prynon nhw'    }, 'bought',      { i:['prynes i'],  ti:['prynest ti'] });
const aros    = periph('aros',    'aros',    'wait/stay',  { i:'arhosais i',    ti:'arhost ti',      e:'arhosodd e',   hi:'arhosodd hi',   ni:'arhoson ni',   chi:'arhosoch chi',  nhw:'arhoson nhw'   }, 'waited',      { i:['arhoses i'] });
const canu    = periph('canu',    'canu',    'sing',       { i:'canes i',       ti:'canest ti',      e:'canodd e',     hi:'canodd hi',     ni:'canon ni',     chi:'canoch chi',    nhw:'canon nhw'     }, 'sang',        { i:['canais i'],  ti:['canaist ti'] });
const coginio = periph('coginio', 'coginio', 'cook',       { i:'coginies i',    ti:'coginiest ti',   e:'coginiodd e',  hi:'coginiodd hi',  ni:'coginion ni',  chi:'coginioch chi', nhw:'coginion nhw'  }, 'cooked');
const dechrau = periph('dechrau', 'dechrau', 'start',      { i:'dechreues i',   ti:'dechreuest ti',  e:'dechreuodd e', hi:'dechreuodd hi', ni:'dechreuon ni', chi:'dechreuoch chi',nhw:'dechreuon nhw' }, 'started',     { i:['dechreuais i'] });
const gorffen = periph('gorffen', 'gorffen', 'finish',     { i:'gorffennais i', ti:'gorffennaist ti',e:'gorffennodd e',hi:'gorffennodd hi',ni:'gorffennon ni',chi:'gorffennoch chi',nhw:'gorffennon nhw'}, 'finished',    { i:['gorffennes i'], ti:['gorffennest ti'] });
const darllen = periph('darllen', 'darllen', 'read',       { i:'darllenes i',   ti:'darllenest ti',  e:'darllenodd e', hi:'darllenodd hi', ni:'darllenon ni', chi:'darllenoch chi',nhw:'darllenon nhw' }, 'read',        { i:['darllenais i'] });
const meddwl  = periph('meddwl',  'meddwl',  'think',      { i:'meddyliais i',  ti:'meddyliaist ti', e:'meddyliodd e', hi:'meddyliodd hi', ni:'meddylion ni', chi:'meddylioch chi',nhw:'meddylion nhw' }, 'thought',     { i:['meddyles i'] });

// gwybod/adnabod use imperfect of bod for past (standard in colloquial Welsh)
const gwybod  = periph('gwybod',  'gwybod',  'know (fact)',   { i:"roeddwn i'n gwybod",  ti:"roeddet ti'n gwybod",  e:"roedd e'n gwybod",  hi:"roedd hi'n gwybod",  ni:"roedden ni'n gwybod",  chi:"roeddech chi'n gwybod",  nhw:"roedden nhw'n gwybod"  }, 'knew');
const adnabod = periph('adnabod', 'adnabod', 'know (person)', { i:"roeddwn i'n adnabod", ti:"roeddet ti'n adnabod", e:"roedd e'n adnabod", hi:"roedd hi'n adnabod", ni:"roedden ni'n adnabod", chi:"roeddech chi'n adnabod", nhw:"roedden nhw'n adnabod" }, 'knew');

export const VERBS: Verb[] = [
  bod, mynd, dod, gwneud, cael, hoffi, gallu,
  gweld, siarad, bwyta, yfed, gweithio, chwarae,
  dysgu, prynu, aros, canu, coginio, dechrau, gorffen,
  darllen, meddwl, gwybod, adnabod,
];

export default VERBS;