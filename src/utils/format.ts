export function formatNumber(
  value: number,
  decimals: number = 4,
  options: Intl.NumberFormatOptions = {}
): string {
  if (value === 0) return '0';
  
  const absValue = Math.abs(value);
  
  // For very small numbers, use exponential notation
  if (absValue < 0.0001 && absValue > 0) {
    return value.toExponential(2);
  }
  
  // For numbers < 1, show more decimals
  if (absValue < 1) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(decimals, 6),
      ...options,
    }).format(value);
  }
  
  // For larger numbers, use standard formatting
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    ...options,
  }).format(value);
}

export function formatCurrency(
  value: number,
  currency: string = 'USD',
  decimals: number = 2
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercentage(
  value: number,
  decimals: number = 2
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

export function abbreviateNumber(
  value: number,
  decimals: number = 1
): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(Math.abs(value)) / 3);
  
  if (magnitude === 0) {
    return formatNumber(value, decimals);
  }
  
  const scaledValue = value / Math.pow(1000, magnitude);
  const suffix = suffixes[magnitude] || '';
  
  return `${formatNumber(scaledValue, decimals)}${suffix}`;
}