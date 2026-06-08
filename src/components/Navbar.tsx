import type { ThemeId } from '../types';
import { themeList } from '../data/themes';

interface NavbarProps {
  activeTheme: ThemeId | null;
  onSelectTheme: (id: ThemeId) => void;
}

export default function Navbar({ activeTheme, onSelectTheme }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-2 h-14">
        <span className="font-bold text-gray-800 text-lg mr-4 tracking-tight">
          📚 Examen
        </span>
        <div className="flex gap-1 flex-wrap">
          {themeList.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id as ThemeId)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                  ${isActive
                    ? `${theme.color} text-white border-transparent shadow-sm`
                    : `bg-white ${theme.textColor} ${theme.borderColor} hover:${theme.lightColor}`
                  }`}
              >
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
