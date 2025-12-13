import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from './AppSidebar';
import { CommandPalette } from './CommandPalette';
import { Breadcrumbs } from './Breadcrumbs';
import { useSidebarState } from '@/hooks/useSidebarState';

export function AppLayout() {
  const { isCollapsed, toggle } = useSidebarState();

  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar isCollapsed={isCollapsed} onToggle={toggle} />
        <main className="flex-1 min-h-screen p-6 lg:p-8 transition-all duration-300">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </TooltipProvider>
  );
}
