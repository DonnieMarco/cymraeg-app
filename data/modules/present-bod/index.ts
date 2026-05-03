// data/modules/present-bod/index.ts
import { TopicModule } from '../../../types/topic';

const presentBod: TopicModule = {
  id: 'present-bod',
  slug: 'present-bod',
  title: 'Bod (presennol)',
  titleEn: 'Present Tense (bod)',
  icon: '📖',
  cefr: 'A1',
  status: 'drill',
  mynediadUnits: [1, 2, 7],
  duolingoSection: 1,
  duolingoUnits: [3, 4, 6],
  grammar: [
    {
      title: 'Positive — Present tense of bod',
      explanation:
        'The present tense of bod (to be) is the most important pattern in Welsh. The shorter forms (dw i, dyn ni etc.) are used in speech. The fuller forms (rydw i, rydyn ni) are used in media and schools.',
      examples: [
        { cy: 'dw i / rydw i', en: 'I am' },
        { cy: 'rwyt ti / wyt ti', en: 'you are (informal)' },
        { cy: 'mae e/o', en: 'he is' },
        { cy: 'mae hi', en: 'she is' },
        { cy: "'dyn ni / rydyn ni", en: 'we are' },
        { cy: 'dych chi / rydych chi', en: 'you are (formal/plural)' },
        { cy: 'maen nhw', en: 'they are' },
      ],
    },
    {
      title: 'Questions — Present tense of bod',
      explanation:
        'Question forms swap the verb. Answers use Ydw/Nac ydw for first person, Ydy/Nac ydy for third person singular, Ydyn/Nac ydyn for plural.',
      examples: [
        { cy: 'dw i? / ydw i?', en: 'am I?' },
        { cy: 'wyt ti?', en: 'are you? (informal)' },
        { cy: 'ydy e/o?', en: 'is he?' },
        { cy: 'ydy hi?', en: 'is she?' },
        { cy: 'ydyn ni?', en: 'are we?' },
        { cy: 'dych chi? / ydych chi?', en: 'are you? (formal/plural)' },
        { cy: 'ydyn nhw?', en: 'are they?' },
      ],
    },
    {
      title: 'Negative — Present tense of bod',
      explanation:
        'Negative uses ddim after the verb form. The verb changes slightly: dyw for third person singular is common in south Wales.',
      examples: [
        { cy: 'dw i ddim / dydw i ddim', en: 'I am not' },
        { cy: 'dwyt ti ddim', en: 'you are not (informal)' },
        { cy: 'dyw e/o ddim / dydy e ddim', en: 'he is not' },
        { cy: 'dyw hi ddim / dydy hi ddim', en: 'she is not' },
        { cy: "'dyn ni ddim / dydyn ni ddim", en: 'we are not' },
        { cy: 'dych chi ddim / dydych chi ddim', en: 'you are not (formal/plural)' },
        { cy: "'dyn nhw ddim / dydyn nhw ddim", en: 'they are not' },
      ],
    },
    {
      title: 'Answers — Yes and No',
      explanation:
        'Welsh has no single word for yes or no. The answer echoes the verb form used in the question.',
      examples: [
        { cy: 'Wyt ti...? Ydw / Nac ydw', en: 'Are you...? Yes / No (I am/not)' },
        { cy: 'Ydy e...? Ydy / Nac ydy', en: 'Is he...? Yes / No (he is/not)' },
        { cy: 'Ydyn nhw...? Ydyn / Nac ydyn', en: 'Are they...? Yes / No (they are/not)' },
        { cy: 'Dych chi...? Ydw / Nac ydw', en: 'Are you...? Yes / No (when asking one person)' },
        { cy: 'Dych chi...? Ydyn / Nac ydyn', en: 'Are you...? Yes / No (when asking a group)' },
      ],
    },
    {
      title: "Linking with 'n/yn",
      explanation:
        "yn links the verb to what follows. It shortens to 'n after a vowel. It is NOT used before eisiau or angen.",
      examples: [
        { cy: "dw i'n mynd", en: 'I am going / I go' },
        { cy: "mae e'n gweithio", en: 'he is working / he works' },
        { cy: 'dw i ddim yn hoffi', en: "I don't like" },
        { cy: 'dw i eisiau (NO yn)', en: 'I want' },
      ],
    },
  ],
  exercises: [
    // Positive
    { id: 'bod-pos-i', prompt: 'I am learning Welsh', answer: "dw i'n dysgu cymraeg", alternatives: ["rydw i'n dysgu cymraeg", "rwy'n dysgu cymraeg"], tags: ['positive'] },
    { id: 'bod-pos-ti', prompt: 'You (ti) are working', answer: "rwyt ti'n gweithio", alternatives: ["wyt ti'n gweithio"], tags: ['positive'] },
    { id: 'bod-pos-e', prompt: 'He is reading', answer: "mae e'n darllen", alternatives: ["mae o'n darllen", "mae fo'n darllen"], tags: ['positive'] },
    { id: 'bod-pos-hi', prompt: 'She is watching', answer: "mae hi'n gwylio", tags: ['positive'] },
    { id: 'bod-pos-ni', prompt: 'We are going', answer: "'dyn ni'n mynd", alternatives: ["dyn ni'n mynd", "rydyn ni'n mynd", "ryn ni'n mynd"], tags: ['positive'] },
    { id: 'bod-pos-chi', prompt: 'You (chi) are living in Aberystwyth', answer: "dych chi'n byw yn aberystwyth", alternatives: ["rydych chi'n byw yn aberystwyth"], tags: ['positive'] },
    { id: 'bod-pos-nhw', prompt: 'They are playing', answer: "maen nhw'n chwarae", alternatives: ["maent nhw'n chwarae"], tags: ['positive'] },

    // Negative
    { id: 'bod-neg-i', prompt: "I don't like coffee", answer: "dw i ddim yn hoffi coffi", alternatives: ["dw i ddim yn lico coffi", "dydw i ddim yn hoffi coffi"], tags: ['negative'] },
    { id: 'bod-neg-ti', prompt: "You (ti) don't work", answer: "dwyt ti ddim yn gweithio", tags: ['negative'] },
    { id: 'bod-neg-e', prompt: 'He is not going', answer: "dyw e ddim yn mynd", alternatives: ["dydy e ddim yn mynd", "dydy o ddim yn mynd"], tags: ['negative'] },
    { id: 'bod-neg-hi', prompt: 'She is not here', answer: 'dyw hi ddim yma', alternatives: ['dydy hi ddim yma'], tags: ['negative'] },
    { id: 'bod-neg-ni', prompt: "We don't eat meat", answer: "'dyn ni ddim yn bwyta cig", alternatives: ["dyn ni ddim yn bwyta cig", "dydyn ni ddim yn bwyta cig"], tags: ['negative'] },
    { id: 'bod-neg-nhw', prompt: 'They are not coming', answer: "'dyn nhw ddim yn dod", alternatives: ["dyn nhw ddim yn dod", "dydyn nhw ddim yn dod"], tags: ['negative'] },

    // Questions + answers
    { id: 'bod-q-ti', prompt: 'Do you (ti) like rugby?', answer: "wyt ti'n hoffi rygbi?", alternatives: ["wyt ti'n lico rygbi?"], tags: ['question'] },
    { id: 'bod-q-chi', prompt: 'Are you (chi) learning Welsh?', answer: "dych chi'n dysgu cymraeg?", alternatives: ["ydych chi'n dysgu cymraeg?"], tags: ['question'] },
    { id: 'bod-q-e', prompt: 'Is he working today?', answer: "ydy e'n gweithio heddiw?", alternatives: ["ydy o'n gweithio heddiw?"], tags: ['question'] },
    { id: 'bod-q-nhw', prompt: 'Are they coming?', answer: "ydyn nhw'n dod?", tags: ['question'] },
    { id: 'bod-a-ydw', prompt: "Answer 'yes' to: Wyt ti'n hoffi coffi?", answer: 'ydw', tags: ['answer'] },
    { id: 'bod-a-nacydw', prompt: "Answer 'no' to: Dych chi'n gweithio?", answer: 'nac ydw', tags: ['answer'] },
    { id: 'bod-a-ydy', prompt: "Answer 'yes' to: Ydy hi'n dda?", answer: 'ydy', tags: ['answer'] },
    { id: 'bod-a-nacydy', prompt: "Answer 'no' to: Ydy e'n mynd?", answer: 'nac ydy', tags: ['answer'] },
    { id: 'bod-a-ydyn', prompt: "Answer 'yes' to: Ydyn nhw'n chwarae?", answer: 'ydyn', tags: ['answer'] },

    // Eisiau / angen (no yn!)
    { id: 'bod-eisiau', prompt: 'I want a coffee', answer: 'dw i eisiau coffi', alternatives: ['rydw i eisiau coffi'], tags: ['eisiau'] },
    { id: 'bod-angen', prompt: 'She needs a ticket', answer: 'mae hi angen tocyn', tags: ['angen'] },
    { id: 'bod-eisiau-neg', prompt: "I don't want tea", answer: 'dw i ddim eisiau te', alternatives: ['dydw i ddim eisiau te'], tags: ['eisiau'] },
  ],
};

export default presentBod;