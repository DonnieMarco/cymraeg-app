'use client';

import { useState, useRef, useEffect } from 'react';
import { DrillItem } from '../lib/spaced-repetition';
import { checkAnswer } from '../lib/checker';

interface Props {
  item: DrillItem;
  onResult: (correct: boolean, userInput: string) => void;
  isLoading: boolean;
}

const TENSE_LABELS: Record<string, string> = {
  present: 'Presennol',
  imperfect: 'Amherffaith',
  past: 'Gorffennol',
  future: 'Dyfodol',
  conditional: 'Amodol',
};

const TENSE_BADGE: Record<string, string> = {
  present: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50',
  imperfect: 'bg-blue-900/40 text-blue-300 border border-blue-700/50',
  past: 'bg-violet-900/40 text-violet-300 border border-violet-700/50',
  future: 'bg-rose-900/40 text-rose-300 border border-rose-700/50',
  conditional: 'bg-amber-900/40 text-amber-300 border border-amber-700/50',
};

export default function DrillCard({ item, onResult, isLoading }: Props) {
  const [userInput, setUserInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserInput('');
    setRevealed(false);
    inputRef.current?.focus();
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const check = revealed ? null : checkAnswer(userInput, item.answer, item.alternatives);
    const correct = check ? check.result !== 'wrong' : false;
    onResult(correct, userInput);
  };

  const handleReveal = () => {
    setRevealed(true);
    setUserInput(item.answer);
  };

  return (
    <div className="bg-[#16213e] rounded-2xl shadow-lg p-8 w-full max-w-xl border border-[#0f3460]">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${TENSE_BADGE[item.tense] || TENSE_BADGE.present}`}>
          {TENSE_LABELS[item.tense] || item.tense}
        </span>
        <span className="bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-3 py-1 text-xs font-medium capitalize">
          {item.register}
        </span>
      </div>

      <p className="text-slate-400 text-sm mb-2">{item.verbNoun} — {item.verbEnglish}</p>
      <p className="text-white text-2xl font-bold mb-6">{item.prompt}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Teipiwch yma..."
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full bg-[#1a1a2e] border border-[#0f3460] text-white rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#e94560] transition-colors placeholder:text-slate-600"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="flex-1 bg-[#e94560] hover:bg-[#c73652] disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
          >
            {isLoading ? 'Gwirio...' : 'Check'}
          </button>
          {!revealed && (
            <button
              type="button"
              onClick={handleReveal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl px-4 py-3 transition-colors text-sm"
            >
              Reveal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
