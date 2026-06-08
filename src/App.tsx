import { useState } from 'react';
import type { ThemeId, View } from './types';
import { themes } from './data/themes';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import StudyView from './components/StudyView';
import './index.css';

import wiskundeCards from './data/wiskunde.json';
import nederlandsCards from './data/nederlands.json';
import geschiedenisCards from './data/geschiedenis.json';

const cardsByTheme: Record<ThemeId, { question: string; answer: string }[]> = {
  wiskunde: wiskundeCards,
  nederlands: nederlandsCards,
  geschiedenis: geschiedenisCards,
};

export default function App() {
  const [view, setView] = useState<View>('home');
  const [activeTheme, setActiveTheme] = useState<ThemeId | null>(null);

  const handleSelectTheme = (id: ThemeId) => {
    setActiveTheme(id);
    setView('study');
  };

  const handleBackToHome = () => {
    setView('home');
    setActiveTheme(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar activeTheme={activeTheme} onSelectTheme={handleSelectTheme} />

      {view === 'home' && (
        <HomePage onSelectTheme={handleSelectTheme} />
      )}

      {view === 'study' && activeTheme && (
        <StudyView
          theme={themes[activeTheme]}
          cards={cardsByTheme[activeTheme]}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
