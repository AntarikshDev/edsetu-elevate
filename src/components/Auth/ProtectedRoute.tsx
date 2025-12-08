import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSlice';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  // Check if we're still hydrating from localStorage
  const isHydrating = typeof window !== 'undefined' && 
    localStorage.getItem('accessToken') && 
    !isAuthenticated;

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
