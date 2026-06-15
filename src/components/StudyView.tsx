import { useEffect, useState, useCallback } from 'react';
import type { Card, ThemeConfig } from '../types';
import FlashCard from './FlashCard';
import CompletionScreen from './CompletionScreen';

interface StudyViewProps {
  theme: ThemeConfig;
  cards: Card[];
  onBackToHome: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyView({ theme, cards, onBackToHome }: StudyViewProps) {
  const [deck, setDeck] = useState<Card[]>(() => shuffle(cards));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const goNext = useCallback(() => {
    if (currentIndex >= deck.length - 1) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, deck.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleReset = () => {
    setDeck(shuffle(cards));
    setCurrentIndex(0);
    setDone(false);
  };

  useEffect(() => {
    setDeck(shuffle(cards));
    setCurrentIndex(0);
    setDone(false);
  }, [cards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  if (done) {
    return (
      <CompletionScreen
        theme={theme}
        totalCards={deck.length}
        onReset={handleReset}
        onBackToHome={onBackToHome}
      />
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-6 max-w-lg mx-auto w-full">
      <FlashCard
        key={currentIndex}
        card={deck[currentIndex]}
        theme={theme}
        onSwipe={(dir) => (dir === 'right' ? goNext() : goPrev())}
        index={currentIndex}
        total={deck.length}
      />
    </div>
  );
}
