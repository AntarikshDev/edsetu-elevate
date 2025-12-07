import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as roleApi from '@/services/api/roleApi';
import { RoleType } from '@/types/user-management';
import { toast } from '@/hooks/use-toast';

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: roleApi.getRoles,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}

export function useAssignableRoles(currentRole: RoleType) {
  return useQuery({
    queryKey: ['assignableRoles', currentRole],
    queryFn: () => roleApi.getAssignableRoles(currentRole),
    enabled: !!currentRole,
  });
}

export function useUserRoles(userId: string) {
  return useQuery({
    queryKey: ['userRoles', userId],
    queryFn: () => roleApi.getUserRoles(userId),
    enabled: !!userId,
  });
}

export function useRoleManagement() {
  const queryClient = useQueryClient();

  const assignRole = useMutation({
    mutationFn: ({
      userId,
      roleId,
      assignedBy,
    }: {
      userId: string;
      roleId: string;
      assignedBy: string;
    }) => roleApi.assignRoleToUser(userId, roleId, assignedBy),
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['userRoles', variables.userId] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast({ title: 'Success', description: 'Role assigned successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
  });

  const removeRole = useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) =>
      roleApi.removeRoleFromUser(userId, roleId),
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['userRoles', variables.userId] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast({ title: 'Success', description: 'Role removed successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
  });

  return {
    assignRole: assignRole.mutateAsync,
    removeRole: removeRole.mutateAsync,
    isAssigning: assignRole.isPending,
    isRemoving: removeRole.isPending,
  };
}
