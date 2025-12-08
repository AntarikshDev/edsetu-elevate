import { User, AuthResponse, OTPResponse, PermissionCheckResponse, UserProfile } from '@/types/api';
import { apiRequest, apiUpload, getToken, setToken, clearToken, getStoredUser, setStoredUser } from './apiClient';

/**
 * POST /api/auth/login
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await apiRequest<{ user: User; accessToken: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });

    setToken(response.accessToken);
    setStoredUser(response.user);

    return {
      success: true,
      user: response.user,
      accessToken: response.accessToken,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

/**
 * POST /api/auth/forget_password
 */
export const forgetPassword = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/auth/forget_password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to send reset email' };
  }
};

/**
 * POST /api/auth/resetPassword
 */
export const resetPassword = async (
  tokenOrOtp: string,
  new_password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/auth/resetPassword', {
      method: 'POST',
      body: JSON.stringify({ tokenOrOtp, new_password }),
      skipAuth: true,
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to reset password' };
  }
};

/**
 * POST /api/auth/update_password
 */
export const updatePassword = async (
  current_password: string,
  new_password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/auth/update_password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password }),
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update password' };
  }
};

/**
 * GET /api/auth/user_detail
 */
export const getUserDetail = async (): Promise<AuthResponse> => {
  try {
    const response = await apiRequest<User>('/api/auth/user_detail', {
      method: 'GET',
    });
    setStoredUser(response);
    return { success: true, user: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to get user details' };
  }
};

/**
 * POST /api/auth/generate_opt_for_email
 */
export const generateOTPForEmail = async (email: string): Promise<OTPResponse> => {
  try {
    const response = await apiRequest<{ message: string; expiresIn?: number }>('/api/auth/generate_opt_for_email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      skipAuth: true,
    });
    return { success: true, message: response.message, expiresIn: response.expiresIn };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to send OTP' };
  }
};

/**
 * POST /api/auth/verify_email
 */
export const verifyEmail = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/auth/verify_email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to verify email' };
  }
};

/**
 * POST /api/auth/check_permission
 */
export const checkPermission = async (
  permissionKey?: string,
  module?: string,
  action?: string
): Promise<PermissionCheckResponse> => {
  try {
    const response = await apiRequest<PermissionCheckResponse>('/api/auth/check_permission', {
      method: 'POST',
      body: JSON.stringify({ permissionKey, module, action }),
    });
    return response;
  } catch (error) {
    return { allowed: false, role: 'student' };
  }
};

/**
 * GET /api/auth/me (legacy)
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  const token = getToken();
  if (!token) {
    return { success: false, message: 'Not authenticated' };
  }

  try {
    return await getUserDetail();
  } catch (error) {
    return { success: false, message: 'Failed to get current user' };
  }
};

/**
 * Logout
 */
export const logout = async (): Promise<{ success: boolean }> => {
  clearToken();
  return { success: true };
};

// ============= Student Auth Endpoints =============

/**
 * POST /api/student/register
 */
export const studentRegister = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiRequest<{ user: User; accessToken: string }>('/api/student/register', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    });

    setToken(response.accessToken);
    setStoredUser(response.user);

    return { success: true, user: response.user, accessToken: response.accessToken };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Registration failed' };
  }
};

/**
 * POST /api/student/verify_phone_number
 */
export const verifyPhoneNumber = async (phone: string): Promise<OTPResponse> => {
  try {
    const response = await apiRequest<{ message: string; expiresIn?: number }>('/api/student/verify_phone_number', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    return { success: true, message: response.message, expiresIn: response.expiresIn };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to send OTP' };
  }
};

/**
 * POST /api/student/verify_otp
 */
export const verifyPhoneOTP = async (phone: string, otp: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/student/verify_otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to verify OTP' };
  }
};

/**
 * POST /api/student/resend_phone_otp
 */
export const resendPhoneOTP = async (phone: string): Promise<OTPResponse> => {
  try {
    const response = await apiRequest<{ message: string; expiresIn?: number }>('/api/student/resend_phone_otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
    return { success: true, message: response.message, expiresIn: response.expiresIn };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to resend OTP' };
  }
};

/**
 * POST /api/student/forget_password
 */
export const studentForgetPassword = async (data: { email?: string; phone?: string }): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/student/forget_password', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to send reset' };
  }
};

/**
 * POST /api/student/reset_password
 */
export const studentResetPassword = async (
  tokenOrOtp: string,
  new_password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/student/reset_password', {
      method: 'POST',
      body: JSON.stringify({ tokenOrOtp, new_password }),
      skipAuth: true,
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to reset password' };
  }
};

/**
 * DELETE /api/student/account/delete
 */
export const deleteStudentAccount = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/student/account/delete', {
      method: 'DELETE',
    });
    clearToken();
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to delete account' };
  }
};

// ============= Profile Endpoints =============

/**
 * POST /api/profile/create
 */
export const createProfile = async (profile: UserProfile): Promise<{ success: boolean; data?: UserProfile; message?: string }> => {
  try {
    const response = await apiRequest<UserProfile>('/api/profile/create', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to create profile' };
  }
};

/**
 * PUT /api/profile/update
 */
export const updateProfile = async (profile: Partial<UserProfile>): Promise<{ success: boolean; data?: UserProfile; message?: string }> => {
  try {
    const response = await apiRequest<UserProfile>('/api/profile/update', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update profile' };
  }
};

/**
 * POST /api/profile/upload_profile
 */
export const uploadProfileImage = async (file: File): Promise<{ success: boolean; avatarUrl?: string; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiUpload<{ avatarUrl: string }>('/api/profile/upload_profile', formData);
    return { success: true, avatarUrl: response.avatarUrl };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to upload image' };
  }
};

/**
 * GET /api/profile/detail
 */
export const getProfileDetail = async (): Promise<{ success: boolean; data?: User & { profile?: UserProfile }; message?: string }> => {
  try {
    const response = await apiRequest<User & { profile?: UserProfile }>('/api/profile/detail', {
      method: 'GET',
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to get profile' };
  }
};

// ============= Legacy Support =============

/**
 * Legacy: register (maps to admin/instructor registration if needed)
 */
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> => {
  return studentRegister({ name, email, password });
};

/**
 * Legacy: sendOTP (phone)
 */
export const sendOTP = async (phone: string): Promise<OTPResponse> => {
  return verifyPhoneNumber(phone);
};

/**
 * Legacy: verifyOTP
 */
export const verifyOTP = async (phone: string, otp: string): Promise<AuthResponse> => {
  const result = await verifyPhoneOTP(phone, otp);
  if (result.success) {
    const userResult = await getCurrentUser();
    return userResult;
  }
  return { success: false, message: result.message };
};