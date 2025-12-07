import { User, AuthResponse, OTPResponse, UserRole } from '@/types/api';
import { 
  simulateDelay, 
  mockSuccess, 
  mockError, 
  STORAGE_KEYS, 
  getStoredData, 
  setStoredData, 
  clearStoredData,
  generateId,
  formatDate 
} from './mockApi';

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@edsetu.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    onboardingCompleted: true,
    brandName: 'EdSetu Academy',
  },
  {
    id: '2',
    email: 'subadmin@edsetu.com',
    name: 'Mike Manager',
    role: 'sub_admin',
    createdAt: '2024-01-15T00:00:00Z',
    onboardingCompleted: true,
    brandName: 'EdSetu Sub Team',
  },
  {
    id: '3',
    email: 'instructor@edsetu.com',
    name: 'Sarah Teacher',
    role: 'instructor',
    createdAt: '2024-02-15T00:00:00Z',
    onboardingCompleted: true,
    brandName: 'Sarah\'s Courses',
  },
  {
    id: '4',
    email: 'student@edsetu.com',
    name: 'John Student',
    role: 'student',
    createdAt: '2024-03-01T00:00:00Z',
    onboardingCompleted: true,
  },
];

// Mock OTP storage
const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

/**
 * POST /api/auth/login
 * Login with email and password
 */
export const login = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  await simulateDelay();

  // Find user by email
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  // In mock, any password works for demo
  if (password.length < 6) {
    return { success: false, message: 'Invalid email or password' };
  }

  const token = `mock_token_${generateId()}`;
  
  // Store in localStorage
  setStoredData(STORAGE_KEYS.USER, user);
  setStoredData(STORAGE_KEYS.TOKEN, token);

  return {
    success: true,
    user,
    token,
    message: 'Login successful',
  };
};

/**
 * POST /api/auth/register
 * Register new user
 */
export const register = async (
  email: string,
  password: string,
  name: string,
  role: UserRole = 'admin'
): Promise<AuthResponse> => {
  await simulateDelay();

  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return { success: false, message: 'User with this email already exists' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const newUser: User = {
    id: generateId(),
    email,
    name,
    role,
    createdAt: formatDate(),
    onboardingCompleted: false,
  };

  mockUsers.push(newUser);
  
  const token = `mock_token_${generateId()}`;
  
  setStoredData(STORAGE_KEYS.USER, newUser);
  setStoredData(STORAGE_KEYS.TOKEN, token);

  return {
    success: true,
    user: newUser,
    token,
    message: 'Registration successful',
  };
};

/**
 * POST /api/auth/send-otp
 * Send OTP to phone number
 */
export const sendOTP = async (phone: string): Promise<OTPResponse> => {
  await simulateDelay();

  if (!phone || phone.length < 10) {
    return { success: false, message: 'Invalid phone number' };
  }

  // Generate mock OTP (always 123456 for demo)
  const otp = '123456';
  otpStore[phone] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  };

  console.log(`[Mock API] OTP for ${phone}: ${otp}`);

  return {
    success: true,
    message: 'OTP sent successfully',
    expiresIn: 300,
  };
};

/**
 * POST /api/auth/verify-otp
 * Verify OTP and login/register
 */
export const verifyOTP = async (
  phone: string, 
  otp: string,
  name?: string
): Promise<AuthResponse> => {
  await simulateDelay();

  const storedOTP = otpStore[phone];

  if (!storedOTP) {
    return { success: false, message: 'OTP expired or not sent' };
  }

  if (storedOTP.expiresAt < Date.now()) {
    delete otpStore[phone];
    return { success: false, message: 'OTP expired' };
  }

  if (storedOTP.otp !== otp) {
    return { success: false, message: 'Invalid OTP' };
  }

  // Clear OTP after successful verification
  delete otpStore[phone];

  // Find or create user
  let user = mockUsers.find(u => u.phone === phone);

  if (!user) {
    user = {
      id: generateId(),
      email: `${phone}@phone.edsetu.com`,
      phone,
      name: name || `User ${phone.slice(-4)}`,
      role: 'admin',
      createdAt: formatDate(),
      onboardingCompleted: false,
    };
    mockUsers.push(user);
  }

  const token = `mock_token_${generateId()}`;
  
  setStoredData(STORAGE_KEYS.USER, user);
  setStoredData(STORAGE_KEYS.TOKEN, token);

  return {
    success: true,
    user,
    token,
    message: 'OTP verified successfully',
  };
};

/**
 * POST /api/auth/logout
 * Logout current user
 */
export const logout = async (): Promise<{ success: boolean }> => {
  await simulateDelay();
  
  clearStoredData(STORAGE_KEYS.USER);
  clearStoredData(STORAGE_KEYS.TOKEN);
  clearStoredData(STORAGE_KEYS.ONBOARDING);

  return { success: true };
};

/**
 * GET /api/auth/me
 * Get current user
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  await simulateDelay();

  const user = getStoredData<User>(STORAGE_KEYS.USER);
  const token = getStoredData<string>(STORAGE_KEYS.TOKEN);

  if (!user || !token) {
    return { success: false, message: 'Not authenticated' };
  }

  return {
    success: true,
    user,
    token,
  };
};

/**
 * PUT /api/auth/profile
 * Update user profile
 */
export const updateProfile = async (
  updates: Partial<Pick<User, 'name' | 'avatar' | 'brandName' | 'brandLogo'>>
): Promise<AuthResponse> => {
  await simulateDelay();

  const user = getStoredData<User>(STORAGE_KEYS.USER);

  if (!user) {
    return { success: false, message: 'Not authenticated' };
  }

  const updatedUser = { ...user, ...updates };
  setStoredData(STORAGE_KEYS.USER, updatedUser);

  // Update in mock database
  const index = mockUsers.findIndex(u => u.id === user.id);
  if (index !== -1) {
    mockUsers[index] = updatedUser;
  }

  return {
    success: true,
    user: updatedUser,
    message: 'Profile updated successfully',
  };
};
