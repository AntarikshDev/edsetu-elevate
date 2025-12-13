export const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
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
