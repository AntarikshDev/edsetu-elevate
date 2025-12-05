import { 
  OnboardingStatus, 
  OnboardingBrandData, 
  OnboardingExpertiseData, 
  OnboardingSocialsData, 
  OnboardingPreferencesData,
  ExpertiseField,
  ApiResponse,
  User 
} from '@/types/api';
import { 
  simulateDelay, 
  STORAGE_KEYS, 
  getStoredData, 
  setStoredData 
} from './mockApi';

// Mock expertise fields
export const expertiseFields: ExpertiseField[] = [
  { id: 'academics', name: 'Academics & Languages', icon: 'GraduationCap', description: 'School subjects, exam prep, language learning' },
  { id: 'software', name: 'Software & Technology', icon: 'Code', description: 'Programming, web development, IT skills' },
  { id: 'personal', name: 'Personal Development', icon: 'Brain', description: 'Soft skills, productivity, mindfulness' },
  { id: 'business', name: 'Business & Marketing', icon: 'TrendingUp', description: 'Entrepreneurship, sales, digital marketing' },
  { id: 'fitness', name: 'Health & Fitness', icon: 'Dumbbell', description: 'Workout programs, nutrition, wellness' },
  { id: 'finance', name: 'Finance & Investing', icon: 'DollarSign', description: 'Stock market, crypto, personal finance' },
  { id: 'music', name: 'Music & Instruments', icon: 'Music', description: 'Learn instruments, music theory, production' },
  { id: 'arts', name: 'Arts & Creative', icon: 'Palette', description: 'Drawing, design, photography, crafts' },
  { id: 'cooking', name: 'Cooking & Culinary', icon: 'ChefHat', description: 'Recipes, baking, culinary techniques' },
  { id: 'lifestyle', name: 'Lifestyle & Hobbies', icon: 'Heart', description: 'Travel, fashion, home improvement' },
  { id: 'test-prep', name: 'Test Preparation', icon: 'FileCheck', description: 'UPSC, CAT, GRE, GMAT, JEE, NEET' },
  { id: 'professional', name: 'Professional Skills', icon: 'Briefcase', description: 'Career development, certifications' },
];

const getOnboardingStatus = (): OnboardingStatus => {
  const stored = getStoredData<OnboardingStatus>(STORAGE_KEYS.ONBOARDING);
  return stored || {
    currentStep: 1,
    totalSteps: 4,
    completedSteps: [],
  };
};

const saveOnboardingStatus = (status: OnboardingStatus): void => {
  setStoredData(STORAGE_KEYS.ONBOARDING, status);
};

/**
 * GET /api/onboarding/status
 * Get current onboarding status
 */
export const getStatus = async (): Promise<ApiResponse<OnboardingStatus>> => {
  await simulateDelay();
  
  const status = getOnboardingStatus();
  return { success: true, data: status };
};

/**
 * GET /api/onboarding/expertise-fields
 * Get available expertise fields
 */
export const getExpertiseFields = async (): Promise<ApiResponse<ExpertiseField[]>> => {
  await simulateDelay();
  return { success: true, data: expertiseFields };
};

/**
 * POST /api/onboarding/brand
 * Save brand setup data
 */
export const saveBrand = async (data: OnboardingBrandData): Promise<ApiResponse<OnboardingStatus>> => {
  await simulateDelay();

  if (!data.brandName || data.brandName.trim().length < 2) {
    return { success: false, error: 'Brand name must be at least 2 characters' };
  }

  const status = getOnboardingStatus();
  status.brand = data;
  
  if (!status.completedSteps.includes('brand')) {
    status.completedSteps.push('brand');
  }
  status.currentStep = Math.max(status.currentStep, 2);

  saveOnboardingStatus(status);

  // Also update user profile
  const user = getStoredData<User>(STORAGE_KEYS.USER);
  if (user) {
    user.brandName = data.brandName;
    user.brandLogo = data.brandLogo;
    setStoredData(STORAGE_KEYS.USER, user);
  }

  return { success: true, data: status };
};

/**
 * POST /api/onboarding/expertise
 * Save expertise selection
 */
export const saveExpertise = async (data: OnboardingExpertiseData): Promise<ApiResponse<OnboardingStatus>> => {
  await simulateDelay();

  if (!data.fields || data.fields.length === 0) {
    return { success: false, error: 'Please select at least one field of expertise' };
  }

  const status = getOnboardingStatus();
  status.expertise = data;
  
  if (!status.completedSteps.includes('expertise')) {
    status.completedSteps.push('expertise');
  }
  status.currentStep = Math.max(status.currentStep, 3);

  saveOnboardingStatus(status);

  return { success: true, data: status };
};

/**
 * POST /api/onboarding/socials
 * Save social media connections
 */
export const saveSocials = async (data: OnboardingSocialsData): Promise<ApiResponse<OnboardingStatus>> => {
  await simulateDelay();

  const status = getOnboardingStatus();
  status.socials = data;
  
  if (!status.completedSteps.includes('socials')) {
    status.completedSteps.push('socials');
  }
  status.currentStep = Math.max(status.currentStep, 4);

  saveOnboardingStatus(status);

  return { success: true, data: status };
};

/**
 * POST /api/onboarding/preferences
 * Save user preferences
 */
export const savePreferences = async (data: OnboardingPreferencesData): Promise<ApiResponse<OnboardingStatus>> => {
  await simulateDelay();

  const status = getOnboardingStatus();
  status.preferences = data;
  
  if (!status.completedSteps.includes('preferences')) {
    status.completedSteps.push('preferences');
  }

  saveOnboardingStatus(status);

  return { success: true, data: status };
};

/**
 * POST /api/onboarding/complete
 * Mark onboarding as complete
 */
export const completeOnboarding = async (): Promise<ApiResponse<{ completed: boolean }>> => {
  await simulateDelay();

  const user = getStoredData<User>(STORAGE_KEYS.USER);
  if (user) {
    user.onboardingCompleted = true;
    setStoredData(STORAGE_KEYS.USER, user);
  }

  return { success: true, data: { completed: true } };
};

/**
 * POST /api/onboarding/skip
 * Skip onboarding
 */
export const skipOnboarding = async (): Promise<ApiResponse<{ skipped: boolean }>> => {
  await simulateDelay();

  const user = getStoredData<User>(STORAGE_KEYS.USER);
  if (user) {
    user.onboardingCompleted = true;
    setStoredData(STORAGE_KEYS.USER, user);
  }

  return { success: true, data: { skipped: true } };
};
