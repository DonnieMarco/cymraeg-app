// app/topics/[topicSlug]/drill/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getTopicBySlug } from '../../../../data/topic-registry';
import { checkAnswer, CheckResponse } from '../../../../lib/checker';
import type { DrillExercise } from '../../../../types/topic';

function pickRandom(exercises: DrillExercise[], lastId?: string): DrillExercise {
  const pool = exercises.length > 1
    ? exercises.filter(e => e.id !== lastId)
    : exercises;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function TopicDrillPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = getTopicBySlug(topicSlug);
  const inputRef = useRef<HTMLInputElement>(null);

  const [current, setCurrent] = useState<DrillExercise | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<CheckResponse | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (topic && topic.exercises.length > 0) {
      setCurrent(pickRandom(topic.exercises));
    }
  }, [topic]);

  useEffect(() => {
    if (!feedback) {
      inputRef.current?.focus();
    }
  }, [current, feedback]);

  const handleSubmit = useCallback(() => {
    if (!current) return;

    if (userInput.trim() === '') {
      // Reveal answer
      setFeedback({
        result: 'wrong',
        message: `The answer is: ${current.answer}`,
      });
      setSessionTotal(t => t + 1);
      return;
    }

    const result = checkAnswer(userInput, current.answer, current.alternatives);
    setFeedback(result);
    setSessionTotal(t => t + 1);
    if (result.result === 'correct' || result.result === 'accent_warning') {
      setSessionCorrect(c => c + 1);
    }
  }, [current, userInput]);

  const handleNext = useCallback(() => {
    if (!topic) return;
    setCurrent(pickRandom(topic.exercises, current?.id));
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
  }, [topic, current]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (feedback) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <p className="text-slate-400">Topic not found</p>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <p className="text-slate-400">Llwytho...</p>
      </main>
    );
  }

  const feedbackColour = feedback
    ? feedback.result === 'correct'
      ? 'border-emerald-500 bg-emerald-500/10'
      : feedback.result === 'accent_warning'
        ? 'border-amber-500 bg-amber-500/10'
        : 'border-red-500 bg-red-500/10'
    : '';

  return (
    <main className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-6 gap-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href={`/topics/${topicSlug}`} className="text-slate-400 hover:text-white text-sm">
              ← {topic.titleEn}
            </Link>
            <h1 className="text-2xl font-bold text-white mt-1">
              {topic.icon} {topic.title}
            </h1>
          </div>
          {sessionTotal > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-white">
                {Math.round((sessionCorrect / sessionTotal) * 100)}%
              </p>
              <p className="text-slate-400 text-sm">
                {sessionCorrect}/{sessionTotal}
              </p>
            </div>
          )}
        </div>

        {/* Prompt */}
        <div className="rounded-xl bg-[#16213e] border border-slate-700/50 p-6 mb-4">
          <p className="text-slate-400 text-sm mb-1">Translate:</p>
          <p className="text-xl text-white font-medium">{current.prompt}</p>
          {current.tags && (
            <div className="flex gap-2 mt-3">
              {current.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hint */}
        {current.hint && !showHint && !feedback && (
          <button
            onClick={() => setShowHint(true)}
            className="text-sm text-slate-500 hover:text-slate-300 mb-3"
          >
            Show hint
          </button>
        )}
        {showHint && current.hint && (
          <p className="text-sm text-amber-400/70 mb-3">Hint: {current.hint}</p>
        )}

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!feedback}
            placeholder="Type your answer..."
            className="flex-1 px-4 py-3 rounded-lg bg-[#0f3460] border border-slate-600
                       text-white placeholder-slate-500 outline-none
                       focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                       disabled:opacity-60"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!feedback ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors"
            >
              Next →
            </button>
          )}
        </div>

        {/* Skip / reveal */}
        {!feedback && (
          <button
            onClick={() => {
              setUserInput('');
              handleSubmit();
            }}
            className="text-sm text-slate-500 hover:text-slate-300"
          >
            Don&apos;t know — show answer
          </button>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`rounded-xl border-2 p-5 mt-2 ${feedbackColour}`}>
            <p className={`text-lg font-semibold ${
              feedback.result === 'correct' ? 'text-emerald-300'
              : feedback.result === 'accent_warning' ? 'text-amber-300'
              : 'text-red-300'
            }`}>
              {feedback.result === 'correct' && '✓ '}
              {feedback.result === 'accent_warning' && '~ '}
              {feedback.result === 'wrong' && '✗ '}
              {feedback.message}
            </p>
            {current.alternatives && current.alternatives.length > 0 && feedback.result !== 'wrong' && (
              <p className="text-slate-400 text-sm mt-2">
                Also accepted: {current.alternatives.join(' / ')}
              </p>
            )}
            <p className="text-slate-500 text-xs mt-3">Press Enter for next</p>
          </div>
        )}
      </div>
    </main>
  );
}
