import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as invitationApi from '@/services/api/invitationApi';
import { RoleType, Invitation } from '@/types/user-management';
import { toast } from '@/hooks/use-toast';

export function useInvitations(params?: {
  status?: Invitation['status'];
  roleToAssign?: RoleType;
}) {
  return useQuery({
    queryKey: ['invitations', params],
    queryFn: () => invitationApi.getInvitations(params),
  });
}

export function usePendingInvitationsCount() {
  return useQuery({
    queryKey: ['invitations', 'pending', 'count'],
    queryFn: invitationApi.getPendingInvitationsCount,
  });
}

export function useInvitationManagement() {
  const queryClient = useQueryClient();

  const createInvitation = useMutation({
    mutationFn: (data: {
      email: string;
      phone?: string;
      name?: string;
      roleToAssign: RoleType;
      invitedBy: string;
      invitedByName: string;
      message?: string;
    }) => invitationApi.createInvitation(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['invitations'] });
        toast({ title: 'Success', description: 'Invitation sent successfully' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to send invitation', variant: 'destructive' });
    },
  });

  const revokeInvitation = useMutation({
    mutationFn: (invitationId: string) => invitationApi.revokeInvitation(invitationId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['invitations'] });
        toast({ title: 'Success', description: 'Invitation revoked' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
  });

  const resendInvitation = useMutation({
    mutationFn: (invitationId: string) => invitationApi.resendInvitation(invitationId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['invitations'] });
        toast({ title: 'Success', description: 'Invitation resent' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    },
  });

  return {
    sendInvitation: createInvitation.mutateAsync,
    revokeInvitation: revokeInvitation.mutateAsync,
    resendInvitation: resendInvitation.mutateAsync,
    isSending: createInvitation.isPending,
    isRevoking: revokeInvitation.isPending,
    isResending: resendInvitation.isPending,
  };
}
