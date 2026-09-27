import React from 'react';
import { useCard } from '../../context/CardContext';
import { CARD_THEMES } from '../../data/cardThemes';
import { Palette, RotateCw } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { selectedTheme, setSelectedTheme, setIsFlipped } = useCard();

  return (
    <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-xl">
      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-blue-500" />
          <span>Card Background Themes</span>
        </div>

        <button
          onClick={() => setIsFlipped(prev => !prev)}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-neutral-200 px-3 py-1.5 rounded-lg shadow-sm transition-all"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Flip Card</span>
        </button>
      </div>

      {/* Theme Thumbnails */}
      <div className="flex items-center gap-2.5 overflow-x-auto w-full p-2 bg-white/70 backdrop-blur-sm rounded-xl border border-neutral-200/80 shadow-sm scrollbar-thin">
        {CARD_THEMES.map((theme) => {
          const isSelected = selectedTheme.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              title={theme.name}
              className={`
                relative flex-shrink-0 w-12 h-8 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-200 scale-105 shadow-md' : 'border-neutral-200 hover:border-neutral-400 hover:scale-100 opacity-80 hover:opacity-100'}
              `}
            >
              {theme.src ? (
                <img
                  src={theme.src}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: theme.backgroundCss }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
