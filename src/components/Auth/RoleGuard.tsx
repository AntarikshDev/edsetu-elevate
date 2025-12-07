import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RoleType } from '@/types/user-management';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: RoleType[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback,
  redirectTo,
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userRole = user?.role as RoleType | undefined;

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
  const { user } = useAuth();
  const userRole = user?.role as RoleType | undefined;

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
