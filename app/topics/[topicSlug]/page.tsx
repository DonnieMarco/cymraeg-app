// app/topics/[topicSlug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTopicBySlug } from '../../../data/topic-registry';

export default function TopicPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const router = useRouter();
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Topic not found</p>
          <Link href="/" className="text-emerald-400 hover:underline">← Back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1a2e] p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link href="/" className="text-slate-400 hover:text-white text-sm mb-6 inline-block">
          ← Home
        </Link>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">{topic.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
            <p className="text-slate-400">{topic.titleEn}</p>
          </div>
        </div>

        {/* Source refs */}
        <div className="flex gap-3 mt-3 mb-8 text-xs text-slate-500">
          {topic.mynediadUnits && topic.mynediadUnits.length > 0 && (
            <span>Mynediad: Uned {topic.mynediadUnits.join(', ')}</span>
          )}
          {topic.duolingoSection && topic.duolingoUnits && topic.duolingoUnits.length > 0 && (
            <span>
              Duolingo: S{topic.duolingoSection} U{topic.duolingoUnits.join(', ')}
            </span>
          )}
        </div>

        {/* Drill button */}
        {topic.status === 'drill' && topic.exercises.length > 0 && (
          <button
            onClick={() => router.push(`/topics/${topicSlug}/drill`)}
            className="mb-10 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors text-lg"
          >
            Start Drill →
          </button>
        )}

        {/* Grammar notes */}
        <div className="space-y-6">
          {topic.grammar.map((note, idx) => (
            <div key={idx} className="rounded-xl bg-[#16213e] border border-slate-700/50 p-5">
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">{note.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{note.explanation}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {note.examples.map((ex, i) => (
                  <div key={i} className="flex justify-between bg-[#1a1a2e] rounded-lg px-3 py-2">
                    <span className="text-white font-mono text-sm">{ex.cy}</span>
                    <span className="text-slate-400 text-sm">{ex.en}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
