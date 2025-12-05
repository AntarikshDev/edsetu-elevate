import { useState, useEffect, useCallback } from 'react';
import { 
  OnboardingStatus, 
  OnboardingBrandData, 
  OnboardingExpertiseData, 
  OnboardingSocialsData, 
  OnboardingPreferencesData,
  ExpertiseField 
} from '@/types/api';
import * as onboardingApi from '@/services/api/onboardingApi';
import { useAuth } from '@/contexts/AuthContext';

export function useOnboarding() {
  const { updateUser } = useAuth();
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [expertiseFields, setExpertiseFields] = useState<ExpertiseField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial status and expertise fields
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, fieldsRes] = await Promise.all([
          onboardingApi.getStatus(),
          onboardingApi.getExpertiseFields(),
        ]);

        if (statusRes.success && statusRes.data) {
          setStatus(statusRes.data);
        }
        if (fieldsRes.success && fieldsRes.data) {
          setExpertiseFields(fieldsRes.data);
        }
      } catch (err) {
        setError('Failed to load onboarding data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveBrand = useCallback(async (data: OnboardingBrandData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.saveBrand(data);
      if (response.success && response.data) {
        setStatus(response.data);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to save brand');
      return { success: false, error: 'Failed to save brand' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveExpertise = useCallback(async (data: OnboardingExpertiseData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.saveExpertise(data);
      if (response.success && response.data) {
        setStatus(response.data);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to save expertise');
      return { success: false, error: 'Failed to save expertise' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSocials = useCallback(async (data: OnboardingSocialsData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.saveSocials(data);
      if (response.success && response.data) {
        setStatus(response.data);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to save socials');
      return { success: false, error: 'Failed to save socials' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePreferences = useCallback(async (data: OnboardingPreferencesData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.savePreferences(data);
      if (response.success && response.data) {
        setStatus(response.data);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to save preferences');
      return { success: false, error: 'Failed to save preferences' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await onboardingApi.completeOnboarding();
      if (response.success) {
        updateUser({ onboardingCompleted: true });
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [updateUser]);

  const skipOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await onboardingApi.skipOnboarding();
      if (response.success) {
        updateUser({ onboardingCompleted: true });
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [updateUser]);

  return {
    status,
    expertiseFields,
    isLoading,
    error,
    saveBrand,
    saveExpertise,
    saveSocials,
    savePreferences,
    completeOnboarding,
    skipOnboarding,
  };
}
