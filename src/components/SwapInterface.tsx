import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import TokenSelect from '@/components/TokenSelect';
import { Token, TokenPrice, ApiError, SUPPORTED_TOKENS } from '@/types/token';
import { SwapCalculation } from '@/types/api';
import { apiService } from '@/services/api';
import { formatNumber } from '@/utils/format';
import { UI_CONFIG } from '@/constants/config';

const SwapInterface: React.FC = () => {
  // Find ETH and USDT tokens for default selection
  const defaultFromToken = SUPPORTED_TOKENS.find(token => token.symbol === 'ETH') || null;
  const defaultToToken = SUPPORTED_TOKENS.find(token => token.symbol === 'USDT') || null;
  
  const [fromToken, setFromToken] = useState<Token | null>(defaultFromToken);
  const [toToken, setToToken] = useState<Token | null>(defaultToToken);
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [toAmount, setToAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [fromTokenPrice, setFromTokenPrice] = useState<TokenPrice | null>(null);
  const [toTokenPrice, setToTokenPrice] = useState<TokenPrice | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const swapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    const tempPrice = fromTokenPrice;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
    setFromTokenPrice(toTokenPrice);
    setToTokenPrice(tempPrice);
    if (exchangeRate) {
      setExchangeRate(1 / exchangeRate);
    }
  };

  const clearError = () => setError(null);

  const calculateSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
      setToAmount('');
      setExchangeRate(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const usdAmount = parseFloat(fromAmount) * (fromTokenPrice?.priceUsd || 1);
      const calculation = await apiService.calculateSwap(
        fromToken,
        toToken,
        usdAmount
      );

      const calculatedToAmount = (parseFloat(fromAmount) * calculation.toTokenAmount) / calculation.fromTokenAmount;
      setToAmount(calculatedToAmount.toFixed(6));
      setExchangeRate(calculation.toTokenAmount / calculation.fromTokenAmount);
      setFromTokenPrice({ priceUsd: calculation.fromTokenPrice });
      setToTokenPrice({ priceUsd: calculation.toTokenPrice });
    } catch (error) {
      setError(error as ApiError);
      setToAmount('');
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateSwap();
    }, UI_CONFIG.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [fromToken, toToken, fromAmount, fromTokenPrice]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);
    
    // Calculate reverse - from toAmount to fromAmount
    if (toToken && fromToken && value && parseFloat(value) > 0 && exchangeRate) {
      const calculatedFromAmount = parseFloat(value) / exchangeRate;
      setFromAmount(calculatedFromAmount.toFixed(6));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm">{error.message}</span>
              <button onClick={clearError} className="ml-auto text-red-500 hover:text-red-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {/* From Token Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">From</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  placeholder="0.0"
                  className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-gray-500 text-gray-900"
                  step="0.000001"
                  min="0"
                />
                {fromToken && fromAmount && fromTokenPrice && (
                  <div className="text-sm text-gray-500 mt-1">
                    ≈ ${formatNumber(parseFloat(fromAmount) * fromTokenPrice.priceUsd, 2)}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <TokenSelect
                    selectedToken={fromToken}
                    onTokenChange={setFromToken}
                    excludeToken={toToken}
                    placeholder="Select token"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={swapTokens}
              disabled={!fromToken || !toToken}
              className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg border-4 border-white transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* To Token Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">To</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={toAmount}
                  onChange={handleToAmountChange}
                  placeholder="0.0"
                  className="w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-gray-500 text-gray-900"
                  step="0.000001"
                  min="0"
                />
                {toToken && toAmount && toTokenPrice && (
                  <div className="text-sm text-gray-500 mt-1">
                    ≈ ${formatNumber(parseFloat(toAmount) * toTokenPrice.priceUsd, 2)}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <TokenSelect
                    selectedToken={toToken}
                    onTokenChange={setToToken}
                    excludeToken={fromToken}
                    placeholder="Select token"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate and Loading */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <LoadingSpinner size="sm" />
            <span className="ml-2 text-gray-600 text-sm">
              Calculating...
            </span>
          </div>
        )}

        {/* Exchange Rate */}
        {exchangeRate && fromToken && toToken && !loading && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Rate</span>
              <span className="text-gray-900 font-medium">
                1 {fromToken.symbol} = {formatNumber(exchangeRate, 6)} {toToken.symbol}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SwapInterface;