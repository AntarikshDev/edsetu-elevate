import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser, logout } from '@/store/authSlice';
import { usePermissions } from '@/hooks/usePermissions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import logo from '@/assets/logo.png';
import {
  LayoutDashboard, BookOpen, Package, FolderOpen, HelpCircle, FileCheck, ClipboardList,
  Video, Layers, Users, UserCog, GraduationCap, Settings, LogOut, ChevronDown, ChevronRight, 
  Menu, X, User, Building2, PanelLeftClose, PanelLeft
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
  {
    id: 'settings', label: 'Settings', icon: Settings,
    requiredPermission: 'settings',
    children: [
      { label: 'Organization', href: '/app/settings/organization', icon: Building2, requiredPermission: 'settings' },
      { label: 'General', href: '/app/settings', icon: Settings, requiredPermission: 'settings' },
    ],
  },
];

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { canAccess, currentRole } = usePermissions();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['contents', 'users']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleGroup = (groupId: string) => {
    if (isCollapsed) return; // Don't toggle when collapsed
    setExpandedGroups(prev => prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const isActive = (href: string) => location.pathname === href;
  const isGroupActive = (children: NavChild[]) => children.some(child => location.pathname === child.href);

  const getFilteredNavItems = () => {
    return navItems.filter(item => {
      if (item.id === 'dashboard' || item.id === 'profile') return true;
      if (item.requiredPermission && !canAccess(item.requiredPermission)) return false;
      return true;
    }).map(item => {
      if (item.children) {
        const filteredChildren = item.children.filter(child => {
          if (child.requiredPermission && !canAccess(child.requiredPermission)) return false;
          return true;
        });
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

  const NavItemLink = ({ item, isChild = false }: { item: NavItem | NavChild; isChild?: boolean }) => {
    const href = 'href' in item ? item.href : (item as NavChild).href;
    const active = isActive(href!);
    
    const linkContent = (
      <Link
        to={href!}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200",
          isChild ? "px-3 py-2 rounded-lg" : "px-3 py-2.5",
          isCollapsed && !isChild ? "justify-center px-0" : "",
          active
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <item.icon className={cn("shrink-0", isChild ? "w-4 h-4" : "w-5 h-5")} />
        {(!isCollapsed || isChild) && <span>{item.label}</span>}
      </Link>
    );

    if (isCollapsed && !isChild) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  const NavGroup = ({ item }: { item: NavItem }) => {
    const isExpanded = expandedGroups.includes(item.id);
    const hasActiveChild = isGroupActive(item.children!);

    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                // Navigate to first child when collapsed
                if (item.children?.[0]) {
                  navigate(item.children[0].href);
                }
              }}
              className={cn(
                "w-full flex items-center justify-center px-0 py-2.5 rounded-xl text-sm font-medium transition-colors",
                hasActiveChild ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-0">
            <div className="py-2">
              <p className="px-3 py-1 font-medium text-sm">{item.label}</p>
              <div className="mt-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-sm transition-colors",
                      isActive(child.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <child.icon className="w-4 h-4" />
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div>
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
        <div className={cn(
          "overflow-hidden transition-all duration-200",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
            {item.children?.map((child) => (
              <NavItemLink key={child.href} item={child} isChild />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn(
        "p-4 border-b border-border flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/app" className="flex items-center gap-3">
          <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl shrink-0" />
          {!isCollapsed && <span className="font-heading text-xl font-bold">EdSetu</span>}
        </Link>
        {!isCollapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Collapsed toggle button */}
      {isCollapsed && (
        <div className="hidden lg:flex justify-center py-2 border-b border-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn(
        "flex-1 p-4 space-y-1 overflow-y-auto",
        isCollapsed && "px-2"
      )}>
        {filteredNavItems.map((item) => {
          if (item.children) {
            return <NavGroup key={item.id} item={item} />;
          }
          return <NavItemLink key={item.id} item={item as NavItem} />;
        })}
      </nav>

      {/* Footer */}
      <div className={cn("p-4 border-t border-border", isCollapsed && "px-2")}>
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link 
                  to="/app/profile" 
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  {user?.name?.charAt(0) || 'U'}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{roleDisplayNames[currentRole] || currentRole}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <>
            <Link 
              to="/app/profile" 
              className="flex items-center gap-3 mb-3 hover:bg-muted rounded-lg p-2 -m-2 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium shrink-0">
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
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-50" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:w-[72px]" : "lg:w-64",
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
      )}>
        <SidebarContent />
      </aside>
    </>
  );
}
