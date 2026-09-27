export type CardType = 
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'dinersclub'
  | 'jcb'
  | 'unionpay'
  | 'troy'
  | 'generic';

export type FocusedField = 'number' | 'holder' | 'expiry' | 'cvv' | null;

export interface CardTheme {
  id: string;
  name: string;
  src?: string; // image url if image based
  backgroundCss?: string; // fallback or custom css gradient
  textColor?: string;
  accentColor?: string;
}

export interface CardState {
  cardNumber: string;
  cardHolder: string;
  month: string;
  year: string;
  cvv: string;
  isFlipped: boolean;
  focusedField: FocusedField;
  cardType: CardType;
  selectedTheme: CardTheme;
  isValid: boolean;
}
