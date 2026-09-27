import React from 'react';
import { CardType } from '../../types';

interface CardLogoProps {
  type: CardType;
  className?: string;
}

export const CardLogo: React.FC<CardLogoProps> = ({ type, className = "h-8 sm:h-11" }) => {
  switch (type) {
    case 'visa':
      return (
        <img 
          draggable="false" 
          src="/visa.png" 
          className={className} 
          alt="Visa" 
          onError={(e) => {
            // Fallback SVG if image not found
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );

    case 'mastercard':
      return (
        <svg className={className} viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="31" r="30" fill="#EB001B" />
          <circle cx="65" cy="31" r="30" fill="#F79E1B" fillOpacity="0.85" />
          <path d="M50 11.2a30.01 30.01 0 0 0-15 19.8 30.01 30.01 0 0 0 15 19.8 30.01 30.01 0 0 0 15-19.8A30.01 30.01 0 0 0 50 11.2Z" fill="#FF5F00" />
        </svg>
      );

    case 'amex':
      return (
        <div className={`flex items-center justify-center bg-[#016FD0] rounded px-2.5 py-1 text-white font-black tracking-tighter text-xs sm:text-sm font-sans uppercase shadow-sm ${className} h-auto`}>
          <span>AMERICAN EXPRESS</span>
        </div>
      );

    case 'discover':
      return (
        <div className={`flex items-center gap-0.5 bg-neutral-900/40 backdrop-blur-sm rounded px-2 py-0.5 border border-white/20 ${className} h-auto`}>
          <span className="font-bold text-white tracking-tight text-xs sm:text-sm">DISC</span>
          <span className="w-3 h-3 rounded-full bg-[#FF6000] inline-block -mx-0.5"></span>
          <span className="font-bold text-white tracking-tight text-xs sm:text-sm">VER</span>
        </div>
      );

    case 'dinersclub':
      return (
        <div className={`flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white font-bold text-xs ${className} h-auto`}>
          <span>DINERS CLUB</span>
        </div>
      );

    case 'jcb':
      return (
        <div className={`flex rounded overflow-hidden shadow-sm ${className} h-6 sm:h-8`}>
          <div className="bg-[#003B94] px-1.5 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">J</div>
          <div className="bg-[#E60012] px-1.5 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">C</div>
          <div className="bg-[#008940] px-1.5 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">B</div>
        </div>
      );

    case 'unionpay':
      return (
        <div className={`flex rounded overflow-hidden shadow-sm ${className} h-6 sm:h-8`}>
          <div className="bg-[#E21836] px-1.5 flex items-center text-white font-bold text-[9px]">Union</div>
          <div className="bg-[#004B87] px-1.5 flex items-center text-white font-bold text-[9px]">Pay</div>
        </div>
      );

    default:
      return (
        <img draggable="false" src="/visa.png" className={className} alt="Card Logo" />
      );
  }
};

export const ContactlessIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-white/80" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 16.5a5 5 0 0 1 0-9" />
    <path d="M12 19a8.5 8.5 0 0 0 0-14" />
    <path d="M15.5 21.5a12 12 0 0 0 0-19" />
  </svg>
);
