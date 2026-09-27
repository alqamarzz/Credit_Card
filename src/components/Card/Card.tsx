import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCard } from '../../context/CardContext';
import { CardLogo, ContactlessIcon } from './CardLogos';

export const Card: React.FC = () => {
  const {
    maskedNumber,
    formattedHolder,
    month,
    year,
    cvv,
    isFlipped,
    setIsFlipped,
    cardType,
    selectedTheme,
    focusedField,
  } = useCard();

  // 3D Parallax tilt effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Subtle tilt
    setRotateX(-(y / rect.height) * 12);
    setRotateY((x / rect.width) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000 select-none cursor-pointer"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      <motion.div
        ref={cardRef}
        initial={{ y: 0 }}
        whileTap={{ y: [0, -50, 0] }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: isFlipped ? 0 : rotateX,
          scale: 1,
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
          rotateX: { duration: 0.15, ease: "easeOut" },
          y: { duration: 0.4, ease: "easeInOut" },
        }}
        style={{
          transformStyle: 'preserve-3d',
          zIndex: isFlipped ? 40 : 25,
        }}
        className="
          rounded-2xl relative
          shadow-[0_20px_50px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.2)]
          flex flex-col
          w-[300px] h-[178px]
          sm:w-[420px] sm:h-[245px]
          transition-shadow duration-300
          hover:shadow-[0_25px_60px_rgba(0,0,0,0.4),0_15px_30px_rgba(0,0,0,0.25)]
        "
      >
        {/* ==================== CARD FRONT ==================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
        >
          {/* Card Background (Image or Dynamic CSS Gradient) */}
          {selectedTheme.src ? (
            <img
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover rounded-2xl"
              src={selectedTheme.src}
              alt="Card Background"
            />
          ) : (
            <div
              className="absolute inset-0 h-full w-full rounded-2xl"
              style={{ background: selectedTheme.backgroundCss }}
            />
          )}

          {/* Glossy Overlay & Shimmer */}
          <div className="bg-black/10 z-10 absolute rounded-2xl h-full w-full inset-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-10 rounded-2xl" />

          {/* Front Content Container */}
          <div className="absolute z-20 inset-0 flex flex-col justify-between p-4 sm:p-6">
            
            {/* Top Row: Chip & Contactless & Brand Logo */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  draggable="false"
                  src="/chip.png"
                  className="h-8 sm:h-11 drop-shadow-md"
                  alt="EMV Chip"
                />
                <ContactlessIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/75 drop-shadow" />
              </div>

              {/* Animated Brand Logo Switcher */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={cardType}
                  initial={{ opacity: 0, scale: 0.8, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <CardLogo type={cardType} className="h-8 sm:h-11 drop-shadow-md" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Middle Row: Card Number with Focus Outline & Slide-in Digits */}
            <div className="relative flex justify-center items-center py-1 sm:py-2">
              {/* Dynamic Focus Border for Card Number */}
              {focusedField === 'number' && (
                <motion.div
                  layoutId="focus-ring"
                  className="absolute -inset-1.5 sm:-inset-2 border-2 border-white/80 bg-white/10 rounded-xl pointer-events-none shadow-sm backdrop-blur-[1px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="font-mono font-medium text-white flex tracking-widest text-base sm:text-2xl drop-shadow-md">
                {maskedNumber.split('').map((char, index) => (
                  <motion.span
                    key={`${index}-${char}`}
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      width: char === ' ' ? '0.5em' : 'auto',
                      textShadow: '2px 1px 3px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Card Holder & Expires Date */}
            <div className="flex justify-between items-end">
              {/* Card Holder with Focus Ring */}
              <div className="relative flex flex-col max-w-[65%]">
                {focusedField === 'holder' && (
                  <motion.div
                    layoutId="focus-ring"
                    className="absolute -inset-1.5 sm:-inset-2 border-2 border-white/80 bg-white/10 rounded-xl pointer-events-none shadow-sm backdrop-blur-[1px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 font-sans font-medium drop-shadow">
                  Card Holder
                </span>
                <div className="font-mono font-medium tracking-widest text-white text-xs sm:text-base leading-tight truncate drop-shadow-md flex overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {formattedHolder.split('').map((c, i) => (
                      <motion.span
                        key={`${i}-${c}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          width: c === ' ' ? '0.4em' : 'auto',
                          textShadow: '2px 1px 3px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        {c}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Expiry Date with Focus Ring */}
              <div className="relative flex flex-col items-end">
                {focusedField === 'expiry' && (
                  <motion.div
                    layoutId="focus-ring"
                    className="absolute -inset-1.5 sm:-inset-2 border-2 border-white/80 bg-white/10 rounded-xl pointer-events-none shadow-sm backdrop-blur-[1px]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 font-sans font-medium drop-shadow">
                  Expires
                </span>
                <div className="font-mono font-medium tracking-widest text-white text-xs sm:text-base flex items-center drop-shadow-md">
                  {/* Month */}
                  <div className="overflow-hidden inline-flex">
                    <motion.span
                      key={month || 'MM'}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ textShadow: '2px 1px 3px rgba(0, 0, 0, 0.6)' }}
                    >
                      {month ? String(month).padStart(2, '0') : 'MM'}
                    </motion.span>
                  </div>
                  <span className="mx-0.5" style={{ textShadow: '2px 1px 3px rgba(0, 0, 0, 0.6)' }}>/</span>
                  {/* Year */}
                  <div className="overflow-hidden inline-flex">
                    <motion.span
                      key={year || 'YY'}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ textShadow: '2px 1px 3px rgba(0, 0, 0, 0.6)' }}
                    >
                      {year ? year.toString().slice(-2) : 'YY'}
                    </motion.span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==================== CARD BACK ==================== */}
        <div
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between"
        >
          {/* Card Background */}
          {selectedTheme.src ? (
            <img
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover rounded-2xl"
              src={selectedTheme.src}
              alt="Card Background"
            />
          ) : (
            <div
              className="absolute inset-0 h-full w-full rounded-2xl"
              style={{ background: selectedTheme.backgroundCss }}
            />
          )}

          {/* Dark Overlay */}
          <div className="bg-black/20 z-10 absolute rounded-2xl h-full w-full inset-0 pointer-events-none" />

          {/* Magnetic Stripe */}
          <div className="relative z-20 w-full bg-neutral-900 h-9 sm:h-12 mt-4 sm:mt-6 shadow-inner" />

          {/* CVV & Signature Area */}
          <div className="relative z-20 px-4 sm:px-6 flex flex-col gap-1">
            <div className="flex justify-between items-center text-white/80 text-[10px] sm:text-xs font-sans font-medium uppercase tracking-wider pr-1">
              <span className="text-[9px] text-white/60">Authorized Signature</span>
              <span>CVV / CVC</span>
            </div>

            {/* Signature Box & CVV Box */}
            <div className="flex items-center">
              {/* White Signature Bar with Security Lines */}
              <div className="flex-1 bg-neutral-100 h-8 sm:h-10 rounded-l flex items-center px-2 sm:px-3 overflow-hidden border-y border-l border-neutral-300">
                <div 
                  className="w-full h-full opacity-35"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 4px)',
                  }}
                />
              </div>

              {/* CVV Display */}
              <div className="bg-white h-8 sm:h-10 w-14 sm:w-16 rounded-r flex items-center justify-center text-neutral-900 font-mono font-bold tracking-widest text-xs sm:text-sm border border-neutral-300 shadow-inner">
                {cvv ? (
                  cvv.split('').map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      •
                    </motion.span>
                  ))
                ) : (
                  <span className="text-neutral-300 text-[10px] sm:text-xs">•••</span>
                )}
              </div>
            </div>
          </div>

          {/* Back Footer: Issuing Details & Brand Logo */}
          <div className="relative z-20 p-4 sm:p-6 pt-0 flex justify-between items-center">
            <div className="flex flex-col text-[8px] sm:text-[9px] text-white/70 max-w-[65%] leading-tight">
              <span>This card is property of the issuing bank. Use of this card is subject to the cardholder agreement.</span>
            </div>

            <div className="flex items-center">
              <CardLogo type={cardType} className="h-6 sm:h-8 drop-shadow-md opacity-90" />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
