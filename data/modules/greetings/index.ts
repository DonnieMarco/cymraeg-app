// data/modules/greetings/index.ts
import { TopicModule } from '../../../types/topic';

const greetings: TopicModule = {
  id: 'greetings',
  slug: 'greetings',
  title: 'Cyfarchion',
  titleEn: 'Greetings',
  icon: '👋',
  cefr: 'A1',
  status: 'reference',
  mynediadUnits: [1],
  duolingoSection: 1,
  duolingoUnits: [1, 2],
  grammar: [
    {
      title: 'Time-based greetings',
      explanation:
        'Welsh greetings follow noun + adjective order. Bore da is literally "morning good".',
      examples: [
        { cy: 'bore da', en: 'good morning' },
        { cy: 'prynhawn da', en: 'good afternoon' },
        { cy: 'noswaith dda', en: 'good evening' },
        { cy: 'nos da', en: 'good night (farewell)' },
      ],
    },
    {
      title: 'How are you?',
      explanation:
        'Use Sut dych chi? (formal/plural) or Sut wyt ti? (informal singular). Common replies range from da iawn to ofnadwy.',
      examples: [
        { cy: 'sut dych chi?', en: 'how are you? (formal)' },
        { cy: 'sut wyt ti?', en: 'how are you? (informal)' },
        { cy: 'da iawn, diolch', en: 'very well, thanks' },
        { cy: 'iawn, diolch', en: 'OK, thanks' },
        { cy: 'gweddol', en: 'so-so' },
        { cy: 'wedi blino', en: 'tired' },
        { cy: 'ofnadwy', en: 'terrible' },
      ],
    },
    {
      title: 'Introductions',
      explanation:
        'When introducing yourself, the name goes FIRST for emphasis. Siôn dw i, not *Dw i\'n Siôn. This is an emphatic pattern.',
      examples: [
        { cy: 'Siôn dw i', en: 'I am Siôn (lit. "Siôn am I")' },
        { cy: 'pwy dych chi?', en: 'who are you? (formal)' },
        { cy: 'pwy wyt ti?', en: 'who are you? (informal)' },
        { cy: 'ble dych chi\'n byw?', en: 'where do you live? (formal)' },
        { cy: 'ble rwyt ti\'n byw?', en: 'where do you live? (informal)' },
      ],
    },
    {
      title: 'Farewells',
      explanation: 'Common ways to say goodbye.',
      examples: [
        { cy: 'hwyl', en: 'bye / cheerio' },
        { cy: 'hwyl fawr', en: 'goodbye (lit. "great fun")' },
        { cy: 'nos da', en: 'goodnight' },
        { cy: 'wela i chi', en: "I'll see you (formal)" },
        { cy: 'wela i ti', en: "I'll see you (informal)" },
        { cy: 'pob lwc', en: 'good luck' },
      ],
    },
    {
      title: 'Useful classroom phrases',
      explanation: 'Phrases you hear in a Welsh class.',
      examples: [
        { cy: 'croeso', en: 'welcome' },
        { cy: 'diolch', en: 'thanks' },
        { cy: 'diolch yn fawr', en: 'thank you very much' },
        { cy: "mae'n ddrwg gyda fi", en: "I'm sorry" },
        { cy: 'esgusodwch fi', en: 'excuse me' },
        { cy: 'os gwelwch chi\'n dda', en: 'please (formal)' },
      ],
    },
  ],
  exercises: [
    // Greetings by time
    { id: 'greet-bore', prompt: 'Good morning', answer: 'bore da', tags: ['greeting'] },
    { id: 'greet-prynhawn', prompt: 'Good afternoon', answer: 'prynhawn da', tags: ['greeting'] },
    { id: 'greet-noswaith', prompt: 'Good evening', answer: 'noswaith dda', tags: ['greeting'] },
    { id: 'greet-nos', prompt: 'Good night', answer: 'nos da', tags: ['greeting'] },

    // How are you
    { id: 'greet-sut-chi', prompt: 'How are you? (formal)', answer: 'sut dych chi?', alternatives: ['sut ydych chi?'], tags: ['how-are-you'] },
    { id: 'greet-sut-ti', prompt: 'How are you? (informal)', answer: 'sut wyt ti?', tags: ['how-are-you'] },
    { id: 'greet-reply-good', prompt: 'Very well, thanks', answer: 'da iawn, diolch', alternatives: ['da iawn diolch'], tags: ['reply'] },
    { id: 'greet-reply-ok', prompt: 'OK, thanks', answer: 'iawn, diolch', alternatives: ['iawn diolch'], tags: ['reply'] },
    { id: 'greet-reply-tired', prompt: 'Tired', answer: 'wedi blino', tags: ['reply'] },
    { id: 'greet-reply-terrible', prompt: 'Terrible', answer: 'ofnadwy', tags: ['reply'] },
    { id: 'greet-reply-soso', prompt: 'So-so', answer: 'gweddol', tags: ['reply'] },

    // Introductions
    { id: 'greet-pwy-chi', prompt: 'Who are you? (formal)', answer: 'pwy dych chi?', alternatives: ['pwy ydych chi?'], tags: ['intro'] },
    { id: 'greet-pwy-ti', prompt: 'Who are you? (informal)', answer: 'pwy wyt ti?', tags: ['intro'] },
    { id: 'greet-ble-chi', prompt: 'Where do you live? (formal)', answer: "ble dych chi'n byw?", alternatives: ["ble rydych chi'n byw?"], tags: ['intro'] },
    { id: 'greet-ble-ti', prompt: 'Where do you live? (informal)', answer: "ble rwyt ti'n byw?", alternatives: ["ble wyt ti'n byw?"], tags: ['intro'] },

    // Farewells
    { id: 'greet-hwyl', prompt: 'Bye', answer: 'hwyl', alternatives: ['hwyl fawr'], tags: ['farewell'] },
    { id: 'greet-seeyou-chi', prompt: "I'll see you (formal)", answer: 'wela i chi', tags: ['farewell'] },
    { id: 'greet-seeyou-ti', prompt: "I'll see you (informal)", answer: 'wela i ti', tags: ['farewell'] },

    // Useful phrases
    { id: 'greet-croeso', prompt: 'Welcome', answer: 'croeso', tags: ['phrase'] },
    { id: 'greet-diolch', prompt: 'Thank you very much', answer: 'diolch yn fawr', tags: ['phrase'] },
    { id: 'greet-sorry', prompt: "I'm sorry", answer: "mae'n ddrwg gyda fi", alternatives: ["mae'n ddrwg gen i"], tags: ['phrase'] },
    { id: 'greet-excuse', prompt: 'Excuse me (formal)', answer: 'esgusodwch fi', tags: ['phrase'] },
    { id: 'greet-please', prompt: 'Please (formal)', answer: "os gwelwch chi'n dda", tags: ['phrase'] },
    { id: 'greet-luck', prompt: 'Good luck', answer: 'pob lwc', tags: ['phrase'] },
  ],
};

export default greetings;
