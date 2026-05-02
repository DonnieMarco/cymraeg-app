export const verbModuleConfig = {
  id: 'verbs',
  title: 'Berfau',
  titleEnglish: 'Verbs',
  description: 'Drill Welsh verb conjugations across tenses and registers',
  icon: '🔤',
  tenses: ['present', 'past', 'future'] as const,
  registers: ['informal', 'formal'] as const,
  persons: [
    { id: 'i',   label: 'I (i)' },
    { id: 'ti',  label: 'You singular (ti)' },
    { id: 'e',   label: 'He (e)' },
    { id: 'hi',  label: 'She (hi)' },
    { id: 'ni',  label: 'We (ni)' },
    { id: 'chi', label: 'You formal/plural (chi)' },
    { id: 'nhw', label: 'They (nhw)' },
  ],
};