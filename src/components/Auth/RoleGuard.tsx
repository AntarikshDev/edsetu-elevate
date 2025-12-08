import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser, selectIsAuthenticated } from '@/store/authSlice';
import { RoleType } from '@/types/user-management';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: RoleType[];
  fallback?: ReactNode;
  redirectTo?: string;
}

// Map backend roles to internal role types
const normalizeRole = (role: string | undefined): RoleType | undefined => {
  if (!role) return undefined;
  const roleLower = role.toLowerCase();
  if (roleLower === 'admin' || roleLower === 'superadmin') return 'admin';
  if (roleLower === 'subadmin' || roleLower === 'sub_admin') return 'sub_admin';
  if (roleLower === 'instructor') return 'instructor';
  if (roleLower === 'student') return 'student';
  return undefined;
};

export function RoleGuard({
  children,
  allowedRoles,
  fallback,
  redirectTo,
}: RoleGuardProps) {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Check if we're still hydrating from localStorage
  const isHydrating = typeof window !== 'undefined' && 
    localStorage.getItem('accessToken') && 
    !isAuthenticated;

  if (isHydrating) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userRole = normalizeRole(user?.role);

  if (!userRole || !allowedRoles.includes(userRole)) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    if (fallback) {
      return <>{fallback}</>;
    }
    return <AccessDenied />;
  }

  return <>{children}</>;
}

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold mb-4 text-destructive">
          Access Denied
        </h1>
        <p className="text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  permission,
  fallback,
}: PermissionGuardProps) {
  const user = useAppSelector(selectCurrentUser);
  const userRole = normalizeRole(user?.role);

  // Permission mapping - maps permission strings to allowed roles
  const permissionRoles: Record<string, RoleType[]> = {
    'users:manage': ['admin', 'sub_admin'],
    'users:create': ['admin', 'sub_admin'],
    'users:delete': ['admin'],
    'courses:manage': ['admin', 'sub_admin', 'instructor'],
    'courses:create': ['admin', 'sub_admin', 'instructor'],
    'settings:manage': ['admin'],
    'analytics:view': ['admin', 'sub_admin', 'instructor'],
  };

  const allowedRoles = permissionRoles[permission] || [];

  if (!userRole || !allowedRoles.includes(userRole)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
