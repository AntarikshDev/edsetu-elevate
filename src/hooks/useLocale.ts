import { useMemo, useCallback } from 'react';
import { 
  detectUserCountry, 
  detectUserTimezone, 
  detectUserLanguage,
  getCountryByCode,
  getCurrencyByCode,
  type Currency
} from '@/data/internationalData';

export interface LocaleSettings {
  country: string;
  timezone: string;
  language: string;
  currency: string;
  dateFormat: 'MDY' | 'DMY' | 'YMD';
  timeFormat: '12h' | '24h';
  numberFormat: {
    decimal: string;
    thousand: string;
  };
}

// Date format by country (simplified mapping)
const dateFormatByCountry: Record<string, 'MDY' | 'DMY' | 'YMD'> = {
  US: 'MDY',
  CA: 'MDY',
  PH: 'MDY',
  // Most of the world uses DMY
  GB: 'DMY',
  DE: 'DMY',
  FR: 'DMY',
  IN: 'DMY',
  AU: 'DMY',
  // East Asia uses YMD
  JP: 'YMD',
  CN: 'YMD',
  KR: 'YMD',
  TW: 'YMD',
};

// Time format by country (12h vs 24h)
const timeFormatByCountry: Record<string, '12h' | '24h'> = {
  US: '12h',
  CA: '12h',
  AU: '12h',
  IN: '12h',
  PH: '12h',
  // Most of Europe uses 24h
  GB: '24h',
  DE: '24h',
  FR: '24h',
  JP: '24h',
};

export function useLocale(overrides?: Partial<LocaleSettings>) {
  // Detect defaults
  const defaults = useMemo(() => {
    const country = detectUserCountry();
    const countryData = getCountryByCode(country);
    
    return {
      country,
      timezone: detectUserTimezone(),
      language: detectUserLanguage(),
      currency: countryData?.currency || 'USD',
      dateFormat: dateFormatByCountry[country] || 'DMY',
      timeFormat: timeFormatByCountry[country] || '24h',
      numberFormat: {
        decimal: '.',
        thousand: ',',
      },
    };
  }, []);

  const settings: LocaleSettings = useMemo(() => ({
    ...defaults,
    ...overrides,
  }), [defaults, overrides]);

  // Format date according to locale
  const formatDate = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(settings.language, {
      timeZone: settings.timezone,
      ...options,
    }).format(d);
  }, [settings.language, settings.timezone]);

  // Format date with pattern
  const formatDatePattern = useCallback((date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    switch (settings.dateFormat) {
      case 'MDY':
        return `${month}/${day}/${year}`;
      case 'YMD':
        return `${year}-${month}-${day}`;
      case 'DMY':
      default:
        return `${day}/${month}/${year}`;
    }
  }, [settings.dateFormat]);

  // Format time according to locale
  const formatTime = useCallback((date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(settings.language, {
      timeZone: settings.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: settings.timeFormat === '12h',
    }).format(d);
  }, [settings.language, settings.timezone, settings.timeFormat]);

  // Format date and time
  const formatDateTime = useCallback((date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(settings.language, {
      timeZone: settings.timezone,
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: settings.timeFormat === '12h',
    }).format(d);
  }, [settings.language, settings.timezone, settings.timeFormat]);

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = useCallback((date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(settings.language, { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  }, [settings.language]);

  // Format number according to locale
  const formatNumber = useCallback((value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(settings.language, options).format(value);
  }, [settings.language]);

  // Format currency
  const formatCurrency = useCallback((value: number, currencyCode?: string) => {
    const code = currencyCode || settings.currency;
    const currency = getCurrencyByCode(code);
    
    return new Intl.NumberFormat(settings.language, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: currency?.decimals ?? 2,
      maximumFractionDigits: currency?.decimals ?? 2,
    }).format(value);
  }, [settings.language, settings.currency]);

  // Format percentage
  const formatPercent = useCallback((value: number, decimals = 0) => {
    return new Intl.NumberFormat(settings.language, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  }, [settings.language]);

  // Get current time in user's timezone
  const getCurrentTime = useCallback(() => {
    return new Intl.DateTimeFormat(settings.language, {
      timeZone: settings.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: settings.timeFormat === '12h',
    }).format(new Date());
  }, [settings.language, settings.timezone, settings.timeFormat]);

  // Convert date to user's timezone
  const toUserTimezone = useCallback((date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Date(d.toLocaleString('en-US', { timeZone: settings.timezone }));
  }, [settings.timezone]);

  return {
    settings,
    formatDate,
    formatDatePattern,
    formatTime,
    formatDateTime,
    formatRelativeTime,
    formatNumber,
    formatCurrency,
    formatPercent,
    getCurrentTime,
    toUserTimezone,
  };
}

// Hook for detecting user's preferred locale settings
export function useAutoDetectLocale() {
  return useMemo(() => ({
    country: detectUserCountry(),
    timezone: detectUserTimezone(),
    language: detectUserLanguage(),
  }), []);
}
