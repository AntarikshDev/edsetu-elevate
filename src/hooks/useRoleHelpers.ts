import { useAppSelector } from '@/store/hooks';
import { selectUserRole } from '@/store/authSlice';
import { UserRole } from '@/types/api';
import { useCallback, useMemo } from 'react';

/**
 * Role hierarchy for permission checks
 * Higher number = more permissions
 */
const roleHierarchy: Record<UserRole, number> = {
  superAdmin: 5,
  admin: 4,
  subAdmin: 3,
  sub_admin: 3, // Legacy support
  instructor: 2,
  student: 1,
};

/**
 * Hook for role-based access control helpers
 */
export function useRoleHelpers() {
  const currentRole = useAppSelector(selectUserRole) as UserRole | undefined;

  // Individual role checks
  const isSuperAdmin = useMemo(() => currentRole === 'superAdmin', [currentRole]);
  const isAdmin = useMemo(() => currentRole === 'admin', [currentRole]);
  const isSubAdmin = useMemo(() => currentRole === 'subAdmin' || currentRole === 'sub_admin', [currentRole]);
  const isInstructor = useMemo(() => currentRole === 'instructor', [currentRole]);
  const isStudent = useMemo(() => currentRole === 'student', [currentRole]);

  // Combined admin checks
  const isAnyAdmin = useMemo(
    () => isSuperAdmin || isAdmin || isSubAdmin,
    [isSuperAdmin, isAdmin, isSubAdmin]
  );

  const isFullAdmin = useMemo(
    () => isSuperAdmin || isAdmin,
    [isSuperAdmin, isAdmin]
  );

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return currentRole === role;
    },
    [currentRole]
  );

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback(
    (roles: UserRole[]): boolean => {
      return currentRole ? roles.includes(currentRole) : false;
    },
    [currentRole]
  );

  /**
   * Check if user has at least the minimum required role level
   */
  const hasMinRole = useCallback(
    (minRole: UserRole): boolean => {
      if (!currentRole) return false;
      return roleHierarchy[currentRole] >= roleHierarchy[minRole];
    },
    [currentRole]
  );

  /**
   * Check if user can manage users of a target role
   */
  const canManageRole = useCallback(
    (targetRole: UserRole): boolean => {
      if (!currentRole) return false;

      // superAdmin can manage everyone
      if (currentRole === 'superAdmin') return true;

      // admin can manage everyone except superAdmin
      if (currentRole === 'admin') return targetRole !== 'superAdmin';

      // subAdmin can manage instructors and students
      if (currentRole === 'subAdmin' || currentRole === 'sub_admin') {
        return targetRole === 'instructor' || targetRole === 'student';
      }

      // instructor can manage students (limited)
      if (currentRole === 'instructor') return targetRole === 'student';

      return false;
    },
    [currentRole]
  );

  /**
   * Check if user can access a specific feature
   */
  const canAccess = useCallback(
    (feature: string): boolean => {
      if (!currentRole) return false;

      const featurePermissions: Record<string, UserRole[]> = {
        dashboard: ['superAdmin', 'admin', 'subAdmin', 'sub_admin', 'instructor', 'student'],
        users: ['superAdmin', 'admin', 'subAdmin', 'sub_admin'],
        students: ['superAdmin', 'admin', 'subAdmin', 'sub_admin', 'instructor'],
        instructors: ['superAdmin', 'admin', 'subAdmin', 'sub_admin'],
        subAdmins: ['superAdmin', 'admin'],
        courses: ['superAdmin', 'admin', 'subAdmin', 'sub_admin', 'instructor'],
        packages: ['superAdmin', 'admin', 'subAdmin', 'sub_admin', 'instructor'],
        analytics: ['superAdmin', 'admin', 'subAdmin', 'sub_admin', 'instructor'],
        settings: ['superAdmin', 'admin'],
        billing: ['superAdmin', 'admin'],
        devices: ['superAdmin', 'admin', 'subAdmin', 'sub_admin'],
        enrollments: ['superAdmin', 'admin', 'subAdmin', 'sub_admin'],
      };

      const allowedRoles = featurePermissions[feature];
      return allowedRoles ? allowedRoles.includes(currentRole) : false;
    },
    [currentRole]
  );

  /**
   * Get allowed roles for inviting users
   */
  const getInvitableRoles = useCallback((): UserRole[] => {
    if (!currentRole) return [];

    switch (currentRole) {
      case 'superAdmin':
        return ['admin', 'subAdmin', 'instructor', 'student'];
      case 'admin':
        return ['subAdmin', 'instructor', 'student'];
      case 'subAdmin':
      case 'sub_admin':
        return ['instructor', 'student'];
      case 'instructor':
        return ['student'];
      default:
        return [];
    }
  }, [currentRole]);

  return {
    // Current role
    currentRole,

    // Individual role checks
    isSuperAdmin,
    isAdmin,
    isSubAdmin,
    isInstructor,
    isStudent,

    // Combined checks
    isAnyAdmin,
    isFullAdmin,

    // Functions
    hasRole,
    hasAnyRole,
    hasMinRole,
    canManageRole,
    canAccess,
    getInvitableRoles,
  };
}