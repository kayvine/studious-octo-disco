import type { ThemeId } from '../types';
import { themeList } from '../data/themes';

const themeIcons: Record<string, string> = {
  wiskunde: '📐',
  nederlands: '📖',
  geschiedenis: '🏛️',
};

const themeDescriptions: Record<string, string> = {
  wiskunde: 'Oefen formules, berekeningen en begrippen.',
  nederlands: 'Werkwoorden, zinsdelen en taalregels.',
  geschiedenis: 'Belangrijke gebeurtenissen en personen.',
};

interface HomePageProps {
  onSelectTheme: (id: ThemeId) => void;
}

export default function HomePage({ onSelectTheme }: HomePageProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Kies een thema</h1>
      <p className="text-gray-500 mb-8">Selecteer een onderwerp om te studeren met flashcards.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id as ThemeId)}
            className={`rounded-2xl border-2 ${theme.borderColor} ${theme.lightColor} p-6 flex flex-col items-start gap-3 text-left
              hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer`}
          >
            <span className="text-4xl">{themeIcons[theme.id]}</span>
            <div>
              <h2 className={`text-lg font-bold ${theme.textColor}`}>{theme.label}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{themeDescriptions[theme.id]}</p>
            </div>
            <span className={`mt-auto text-sm font-semibold ${theme.textColor} flex items-center gap-1`}>
              Studeren →
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
