import { Link } from 'react-router-dom';
import { QuickAction } from '@/types/api';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Upload, 
  DollarSign, 
  UserPlus, 
  Video, 
  Bot,
  ArrowRight 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Upload, DollarSign, UserPlus, Video, Bot
};

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const IconComponent = iconMap[action.icon] || BookOpen;
          
          return (
            <Link
              key={action.id}
              to={action.href}
              className={cn(
                "group relative flex flex-col p-5 rounded-2xl border border-border bg-card transition-all",
                "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                action.color === 'primary' && "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                action.color === 'accent' && "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
                action.color === 'secondary' && "bg-secondary text-secondary-foreground group-hover:bg-secondary/80"
              )}>
                <IconComponent className="w-6 h-6" />
              </div>
              
              <h3 className="font-medium text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{action.description}</p>
              
              <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
