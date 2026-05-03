// data/modules/possessives/index.ts
import { TopicModule } from '../../../types/topic';

const possessives: TopicModule = {
  id: 'possessives',
  slug: 'possessives',
  title: 'Fy / Dy / Ei / Ein / Eich / Eu',
  titleEn: 'Possessive Pronouns',
  icon: '🏠',
  cefr: 'A1',
  status: 'drill',
  mynediadUnits: [19, 20, 26],
  duolingoSection: 2,
  duolingoUnits: [11, 12],
  grammar: [
    {
      title: 'fy — my (+ nasal mutation)',
      explanation:
        'fy causes nasal mutation and is followed by i at the end. In speech fy is often dropped, leaving just the mutated noun + i.',
      examples: [
        { cy: 'fy nhad i', en: 'my father' },
        { cy: 'fy nghar i', en: 'my car' },
        { cy: 'fy mhen i', en: 'my head' },
        { cy: 'fy mrawd i', en: 'my brother' },
        { cy: 'fy nrws i', en: 'my door' },
        { cy: 'fy ngwin i', en: 'my wine' },
      ],
    },
    {
      title: 'dy — your informal (+ soft mutation)',
      explanation:
        'dy causes soft mutation and is followed by di at the end. In speech dy is often dropped.',
      examples: [
        { cy: 'dy dad di', en: 'your father' },
        { cy: 'dy gar di', en: 'your car' },
        { cy: 'dy ben di', en: 'your head' },
        { cy: 'dy frawd di', en: 'your brother' },
        { cy: 'dy docyn di', en: 'your ticket' },
      ],
    },
    {
      title: 'ei — his (+ soft mutation)',
      explanation: 'ei (his) causes soft mutation and is followed by e/fe at the end.',
      examples: [
        { cy: 'ei dad e', en: 'his father' },
        { cy: 'ei gar e', en: 'his car' },
        { cy: 'ei ben e', en: 'his head' },
        { cy: 'ei frawd e', en: 'his brother' },
      ],
    },
    {
      title: 'ei — her (+ aspirate mutation)',
      explanation:
        'ei (her) causes aspirate mutation (c→ch, p→ph, t→th) and is followed by hi at the end. Other consonants get soft mutation in practice.',
      examples: [
        { cy: 'ei thad hi', en: 'her father' },
        { cy: 'ei char hi', en: 'her car' },
        { cy: 'ei phen hi', en: 'her head' },
        { cy: 'ei brawd hi', en: 'her brother' },
      ],
    },
    {
      title: 'ein — our (no mutation)',
      explanation: 'ein causes no mutation. Followed by ni at the end.',
      examples: [
        { cy: 'ein tad ni', en: 'our father' },
        { cy: 'ein car ni', en: 'our car' },
        { cy: 'ein brawd ni', en: 'our brother' },
      ],
    },
    {
      title: 'eich — your formal/plural (no mutation)',
      explanation: 'eich causes no mutation. Followed by chi at the end.',
      examples: [
        { cy: 'eich tad chi', en: 'your father' },
        { cy: 'eich car chi', en: 'your car' },
        { cy: 'eich tocyn chi', en: 'your ticket' },
      ],
    },
    {
      title: 'eu — their (no mutation)',
      explanation: 'eu causes no mutation. Followed by nhw at the end.',
      examples: [
        { cy: 'eu tad nhw', en: 'their father' },
        { cy: 'eu car nhw', en: 'their car' },
        { cy: 'eu brawd nhw', en: 'their brother' },
      ],
    },
  ],
  exercises: [
    // --- fy (nasal mutation) ---
    {
      id: 'poss-fy-tad',
      prompt: 'my father',
      answer: 'fy nhad i',
      alternatives: ['nhad i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-car',
      prompt: 'my car',
      answer: 'fy nghar i',
      alternatives: ['nghar i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-pen',
      prompt: 'my head',
      answer: 'fy mhen i',
      alternatives: ['mhen i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-brawd',
      prompt: 'my brother',
      answer: 'fy mrawd i',
      alternatives: ['mrawd i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-drws',
      prompt: 'my door',
      answer: 'fy nrws i',
      alternatives: ['nrws i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-gwin',
      prompt: 'my wine',
      answer: 'fy ngwin i',
      alternatives: ['ngwin i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-bag',
      prompt: 'my bag',
      answer: 'fy mag i',
      alternatives: ['mag i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-gardd',
      prompt: 'my garden',
      answer: 'fy ngardd i',
      alternatives: ['ngardd i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-ty',
      prompt: 'my house',
      answer: 'fy nhŷ i',
      alternatives: ['fy nhy i', 'nhŷ i', 'nhy i'],
      tags: ['fy', 'nasal-mutation'],
    },
    {
      id: 'poss-fy-plant',
      prompt: 'my children',
      answer: 'fy mhlant i',
      alternatives: ['mhlant i'],
      tags: ['fy', 'nasal-mutation'],
    },

    // --- dy (soft mutation) ---
    {
      id: 'poss-dy-tad',
      prompt: 'your (ti) father',
      answer: 'dy dad di',
      alternatives: ['dad di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-car',
      prompt: 'your (ti) car',
      answer: 'dy gar di',
      alternatives: ['gar di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-pen',
      prompt: 'your (ti) head',
      answer: 'dy ben di',
      alternatives: ['ben di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-brawd',
      prompt: 'your (ti) brother',
      answer: 'dy frawd di',
      alternatives: ['frawd di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-tocyn',
      prompt: 'your (ti) ticket',
      answer: 'dy docyn di',
      alternatives: ['docyn di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-ty',
      prompt: 'your (ti) house',
      answer: 'dy dŷ di',
      alternatives: ['dy dy di', 'dŷ di', 'dy di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-gardd',
      prompt: 'your (ti) garden',
      answer: 'dy ardd di',
      alternatives: ['ardd di'],
      tags: ['dy', 'soft-mutation'],
    },
    {
      id: 'poss-dy-gwaith',
      prompt: 'your (ti) work',
      answer: 'dy waith di',
      alternatives: ['waith di'],
      tags: ['dy', 'soft-mutation'],
    },

    // --- ei (his — soft mutation) ---
    {
      id: 'poss-ei-m-tad',
      prompt: 'his father',
      answer: 'ei dad e',
      alternatives: ['ei dad fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },
    {
      id: 'poss-ei-m-car',
      prompt: 'his car',
      answer: 'ei gar e',
      alternatives: ['ei gar fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },
    {
      id: 'poss-ei-m-pen',
      prompt: 'his head',
      answer: 'ei ben e',
      alternatives: ['ei ben fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },
    {
      id: 'poss-ei-m-brawd',
      prompt: 'his brother',
      answer: 'ei frawd e',
      alternatives: ['ei frawd fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },
    {
      id: 'poss-ei-m-ty',
      prompt: 'his house',
      answer: 'ei dŷ e',
      alternatives: ['ei dy e', 'ei dŷ fe', 'ei dy fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },
    {
      id: 'poss-ei-m-gwaith',
      prompt: 'his work',
      answer: 'ei waith e',
      alternatives: ['ei waith fe'],
      tags: ['ei-masc', 'soft-mutation'],
    },

    // --- ei (her — aspirate mutation for c/p/t, soft for others) ---
    {
      id: 'poss-ei-f-tad',
      prompt: 'her father',
      answer: 'ei thad hi',
      tags: ['ei-fem', 'aspirate-mutation'],
    },
    {
      id: 'poss-ei-f-car',
      prompt: 'her car',
      answer: 'ei char hi',
      tags: ['ei-fem', 'aspirate-mutation'],
    },
    {
      id: 'poss-ei-f-pen',
      prompt: 'her head',
      answer: 'ei phen hi',
      tags: ['ei-fem', 'aspirate-mutation'],
    },
    {
      id: 'poss-ei-f-brawd',
      prompt: 'her brother',
      answer: 'ei brawd hi',
      tags: ['ei-fem'],
    },
    {
      id: 'poss-ei-f-gardd',
      prompt: 'her garden',
      answer: 'ei gardd hi',
      tags: ['ei-fem'],
    },
    {
      id: 'poss-ei-f-ty',
      prompt: 'her house',
      answer: 'ei thŷ hi',
      alternatives: ['ei thy hi'],
      tags: ['ei-fem', 'aspirate-mutation'],
    },
    {
      id: 'poss-ei-f-plant',
      prompt: 'her children',
      answer: 'ei phlant hi',
      tags: ['ei-fem', 'aspirate-mutation'],
    },

    // --- ein (our — no mutation) ---
    {
      id: 'poss-ein-tad',
      prompt: 'our father',
      answer: 'ein tad ni',
      tags: ['ein'],
    },
    {
      id: 'poss-ein-car',
      prompt: 'our car',
      answer: 'ein car ni',
      tags: ['ein'],
    },
    {
      id: 'poss-ein-ty',
      prompt: 'our house',
      answer: 'ein tŷ ni',
      alternatives: ['ein ty ni'],
      tags: ['ein'],
    },
    {
      id: 'poss-ein-gardd',
      prompt: 'our garden',
      answer: 'ein gardd ni',
      tags: ['ein'],
    },
    {
      id: 'poss-ein-plant',
      prompt: 'our children',
      answer: 'ein plant ni',
      tags: ['ein'],
    },

    // --- eich (your formal — no mutation) ---
    {
      id: 'poss-eich-tad',
      prompt: 'your (chi) father',
      answer: 'eich tad chi',
      tags: ['eich'],
    },
    {
      id: 'poss-eich-car',
      prompt: 'your (chi) car',
      answer: 'eich car chi',
      tags: ['eich'],
    },
    {
      id: 'poss-eich-tocyn',
      prompt: 'your (chi) ticket',
      answer: 'eich tocyn chi',
      tags: ['eich'],
    },
    {
      id: 'poss-eich-ty',
      prompt: 'your (chi) house',
      answer: 'eich tŷ chi',
      alternatives: ['eich ty chi'],
      tags: ['eich'],
    },
    {
      id: 'poss-eich-brawd',
      prompt: 'your (chi) brother',
      answer: 'eich brawd chi',
      tags: ['eich'],
    },

    // --- eu (their — no mutation) ---
    {
      id: 'poss-eu-tad',
      prompt: 'their father',
      answer: 'eu tad nhw',
      tags: ['eu'],
    },
    {
      id: 'poss-eu-car',
      prompt: 'their car',
      answer: 'eu car nhw',
      tags: ['eu'],
    },
    {
      id: 'poss-eu-ty',
      prompt: 'their house',
      answer: 'eu tŷ nhw',
      alternatives: ['eu ty nhw'],
      tags: ['eu'],
    },
    {
      id: 'poss-eu-brawd',
      prompt: 'their brother',
      answer: 'eu brawd nhw',
      tags: ['eu'],
    },
    {
      id: 'poss-eu-plant',
      prompt: 'their children',
      answer: 'eu plant nhw',
      tags: ['eu'],
    },

    // --- Mixed / sentence-level ---
    {
      id: 'poss-sent-1',
      prompt: "my car is red (start with 'Mae...')",
      answer: "mae fy nghar i'n goch",
      alternatives: ["mae nghar i'n goch"],
      tags: ['fy', 'sentence'],
    },
    {
      id: 'poss-sent-2',
      prompt: "his brother is working (start with 'Mae...')",
      answer: "mae ei frawd e'n gweithio",
      alternatives: ["mae ei frawd fe'n gweithio"],
      tags: ['ei-masc', 'sentence'],
    },
    {
      id: 'poss-sent-3',
      prompt: "her car is blue (start with 'Mae...')",
      answer: "mae ei char hi'n las",
      tags: ['ei-fem', 'sentence'],
    },
    {
      id: 'poss-sent-4',
      prompt: "Where is your (ti) ticket?",
      answer: 'ble mae dy docyn di?',
      alternatives: ['ble mae docyn di?'],
      tags: ['dy', 'sentence'],
    },
    {
      id: 'poss-sent-5',
      prompt: "our children are at school (start with 'Mae...')",
      answer: "mae ein plant ni yn yr ysgol",
      tags: ['ein', 'sentence'],
    },
  ],
};

export default possessives;
