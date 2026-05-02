'use client';

import { useParams, useRouter } from 'next/navigation';
import { VERBS } from '../../../data/modules/verbs/verbs';
import ConjugationTable from '../../../components/ConjugationTable';

export default function VerbPage() {
  const { verbId } = useParams<{ verbId: string }>();
  const router = useRouter();
  const verb = VERBS.find(v => v.id === verbId);

  if (!verb) return (
    <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <p className="text-slate-400">Verb not found</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#1a1a2e] p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors"
        >
          ← Yn ôl / Back
        </button>

        <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">{verb.verbNoun}</h1>
            <p className="text-slate-400 mt-1">{verb.english}</p>
          </div>
          <button
            onClick={() => router.push(`/verbs/${verbId}/drill`)}
            className="bg-[#e94560] hover:bg-[#c73652] text-white font-bold rounded-2xl px-8 py-4 transition-colors text-lg"
          >
            Ymarfer → Drill
          </button>
        </div>

        <ConjugationTable verb={verb} />
      </div>
    </main>
  );
}
