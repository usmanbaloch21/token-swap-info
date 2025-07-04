import React from 'react';
import Select from '@/components/ui/Select';
import { Token, SUPPORTED_TOKENS } from '@/types/token';

interface TokenSelectProps {
  selectedToken: Token | null;
  onTokenChange: (token: Token | null) => void;
  excludeToken?: Token | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  selectedToken,
  onTokenChange,
  excludeToken,
  label,
  placeholder = 'Select a token',
  disabled = false,
  error,
}) => {
  const availableTokens = SUPPORTED_TOKENS.filter(
    token => !excludeToken || token.symbol !== excludeToken.symbol || token.chainId !== excludeToken.chainId
  );

  const getChainName = (chainId: string) => {
    switch (chainId) {
      case '1': return 'Ethereum';
      case '137': return 'Polygon';
      case '8453': return 'Base';
      default: return `Chain ${chainId}`;
    }
  };

  const tokenOptions = availableTokens.map(token => ({
    value: `${token.symbol}-${token.chainId}`,
    label: `${token.symbol} (${getChainName(token.chainId)})`,
    icon: (
      <div className="flex items-center">
        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
          <span className="text-white text-xs font-bold">
            {token.symbol.charAt(0)}
          </span>
        </div>
      </div>
    ),
  }));

  const handleTokenChange = (value: string) => {
    if (!value) {
      onTokenChange(null);
      return;
    }

    const [symbol, chainId] = value.split('-');
    const token = SUPPORTED_TOKENS.find(
      t => t.symbol === symbol && t.chainId === chainId
    );
    onTokenChange(token || null);
  };

  const selectedValue = selectedToken 
    ? `${selectedToken.symbol}-${selectedToken.chainId}`
    : undefined;

  return (
    <div className="w-full">
      <Select
        options={tokenOptions}
        value={selectedValue}
        onChange={handleTokenChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        label={label}
        className="bg-white border-gray-300 rounded-2xl py-3 px-4 min-w-[180px] font-medium shadow-sm hover:shadow-md transition-shadow"
      />
    </div>
  );
};

export default TokenSelect;