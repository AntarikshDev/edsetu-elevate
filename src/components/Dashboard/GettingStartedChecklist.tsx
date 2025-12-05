import { Link } from 'react-router-dom';
import { ChecklistItem } from '@/types/api';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Circle, ArrowRight } from 'lucide-react';

interface GettingStartedChecklistProps {
  items: ChecklistItem[];
  progress: number;
  onComplete?: (itemId: string) => void;
}

export function GettingStartedChecklist({ items, progress, onComplete }: GettingStartedChecklistProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold">Getting Started</h2>
          <p className="text-sm text-muted-foreground">Complete these steps to set up your academy</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">{progress}%</span>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-6" />

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-4 p-4 rounded-xl transition-all",
              item.completed 
                ? "bg-muted/50" 
                : "bg-background hover:bg-muted/30 border border-border"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
              item.completed 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {item.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium",
                item.completed && "text-muted-foreground line-through"
              )}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </div>

            {!item.completed && item.href && (
              <Button asChild size="sm" variant="ghost" className="flex-shrink-0">
                <Link to={item.href}>
                  Start
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
