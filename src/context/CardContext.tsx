import React, { createContext, useContext, useState, useMemo } from 'react';
import { CardTheme, CardType, FocusedField } from '../types';
import { 
  getCardType, 
  formatCardNumberInput, 
  getMaskedNumber, 
  formatCardHolderDisplay,
  luhnCheck 
} from '../utils/cardUtils';
import { CARD_THEMES } from '../data/cardThemes';

interface CardContextType {
  cardNumber: string;
  cardHolder: string;
  month: string;
  year: string;
  cvv: string;
  isFlipped: boolean;
  focusedField: FocusedField;
  cardType: CardType;
  selectedTheme: CardTheme;
  maskedNumber: string;
  formattedHolder: string;
  isLuhnValid: boolean;
  
  // Actions
  setCardNumber: (num: string) => void;
  setCardHolder: (holder: string) => void;
  setMonth: (m: string) => void;
  setYear: (y: string) => void;
  setCvv: (cvv: string) => void;
  setIsFlipped: (flipped: boolean | ((prev: boolean) => boolean)) => void;
  setFocusedField: (field: FocusedField) => void;
  setSelectedTheme: (theme: CardTheme) => void;
  
  // Handlers
  handleCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardHolder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMonth: (val: string) => void;
  handleYear: (val: string) => void;
  handleCvv: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearForm: () => void;
  loadDemoCard: (type: CardType) => void;
}

const CardContext = createContext<CardContextType | null>(null);

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>(CARD_THEMES[0]);

  // Derived values
  const cardType = useMemo(() => getCardType(cardNumber), [cardNumber]);
  const maskedNumber = useMemo(() => getMaskedNumber(cardNumber, cardType), [cardNumber, cardType]);
  const formattedHolder = useMemo(() => formatCardHolderDisplay(cardHolder), [cardHolder]);
  const isLuhnValid = useMemo(() => luhnCheck(cardNumber), [cardNumber]);

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatCardNumberInput(raw, cardType);
    setCardNumber(formatted);
  };

  const handleCardHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolder(e.target.value);
  };

  const handleMonth = (val: string) => {
    setMonth(val);
  };

  const handleYear = (val: string) => {
    setYear(val);
  };

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '');
    const maxLen = cardType === 'amex' ? 4 : 3;
    setCvv(clean.slice(0, maxLen));
  };

  const clearForm = () => {
    setCardNumber('');
    setCardHolder('');
    setMonth('');
    setYear('');
    setCvv('');
    setIsFlipped(false);
    setFocusedField(null);
  };

  const loadDemoCard = (type: CardType) => {
    switch (type) {
      case 'visa':
        setCardNumber('4532 - 7520 - 9845 - 3491');
        setCardHolder('ALEXANDER MORGAN');
        setMonth('08');
        setYear('2028');
        setCvv('842');
        setSelectedTheme(CARD_THEMES[0]);
        break;
      case 'mastercard':
        setCardNumber('5412 - 7534 - 8901 - 2345');
        setCardHolder('SOPHIA CARTER');
        setMonth('11');
        setYear('2029');
        setCvv('512');
        setSelectedTheme(CARD_THEMES[1]);
        break;
      case 'amex':
        setCardNumber('3782 - 822460 - 41005');
        setCardHolder('VICTORIA STERLING');
        setMonth('04');
        setYear('2030');
        setCvv('9021');
        setSelectedTheme(CARD_THEMES[6]);
        break;
      case 'discover':
        setCardNumber('6011 - 4920 - 1827 - 9021');
        setCardHolder('DANIEL HAYES');
        setMonth('12');
        setYear('2027');
        setCvv('639');
        setSelectedTheme(CARD_THEMES[2]);
        break;
    }
  };

  return (
    <CardContext.Provider
      value={{
        cardNumber,
        cardHolder,
        month,
        year,
        cvv,
        isFlipped,
        focusedField,
        cardType,
        selectedTheme,
        maskedNumber,
        formattedHolder,
        isLuhnValid,
        setCardNumber,
        setCardHolder,
        setMonth,
        setYear,
        setCvv,
        setIsFlipped,
        setFocusedField,
        setSelectedTheme,
        handleCardNumber,
        handleCardHolder,
        handleMonth,
        handleYear,
        handleCvv,
        clearForm,
        loadDemoCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
