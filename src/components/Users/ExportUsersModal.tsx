import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ExportUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'student' | 'instructor' | 'sub_admin';
  totalRecords: number;
  onExport: (recordCount: number) => void;
}

export function ExportUsersModal({
  open,
  onOpenChange,
  userType,
  totalRecords,
  onExport,
}: ExportUsersModalProps) {
  const [exportOption, setExportOption] = useState<'all' | 'custom'>('all');
  const [customCount, setCustomCount] = useState('100');

  const handleExport = () => {
    const count = exportOption === 'all' ? totalRecords : parseInt(customCount, 10);
    
    if (exportOption === 'custom' && (isNaN(count) || count <= 0)) {
      toast.error('Please enter a valid number of records');
      return;
    }

    if (count > totalRecords) {
      toast.error(`Cannot export more than ${totalRecords} records`);
      return;
    }

    onExport(count);
    onOpenChange(false);
    toast.success(`Exporting ${count} records...`);
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'student': return 'Students';
      case 'instructor': return 'Instructors';
      case 'sub_admin': return 'Sub-Admins';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export {getUserTypeLabel()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Total records available: <strong>{totalRecords}</strong>
          </p>

          <div className="space-y-3">
            <Label>How many records would you like to export?</Label>
            <Select value={exportOption} onValueChange={(v) => setExportOption(v as 'all' | 'custom')}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-lg z-50">
                <SelectItem value="all">All records ({totalRecords})</SelectItem>
                <SelectItem value="custom">Custom number</SelectItem>
              </SelectContent>
            </Select>

            {exportOption === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customCount">Number of records</Label>
                <Input
                  id="customCount"
                  type="number"
                  min="1"
                  max={totalRecords}
                  value={customCount}
                  onChange={(e) => setCustomCount(e.target.value)}
                  placeholder="Enter number of records"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum: {totalRecords} records
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
