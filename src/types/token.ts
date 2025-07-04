export interface Token {
  symbol: string;
  name: string;
  chainId: string;
  address?: string;
  decimals?: number;
  logoURI?: string;
}

export interface TokenPrice {
  priceUsd: number;
  priceChange24h?: number;
  marketCap?: number;
  volume24h?: number;
}

export interface SwapQuote {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  priceImpact?: number;
  fee?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ChainConfig {
  chainId: string;
  name: string;
  symbol: string;
  rpcUrl?: string;
  blockExplorerUrl?: string;
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    chainId: '1',
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    chainId: '137',
    name: 'Polygon',
    symbol: 'MATIC',
  },
  {
    chainId: '8453',
    name: 'Base',
    symbol: 'ETH',
  },
];

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    chainId: '1',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    chainId: '137',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    chainId: '8453',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    chainId: '1',
  },
];