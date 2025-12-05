import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import {
  LayoutDashboard, BookOpen, Package, FolderOpen, HelpCircle, FileCheck, ClipboardList,
  Video, Layers, Users, UserCog, GraduationCap, Settings, LogOut, ChevronDown, ChevronRight, Menu, X
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/app' },
  {
    id: 'contents', label: 'Contents', icon: BookOpen,
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
    children: [
      { label: 'Sub Admin', href: '/app/users/sub-admins', icon: UserCog },
      { label: 'Instructors', href: '/app/users/instructors', icon: GraduationCap },
      { label: 'Students', href: '/app/users/students', icon: Users },
    ],
  },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/app/settings' },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['contents', 'users']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]);
  };

  const isActive = (href: string) => location.pathname === href;
  const isGroupActive = (children: { href: string }[]) => children.some(child => location.pathname === child.href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link to="/app" className="flex items-center gap-3">
          <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl" />
          <span className="font-heading text-xl font-bold">EdSetu</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
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
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || 'instructor'}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={logout}>
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
