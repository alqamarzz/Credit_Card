import { CardTheme } from '../types';

export const CARD_THEMES: CardTheme[] = [
  {
    id: 'ocean-waves',
    name: 'Ocean Waves (Default)',
    src: '/3.jpeg',
    accentColor: '#3b82f6',
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    backgroundCss: 'linear-gradient(135deg, #111827 0%, #1f2937 40%, #000000 100%)',
    accentColor: '#fbbf24',
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Violet',
    backgroundCss: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #ec4899 100%)',
    accentColor: '#a855f7',
  },
  {
    id: 'aurora-emerald',
    name: 'Emerald Aurora',
    backgroundCss: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
    accentColor: '#10b981',
  },
  {
    id: 'crimson-sunset',
    name: 'Crimson Luxe',
    backgroundCss: 'linear-gradient(135deg, #881337 0%, #be123c 45%, #fb7185 100%)',
    accentColor: '#f43f5e',
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    backgroundCss: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    accentColor: '#6366f1',
  },
  {
    id: 'liquid-gold',
    name: 'Royal Champagne',
    backgroundCss: 'linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 70%, #fbbf24 100%)',
    accentColor: '#f59e0b',
  },
  {
    id: 'carbon-stealth',
    name: 'Carbon Stealth',
    backgroundCss: 'radial-gradient(circle at 50% 50%, #27272a 0%, #09090b 100%)',
    accentColor: '#71717a',
  }
];
