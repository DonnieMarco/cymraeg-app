'use client';

import { useState, useEffect, useRef } from 'react';
import { DrillItem } from '../lib/spaced-repetition';

interface Props {
  item: DrillItem;
  onResult: (correct: boolean, userInput: string) => void;
  isLoading: boolean;
}

export default function DrillCard({ item, onResult, isLoading }: Props) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput('');
    setSubmitted(false);
    setRevealed(false);
    inputRef.current?.focus();
  }, [item]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || submitted || isLoading) return;
    setSubmitted(true);
    onResult(false, input.trim());
  }

  function handleReveal() {
    setRevealed(true);
    setSubmitted(true);
    onResult(false, '');
  }

  return (
    <div className="bg-[#16213e] border border-[#0f3460] rounded-2xl shadow-xl p-8 w-full max-w-xl">
      <div className="flex gap-2 mb-6 text-sm flex-wrap">
        <span className="bg-[#e94560] text-white rounded-full px-3 py-1 font-medium capitalize">{item.tense}</span>
        <span className="bg-[#0f3460] text-[#a78bfa] border border-[#a78bfa] rounded-full px-3 py-1 font-medium capitalize">{item.register}</span>
        <span className="bg-[#0f3460] text-[#34d399] border border-[#34d399] rounded-full px-3 py-1 font-medium">{item.verbNoun}</span>
      </div>
      <p className="text-slate-400 text-sm mb-1">Translate to Welsh:</p>
      <h2 className="text-2xl font-bold text-white mb-6">{item.prompt}</h2>

      {revealed && (
        <div className="bg-[#0f3460] border border-[#a78bfa] rounded-xl px-4 py-3 mb-4">
          <p className="text-slate-400 text-xs mb-1">Answer:</p>
          <p className="text-[#a78bfa] font-mono text-lg">{item.answer}</p>
          {item.alternatives && item.alternatives.length > 0 && (
            <p className="text-slate-500 text-xs mt-1">Also accepted: {item.alternatives.join(', ')}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={submitted || isLoading}
          placeholder="Teipiwch eich ateb yma..."
          className="bg-[#0f3460] border-2 border-[#1a4a7a] text-white placeholder-slate-500 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#e94560] disabled:opacity-50"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!input.trim() || submitted || isLoading}
            className="flex-1 bg-[#e94560] hover:bg-[#c73652] disabled:bg-[#0f3460] disabled:text-slate-500 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
          >
            {isLoading ? 'Checking...' : 'Check Answer'}
          </button>
          {!submitted && (
            <button
              type="button"
              onClick={handleReveal}
              className="bg-[#0f3460] hover:bg-[#1a4a7a] border border-[#a78bfa] text-[#a78bfa] font-semibold rounded-xl px-4 py-3 transition-colors text-sm"
            >
              Show Answer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
