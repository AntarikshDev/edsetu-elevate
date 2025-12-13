import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Fragment } from 'react';

// Route label mappings
const routeLabels: Record<string, string> = {
  app: 'Dashboard',
  users: 'Users',
  students: 'Students',
  instructors: 'Instructors',
  'sub-admins': 'Sub Admins',
  add: 'Add New',
  edit: 'Edit',
  profile: 'Profile',
  settings: 'Settings',
  organization: 'Organization',
};

// Get human-readable label for a route segment
function getLabel(segment: string): string {
  // Check if it's a UUID (user ID)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
    return 'Details';
  }
  return routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

// Build cumulative paths for each breadcrumb
function buildPaths(segments: string[]): { label: string; path: string }[] {
  const paths: { label: string; path: string }[] = [];
  let currentPath = '';
  
  for (const segment of segments) {
    currentPath += `/${segment}`;
    paths.push({
      label: getLabel(segment),
      path: currentPath,
    });
  }
  
  return paths;
}

export function Breadcrumbs() {
  const location = useLocation();
  
  // Skip breadcrumbs for root app path
  if (location.pathname === '/app' || location.pathname === '/app/') {
    return null;
  }
  
  // Get path segments, filter out empty strings
  const segments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = buildPaths(segments);
  
  // Don't show if only one level deep
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/app" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbs.slice(1).map((crumb, index, arr) => (
          <Fragment key={crumb.path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === arr.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path} className="text-muted-foreground hover:text-foreground">
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
