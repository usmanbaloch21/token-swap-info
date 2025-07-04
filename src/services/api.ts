import { 
  getAssetErc20ByChainAndSymbol, 
  getAssetPriceInfo 
} from '@funkit/api-base';
import { Token, TokenPrice, ApiError } from '@/types/token';
import { SwapCalculation } from '@/types/api';
import { API_CONFIG } from '@/constants/config';

class ApiService {
  private apiKey: string;
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  constructor(apiKey: string = API_CONFIG.API_KEY) {
    this.apiKey = apiKey;
  }

  private getCacheKey(method: string, params: Record<string, unknown>): string {
    return `${method}_${JSON.stringify(params)}`;
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private async withRetry<T>(
    operation: () => Promise<T>,
    retries: number = API_CONFIG.RETRIES
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.withRetry(operation, retries - 1);
      }
      throw error;
    }
  }

  private handleError(error: unknown): ApiError {
    const err = error as Record<string, unknown>;
    
    if (err.response) {
      const response = err.response as Record<string, unknown>;
      return {
        message: (response.data as Record<string, unknown>)?.message as string || 'API request failed',
        code: response.status?.toString(),
        details: response.data,
      };
    }
    
    if (err.request) {
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
        details: err.request,
      };
    }
    
    return {
      message: (err.message as string) || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      details: error,
    };
  }

  async getTokenInfo(chainId: string, symbol: string): Promise<Token> {
    const cacheKey = this.getCacheKey('getTokenInfo', { chainId, symbol });
    const cached = this.getFromCache<Token>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const result = await this.withRetry(async () => {
        const response = await getAssetErc20ByChainAndSymbol({
          chainId,
          symbol,
          apiKey: this.apiKey,
        });
        return response;
      });

      const tokenInfo: Token = {
        symbol: result.symbol || symbol,
        name: result.name || symbol,
        chainId,
        address: result.address,
        decimals: result.decimals,
      };

      this.setCache(cacheKey, tokenInfo);
      return tokenInfo;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getTokenPrice(chainId: string, tokenAddress: string): Promise<TokenPrice> {
    const cacheKey = this.getCacheKey('getTokenPrice', { chainId, tokenAddress });
    const cached = this.getFromCache<TokenPrice>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const result = await this.withRetry(async () => {
        const response = await getAssetPriceInfo({
          chainId,
          assetTokenAddress: tokenAddress,
          apiKey: this.apiKey,
        });
        return response;
      });

      const priceInfo: TokenPrice = {
        priceUsd: result.unitPrice || 0,
        priceChange24h: undefined,
        marketCap: undefined,
        volume24h: undefined,
      };

      this.setCache(cacheKey, priceInfo);
      return priceInfo;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async calculateSwap(
    fromToken: Token,
    toToken: Token,
    usdAmount: number
  ): Promise<SwapCalculation> {
    try {
      const [fromTokenInfo, toTokenInfo] = await Promise.all([
        this.getTokenInfo(fromToken.chainId, fromToken.symbol),
        this.getTokenInfo(toToken.chainId, toToken.symbol),
      ]);

      if (!fromTokenInfo.address || !toTokenInfo.address) {
        throw new Error('Token address not found');
      }

      const [fromPrice, toPrice] = await Promise.all([
        this.getTokenPrice(fromToken.chainId, fromTokenInfo.address),
        this.getTokenPrice(toToken.chainId, toTokenInfo.address),
      ]);

      const fromTokenAmount = usdAmount / fromPrice.priceUsd;
      const toTokenAmount = usdAmount / toPrice.priceUsd;

      return {
        usdAmount,
        fromTokenAmount,
        toTokenAmount,
        fromTokenPrice: fromPrice.priceUsd,
        toTokenPrice: toPrice.priceUsd,
        priceImpact: 0, // For demo purposes
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const apiService = new ApiService();
export default ApiService;