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

const TENSES = ['present', 'past', 'future'] as const;
const TENSE_LABELS = { present: 'Presennol', past: 'Gorffennol', future: 'Dyfodol' };
const TENSE_COLOURS = {
  present: 'text-[#34d399]',
  past: 'text-[#a78bfa]',
  future: 'text-[#e94560]',
};

export default function ConjugationTable({ verb }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {(['informal', 'formal'] as const).map(register => (
        <div key={register}>
          <h3 className="text-slate-400 uppercase text-xs tracking-widest mb-4 font-semibold">
            {register === 'informal' ? 'Anffurfiol — Informal' : 'Ffurfiol — Formal'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TENSES.map(tense => (
              <div key={tense} className="bg-[#16213e] border border-[#0f3460] rounded-2xl p-5">
                <h4 className={`font-bold text-sm uppercase tracking-wide mb-4 ${TENSE_COLOURS[tense]}`}>
                  {TENSE_LABELS[tense]}
                </h4>
                <table className="w-full text-sm">
                  <tbody>
                    {PERSONS.map(({ id, label }) => {
                      const conj = verb.conjugations[register][tense][id];
                      return (
                        <tr key={id} className="border-b border-[#0f3460] last:border-0">
                          <td className="py-2 text-slate-500 w-24 shrink-0">{conj.english}</td>
                          <td className="py-2 text-white font-medium">{conj.welsh}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
