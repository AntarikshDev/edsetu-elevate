import { useMemo, useCallback } from 'react';
import { 
  currencies, 
  Currency, 
  getCurrencyByCode, 
  getCountryByCode,
  detectUserCountry 
} from '@/data/internationalData';

interface UseCurrencyOptions {
  defaultCurrency?: string;
  locale?: string;
}

export function useCurrency(options: UseCurrencyOptions = {}) {
  const { defaultCurrency, locale } = options;

  // Auto-detect currency from user's country
  const detectedCurrency = useMemo(() => {
    if (defaultCurrency) return defaultCurrency;
    
    const countryCode = detectUserCountry();
    const country = getCountryByCode(countryCode);
    return country?.currency || 'USD';
  }, [defaultCurrency]);

  const userLocale = useMemo(() => {
    return locale || navigator.language || 'en-US';
  }, [locale]);

  // Format amount with currency
  const format = useCallback((amount: number, currencyCode?: string): string => {
    const code = currencyCode || detectedCurrency;
    const currency = getCurrencyByCode(code);
    
    if (!currency) {
      return `${code} ${amount.toFixed(2)}`;
    }

    try {
      return new Intl.NumberFormat(userLocale, {
        style: 'currency',
        currency: code,
        minimumFractionDigits: currency.decimals,
        maximumFractionDigits: currency.decimals,
      }).format(amount);
    } catch {
      return `${currency.symbol}${amount.toFixed(currency.decimals)}`;
    }
  }, [detectedCurrency, userLocale]);

  // Format with compact notation for large numbers
  const formatCompact = useCallback((amount: number, currencyCode?: string): string => {
    const code = currencyCode || detectedCurrency;
    const currency = getCurrencyByCode(code);

    if (!currency) {
      return `${code} ${amount.toFixed(2)}`;
    }

    try {
      return new Intl.NumberFormat(userLocale, {
        style: 'currency',
        currency: code,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(amount);
    } catch {
      // Fallback for compact formatting
      if (amount >= 1000000) {
        return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `${currency.symbol}${(amount / 1000).toFixed(1)}K`;
      }
      return `${currency.symbol}${amount.toFixed(currency.decimals)}`;
    }
  }, [detectedCurrency, userLocale]);

  // Get currency info
  const getCurrency = useCallback((code?: string): Currency | undefined => {
    return getCurrencyByCode(code || detectedCurrency);
  }, [detectedCurrency]);

  // Parse currency string to number
  const parse = useCallback((value: string): number => {
    // Remove currency symbols and formatting
    const cleaned = value.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned) || 0;
  }, []);

  // Convert between currencies (simplified - would need real exchange rates)
  const convert = useCallback((
    amount: number, 
    fromCurrency: string, 
    toCurrency: string, 
    exchangeRate: number
  ): number => {
    return amount * exchangeRate;
  }, []);

  return {
    detectedCurrency,
    currencies,
    format,
    formatCompact,
    getCurrency,
    parse,
    convert,
  };
}

// Hook for organization-level currency settings
export function useOrganizationCurrency(organizationCurrency?: string) {
  const { format, formatCompact, getCurrency } = useCurrency({
    defaultCurrency: organizationCurrency,
  });

  return {
    format,
    formatCompact,
    getCurrency,
    currencyCode: organizationCurrency || 'USD',
  };
}
