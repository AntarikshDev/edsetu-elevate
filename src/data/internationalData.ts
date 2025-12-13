// Comprehensive International Data for Global User Management

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  currency: string;
  region: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
}

export interface Timezone {
  value: string;
  label: string;
  offset: string;
  region: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

// 100+ Countries with complete data
export const countries: Country[] = [
  // Africa
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿', currency: 'DZD', region: 'Africa' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴', currency: 'AOA', region: 'Africa' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', currency: 'EGP', region: 'Africa' },
  { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹', currency: 'ETB', region: 'Africa' },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', currency: 'GHS', region: 'Africa' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', currency: 'KES', region: 'Africa' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦', currency: 'MAD', region: 'Africa' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', currency: 'NGN', region: 'Africa' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', currency: 'ZAR', region: 'Africa' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿', currency: 'TZS', region: 'Africa' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬', currency: 'UGX', region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼', currency: 'ZWL', region: 'Africa' },
  
  // Americas
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', currency: 'ARS', region: 'Americas' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', currency: 'BRL', region: 'Americas' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', currency: 'CAD', region: 'Americas' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', currency: 'CLP', region: 'Americas' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', currency: 'COP', region: 'Americas' },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', currency: 'CRC', region: 'Americas' },
  { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺', currency: 'CUP', region: 'Americas' },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1', flag: '🇩🇴', currency: 'DOP', region: 'Americas' },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', currency: 'USD', region: 'Americas' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹', currency: 'GTQ', region: 'Americas' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', currency: 'MXN', region: 'Americas' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', currency: 'PEN', region: 'Americas' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', currency: 'USD', region: 'Americas' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', currency: 'VES', region: 'Americas' },
  
  // Asia
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫', currency: 'AFN', region: 'Asia' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', currency: 'BDT', region: 'Asia' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', currency: 'BHD', region: 'Asia' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹', currency: 'BTN', region: 'Asia' },
  { code: 'BN', name: 'Brunei', dialCode: '+673', flag: '🇧🇳', currency: 'BND', region: 'Asia' },
  { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭', currency: 'KHR', region: 'Asia' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', currency: 'CNY', region: 'Asia' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', currency: 'HKD', region: 'Asia' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', currency: 'INR', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', currency: 'IDR', region: 'Asia' },
  { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷', currency: 'IRR', region: 'Asia' },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶', currency: 'IQD', region: 'Asia' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', currency: 'ILS', region: 'Asia' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', currency: 'JPY', region: 'Asia' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴', currency: 'JOD', region: 'Asia' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', currency: 'KZT', region: 'Asia' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', currency: 'KWD', region: 'Asia' },
  { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬', currency: 'KGS', region: 'Asia' },
  { code: 'LA', name: 'Laos', dialCode: '+856', flag: '🇱🇦', currency: 'LAK', region: 'Asia' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧', currency: 'LBP', region: 'Asia' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', currency: 'MYR', region: 'Asia' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻', currency: 'MVR', region: 'Asia' },
  { code: 'MN', name: 'Mongolia', dialCode: '+976', flag: '🇲🇳', currency: 'MNT', region: 'Asia' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲', currency: 'MMK', region: 'Asia' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', currency: 'NPR', region: 'Asia' },
  { code: 'KP', name: 'North Korea', dialCode: '+850', flag: '🇰🇵', currency: 'KPW', region: 'Asia' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', currency: 'OMR', region: 'Asia' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', currency: 'PKR', region: 'Asia' },
  { code: 'PS', name: 'Palestine', dialCode: '+970', flag: '🇵🇸', currency: 'ILS', region: 'Asia' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', currency: 'PHP', region: 'Asia' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', currency: 'QAR', region: 'Asia' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', currency: 'SAR', region: 'Asia' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', currency: 'SGD', region: 'Asia' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', currency: 'KRW', region: 'Asia' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', currency: 'LKR', region: 'Asia' },
  { code: 'SY', name: 'Syria', dialCode: '+963', flag: '🇸🇾', currency: 'SYP', region: 'Asia' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼', currency: 'TWD', region: 'Asia' },
  { code: 'TJ', name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯', currency: 'TJS', region: 'Asia' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', currency: 'THB', region: 'Asia' },
  { code: 'TL', name: 'Timor-Leste', dialCode: '+670', flag: '🇹🇱', currency: 'USD', region: 'Asia' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', currency: 'TRY', region: 'Asia' },
  { code: 'TM', name: 'Turkmenistan', dialCode: '+993', flag: '🇹🇲', currency: 'TMT', region: 'Asia' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', currency: 'AED', region: 'Asia' },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿', currency: 'UZS', region: 'Asia' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', currency: 'VND', region: 'Asia' },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪', currency: 'YER', region: 'Asia' },
  
  // Europe
  { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱', currency: 'ALL', region: 'Europe' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', currency: 'EUR', region: 'Europe' },
  { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾', currency: 'BYN', region: 'Europe' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', currency: 'EUR', region: 'Europe' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dialCode: '+387', flag: '🇧🇦', currency: 'BAM', region: 'Europe' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬', currency: 'BGN', region: 'Europe' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷', currency: 'EUR', region: 'Europe' },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾', currency: 'EUR', region: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', currency: 'CZK', region: 'Europe' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', currency: 'DKK', region: 'Europe' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', currency: 'EUR', region: 'Europe' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', currency: 'EUR', region: 'Europe' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', currency: 'EUR', region: 'Europe' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', currency: 'EUR', region: 'Europe' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', currency: 'EUR', region: 'Europe' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', currency: 'HUF', region: 'Europe' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸', currency: 'ISK', region: 'Europe' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', currency: 'EUR', region: 'Europe' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', currency: 'EUR', region: 'Europe' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻', currency: 'EUR', region: 'Europe' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹', currency: 'EUR', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', currency: 'EUR', region: 'Europe' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹', currency: 'EUR', region: 'Europe' },
  { code: 'MD', name: 'Moldova', dialCode: '+373', flag: '🇲🇩', currency: 'MDL', region: 'Europe' },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨', currency: 'EUR', region: 'Europe' },
  { code: 'ME', name: 'Montenegro', dialCode: '+382', flag: '🇲🇪', currency: 'EUR', region: 'Europe' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', currency: 'EUR', region: 'Europe' },
  { code: 'MK', name: 'North Macedonia', dialCode: '+389', flag: '🇲🇰', currency: 'MKD', region: 'Europe' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', currency: 'NOK', region: 'Europe' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', currency: 'PLN', region: 'Europe' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', currency: 'EUR', region: 'Europe' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', currency: 'RON', region: 'Europe' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', currency: 'RUB', region: 'Europe' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸', currency: 'RSD', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰', currency: 'EUR', region: 'Europe' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮', currency: 'EUR', region: 'Europe' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', currency: 'EUR', region: 'Europe' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', currency: 'SEK', region: 'Europe' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', currency: 'CHF', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', currency: 'UAH', region: 'Europe' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', currency: 'GBP', region: 'Europe' },
  
  // Oceania
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', currency: 'AUD', region: 'Oceania' },
  { code: 'FJ', name: 'Fiji', dialCode: '+679', flag: '🇫🇯', currency: 'FJD', region: 'Oceania' },
  { code: 'GU', name: 'Guam', dialCode: '+1', flag: '🇬🇺', currency: 'USD', region: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', currency: 'NZD', region: 'Oceania' },
  { code: 'PG', name: 'Papua New Guinea', dialCode: '+675', flag: '🇵🇬', currency: 'PGK', region: 'Oceania' },
  { code: 'WS', name: 'Samoa', dialCode: '+685', flag: '🇼🇸', currency: 'WST', region: 'Oceania' },
  { code: 'TO', name: 'Tonga', dialCode: '+676', flag: '🇹🇴', currency: 'TOP', region: 'Oceania' },
  { code: 'VU', name: 'Vanuatu', dialCode: '+678', flag: '🇻🇺', currency: 'VUV', region: 'Oceania' },
];

// All world timezones
export const timezones: Timezone[] = [
  // UTC-12 to UTC-1
  { value: 'Pacific/Midway', label: 'Midway Island', offset: 'UTC-11:00', region: 'Pacific' },
  { value: 'Pacific/Honolulu', label: 'Hawaii', offset: 'UTC-10:00', region: 'Pacific' },
  { value: 'America/Anchorage', label: 'Alaska', offset: 'UTC-09:00', region: 'Americas' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', offset: 'UTC-08:00', region: 'Americas' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)', offset: 'UTC-07:00', region: 'Americas' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)', offset: 'UTC-06:00', region: 'Americas' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)', offset: 'UTC-05:00', region: 'Americas' },
  { value: 'America/Caracas', label: 'Caracas', offset: 'UTC-04:00', region: 'Americas' },
  { value: 'America/Halifax', label: 'Atlantic Time (Canada)', offset: 'UTC-04:00', region: 'Americas' },
  { value: 'America/Sao_Paulo', label: 'Brasilia', offset: 'UTC-03:00', region: 'Americas' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires', offset: 'UTC-03:00', region: 'Americas' },
  { value: 'Atlantic/South_Georgia', label: 'Mid-Atlantic', offset: 'UTC-02:00', region: 'Atlantic' },
  { value: 'Atlantic/Azores', label: 'Azores', offset: 'UTC-01:00', region: 'Atlantic' },
  
  // UTC
  { value: 'UTC', label: 'UTC', offset: 'UTC+00:00', region: 'UTC' },
  { value: 'Europe/London', label: 'London, Edinburgh', offset: 'UTC+00:00', region: 'Europe' },
  { value: 'Africa/Casablanca', label: 'Casablanca', offset: 'UTC+00:00', region: 'Africa' },
  
  // UTC+1 to UTC+5
  { value: 'Europe/Paris', label: 'Paris, Berlin, Rome', offset: 'UTC+01:00', region: 'Europe' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam, Brussels', offset: 'UTC+01:00', region: 'Europe' },
  { value: 'Africa/Lagos', label: 'West Central Africa', offset: 'UTC+01:00', region: 'Africa' },
  { value: 'Europe/Athens', label: 'Athens, Istanbul', offset: 'UTC+02:00', region: 'Europe' },
  { value: 'Africa/Cairo', label: 'Cairo', offset: 'UTC+02:00', region: 'Africa' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg', offset: 'UTC+02:00', region: 'Africa' },
  { value: 'Europe/Moscow', label: 'Moscow, St. Petersburg', offset: 'UTC+03:00', region: 'Europe' },
  { value: 'Asia/Kuwait', label: 'Kuwait, Riyadh', offset: 'UTC+03:00', region: 'Asia' },
  { value: 'Africa/Nairobi', label: 'Nairobi', offset: 'UTC+03:00', region: 'Africa' },
  { value: 'Asia/Tehran', label: 'Tehran', offset: 'UTC+03:30', region: 'Asia' },
  { value: 'Asia/Dubai', label: 'Abu Dhabi, Dubai', offset: 'UTC+04:00', region: 'Asia' },
  { value: 'Asia/Baku', label: 'Baku', offset: 'UTC+04:00', region: 'Asia' },
  { value: 'Asia/Kabul', label: 'Kabul', offset: 'UTC+04:30', region: 'Asia' },
  { value: 'Asia/Karachi', label: 'Islamabad, Karachi', offset: 'UTC+05:00', region: 'Asia' },
  { value: 'Asia/Tashkent', label: 'Tashkent', offset: 'UTC+05:00', region: 'Asia' },
  
  // UTC+5:30 to UTC+9
  { value: 'Asia/Kolkata', label: 'Mumbai, New Delhi', offset: 'UTC+05:30', region: 'Asia' },
  { value: 'Asia/Colombo', label: 'Sri Lanka', offset: 'UTC+05:30', region: 'Asia' },
  { value: 'Asia/Kathmandu', label: 'Kathmandu', offset: 'UTC+05:45', region: 'Asia' },
  { value: 'Asia/Dhaka', label: 'Dhaka', offset: 'UTC+06:00', region: 'Asia' },
  { value: 'Asia/Almaty', label: 'Almaty', offset: 'UTC+06:00', region: 'Asia' },
  { value: 'Asia/Yangon', label: 'Yangon (Rangoon)', offset: 'UTC+06:30', region: 'Asia' },
  { value: 'Asia/Bangkok', label: 'Bangkok, Jakarta', offset: 'UTC+07:00', region: 'Asia' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh', offset: 'UTC+07:00', region: 'Asia' },
  { value: 'Asia/Singapore', label: 'Singapore, Kuala Lumpur', offset: 'UTC+08:00', region: 'Asia' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong', offset: 'UTC+08:00', region: 'Asia' },
  { value: 'Asia/Shanghai', label: 'Beijing, Shanghai', offset: 'UTC+08:00', region: 'Asia' },
  { value: 'Asia/Taipei', label: 'Taipei', offset: 'UTC+08:00', region: 'Asia' },
  { value: 'Australia/Perth', label: 'Perth', offset: 'UTC+08:00', region: 'Oceania' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Seoul', offset: 'UTC+09:00', region: 'Asia' },
  
  // UTC+9:30 to UTC+14
  { value: 'Australia/Darwin', label: 'Darwin', offset: 'UTC+09:30', region: 'Oceania' },
  { value: 'Australia/Adelaide', label: 'Adelaide', offset: 'UTC+09:30', region: 'Oceania' },
  { value: 'Australia/Sydney', label: 'Sydney, Melbourne', offset: 'UTC+10:00', region: 'Oceania' },
  { value: 'Australia/Brisbane', label: 'Brisbane', offset: 'UTC+10:00', region: 'Oceania' },
  { value: 'Pacific/Guam', label: 'Guam', offset: 'UTC+10:00', region: 'Pacific' },
  { value: 'Pacific/Noumea', label: 'New Caledonia', offset: 'UTC+11:00', region: 'Pacific' },
  { value: 'Pacific/Auckland', label: 'Auckland, Wellington', offset: 'UTC+12:00', region: 'Pacific' },
  { value: 'Pacific/Fiji', label: 'Fiji', offset: 'UTC+12:00', region: 'Pacific' },
  { value: 'Pacific/Tongatapu', label: 'Nuku\'alofa', offset: 'UTC+13:00', region: 'Pacific' },
];

// Major currencies
export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '£', decimals: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimals: 0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimals: 2 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', decimals: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', decimals: 2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', decimals: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', decimals: 2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', decimals: 0 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', decimals: 2 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', decimals: 2 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', decimals: 2 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', decimals: 2 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', decimals: 2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', decimals: 2 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', decimals: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', decimals: 2 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', decimals: 2 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', decimals: 2 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', decimals: 2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', decimals: 2 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', decimals: 2 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', decimals: 2 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', decimals: 0 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', decimals: 2 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', decimals: 0 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', decimals: 2 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', decimals: 2 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', decimals: 2 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', decimals: 2 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', decimals: 2 },
];

// Major languages
export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', rtl: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', rtl: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

// Utility functions
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

export function getCountryByDialCode(dialCode: string): Country | undefined {
  return countries.find(c => c.dialCode === dialCode);
}

export function getCountriesByRegion(region: Country['region']): Country[] {
  return countries.filter(c => c.region === region);
}

export function getTimezonesByRegion(region: string): Timezone[] {
  return timezones.filter(t => t.region === region);
}

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find(c => c.code === code);
}

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(l => l.code === code);
}

// Auto-detect user's country from browser
export function detectUserCountry(): string {
  const locale = navigator.language || 'en-US';
  const parts = locale.split('-');
  if (parts.length > 1) {
    const countryCode = parts[1].toUpperCase();
    if (countries.find(c => c.code === countryCode)) {
      return countryCode;
    }
  }
  return 'US'; // Default
}

// Auto-detect user's timezone
export function detectUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

// Auto-detect user's language
export function detectUserLanguage(): string {
  const locale = navigator.language || 'en';
  const langCode = locale.split('-')[0];
  if (languages.find(l => l.code === langCode)) {
    return langCode;
  }
  return 'en'; // Default
}
