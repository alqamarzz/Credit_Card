import React from 'react';
import { CardProvider, useCard } from './context/CardContext';
import { Card } from './components/Card/Card';
import { CardForm } from './components/Form/CardForm';
import { ThemeSelector } from './components/ThemeSelector/ThemeSelector';
import { CreditCard, ShieldCheck } from 'lucide-react';

const CardInteractiveContainer: React.FC = () => {
  const { isFlipped } = useCard();

  return (
    <div className="bg-blue-50 min-h-screen w-full flex flex-col items-center justify-start lg:justify-center p-4 py-12 lg:p-8 overflow-x-hidden overflow-y-auto">
      
      {/* Header Info */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Interactive Payment Card</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 tracking-tight">
          Credit Card Experience
        </h1>
        <p className="text-neutral-500 text-xs sm:text-sm mt-1 max-w-sm">
          Realistic 3D flip card with dynamic focus outlines, digit animations, and card presets.
        </p>
      </div>

      {/* Main Card Component Box */}
      <div className="relative w-full max-w-xl flex flex-col items-center justify-center">
        {/* Floating Overlapping Card */}
        <div className={`transition-all duration-300 ${isFlipped ? 'z-30' : 'z-30'} mb-[-60px] sm:mb-[-100px]`}>
          <Card />
        </div>

        {/* The Form Container */}
        <div className="w-full z-10">
          <CardForm />
        </div>
      </div>

      {/* Theme Picker and Controls */}
      <ThemeSelector />

      {/* Footer Security Badge */}
      <div className="mt-8 flex items-center gap-1.5 text-neutral-400 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>256-Bit SSL Encrypted Mock Checkout</span>
      </div>
    </div>
  );
};

export function App() {
  return (
    <CardProvider>
      <CardInteractiveContainer />
    </CardProvider>
  );
}

export default App;
