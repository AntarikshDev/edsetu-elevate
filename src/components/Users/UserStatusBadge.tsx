import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserStatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Active',
    variant: 'default' as const,
    className: 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20',
  },
  inactive: {
    label: 'Inactive',
    variant: 'secondary' as const,
    className: 'bg-muted text-muted-foreground',
  },
  pending: {
    label: 'Pending',
    variant: 'outline' as const,
    className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20',
  },
  suspended: {
    label: 'Suspended',
    variant: 'destructive' as const,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
