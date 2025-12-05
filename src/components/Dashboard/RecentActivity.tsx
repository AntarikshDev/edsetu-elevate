import { ActivityItem } from '@/types/api';
import { cn } from '@/lib/utils';
import { 
  UserPlus, 
  Upload, 
  CreditCard, 
  Star, 
  MessageCircle,
  Clock 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const iconMap: Record<ActivityItem['type'], React.ComponentType<{ className?: string }>> = {
  enrollment: UserPlus,
  upload: Upload,
  purchase: CreditCard,
  review: Star,
  comment: MessageCircle,
};

const colorMap: Record<ActivityItem['type'], string> = {
  enrollment: 'bg-blue-500/10 text-blue-500',
  upload: 'bg-primary/10 text-primary',
  purchase: 'bg-green-500/10 text-green-500',
  review: 'bg-yellow-500/10 text-yellow-500',
  comment: 'bg-accent/10 text-accent',
};

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-heading font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity yet</p>
          <p className="text-sm">Activity will appear here once you start getting enrollments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h2 className="text-lg font-heading font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = iconMap[activity.type];
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 group"
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                colorMap[activity.type]
              )}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {activity.description}
                </p>
              </div>
              
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
