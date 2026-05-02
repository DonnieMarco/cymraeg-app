'use client';

import { useRouter } from 'next/navigation';
import { VERBS } from '../data/modules/verbs/verbs';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1a1a2e] p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">Cymraeg 🏴󠁧󠁢󠁷󠁬󠁳󠁿</h1>
          <p className="text-slate-400 mt-2">Dewiswch ferf i ymarfer — Choose a verb to practise</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {VERBS.map(verb => (
            <button
              key={verb.id}
              onClick={() => router.push(`/verbs/${verb.id}`)}
              className="bg-[#16213e] border border-[#0f3460] hover:border-[#e94560] hover:bg-[#1a2a4a] rounded-2xl p-5 text-left transition-all group"
            >
              <p className="text-[#34d399] font-bold text-lg group-hover:text-white transition-colors">{verb.verbNoun}</p>
              <p className="text-slate-400 text-sm mt-1">{verb.english}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
