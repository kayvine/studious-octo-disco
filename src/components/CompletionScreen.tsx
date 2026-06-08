import type { ThemeConfig } from '../types';

interface CompletionScreenProps {
  theme: ThemeConfig;
  totalCards: number;
  onReset: () => void;
  onBackToHome: () => void;
}

export default function CompletionScreen({ theme, totalCards, onReset, onBackToHome }: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800">Klaar!</h1>
      <p className="text-gray-500 max-w-sm">
        Je hebt alle <span className="font-semibold text-gray-700">{totalCards} kaarten</span> van{' '}
        <span className={`font-semibold ${theme.textColor}`}>{theme.label}</span> doorgenomen.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={onReset}
          className={`px-6 py-3 rounded-xl font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 ${theme.color}`}
        >
          🔄 Opnieuw beginnen
        </button>
        <button
          onClick={onBackToHome}
          className="px-6 py-3 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
        >
          ← Terug naar thema's
        </button>
      </div>
    </div>
  );
}
