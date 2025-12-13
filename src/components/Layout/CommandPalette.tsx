import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCog,
  UserPlus,
  Settings,
  User,
  Search,
  Plus,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
  group: 'navigation' | 'users' | 'actions' | 'help';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = useCallback((path: string) => {
    navigate(path);
    setOpen(false);
  }, [navigate]);

  const commands: CommandItem[] = [
    // Navigation
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '⌘D', action: () => goTo('/app'), group: 'navigation' },
    { id: 'students', label: 'Students', icon: GraduationCap, action: () => goTo('/app/users/students'), group: 'navigation' },
    { id: 'instructors', label: 'Instructors', icon: Users, action: () => goTo('/app/users/instructors'), group: 'navigation' },
    { id: 'sub-admins', label: 'Sub Admins', icon: UserCog, action: () => goTo('/app/users/sub-admins'), group: 'navigation' },
    { id: 'profile', label: 'Profile', icon: User, action: () => goTo('/app/profile'), group: 'navigation' },
    { id: 'settings', label: 'Organization Settings', icon: Settings, action: () => goTo('/app/settings/organization'), group: 'navigation' },
    
    // User Actions
    { id: 'add-student', label: 'Add New Student', icon: UserPlus, action: () => goTo('/app/users/students/add'), group: 'users' },
    { id: 'add-instructor', label: 'Add New Instructor', icon: UserPlus, action: () => goTo('/app/users/instructors/add'), group: 'users' },
    { id: 'add-sub-admin', label: 'Add New Sub Admin', icon: UserPlus, action: () => goTo('/app/users/sub-admins/add'), group: 'users' },
    
    // Quick Actions
    { id: 'search-users', label: 'Search Users...', icon: Search, action: () => goTo('/app/users/students'), group: 'actions' },
    { id: 'new-item', label: 'Create New...', icon: Plus, action: () => {}, group: 'actions' },
    
    // Help
    { id: 'docs', label: 'Documentation', icon: FileText, action: () => window.open('https://docs.lovable.dev', '_blank'), group: 'help' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, action: () => goTo('/contact'), group: 'help' },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigationItems = commands.filter(c => c.group === 'navigation');
  const userItems = commands.filter(c => c.group === 'users');
  const actionItems = commands.filter(c => c.group === 'actions');
  const helpItems = commands.filter(c => c.group === 'help');

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              {item.shortcut && (
                <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Add Users">
          {userItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Quick Actions">
          {actionItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Help">
          {helpItems.map((item) => (
            <CommandItem key={item.id} onSelect={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
