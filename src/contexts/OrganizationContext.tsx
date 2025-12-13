import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import {
  selectOrganizationId,
  selectOrganization,
  setOrganization,
  clearOrganization,
} from '@/store/authSlice';
import { selectCurrentUser } from '@/store/authSlice';
import { getOrganizationById } from '@/services/api/organizationApi';
import type {
  Organization,
  OrganizationContext as OrgContext,
  OrganizationBranding,
  OrganizationSettings,
  OrganizationFeatures,
} from '@/types/organization';

interface OrganizationContextType {
  // Current organization data
  organization: Organization | null;
  organizationId: string | null;
  organizationContext: OrgContext | null;
  
  // Loading state
  isLoading: boolean;
  error: Error | null;
  
  // Branding helpers
  branding: OrganizationBranding | null;
  logo: string | undefined;
  primaryColor: string;
  
  // Settings helpers
  settings: OrganizationSettings | null;
  features: OrganizationFeatures | null;
  
  // Feature flags
  hasFeature: (feature: keyof OrganizationFeatures) => boolean;
  isFeatureEnabled: (feature: keyof OrganizationFeatures) => boolean;
  
  // Organization status
  isActive: boolean;
  isTrial: boolean;
  plan: string | null;
  
  // Actions
  refreshOrganization: () => void;
  switchOrganization: (org: Organization) => void;
  leaveOrganization: () => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

interface OrganizationProviderProps {
  children: ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const organizationId = useSelector(selectOrganizationId);
  const organizationContext = useSelector(selectOrganization);
  const currentUser = useSelector(selectCurrentUser);

  // Fetch full organization data
  const {
    data: organization,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: async () => {
      if (!organizationId) return null;
      const response = await getOrganizationById(organizationId);
      if (!response.success) throw new Error(response.error);
      return response.data || null;
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync organization context when data changes
  useEffect(() => {
    if (organization && organizationId) {
      const context: OrgContext = {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        role: organization.ownerId === String(currentUser?.id) ? 'owner' : 'member',
        branding: organization.branding,
        settings: organization.settings,
      };

      // Only update if different
      if (JSON.stringify(context) !== JSON.stringify(organizationContext)) {
        dispatch(
          setOrganization({
            organizationId: organization.id,
            organizationSlug: organization.slug,
            organization: context,
          })
        );
      }
    }
  }, [organization, organizationId, currentUser, dispatch, organizationContext]);

  // Branding helpers
  const branding = organization?.branding || organizationContext?.branding || null;
  const logo = branding?.logo;
  const primaryColor = branding?.primaryColor || '#3b82f6';

  // Settings helpers
  const settings = organization?.settings || organizationContext?.settings || null;
  const features = settings?.features || null;

  // Feature flag helpers
  const hasFeature = (feature: keyof OrganizationFeatures): boolean => {
    return features?.[feature] ?? false;
  };

  const isFeatureEnabled = (feature: keyof OrganizationFeatures): boolean => {
    return hasFeature(feature);
  };

  // Organization status
  const isActive = organization?.status === 'active';
  const isTrial = organization?.status === 'trial';
  const plan = organization?.plan || null;

  // Actions
  const refreshOrganization = () => {
    refetch();
  };

  const switchOrganization = (org: Organization) => {
    const context: OrgContext = {
      id: org.id,
      name: org.name,
      slug: org.slug,
      role: org.ownerId === String(currentUser?.id) ? 'owner' : 'member',
      branding: org.branding,
      settings: org.settings,
    };

    dispatch(
      setOrganization({
        organizationId: org.id,
        organizationSlug: org.slug,
        organization: context,
      })
    );
  };

  const leaveOrganization = () => {
    dispatch(clearOrganization());
  };

  const value: OrganizationContextType = {
    organization: organization || null,
    organizationId,
    organizationContext,
    isLoading,
    error: error as Error | null,
    branding,
    logo,
    primaryColor,
    settings,
    features,
    hasFeature,
    isFeatureEnabled,
    isActive,
    isTrial,
    plan,
    refreshOrganization,
    switchOrganization,
    leaveOrganization,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

/**
 * Hook to access organization context
 */
export const useOrganizationContext = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganizationContext must be used within an OrganizationProvider');
  }
  return context;
};

/**
 * Hook to check if a feature is enabled
 */
export const useFeatureFlag = (feature: keyof OrganizationFeatures): boolean => {
  const { hasFeature } = useOrganizationContext();
  return hasFeature(feature);
};

export default OrganizationContext;
