import { useDashboard } from '@/hooks/useDashboard';
import { WelcomeBanner } from '@/components/Dashboard/WelcomeBanner';
import { QuickActions } from '@/components/Dashboard/QuickActions';
import { GettingStartedChecklist } from '@/components/Dashboard/GettingStartedChecklist';
import { StatsCards } from '@/components/Dashboard/StatsCards';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { QuickTips } from '@/components/Dashboard/QuickTips';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { stats, quickActions, checklist, activity, tips, isLoading, checklistProgress } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <WelcomeBanner checklistProgress={checklistProgress} />
      
      {tips.length > 0 && <QuickTips tips={tips} />}
      
      {stats && stats.totalCourses > 0 && <StatsCards stats={stats} />}
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <QuickActions actions={quickActions} />
          <RecentActivity activities={activity} />
        </div>
        <div>
          <GettingStartedChecklist items={checklist} progress={checklistProgress} />
        </div>
      </div>
    </div>
  );
}
