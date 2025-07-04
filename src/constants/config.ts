if (!process.env.NEXT_PUBLIC_FUNKIT_API_KEY) {
  throw new Error('NEXT_PUBLIC_FUNKIT_API_KEY environment variable is required');
}

export const API_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_FUNKIT_API_KEY,
  TIMEOUT: 10000,
  RETRIES: 3,
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_USD_AMOUNT: 0.01,
  MAX_USD_AMOUNT: 1000000,
  DEFAULT_USD_AMOUNT: 100,
} as const;

export const BRAND_CONFIG = {
  NAME: 'Fun.xyz',
  TAGLINE: 'Explore Token Swaps',
  THEME: {
    PRIMARY: '#6366f1',
    SECONDARY: '#8b5cf6',
    ACCENT: '#f59e0b',
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
  },
} as const;