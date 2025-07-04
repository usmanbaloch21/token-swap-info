import React from 'react';
import { Token, TokenPrice } from '@/types/token';
import { formatNumber } from '@/utils/format';

interface TokenAmountProps {
  token: Token;
  amount: number;
  price?: TokenPrice;
  usdValue?: number;
  className?: string;
  showPrice?: boolean;
  showUsdValue?: boolean;
}

const TokenAmount: React.FC<TokenAmountProps> = ({
  token,
  amount,
  price,
  usdValue,
  className,
  showPrice = true,
  showUsdValue = true,
}) => {
  const tokenUsdValue = usdValue || (price ? amount * price.priceUsd : 0);

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">
              {token.symbol.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {formatNumber(amount)} {token.symbol}
            </div>
            <div className="text-sm text-gray-500">
              {token.name}
            </div>
          </div>
        </div>
        <div className="text-right">
          {showUsdValue && (
            <div className="font-medium text-gray-900">
              ${formatNumber(tokenUsdValue, 2)}
            </div>
          )}
          {showPrice && price && (
            <div className="text-sm text-gray-500">
              ${formatNumber(price.priceUsd, 6)} per {token.symbol}
            </div>
          )}
        </div>
      </div>
      {price?.priceChange24h && (
        <div className="mt-2 text-sm">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              price.priceChange24h >= 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {price.priceChange24h >= 0 ? '+' : ''}
            {formatNumber(price.priceChange24h, 2)}% (24h)
          </span>
        </div>
      )}
    </div>
  );
};

export default TokenAmount;