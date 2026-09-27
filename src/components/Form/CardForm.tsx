import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCard } from '../../context/CardContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const CardForm: React.FC = () => {
  const {
    cardNumber,
    cardHolder,
    month,
    year,
    cvv,
    cardType,
    handleCardNumber,
    handleCardHolder,
    handleMonth,
    handleYear,
    handleCvv,
    clearForm,
    setIsFlipped,
    setFocusedField,
    loadDemoCard,
  } = useCard();

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(e.target as Node)) {
        setIsMonthOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target as Node)) {
        setIsYearOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const years = Array.from({ length: 12 }, (_, i) => 2026 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const rawNum = cardNumber.replace(/\D/g, '');
    const minLen = cardType === 'amex' ? 15 : 16;

    if (rawNum.length < minLen) {
      setErrorMessage(`Please enter a complete ${minLen}-digit card number.`);
      return;
    }

    if (!cardHolder.trim()) {
      setErrorMessage('Please enter the card holder name.');
      return;
    }

    if (!month || !year) {
      setErrorMessage('Please select the expiration month and year.');
      return;
    }

    const minCvvLen = cardType === 'amex' ? 4 : 3;
    if (cvv.length < minCvvLen) {
      setErrorMessage(`Please enter a valid ${minCvvLen}-digit CVV.`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Trigger festive celebration confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ec4899']
      });
    }, 600);
  };

  return (
    <>
      <div className="relative z-20 bg-white rounded-2xl border border-neutral-200 shadow-[0_4px_32px_rgba(0,0,0,0.08)] w-full px-5 pb-6 pt-[98px] sm:px-8 sm:pb-8 sm:pt-[120px]">
        
        {/* Quick Demo Fillers */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100 overflow-x-auto text-xs">
          <span className="text-neutral-400 font-medium whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Try presets:
          </span>
          <div className="flex gap-1.5 flex-nowrap">
            <button
              type="button"
              onClick={() => loadDemoCard('visa')}
              className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors whitespace-nowrap"
            >
              Visa
            </button>
            <button
              type="button"
              onClick={() => loadDemoCard('mastercard')}
              className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium transition-colors whitespace-nowrap"
            >
              Mastercard
            </button>
            <button
              type="button"
              onClick={() => loadDemoCard('amex')}
              className="px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium transition-colors whitespace-nowrap"
            >
              Amex
            </button>
            <button
              type="button"
              onClick={() => loadDemoCard('discover')}
              className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium transition-colors whitespace-nowrap"
            >
              Discover
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-xs sm:text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          
          {/* Card Number Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-neutral-700 text-sm sm:text-base font-medium">
                Card Number
              </label>
              <span className="text-xs uppercase text-neutral-400 font-mono">
                {cardType}
              </span>
            </div>
            <input
              value={cardNumber}
              onChange={handleCardNumber}
              onFocus={() => {
                setFocusedField('number');
                setIsFlipped(false);
              }}
              onBlur={() => setFocusedField(null)}
              className="p-3 border text-black border-neutral-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base font-mono placeholder:font-sans placeholder:text-neutral-400"
              type="text"
              placeholder="1234 - 5678 - 1234 - 5678"
              maxLength={cardType === 'amex' ? 23 : 25}
              autoComplete="cc-number"
            />
          </div>

          {/* Card Holder Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-neutral-700 text-sm sm:text-base font-medium">
              Card Holder
            </label>
            <input
              value={cardHolder}
              onChange={handleCardHolder}
              onFocus={() => {
                setFocusedField('holder');
                setIsFlipped(false);
              }}
              onBlur={() => setFocusedField(null)}
              className="p-3 border text-black border-neutral-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base uppercase placeholder:normal-case placeholder:text-neutral-400"
              type="text"
              placeholder="Full Name"
              autoComplete="cc-name"
            />
          </div>

          {/* Expiration Date & CVV Row */}
          <div className="flex gap-3 items-end">
            
            {/* Expiry Date Selectors */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-neutral-700 text-sm sm:text-base font-medium">
                Expiry Date
              </label>
              <div className="flex gap-2">
                
                {/* Month Dropdown */}
                <div ref={monthDropdownRef} className="relative flex-1">
                  <div
                    onClick={() => {
                      setIsMonthOpen(!isMonthOpen);
                      setIsYearOpen(false);
                      setFocusedField('expiry');
                      setIsFlipped(false);
                    }}
                    className="p-3 border border-neutral-300 rounded-lg cursor-pointer bg-white hover:border-neutral-400 transition-colors select-none text-sm sm:text-base flex justify-between items-center"
                  >
                    {month ? (
                      <span className="text-black font-mono font-medium">{String(month).padStart(2, '0')}</span>
                    ) : (
                      <span className="text-neutral-400">MM</span>
                    )}
                    <span className="text-neutral-400 text-xs">▼</span>
                  </div>

                  <AnimatePresence>
                    {isMonthOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full bottom-full mb-1 bg-white border border-neutral-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
                      >
                        {months.map((m) => (
                          <div
                            key={m}
                            onClick={() => {
                              handleMonth(m.toString());
                              setIsMonthOpen(false);
                            }}
                            className={`p-3 hover:bg-blue-50 cursor-pointer text-black transition-colors first:rounded-t-xl last:rounded-b-xl text-sm sm:text-base ${
                              month === m.toString() ? 'bg-blue-50 font-bold text-blue-600' : ''
                            }`}
                          >
                            {String(m).padStart(2, '0')}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Year Dropdown */}
                <div ref={yearDropdownRef} className="relative flex-1">
                  <div
                    onClick={() => {
                      setIsYearOpen(!isYearOpen);
                      setIsMonthOpen(false);
                      setFocusedField('expiry');
                      setIsFlipped(false);
                    }}
                    className="p-3 border border-neutral-300 rounded-lg cursor-pointer bg-white hover:border-neutral-400 transition-colors select-none text-sm sm:text-base flex justify-between items-center"
                  >
                    {year ? (
                      <span className="text-black font-mono font-medium">{year}</span>
                    ) : (
                      <span className="text-neutral-400">YYYY</span>
                    )}
                    <span className="text-neutral-400 text-xs">▼</span>
                  </div>

                  <AnimatePresence>
                    {isYearOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full bottom-full mb-1 bg-white border border-neutral-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
                      >
                        {years.map((y) => (
                          <div
                            key={y}
                            onClick={() => {
                              handleYear(y.toString());
                              setIsYearOpen(false);
                            }}
                            className={`p-3 hover:bg-blue-50 cursor-pointer text-black transition-colors first:rounded-t-xl last:rounded-b-xl text-sm sm:text-base ${
                              year === y.toString() ? 'bg-blue-50 font-bold text-blue-600' : ''
                            }`}
                          >
                            {y}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* CVV Input - Auto flips card on focus! */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cvv" className="text-neutral-700 text-sm sm:text-base font-medium">
                CVV
              </label>
              <input
                id="cvv"
                value={cvv}
                onChange={handleCvv}
                onFocus={() => {
                  setFocusedField('cvv');
                  setIsFlipped(true); // Smooth 3D flip to the back of the card!
                }}
                onBlur={() => {
                  setFocusedField(null);
                  setIsFlipped(false); // Smooth 3D flip back to the front!
                }}
                className="p-3 border text-black border-neutral-300 rounded-lg w-16 sm:w-24 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm sm:text-base text-center font-mono tracking-widest placeholder:tracking-normal placeholder:text-neutral-400"
                type="password"
                maxLength={cardType === 'amex' ? 4 : 3}
                placeholder="•••"
                autoComplete="cc-csc"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={clearForm}
              className="flex-1 py-3 sm:py-4 rounded-lg text-neutral-700 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 text-sm sm:text-base font-medium transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 sm:py-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-sm sm:text-base font-medium transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Proceed'
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Success Modal - Portaled to document.body to overview the card */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isSubmitted && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center text-center relative"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-1">
                  Card Verified!
                </h3>
                <p className="text-neutral-500 text-sm mb-6">
                  Your payment details have been processed successfully.
                </p>

                <div className="w-full bg-neutral-50 rounded-xl p-4 mb-6 text-left text-xs font-mono space-y-2.5 border border-neutral-200 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Card Type:</span>
                    <span className="font-bold text-neutral-800 uppercase bg-neutral-200/60 px-2 py-0.5 rounded text-[11px]">{cardType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Number:</span>
                    <span className="font-bold text-neutral-800">
                      •••• {cardNumber.replace(/\D/g, '').slice(-4) || '****'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Holder:</span>
                    <span className="font-bold text-neutral-800 truncate max-w-[180px]">{cardHolder || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Expires:</span>
                    <span className="font-bold text-neutral-800">{month ? String(month).padStart(2, '0') : 'MM'}/{year ? year.toString().slice(-2) : 'YY'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

