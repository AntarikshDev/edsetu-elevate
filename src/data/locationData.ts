// Countries with flags for global coverage
export const countries = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
];

export const states: Record<string, Array<{ code: string; name: string }>> = {
  'IN': [
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'DL', name: 'Delhi' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'KL', name: 'Kerala' },
  ],
  'US': [
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' },
    { code: 'NY', name: 'New York' },
    { code: 'WA', name: 'Washington' },
  ],
  'GB': [
    { code: 'ENG', name: 'England' },
    { code: 'SCT', name: 'Scotland' },
    { code: 'WLS', name: 'Wales' },
    { code: 'NIR', name: 'Northern Ireland' },
  ],
  'AE': [
    { code: 'DXB', name: 'Dubai' },
    { code: 'AUH', name: 'Abu Dhabi' },
    { code: 'SHJ', name: 'Sharjah' },
  ],
  'SG': [
    { code: 'SG', name: 'Singapore' },
  ],
  'AU': [
    { code: 'NSW', name: 'New South Wales' },
    { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' },
  ],
  'CA': [
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'QC', name: 'Quebec' },
  ],
};

export const cities: Record<string, string[]> = {
  // India
  'UP': ['Noida', 'Lucknow', 'Varanasi', 'Agra', 'Kanpur', 'Ghaziabad', 'Greater Noida'],
  'MH': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
  'DL': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'KA': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
  'TN': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'GJ': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'RJ': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'WB': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
  'MP': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'KL': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  // US
  'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  'TX': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
  'FL': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
  'NY': ['New York City', 'Buffalo', 'Albany', 'Rochester'],
  'WA': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver'],
  // UK
  'ENG': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  'SCT': ['Edinburgh', 'Glasgow', 'Aberdeen'],
  'WLS': ['Cardiff', 'Swansea', 'Newport'],
  'NIR': ['Belfast', 'Derry', 'Lisburn'],
  // UAE
  'DXB': ['Dubai City', 'Jumeirah', 'Deira'],
  'AUH': ['Abu Dhabi City', 'Al Ain'],
  'SHJ': ['Sharjah City'],
  // Singapore
  'SG': ['Singapore Central', 'Orchard', 'Marina Bay'],
  // Australia
  'NSW': ['Sydney', 'Newcastle', 'Wollongong'],
  'VIC': ['Melbourne', 'Geelong', 'Ballarat'],
  'QLD': ['Brisbane', 'Gold Coast', 'Cairns'],
  // Canada
  'ON': ['Toronto', 'Ottawa', 'Mississauga'],
  'BC': ['Vancouver', 'Victoria', 'Surrey'],
  'QC': ['Montreal', 'Quebec City', 'Laval'],
};

export const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
];

export function getStatesForCountry(countryCode: string): Array<{ code: string; name: string }> {
  return states[countryCode] || [];
}

export function getCitiesForState(stateCode: string): string[] {
  return cities[stateCode] || [];
}
