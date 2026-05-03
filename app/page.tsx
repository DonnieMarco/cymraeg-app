// app/page.tsx
'use client';

import Link from 'next/link';
import { getAllTopicTiles } from '../data/topic-registry';

const statusStyles = {
  drill: 'border-emerald-500/40 hover:border-emerald-400 hover:shadow-emerald-500/10',
  reference: 'border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/10',
  coming_soon: 'border-slate-600/40 opacity-50 cursor-not-allowed',
};

const statusBadge = {
  drill: { label: 'Drill', bg: 'bg-emerald-500/20 text-emerald-300' },
  reference: { label: 'Reference', bg: 'bg-amber-500/20 text-amber-300' },
  coming_soon: { label: 'Coming Soon', bg: 'bg-slate-500/20 text-slate-400' },
};

const cefrColour = {
  A1: 'text-sky-400',
  A2: 'text-violet-400',
  B1: 'text-rose-400',
};

export default function Home() {
  const topics = getAllTopicTiles();

  return (
    <main className="min-h-screen bg-[#1a1a2e] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Cymraeg <span className="text-3xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
        </h1>
        <p className="text-slate-400 mb-10">Welsh language drills &amp; reference</p>

        {/* Verbs tile — links to existing verb module */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/verbs"
            className={`
              group block rounded-xl border-2 p-5 transition-all duration-200
              bg-[#16213e] border-emerald-500/40 hover:border-emerald-400
              hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">🔤</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono ${cefrColour.A1}`}>A1–B1</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Drill
                </span>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
              Berfau
            </h2>
            <p className="text-sm text-slate-400 mt-1">Verb Conjugations</p>
          </Link>

          {/* Topic tiles */}
          {topics.map((topic) => {
            const badge = statusBadge[topic.status];
            const isClickable = topic.status !== 'coming_soon';
            const Wrapper = isClickable ? Link : 'div';
            const href = isClickable ? `/topics/${topic.slug}` : '#';

            return (
              <Wrapper
                key={topic.id}
                href={href}
                className={`
                  group block rounded-xl border-2 p-5 transition-all duration-200
                  bg-[#16213e] ${statusStyles[topic.status]}
                  ${isClickable ? 'hover:shadow-lg hover:-translate-y-0.5' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${cefrColour[topic.cefr]}`}>
                      {topic.cefr}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
                <h2 className={`text-lg font-semibold text-white transition-colors ${
                  isClickable ? 'group-hover:text-emerald-300' : ''
                }`}>
                  {topic.title}
                </h2>
                <p className="text-sm text-slate-400 mt-1">{topic.titleEn}</p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </main>
  );
}
