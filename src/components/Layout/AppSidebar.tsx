import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser, logout } from '@/store/authSlice';
import { usePermissions } from '@/hooks/usePermissions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import {
  LayoutDashboard, BookOpen, Package, FolderOpen, HelpCircle, FileCheck, ClipboardList,
  Video, Layers, Users, UserCog, GraduationCap, Settings, LogOut, ChevronDown, ChevronRight, Menu, X, User
} from 'lucide-react';

interface NavChild {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredPermission?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavChild[];
  requiredPermission?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/app' },
  {
    id: 'contents', label: 'Contents', icon: BookOpen,
    requiredPermission: 'courses',
    children: [
      { label: 'Courses', href: '/app/courses', icon: BookOpen },
      { label: 'Packages', href: '/app/packages', icon: Package },
      { label: 'Assets Library', href: '/app/assets', icon: FolderOpen },
      { label: 'Question Bank', href: '/app/question-bank', icon: HelpCircle },
      { label: 'Live Quiz Review', href: '/app/quiz-review', icon: FileCheck },
      { label: 'Assignment Review', href: '/app/assignment-review', icon: ClipboardList },
      { label: 'Live Class', href: '/app/live-class', icon: Video },
      { label: 'Category', href: '/app/categories', icon: Layers },
    ],
  },
  {
    id: 'users', label: 'Users', icon: Users,
    requiredPermission: 'user-management',
    children: [
      { label: 'Sub Admin', href: '/app/users/sub-admins', icon: UserCog, requiredPermission: 'sub-admins' },
      { label: 'Instructors', href: '/app/users/instructors', icon: GraduationCap, requiredPermission: 'instructors' },
      { label: 'Students', href: '/app/users/students', icon: Users, requiredPermission: 'students' },
    ],
  },
  { id: 'profile', label: 'My Profile', icon: User, href: '/app/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/app/settings', requiredPermission: 'settings' },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { canAccess, currentRole } = usePermissions();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['contents', 'users']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const isActive = (href: string) => location.pathname === href;
  const isGroupActive = (children: NavChild[]) => children.some(child => location.pathname === child.href);

  // Filter navigation items based on permissions
  const getFilteredNavItems = () => {
    return navItems.filter(item => {
      // Always show dashboard and profile
      if (item.id === 'dashboard' || item.id === 'profile') return true;
      
      // Check permission for the item
      if (item.requiredPermission && !canAccess(item.requiredPermission)) return false;
      
      return true;
    }).map(item => {
      // Filter children based on permissions
      if (item.children) {
        const filteredChildren = item.children.filter(child => {
          if (child.requiredPermission && !canAccess(child.requiredPermission)) return false;
          return true;
        });
        
        // Don't show parent if no children are accessible
        if (filteredChildren.length === 0) return null;
        
        return { ...item, children: filteredChildren };
      }
      return item;
    }).filter(Boolean) as NavItem[];
  };

  const filteredNavItems = getFilteredNavItems();

  const roleDisplayNames: Record<string, string> = {
    admin: 'Administrator',
    sub_admin: 'Sub Admin',
    instructor: 'Instructor',
    student: 'Student',
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/app" className="flex items-center gap-3">
          <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl" />
          <span className="font-heading text-xl font-bold">EdSetu</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedGroups.includes(item.id);
            const hasActiveChild = isGroupActive(item.children);
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggleGroup(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    hasActiveChild ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive(child.href)
                            ? "text-primary bg-primary/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.id}
              to={item.href!}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive(item.href!) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link 
          to="/app/profile" 
          className="flex items-center gap-3 mb-3 hover:bg-muted rounded-lg p-2 -m-2 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{roleDisplayNames[currentRole] || currentRole}</p>
          </div>
        </Link>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setIsMobileOpen(false)} />}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>
    </>
  );
}
