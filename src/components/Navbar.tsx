import { useState } from 'react';
import type { ThemeId } from '../types';
import { themeList } from '../data/themes';

interface NavbarProps {
  activeTheme: ThemeId | null;
  onSelectTheme: (id: ThemeId) => void;
}

export default function Navbar({ activeTheme, onSelectTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (id: ThemeId) => {
    onSelectTheme(id);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-gray-800 text-lg tracking-tight">
          📚 Examen
        </span>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors gap-1.5"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="bg-white border-t border-gray-100 shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-2">
            {themeList.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelect(theme.id as ThemeId)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                    ${isActive
                      ? `${theme.color} text-white border-transparent shadow-sm`
                      : `bg-white ${theme.textColor} ${theme.borderColor}`
                    }`}
                >
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
