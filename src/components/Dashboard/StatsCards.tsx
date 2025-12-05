import { DashboardStats } from '@/types/api';
import { cn } from '@/lib/utils';
import { BookOpen, Users, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Courses',
      value: stats.totalCourses,
      change: stats.coursesChange,
      icon: BookOpen,
      color: 'primary',
    },
    {
      label: 'Active Students',
      value: stats.activeStudents,
      change: stats.studentsChange,
      icon: Users,
      color: 'accent',
    },
    {
      label: 'Revenue (₹)',
      value: stats.revenueThisMonth.toLocaleString('en-IN'),
      change: stats.revenueChange,
      icon: DollarSign,
      color: 'primary',
    },
    {
      label: 'Engagement',
      value: `${stats.engagementRate}%`,
      change: stats.engagementChange,
      icon: TrendingUp,
      color: 'accent',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        const isPositive = card.change >= 0;

        return (
          <div
            key={card.label}
            className="bg-card rounded-2xl border border-border p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                card.color === 'primary' ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
              )}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                isPositive 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-red-500/10 text-red-600"
              )}>
                {isPositive ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {Math.abs(card.change)}%
              </div>
            </div>
            
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
