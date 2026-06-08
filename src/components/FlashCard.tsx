import { useState } from 'react';
import type { Card, ThemeConfig } from '../types';

interface FlashCardProps {
  card: Card;
  theme: ThemeConfig;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number;
  total: number;
}

export default function FlashCard({ card, theme, onSwipe, index, total }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Reset flip when card changes
  const cardKey = `${index}-${card.question}`;

  const handleClick = () => {
    if (Math.abs(dragX) < 5) {
      setFlipped((f) => !f);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
    setDragX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragX < -80) {
      onSwipe('right');
    } else if (dragX > 80) {
      onSwipe('left');
    } else {
      setDragX(0);
    }
  };

  const rotation = isDragging ? dragX * 0.05 : 0;
  const opacity = isDragging ? Math.max(0.6, 1 - Math.abs(dragX) / 300) : 1;

  const swipeHintLeft = isDragging && dragX < -30;
  const swipeHintRight = isDragging && dragX > 30;

  return (
    <div className="flex flex-col items-center w-full gap-4 select-none" key={cardKey}>
      {/* Progress bar */}
      <div className="">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{theme.label}</span>
          <span>{index + 1} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${theme.color}`}
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Swipe hints */}
      <div className="flex justify-between px-1 h-6">
        <span className={`text-sm font-medium text-gray-400 transition-opacity duration-150 ${swipeHintRight ? 'opacity-100' : 'opacity-0'}`}>
          ← Vorige
        </span>
        <span className={`text-sm font-medium text-gray-400 transition-opacity duration-150 ${swipeHintLeft ? 'opacity-100' : 'opacity-0'}`}>
          Volgende →
        </span>
      </div>

      {/* Card */}
      <div
        className="perspective w-full cursor-pointer"
        style={{
          transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
          opacity,
          transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className={`card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '260px' }}>
          {/* Front — Question */}
          <div
            className={`card-face absolute inset-0 rounded-2xl shadow-lg border-2 ${theme.borderColor} ${theme.lightColor} flex flex-col items-center justify-center p-8 gap-4`}
          >
            <span className={`text-xs font-semibold uppercase tracking-widest ${theme.textColor}`}>
              Vraag
            </span>
            <p className="text-gray-800 text-xl font-medium text-center leading-relaxed">
              {card.question}
            </p>
            <span className="text-gray-400 text-sm mt-2">Tik om het antwoord te zien</span>
          </div>

          {/* Back — Answer */}
          <div
            className={`card-face card-back absolute inset-0 rounded-2xl shadow-lg border-2 ${theme.borderColor} ${theme.color} flex flex-col items-center justify-center p-8 gap-4`}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Antwoord
            </span>
            <p className="text-white text-lg font-medium text-center">
              {card.answer}
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-gray-400 mt-1">
        Gebruik ← → pijltjestoetsen of sleep de kaart
      </p>
    </div>
  );
}
