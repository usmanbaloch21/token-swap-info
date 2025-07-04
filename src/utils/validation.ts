import { UI_CONFIG } from '@/constants/config';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateUsdAmount(amount: number): ValidationResult {
  if (isNaN(amount)) {
    return {
      isValid: false,
      error: 'Please enter a valid number',
    };
  }

  if (amount < UI_CONFIG.MIN_USD_AMOUNT) {
    return {
      isValid: false,
      error: `Amount must be at least $${UI_CONFIG.MIN_USD_AMOUNT}`,
    };
  }

  if (amount > UI_CONFIG.MAX_USD_AMOUNT) {
    return {
      isValid: false,
      error: `Amount cannot exceed $${UI_CONFIG.MAX_USD_AMOUNT.toLocaleString()}`,
    };
  }

  return { isValid: true };
}

export function validateTokenSelection(fromToken: unknown, toToken: unknown): ValidationResult {
  if (!fromToken) {
    return {
      isValid: false,
      error: 'Please select a source token',
    };
  }

  if (!toToken) {
    return {
      isValid: false,
      error: 'Please select a target token',
    };
  }

  const from = fromToken as { symbol?: string; chainId?: string };
  const to = toToken as { symbol?: string; chainId?: string };

  if (from.symbol === to.symbol && from.chainId === to.chainId) {
    return {
      isValid: false,
      error: 'Source and target tokens must be different',
    };
  }

  return { isValid: true };
}

export function sanitizeNumericInput(value: string): string {
  // Remove non-numeric characters except decimal point
  const sanitized = value.replace(/[^0-9.]/g, '');
  
  // Ensure only one decimal point
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  return sanitized;
}

export function isValidNumber(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}