export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiRequestConfig {
  apiKey: string;
  timeout?: number;
  retries?: number;
}

export interface FunkitTokenResponse {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  chainId: string;
  logoURI?: string;
}

export interface FunkitPriceResponse {
  priceUsd: number;
  priceChange24h?: number;
  marketCap?: number;
  volume24h?: number;
  lastUpdated?: string;
}

export interface SwapCalculation {
  usdAmount: number;
  fromTokenAmount: number;
  toTokenAmount: number;
  fromTokenPrice: number;
  toTokenPrice: number;
  priceImpact?: number;
}