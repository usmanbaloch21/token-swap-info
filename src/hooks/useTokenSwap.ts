import { useState, useCallback, useEffect } from 'react';
import { Token, TokenPrice, ApiError } from '@/types/token';
import { SwapCalculation } from '@/types/api';
import { apiService } from '@/services/api';
import { UI_CONFIG } from '@/constants/config';

export interface UseTokenSwapState {
  fromToken: Token | null;
  toToken: Token | null;
  usdAmount: number;
  swapCalculation: SwapCalculation | null;
  loading: boolean;
  error: ApiError | null;
  fromTokenPrice: TokenPrice | null;
  toTokenPrice: TokenPrice | null;
}

export interface UseTokenSwapActions {
  setFromToken: (token: Token | null) => void;
  setToToken: (token: Token | null) => void;
  setUsdAmount: (amount: number) => void;
  swapTokens: () => void;
  calculateSwap: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export function useTokenSwap(): UseTokenSwapState & UseTokenSwapActions {
  const [state, setState] = useState<UseTokenSwapState>({
    fromToken: null,
    toToken: null,
    usdAmount: UI_CONFIG.DEFAULT_USD_AMOUNT,
    swapCalculation: null,
    loading: false,
    error: null,
    fromTokenPrice: null,
    toTokenPrice: null,
  });

  const setFromToken = useCallback((token: Token | null) => {
    setState(prev => ({ ...prev, fromToken: token, swapCalculation: null }));
  }, []);

  const setToToken = useCallback((token: Token | null) => {
    setState(prev => ({ ...prev, toToken: token, swapCalculation: null }));
  }, []);

  const setUsdAmount = useCallback((amount: number) => {
    setState(prev => ({ ...prev, usdAmount: amount, swapCalculation: null }));
  }, []);

  const swapTokens = useCallback(() => {
    setState(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromTokenPrice: prev.toTokenPrice,
      toTokenPrice: prev.fromTokenPrice,
      swapCalculation: null,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      fromToken: null,
      toToken: null,
      usdAmount: UI_CONFIG.DEFAULT_USD_AMOUNT,
      swapCalculation: null,
      loading: false,
      error: null,
      fromTokenPrice: null,
      toTokenPrice: null,
    });
  }, []);

  const calculateSwap = useCallback(async () => {
    if (!state.fromToken || !state.toToken || state.usdAmount <= 0) {
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const calculation = await apiService.calculateSwap(
        state.fromToken,
        state.toToken,
        state.usdAmount
      );

      setState(prev => ({
        ...prev,
        swapCalculation: calculation,
        fromTokenPrice: { priceUsd: calculation.fromTokenPrice },
        toTokenPrice: { priceUsd: calculation.toTokenPrice },
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as ApiError,
        loading: false,
      }));
    }
  }, [state.fromToken, state.toToken, state.usdAmount]);

  // Auto-calculate when tokens or USD amount changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateSwap();
    }, UI_CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [calculateSwap]);

  return {
    ...state,
    setFromToken,
    setToToken,
    setUsdAmount,
    swapTokens,
    calculateSwap,
    clearError,
    reset,
  };
}