'use client';

import { Verb } from '../data/modules/verbs/verbs';

interface Props {
  verb: Verb;
}

const PERSONS = [
  { id: 'i',   label: 'I' },
  { id: 'ti',  label: 'you (ti)' },
  { id: 'e',   label: 'he (e)' },
  { id: 'hi',  label: 'she (hi)' },
  { id: 'ni',  label: 'we (ni)' },
  { id: 'chi', label: 'you (chi)' },
  { id: 'nhw', label: 'they (nhw)' },
] as const;

const TENSES = ['present', 'imperfect', 'past', 'future', 'conditional'] as const;

const TENSE_LABELS: Record<string, string> = {
  present: 'Presennol',
  imperfect: 'Amherffaith',
  past: 'Gorffennol',
  future: 'Dyfodol',
  conditional: 'Amodol',
};

const TENSE_COLOURS: Record<string, string> = {
  present: 'text-[#34d399]',
  imperfect: 'text-[#60a5fa]',
  past: 'text-[#a78bfa]',
  future: 'text-[#e94560]',
  conditional: 'text-[#f59e0b]',
};

export default function ConjugationTable({ verb }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {(['informal', 'formal'] as const).map(register => (
        <div key={register}>
          <h3 className="text-slate-400 uppercase text-xs tracking-widest mb-4 font-semibold">
            {register === 'informal' ? 'Anffurfiol — Informal' : 'Ffurfiol — Formal'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-slate-500 pb-2 pr-4 font-normal">Person</th>
                  {TENSES.map(t => (
                    <th key={t} className={`text-left pb-2 pr-4 font-semibold ${TENSE_COLOURS[t]}`}>
                      {TENSE_LABELS[t]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERSONS.map(({ id, label }) => (
                  <tr key={id} className="border-t border-[#0f3460]/30">
                    <td className="py-3 pr-4 text-slate-400 whitespace-nowrap">{label}</td>
                    {TENSES.map(t => {
                      const conj = verb.conjugations[register][t][id as keyof typeof verb.conjugations.informal.present];
                      return (
                        <td key={t} className="py-3 pr-4">
                          <span className="text-white block">{conj.welsh}</span>
                          <span className="text-slate-500 text-xs block">{conj.english}</span>
                          {conj.alternatives && conj.alternatives.length > 0 && (
                            <span className="text-slate-600 text-xs block italic">
                              also: {conj.alternatives.join(', ')}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
