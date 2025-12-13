import { ApiResponse } from '@/types/api';
import { Role, Permission, UserRole, RoleType } from '@/types/user-management';
import { simulateDelay, generateId, formatDate } from './mockApi';

// Default organization ID for mock data
const DEFAULT_ORG_ID = 'org_default';

// Mock roles data - in production this comes from database
const mockRoles: Role[] = [
  {
    id: 'role_admin',
    organizationId: DEFAULT_ORG_ID,
    name: 'admin',
    displayName: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: [
      { id: 'p1', name: 'manage_users', resource: 'users', action: 'manage' },
      { id: 'p2', name: 'manage_content', resource: 'content', action: 'manage' },
      { id: 'p3', name: 'manage_settings', resource: 'settings', action: 'manage' },
      { id: 'p4', name: 'view_analytics', resource: 'analytics', action: 'read' },
      { id: 'p5', name: 'manage_billing', resource: 'billing', action: 'manage' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role_sub_admin',
    organizationId: DEFAULT_ORG_ID,
    name: 'sub_admin',
    displayName: 'Sub Administrator',
    description: 'Limited admin access for user and content management',
    permissions: [
      { id: 'p6', name: 'manage_instructors', resource: 'instructors', action: 'manage' },
      { id: 'p7', name: 'manage_students', resource: 'students', action: 'manage' },
      { id: 'p8', name: 'view_content', resource: 'content', action: 'read' },
      { id: 'p9', name: 'view_analytics', resource: 'analytics', action: 'read' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role_instructor',
    organizationId: DEFAULT_ORG_ID,
    name: 'instructor',
    displayName: 'Instructor',
    description: 'Create and manage courses, view enrolled students',
    permissions: [
      { id: 'p10', name: 'create_course', resource: 'courses', action: 'create' },
      { id: 'p11', name: 'manage_own_courses', resource: 'courses', action: 'update' },
      { id: 'p12', name: 'view_students', resource: 'students', action: 'read' },
      { id: 'p13', name: 'grade_assignments', resource: 'assignments', action: 'update' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'role_student',
    organizationId: DEFAULT_ORG_ID,
    name: 'student',
    displayName: 'Student',
    description: 'Enroll in courses and access learning content',
    permissions: [
      { id: 'p14', name: 'view_courses', resource: 'courses', action: 'read' },
      { id: 'p15', name: 'enroll_courses', resource: 'enrollments', action: 'create' },
      { id: 'p16', name: 'submit_assignments', resource: 'assignments', action: 'create' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Mock user roles (stores which users have which roles)
const mockUserRoles: UserRole[] = [];

/**
 * GET /api/roles
 * Get all available roles
 */
export const getRoles = async (): Promise<ApiResponse<Role[]>> => {
  await simulateDelay();
  return { success: true, data: mockRoles };
};

/**
 * GET /api/roles/:id
 * Get role by ID
 */
export const getRoleById = async (roleId: string): Promise<ApiResponse<Role>> => {
  await simulateDelay();
  const role = mockRoles.find(r => r.id === roleId);
  if (!role) {
    return { success: false, error: 'Role not found' };
  }
  return { success: true, data: role };
};

/**
 * GET /api/roles/by-name/:name
 * Get role by name
 */
export const getRoleByName = async (roleName: RoleType): Promise<ApiResponse<Role>> => {
  await simulateDelay();
  const role = mockRoles.find(r => r.name === roleName);
  if (!role) {
    return { success: false, error: 'Role not found' };
  }
  return { success: true, data: role };
};

/**
 * GET /api/users/:userId/roles
 * Get user's assigned roles
 */
export const getUserRoles = async (userId: string): Promise<ApiResponse<UserRole[]>> => {
  await simulateDelay();
  const userRoles = mockUserRoles.filter(ur => ur.userId === userId);
  return { success: true, data: userRoles };
};

/**
 * POST /api/users/:userId/roles
 * Assign role to user
 */
export const assignRoleToUser = async (
  userId: string,
  roleId: string,
  assignedBy: string,
  organizationId?: string
): Promise<ApiResponse<UserRole>> => {
  await simulateDelay();

  const orgId = organizationId || localStorage.getItem('organizationId') || DEFAULT_ORG_ID;

  const role = mockRoles.find(r => r.id === roleId);
  if (!role) {
    return { success: false, error: 'Role not found' };
  }

  // Check if user already has this role in this organization
  const existingRole = mockUserRoles.find(
    ur => ur.userId === userId && ur.roleId === roleId && ur.organizationId === orgId
  );
  if (existingRole) {
    return { success: false, error: 'User already has this role' };
  }

  const userRole: UserRole = {
    id: generateId(),
    organizationId: orgId,
    userId,
    roleId,
    role,
    assignedAt: formatDate(),
    assignedBy,
  };

  mockUserRoles.push(userRole);
  return { success: true, data: userRole, message: 'Role assigned successfully' };
};

/**
 * DELETE /api/users/:userId/roles/:roleId
 * Remove role from user
 */
export const removeRoleFromUser = async (
  userId: string,
  roleId: string
): Promise<ApiResponse<{ removed: boolean }>> => {
  await simulateDelay();

  const index = mockUserRoles.findIndex(ur => ur.userId === userId && ur.roleId === roleId);
  if (index === -1) {
    return { success: false, error: 'User role not found' };
  }

  mockUserRoles.splice(index, 1);
  return { success: true, data: { removed: true }, message: 'Role removed successfully' };
};

/**
 * GET /api/permissions
 * Get all available permissions
 */
export const getPermissions = async (): Promise<ApiResponse<Permission[]>> => {
  await simulateDelay();
  const allPermissions = mockRoles.flatMap(r => r.permissions);
  const uniquePermissions = Array.from(new Map(allPermissions.map(p => [p.id, p])).values());
  return { success: true, data: uniquePermissions };
};

/**
 * Check if a role can manage another role (prevent privilege escalation)
 */
export const canManageRole = (currentRole: RoleType, targetRole: RoleType): boolean => {
  const hierarchy: Record<RoleType, number> = {
    admin: 4,
    sub_admin: 3,
    instructor: 2,
    student: 1,
  };
  return hierarchy[currentRole] > hierarchy[targetRole];
};

/**
 * Get roles that a user can assign based on their role
 */
export const getAssignableRoles = async (currentRole: RoleType): Promise<ApiResponse<Role[]>> => {
  await simulateDelay();
  const assignableRoles = mockRoles.filter(r => canManageRole(currentRole, r.name));
  return { success: true, data: assignableRoles };
};
