'use client';

interface FeedbackResult {
  correct: boolean;
  feedback: string;
  exampleSentence: string;
}

interface Props {
  result: FeedbackResult | null;
  correctAnswer: string;
  onNext: () => void;
}

export default function FeedbackPanel({ result, correctAnswer, onNext }: Props) {
  if (!result) return null;

  return (
    <div className={`rounded-2xl shadow-xl p-6 w-full max-w-xl border-2 ${result.correct ? 'bg-[#0d2818] border-[#34d399]' : 'bg-[#2d0f1a] border-[#e94560]'}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{result.correct ? '✅' : '❌'}</span>
        <span className={`text-xl font-bold ${result.correct ? 'text-[#34d399]' : 'text-[#e94560]'}`}>
          {result.correct ? 'Cywir!' : 'Anghywir'}
        </span>
      </div>
      {!result.correct && (
        <p className="text-slate-300 mb-2">
          <span className="font-semibold text-slate-400">Correct answer: </span>
          <span className="font-mono text-[#a78bfa]">{correctAnswer}</span>
        </p>
      )}
      <p className="text-slate-300 mb-4">{result.feedback}</p>
      {result.exampleSentence && (
        <div className="bg-[#0f3460] rounded-xl px-4 py-3 text-sm text-slate-300 italic border border-[#1a4a7a] mb-4">
          {result.exampleSentence}
        </div>
      )}
      <button
        onClick={onNext}
        className="w-full bg-[#e94560] hover:bg-[#c73652] text-white font-semibold rounded-xl px-6 py-3 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
