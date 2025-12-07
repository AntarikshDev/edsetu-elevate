import { Button } from '@/components/ui/button';
import { X, UserCheck, UserX, Trash2 } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onDelete?: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onActivate,
  onDeactivate,
  onDelete,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-lg p-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <Button variant="ghost" size="icon" onClick={onClearSelection}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-2">
        {onActivate && (
          <Button variant="outline" size="sm" onClick={onActivate}>
            <UserCheck className="mr-2 h-4 w-4" />
            Activate
          </Button>
        )}
        {onDeactivate && (
          <Button variant="outline" size="sm" onClick={onDeactivate}>
            <UserX className="mr-2 h-4 w-4" />
            Deactivate
          </Button>
        )}
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
