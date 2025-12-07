import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagedUser, UserRole as LegacyUserRole } from '@/types/api';
import { UserFilters, RoleType } from '@/types/user-management';
import * as usersApi from '@/services/api/usersApi';
import { toast } from '@/hooks/use-toast';

export function useUsers(role: RoleType, filters?: UserFilters) {
  const queryClient = useQueryClient();

  // Map role to the appropriate API function
  const fetchUsers = async (page: number = 1, pageSize: number = 10) => {
    switch (role) {
      case 'sub_admin':
        return usersApi.getSubAdmins(page, pageSize);
      case 'instructor':
        return usersApi.getInstructors(page, pageSize);
      case 'student':
        return usersApi.getStudents(page, pageSize);
      default:
        throw new Error(`Unknown role: ${role}`);
    }
  };

  const query = useQuery({
    queryKey: ['users', role, filters],
    queryFn: () => fetchUsers(1, 20),
  });

  const createMutation = useMutation({
    mutationFn: (userData: { name: string; email: string; phone?: string; role: LegacyUserRole }) =>
      usersApi.createUser(userData),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['users', role] });
        toast({ title: 'Success', description: result.message || 'User created successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create user', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<ManagedUser> }) =>
      usersApi.updateUser(userId, updates),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['users', role] });
        toast({ title: 'Success', description: result.message || 'User updated successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update user', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => usersApi.deleteUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['users', role] });
        toast({ title: 'Success', description: result.message || 'User deleted successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete user', variant: 'destructive' });
    },
  });

  const activateMutation = useMutation({
    mutationFn: (userId: string) => usersApi.activateUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['users', role] });
        toast({ title: 'Success', description: 'User activated successfully' });
      }
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: (userId: string) => usersApi.deactivateUser(userId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['users', role] });
        toast({ title: 'Success', description: 'User deactivated successfully' });
      }
    },
  });

  return {
    users: query.data?.data?.data || [],
    pagination: query.data?.data
      ? {
          total: query.data.data.total,
          page: query.data.data.page,
          pageSize: query.data.data.pageSize,
          totalPages: query.data.data.totalPages,
        }
      : null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    activateUser: activateMutation.mutateAsync,
    deactivateUser: deactivateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => usersApi.getUserById(userId),
    enabled: !!userId,
  });
}
