// Nationalities with country codes for flags (using country code emoji flags)
export const nationalities = [
  { code: 'AF', name: 'Afghan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albanian', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algerian', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentine', flag: '🇦🇷' },
  { code: 'AU', name: 'Australian', flag: '🇦🇺' },
  { code: 'AT', name: 'Austrian', flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladeshi', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgian', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazilian', flag: '🇧🇷' },
  { code: 'GB', name: 'British', flag: '🇬🇧' },
  { code: 'CA', name: 'Canadian', flag: '🇨🇦' },
  { code: 'CL', name: 'Chilean', flag: '🇨🇱' },
  { code: 'CN', name: 'Chinese', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombian', flag: '🇨🇴' },
  { code: 'HR', name: 'Croatian', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech', flag: '🇨🇿' },
  { code: 'DK', name: 'Danish', flag: '🇩🇰' },
  { code: 'NL', name: 'Dutch', flag: '🇳🇱' },
  { code: 'EG', name: 'Egyptian', flag: '🇪🇬' },
  { code: 'AE', name: 'Emirati', flag: '🇦🇪' },
  { code: 'ET', name: 'Ethiopian', flag: '🇪🇹' },
  { code: 'FI', name: 'Finnish', flag: '🇫🇮' },
  { code: 'FR', name: 'French', flag: '🇫🇷' },
  { code: 'DE', name: 'German', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghanaian', flag: '🇬🇭' },
  { code: 'GR', name: 'Greek', flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Konger', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'IN', name: 'Indian', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'IR', name: 'Iranian', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraqi', flag: '🇮🇶' },
  { code: 'IE', name: 'Irish', flag: '🇮🇪' },
  { code: 'IL', name: 'Israeli', flag: '🇮🇱' },
  { code: 'IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordanian', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstani', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenyan', flag: '🇰🇪' },
  { code: 'KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwaiti', flag: '🇰🇼' },
  { code: 'LB', name: 'Lebanese', flag: '🇱🇧' },
  { code: 'MY', name: 'Malaysian', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexican', flag: '🇲🇽' },
  { code: 'MA', name: 'Moroccan', flag: '🇲🇦' },
  { code: 'NP', name: 'Nepali', flag: '🇳🇵' },
  { code: 'NZ', name: 'New Zealander', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigerian', flag: '🇳🇬' },
  { code: 'NO', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'OM', name: 'Omani', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistani', flag: '🇵🇰' },
  { code: 'PS', name: 'Palestinian', flag: '🇵🇸' },
  { code: 'PE', name: 'Peruvian', flag: '🇵🇪' },
  { code: 'PH', name: 'Filipino', flag: '🇵🇭' },
  { code: 'PL', name: 'Polish', flag: '🇵🇱' },
  { code: 'PT', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatari', flag: '🇶🇦' },
  { code: 'RO', name: 'Romanian', flag: '🇷🇴' },
  { code: 'RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi', flag: '🇸🇦' },
  { code: 'SG', name: 'Singaporean', flag: '🇸🇬' },
  { code: 'ZA', name: 'South African', flag: '🇿🇦' },
  { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lankan', flag: '🇱🇰' },
  { code: 'SE', name: 'Swedish', flag: '🇸🇪' },
  { code: 'CH', name: 'Swiss', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwanese', flag: '🇹🇼' },
  { code: 'TH', name: 'Thai', flag: '🇹🇭' },
  { code: 'TR', name: 'Turkish', flag: '🇹🇷' },
  { code: 'UA', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'US', name: 'American', flag: '🇺🇸' },
  { code: 'VE', name: 'Venezuelan', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnamese', flag: '🇻🇳' },
];

// "Currently in" options - covers all education and professional stages globally
export const currentlyInOptions = [
  // Pre-school & Early Education
  { value: 'pre_school', label: 'Pre-School / Kindergarten', category: 'Early Education' },
  { value: 'elementary', label: 'Elementary / Primary School', category: 'School' },
  
  // Middle School / Junior High
  { value: 'middle_school', label: 'Middle School / Junior High', category: 'School' },
  
  // High School / Secondary
  { value: 'high_school', label: 'High School / Secondary School', category: 'School' },
  { value: 'senior_secondary', label: 'Senior Secondary (11th-12th)', category: 'School' },
  
  // Vocational / Technical
  { value: 'vocational', label: 'Vocational / Technical School', category: 'Vocational' },
  { value: 'iti', label: 'ITI / Trade School', category: 'Vocational' },
  { value: 'diploma', label: 'Diploma Program', category: 'Vocational' },
  { value: 'polytechnic', label: 'Polytechnic', category: 'Vocational' },
  
  // Undergraduate
  { value: 'undergraduate', label: 'Undergraduate / Bachelor\'s Degree', category: 'University' },
  { value: 'community_college', label: 'Community College / Associate Degree', category: 'University' },
  
  // Postgraduate
  { value: 'postgraduate', label: 'Postgraduate / Master\'s Degree', category: 'University' },
  { value: 'mba', label: 'MBA / Business School', category: 'University' },
  { value: 'phd', label: 'PhD / Doctoral Program', category: 'Research' },
  { value: 'postdoc', label: 'Post-Doctoral Research', category: 'Research' },
  
  // Professional Education
  { value: 'law_school', label: 'Law School', category: 'Professional' },
  { value: 'medical_school', label: 'Medical School', category: 'Professional' },
  { value: 'engineering', label: 'Engineering College', category: 'Professional' },
  { value: 'architecture', label: 'Architecture School', category: 'Professional' },
  { value: 'art_design', label: 'Art & Design School', category: 'Professional' },
  { value: 'music_conservatory', label: 'Music Conservatory', category: 'Professional' },
  { value: 'film_school', label: 'Film / Media School', category: 'Professional' },
  
  // Certification & Training
  { value: 'certification', label: 'Professional Certification Program', category: 'Training' },
  { value: 'bootcamp', label: 'Coding Bootcamp / Intensive Training', category: 'Training' },
  { value: 'online_learning', label: 'Online Learning / MOOCs', category: 'Training' },
  { value: 'corporate_training', label: 'Corporate Training Program', category: 'Training' },
  
  // Employment
  { value: 'internship', label: 'Internship', category: 'Employment' },
  { value: 'apprenticeship', label: 'Apprenticeship', category: 'Employment' },
  { value: 'entry_level', label: 'Entry-Level Job', category: 'Employment' },
  { value: 'mid_level', label: 'Mid-Level Professional', category: 'Employment' },
  { value: 'senior_level', label: 'Senior-Level Professional', category: 'Employment' },
  { value: 'manager', label: 'Manager / Team Lead', category: 'Employment' },
  { value: 'director', label: 'Director / Department Head', category: 'Employment' },
  { value: 'executive', label: 'Executive / C-Level', category: 'Employment' },
  { value: 'entrepreneur', label: 'Entrepreneur / Startup Founder', category: 'Employment' },
  { value: 'freelancer', label: 'Freelancer / Consultant', category: 'Employment' },
  { value: 'self_employed', label: 'Self-Employed / Business Owner', category: 'Employment' },
  
  // Other
  { value: 'gap_year', label: 'Gap Year / Sabbatical', category: 'Other' },
  { value: 'career_transition', label: 'Career Transition', category: 'Other' },
  { value: 'retired', label: 'Retired', category: 'Other' },
  { value: 'homemaker', label: 'Homemaker', category: 'Other' },
  { value: 'job_seeking', label: 'Job Seeking / Between Jobs', category: 'Other' },
  { value: 'other', label: 'Other', category: 'Other' },
];

// User type options for quick filtering
export const userTypeOptions = [
  { value: 'learner', label: 'Learner', description: 'Primary focus is learning and courses' },
  { value: 'professional', label: 'Professional', description: 'Working professional seeking upskilling' },
  { value: 'academic', label: 'Academic', description: 'Student or researcher in academic institution' },
  { value: 'educator', label: 'Educator', description: 'Teacher, trainer, or instructor' },
  { value: 'corporate', label: 'Corporate', description: 'Corporate employee for company training' },
  { value: 'hobbyist', label: 'Hobbyist', description: 'Learning for personal interest' },
];

// Role options for admin to change user roles
export const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'sub_admin', label: 'Sub Administrator' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'student', label: 'Student' },
];

// Get grouped currently in options
export function getGroupedCurrentlyInOptions() {
  const groups: Record<string, typeof currentlyInOptions> = {};
  currentlyInOptions.forEach(option => {
    if (!groups[option.category]) {
      groups[option.category] = [];
    }
    groups[option.category].push(option);
  });
  return groups;
}
