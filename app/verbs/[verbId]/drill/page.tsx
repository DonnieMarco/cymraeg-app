'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNextDrillItem, DrillItem } from '../../../../lib/spaced-repetition';
import { loadScores, saveScores, recordResult, ScoreStore } from '../../../../lib/scoring';
import { checkAnswer } from '../../../../lib/checker';
import { VERBS } from '../../../../data/modules/verbs/verbs';
import DrillCard from '../../../../components/DrillCard';
import FeedbackPanel from '../../../../components/FeedbackPanel';

interface FeedbackResult {
  correct: boolean;
  feedback: string;
  exampleSentence: string;
}

export default function DrillPage() {
  const { verbId } = useParams<{ verbId: string }>();
  const router = useRouter();
  const verb = VERBS.find(v => v.id === verbId);

  const [scores, setScores] = useState<ScoreStore>({});
  const [currentItem, setCurrentItem] = useState<DrillItem | null>(null);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  useEffect(() => {
    const loaded = loadScores();
    setScores(loaded);
    setCurrentItem(getNextDrillItem(loaded, undefined, verbId));
  }, [verbId]);

  const handleResult = useCallback(async (_correct: boolean, userInput: string) => {
    if (!currentItem) return;

    const revealed = userInput === '';
    const correct = revealed ? false : checkAnswer(userInput, currentItem.answer, currentItem.alternatives);

    const fb: FeedbackResult = {
      correct,
      feedback: revealed
        ? `The answer is: ${currentItem.answer}`
        : correct
          ? 'Cywir! Da iawn!'
          : `The correct answer is: ${currentItem.answer}`,
      exampleSentence: '',
    };

    setFeedback(fb);
    setIsLoading(true);

    const updated = recordResult(scores, currentItem.verbId, currentItem.tense, currentItem.register, currentItem.person, correct);
    saveScores(updated);
    setScores(updated);
    setSessionTotal(t => t + 1);
    if (correct) setSessionCorrect(c => c + 1);

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: currentItem.answer,
          verbNoun: currentItem.verbNoun,
          tense: currentItem.tense,
          register: currentItem.register,
          person: currentItem.person,
          correct,
        }),
      });
      const data = await res.json();
      setFeedback(f => f ? { ...f, exampleSentence: data.exampleSentence } : f);
    } catch {
      // silent fail
    } finally {
      setIsLoading(false);
    }
  }, [currentItem, scores]);

  const handleNext = useCallback(() => {
    if (!currentItem) return;
    const key = `${currentItem.verbId}:${currentItem.tense}:${currentItem.register}:${currentItem.person}`;
    setFeedback(null);
    setCurrentItem(getNextDrillItem(scores, key, verbId));
  }, [currentItem, scores, verbId]);

  if (!verb) return (
    <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <p className="text-slate-400">Verb not found</p>
    </main>
  );

  if (!currentItem) return (
    <main className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <p className="text-slate-400">Llwytho...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-6 gap-6">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/verbs/${verbId}`)}
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{verb.verbNoun} 🏴󠁧󠁢󠁷󠁬󠁳󠁿</h1>
              <p className="text-slate-400 text-sm">{verb.english}</p>
            </div>
          </div>
          {sessionTotal > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{Math.round((sessionCorrect / sessionTotal) * 100)}%</p>
              <p className="text-slate-400 text-sm">{sessionCorrect}/{sessionTotal}</p>
            </div>
          )}
        </div>
      </div>
      <DrillCard item={currentItem} onResult={handleResult} isLoading={isLoading} />
      <FeedbackPanel result={feedback} correctAnswer={currentItem.answer} onNext={handleNext} />
    </main>
  );
}
