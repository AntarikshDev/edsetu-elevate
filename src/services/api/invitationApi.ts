import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Invitation, RoleType } from '@/types/user-management';
import { simulateDelay, generateId, formatDate } from './mockApi';

// Mock invitations data
const mockInvitations: Invitation[] = [
  {
    id: 'inv_1',
    email: 'pending.subadmin@example.com',
    name: 'New Sub Admin',
    roleToAssign: 'sub_admin',
    invitedBy: 'admin_1',
    invitedByName: 'System Admin',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
    message: 'Welcome to EdSetu! Please join as a sub-administrator.',
  },
  {
    id: 'inv_2',
    email: 'new.instructor@example.com',
    name: 'Upcoming Instructor',
    roleToAssign: 'instructor',
    invitedBy: 'admin_1',
    invitedByName: 'System Admin',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'inv_3',
    email: 'accepted.user@example.com',
    name: 'Accepted User',
    roleToAssign: 'instructor',
    invitedBy: 'subadmin_1',
    invitedByName: 'Vikram Singh',
    status: 'accepted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

/**
 * POST /api/invitations
 * Create new invitation
 */
export const createInvitation = async (data: {
  email: string;
  phone?: string;
  name?: string;
  roleToAssign: RoleType;
  invitedBy: string;
  invitedByName: string;
  message?: string;
}): Promise<ApiResponse<Invitation>> => {
  await simulateDelay();

  // Check for existing pending invitation
  const existingInvite = mockInvitations.find(
    inv => inv.email === data.email && inv.status === 'pending'
  );
  if (existingInvite) {
    return { success: false, error: 'An invitation is already pending for this email' };
  }

  const invitation: Invitation = {
    id: generateId(),
    email: data.email,
    phone: data.phone,
    name: data.name,
    roleToAssign: data.roleToAssign,
    invitedBy: data.invitedBy,
    invitedByName: data.invitedByName,
    status: 'pending',
    createdAt: formatDate(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
    message: data.message,
  };

  mockInvitations.push(invitation);
  return { success: true, data: invitation, message: 'Invitation sent successfully' };
};

/**
 * GET /api/invitations
 * List all invitations with filters
 */
export const getInvitations = async (params?: {
  status?: Invitation['status'];
  roleToAssign?: RoleType;
  page?: number;
  pageSize?: number;
}): Promise<ApiResponse<PaginatedResponse<Invitation>>> => {
  await simulateDelay();

  let filtered = [...mockInvitations];

  if (params?.status) {
    filtered = filtered.filter(inv => inv.status === params.status);
  }
  if (params?.roleToAssign) {
    filtered = filtered.filter(inv => inv.roleToAssign === params.roleToAssign);
  }

  // Sort by created date (newest first)
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const start = (page - 1) * pageSize;
  const paginatedData = filtered.slice(start, start + pageSize);

  return {
    success: true,
    data: {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    },
  };
};

/**
 * GET /api/invitations/:id
 * Get invitation details
 */
export const getInvitationById = async (invitationId: string): Promise<ApiResponse<Invitation>> => {
  await simulateDelay();

  const invitation = mockInvitations.find(inv => inv.id === invitationId);
  if (!invitation) {
    return { success: false, error: 'Invitation not found' };
  }

  return { success: true, data: invitation };
};

/**
 * POST /api/invitations/:id/accept
 * Accept invitation
 */
export const acceptInvitation = async (
  invitationId: string,
  token?: string
): Promise<ApiResponse<Invitation>> => {
  await simulateDelay();

  const invitation = mockInvitations.find(inv => inv.id === invitationId);
  if (!invitation) {
    return { success: false, error: 'Invitation not found' };
  }

  if (invitation.status !== 'pending') {
    return { success: false, error: 'Invitation is no longer valid' };
  }

  if (new Date(invitation.expiresAt) < new Date()) {
    invitation.status = 'expired';
    return { success: false, error: 'Invitation has expired' };
  }

  invitation.status = 'accepted';
  invitation.acceptedAt = formatDate();

  return { success: true, data: invitation, message: 'Invitation accepted' };
};

/**
 * POST /api/invitations/:id/revoke
 * Revoke pending invitation
 */
export const revokeInvitation = async (invitationId: string): Promise<ApiResponse<Invitation>> => {
  await simulateDelay();

  const invitation = mockInvitations.find(inv => inv.id === invitationId);
  if (!invitation) {
    return { success: false, error: 'Invitation not found' };
  }

  if (invitation.status !== 'pending') {
    return { success: false, error: 'Only pending invitations can be revoked' };
  }

  invitation.status = 'revoked';
  return { success: true, data: invitation, message: 'Invitation revoked' };
};

/**
 * POST /api/invitations/:id/resend
 * Resend invitation email
 */
export const resendInvitation = async (invitationId: string): Promise<ApiResponse<Invitation>> => {
  await simulateDelay();

  const invitation = mockInvitations.find(inv => inv.id === invitationId);
  if (!invitation) {
    return { success: false, error: 'Invitation not found' };
  }

  if (invitation.status !== 'pending') {
    return { success: false, error: 'Only pending invitations can be resent' };
  }

  // Extend expiry
  invitation.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

  return { success: true, data: invitation, message: 'Invitation resent successfully' };
};

/**
 * GET /api/invitations/pending/count
 * Get count of pending invitations by role
 */
export const getPendingInvitationsCount = async (): Promise<
  ApiResponse<Record<RoleType, number>>
> => {
  await simulateDelay();

  const counts = mockInvitations
    .filter(inv => inv.status === 'pending')
    .reduce(
      (acc, inv) => {
        acc[inv.roleToAssign] = (acc[inv.roleToAssign] || 0) + 1;
        return acc;
      },
      {} as Record<RoleType, number>
    );

  return { success: true, data: counts };
};
