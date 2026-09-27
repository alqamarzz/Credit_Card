import { CardType } from '../types';

/**
 * Detect card type based on leading digits
 */
export function getCardType(cardNumber: string): CardType {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (!cleanNumber) return 'visa'; // default fallback or generic

  // Visa: starts with 4
  if (/^4/.test(cleanNumber)) return 'visa';

  // Mastercard: 51-55 or 2221-2720
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/.test(cleanNumber)) return 'mastercard';

  // American Express: 34 or 37
  if (/^3[47]/.test(cleanNumber)) return 'amex';

  // Discover: 6011, 622126-622925, 644-649, 65
  if (/^(6011|65|64[4-9]|622)/.test(cleanNumber)) return 'discover';

  // Diners Club: 300-305, 36, 38
  if (/^(30[0-5]|36|38)/.test(cleanNumber)) return 'dinersclub';

  // JCB: 3528-3589
  if (/^35(2[89]|[3-8][0-9])/.test(cleanNumber)) return 'jcb';

  // UnionPay: 62
  if (/^62/.test(cleanNumber)) return 'unionpay';

  // Troy: 9792
  if (/^9792/.test(cleanNumber)) return 'troy';

  return 'visa';
}

/**
 * Format input value with dashes (e.g. 1234 - 5678 - 1234 - 5678 or Amex 4 - 6 - 5)
 */
export function formatCardNumberInput(value: string, cardType: CardType): string {
  const clean = value.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    const limited = clean.slice(0, 15);
    let formatted = '';
    for (let i = 0; i < limited.length; i++) {
      if (i === 4 || i === 10) {
        formatted += ' - ';
      }
      formatted += limited[i];
    }
    return formatted;
  }

  // 16-digit standard
  const limited = clean.slice(0, 16);
  let formatted = '';
  for (let i = 0; i < limited.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' - ';
    }
    formatted += limited[i];
  }
  return formatted;
}

/**
 * Returns masked representation for the card visual display.
 * Shows first 4 and last 4, middle masked with *, placeholders with #
 */
export function getMaskedNumber(rawInput: string, cardType: CardType): string {
  const digits = rawInput.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    let result = '';
    for (let i = 0; i < 15; i++) {
      if (i < digits.length) {
        // Show first 4 and last 5, mask middle 6
        if (i < 4 || i >= 10) {
          result += digits[i];
        } else {
          result += '*';
        }
      } else {
        result += '#';
      }
      if (i === 3 || i === 9) {
        result += ' ';
      }
    }
    return result;
  }

  // 16-digit card default
  let result = '';
  for (let i = 0; i < 16; i++) {
    if (i < digits.length) {
      if (i < 4 || i >= 12) {
        result += digits[i];
      } else {
        result += '*';
      }
    } else {
      result += '#';
    }
    if ((i + 1) % 4 === 0 && i !== 15) {
      result += ' ';
    }
  }
  return result;
}

/**
 * Smart Card Holder name formatting with auto-abbreviation for long names
 */
export function formatCardHolderDisplay(name: string): string {
  const trimmed = name.toUpperCase().trim() || 'FULL NAME';
  if (trimmed.length <= 20) return trimmed;

  const parts = trimmed.split(' ').filter(part => part.length > 0);
  if (parts.length <= 1) {
    return trimmed.slice(0, 20);
  }

  let formatted = trimmed;
  for (let i = 0; i < parts.length - 1 && formatted.length > 20; i++) {
    parts[i] = parts[i][0] + '.';
    formatted = parts.join(' ');
  }

  return formatted.length > 20 ? formatted.slice(0, 20) : formatted;
}

/**
 * Luhn algorithm for card validation
 */
export function luhnCheck(numStr: string): boolean {
  const digits = numStr.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
