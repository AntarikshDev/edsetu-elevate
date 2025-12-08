import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/types/api';
import * as authApi from '@/services/api/authApi';
import { getStoredUser, getToken } from '@/services/api/apiClient';
import { getDeviceInfo } from '@/utils/deviceInfo';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>;
  studentRegister: (data: { name: string; email: string; password: string; phone?: string }) => Promise<{ success: boolean; message?: string }>;
  sendOTP: (phone: string) => Promise<{ success: boolean; message?: string }>;
  verifyOTP: (phone: string, otp: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  forgetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (tokenOrOtp: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  // Role helpers
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage for cached user
        const cachedUser = getStoredUser();
        const token = getToken();

        if (cachedUser && token) {
          setUser(cachedUser);
          // Verify with backend in background
          const response = await authApi.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
          } else {
            // Token invalid, clear user
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Get device info and build login payload
      const deviceInfo = getDeviceInfo();
      const payload: authApi.LoginRequest = {
        email,
        password_hash: password,
        device_unique_id: deviceInfo.device_unique_id,
        device_name: deviceInfo.device_name,
        device_location: deviceInfo.device_location,
      };

      const response = await authApi.login(payload);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(email, password, name);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const studentRegister = useCallback(async (data: { name: string; email: string; password: string; phone?: string }) => {
    setIsLoading(true);
    try {
      const response = await authApi.studentRegister(data);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendOTP = useCallback(async (phone: string) => {
    try {
      const response = await authApi.sendOTP(phone);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: 'Failed to send OTP. Please try again.' };
    }
  }, []);

  const verifyOTP = useCallback(async (phone: string, otp: string, name?: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.verifyOTP(phone, otp);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'OTP verification failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgetPassword = useCallback(async (email: string) => {
    try {
      const response = await authApi.forgetPassword(email);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: 'Failed to send reset email.' };
    }
  }, []);

  const resetPassword = useCallback(async (tokenOrOtp: string, newPassword: string) => {
    try {
      const response = await authApi.resetPassword(tokenOrOtp, newPassword);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: 'Failed to reset password.' };
    }
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      const response = await authApi.updatePassword(currentPassword, newPassword);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: 'Failed to update password.' };
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, []);

  // Role helper functions
  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    return user?.role ? roles.includes(user.role) : false;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        studentRegister,
        sendOTP,
        verifyOTP,
        forgetPassword,
        resetPassword,
        updatePassword,
        logout,
        updateUser,
        refreshUser,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
