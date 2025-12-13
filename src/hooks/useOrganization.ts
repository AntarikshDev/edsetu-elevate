import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import {
  getOrganizationById,
  getOrganizationBySlug,
  createOrganization,
  updateOrganization,
  updateOrganizationBranding,
  updateOrganizationSettings,
  updateOrganizationSEO,
  updateOrganizationContact,
  getUserOrganizations,
} from '@/services/api/organizationApi';
import {
  setOrganization,
  clearOrganization,
  selectOrganizationId,
  selectOrganization,
} from '@/store/authSlice';
import type {
  Organization,
  OrganizationBranding,
  OrganizationSettings,
  OrganizationSEO,
  OrganizationContact,
  OrganizationContext,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from '@/types/organization';

/**
 * Hook for managing organization data and operations
 */
export const useOrganization = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const organizationId = useSelector(selectOrganizationId);
  const organizationContext = useSelector(selectOrganization);

  // Fetch current organization
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
      return response.data;
    },
    enabled: !!organizationId,
  });

  // Create organization
  const createMutation = useMutation({
    mutationFn: async ({
      data,
      ownerId,
    }: {
      data: CreateOrganizationRequest;
      ownerId: string;
    }) => {
      const response = await createOrganization(data, ownerId);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (org) => {
      const context: OrganizationContext = {
        id: org.id,
        name: org.name,
        slug: org.slug,
        role: 'owner',
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

      queryClient.invalidateQueries({ queryKey: ['organization'] });
      queryClient.invalidateQueries({ queryKey: ['userOrganizations'] });

      toast({
        title: 'Success',
        description: 'Organization created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update organization
  const updateMutation = useMutation({
    mutationFn: async ({
      orgId,
      data,
    }: {
      orgId: string;
      data: UpdateOrganizationRequest;
    }) => {
      const response = await updateOrganization(orgId, data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', organizationId] });
      toast({
        title: 'Success',
        description: 'Organization updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Switch organization
  const switchOrganization = async (org: Organization) => {
    const context: OrganizationContext = {
      id: org.id,
      name: org.name,
      slug: org.slug,
      role: 'owner', // In production, fetch actual role
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

    // Invalidate all organization-scoped queries
    queryClient.invalidateQueries();

    toast({
      title: 'Organization Switched',
      description: `Now managing ${org.name}`,
    });
  };

  // Leave organization
  const leaveOrganization = () => {
    dispatch(clearOrganization());
    queryClient.invalidateQueries();
  };

  return {
    organization,
    organizationContext,
    organizationId,
    isLoading,
    error,
    refetch,
    createOrganization: createMutation.mutate,
    updateOrganization: updateMutation.mutate,
    switchOrganization,
    leaveOrganization,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};

/**
 * Hook for managing organization branding
 */
export const useOrganizationBranding = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const organizationId = useSelector(selectOrganizationId);

  const mutation = useMutation({
    mutationFn: async (branding: Partial<OrganizationBranding>) => {
      if (!organizationId) throw new Error('No organization selected');
      const response = await updateOrganizationBranding(organizationId, branding);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', organizationId] });
      toast({
        title: 'Success',
        description: 'Branding updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateBranding: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

/**
 * Hook for managing organization settings
 */
export const useOrganizationSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const organizationId = useSelector(selectOrganizationId);

  const mutation = useMutation({
    mutationFn: async (settings: Partial<OrganizationSettings>) => {
      if (!organizationId) throw new Error('No organization selected');
      const response = await updateOrganizationSettings(organizationId, settings);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', organizationId] });
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateSettings: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

/**
 * Hook for managing organization SEO
 */
export const useOrganizationSEO = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const organizationId = useSelector(selectOrganizationId);

  const mutation = useMutation({
    mutationFn: async (seo: Partial<OrganizationSEO>) => {
      if (!organizationId) throw new Error('No organization selected');
      const response = await updateOrganizationSEO(organizationId, seo);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', organizationId] });
      toast({
        title: 'Success',
        description: 'SEO settings updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateSEO: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

/**
 * Hook for managing organization contact
 */
export const useOrganizationContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const organizationId = useSelector(selectOrganizationId);

  const mutation = useMutation({
    mutationFn: async (contact: Partial<OrganizationContact>) => {
      if (!organizationId) throw new Error('No organization selected');
      const response = await updateOrganizationContact(organizationId, contact);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', organizationId] });
      toast({
        title: 'Success',
        description: 'Contact info updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    updateContact: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

/**
 * Hook for fetching user's organizations
 */
export const useUserOrganizations = (userId?: string) => {
  return useQuery({
    queryKey: ['userOrganizations', userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await getUserOrganizations(userId);
      if (!response.success) throw new Error(response.error);
      return response.data || [];
    },
    enabled: !!userId,
  });
};
