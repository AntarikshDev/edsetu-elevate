// Mock API base utilities with simulated network delay

const MOCK_DELAY_MIN = 200;
const MOCK_DELAY_MAX = 800;

export const simulateDelay = async (): Promise<void> => {
  const delay = Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN) + MOCK_DELAY_MIN;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const mockSuccess = <T>(data: T): { success: true; data: T } => ({
  success: true,
  data,
});

export const mockError = (message: string): { success: false; error: string } => ({
  success: false,
  error: message,
});

// Local storage keys for persistence
export const STORAGE_KEYS = {
  USER: 'edsetu_user',
  TOKEN: 'edsetu_token',
  ONBOARDING: 'edsetu_onboarding',
} as const;

// Get stored data
export const getStoredData = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Set stored data
export const setStoredData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Clear stored data
export const clearStoredData = (key: string): void => {
  localStorage.removeItem(key);
};

// Generate mock ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Format date
export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString();
};
