import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser, selectUserRole } from '@/store/authSlice';
import { RoleType } from '@/types/user-management';
import { canManageRole } from '@/services/api/roleApi';

// Role hierarchy for permission checks
const roleHierarchy: Record<RoleType, number> = {
  admin: 4,
  sub_admin: 3,
  instructor: 2,
  student: 1,
};

// Map backend roles to internal role types
const normalizeRole = (role: string | null): RoleType => {
  if (!role) return 'student';
  const roleLower = role.toLowerCase();
  if (roleLower === 'admin' || roleLower === 'superadmin') return 'admin';
  if (roleLower === 'subadmin' || roleLower === 'sub_admin') return 'sub_admin';
  if (roleLower === 'instructor') return 'instructor';
  return 'student';
};

export function usePermissions() {
  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectUserRole);
  const currentRole = normalizeRole(role);

  /**
   * Check if current user has a specific role
   */
  const hasRole = (roleToCheck: RoleType): boolean => {
    return currentRole === roleToCheck;
  };

  /**
   * Check if current user has at least the given role level
   */
  const hasMinRole = (minRole: RoleType): boolean => {
    return roleHierarchy[currentRole] >= roleHierarchy[minRole];
  };

  /**
   * Check if current user can manage users of a specific role
   */
  const canManageUsers = (targetRole: RoleType): boolean => {
    return canManageRole(currentRole, targetRole);
  };

  /**
   * Check if current user can invite users of a specific role
   */
  const canInvite = (roleToInvite: RoleType): boolean => {
    // Admin can invite anyone except other admins
    if (currentRole === 'admin') {
      return roleToInvite !== 'admin';
    }
    // Sub-admin can invite instructors and students
    if (currentRole === 'sub_admin') {
      return roleToInvite === 'instructor' || roleToInvite === 'student';
    }
    // Instructors can only view their students
    if (currentRole === 'instructor') {
      return false;
    }
    return false;
  };

  /**
   * Check if user can access a specific feature
   */
  const canAccess = (feature: string): boolean => {
    const featurePermissions: Record<string, RoleType[]> = {
      dashboard: ['admin', 'sub_admin', 'instructor', 'student'],
      courses: ['admin', 'sub_admin', 'instructor'],
      'course-create': ['admin', 'sub_admin', 'instructor'],
      'user-management': ['admin', 'sub_admin'],
      'sub-admins': ['admin'],
      instructors: ['admin', 'sub_admin'],
      students: ['admin', 'sub_admin', 'instructor'],
      settings: ['admin', 'sub_admin', 'instructor'],
      analytics: ['admin', 'sub_admin', 'instructor'],
      billing: ['admin'],
      'organization-setup': ['admin'],
    };

    const allowedRoles = featurePermissions[feature];
    if (!allowedRoles) return false;
    return allowedRoles.includes(currentRole);
  };

  /**
   * Get list of features user can access
   */
  const getAccessibleFeatures = (): string[] => {
    const allFeatures = [
      'dashboard',
      'courses',
      'course-create',
      'user-management',
      'sub-admins',
      'instructors',
      'students',
      'settings',
      'analytics',
      'billing',
    ];
    return allFeatures.filter(canAccess);
  };

  return {
    user,
    currentRole,
    hasRole,
    hasMinRole,
    canManageUsers,
    canInvite,
    canAccess,
    getAccessibleFeatures,
    isAdmin: currentRole === 'admin',
    isSubAdmin: currentRole === 'sub_admin',
    isInstructor: currentRole === 'instructor',
    isStudent: currentRole === 'student',
  };
}
