import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EnrollmentPermissions, defaultEnrollmentPermissions } from '@/types/enrollment';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EditEnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'course' | 'package';
  enrollmentId: string;
  enrollmentTitle: string;
  currentExpiryDate: string;
  currentPermissions?: EnrollmentPermissions;
}

export function EditEnrollmentModal({
  open,
  onOpenChange,
  type,
  enrollmentId,
  enrollmentTitle,
  currentExpiryDate,
  currentPermissions = defaultEnrollmentPermissions,
}: EditEnrollmentModalProps) {
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    currentExpiryDate ? new Date(currentExpiryDate) : undefined
  );
  const [permissions, setPermissions] = useState<EnrollmentPermissions>(currentPermissions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePermissionChange = (key: keyof EnrollmentPermissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${type === 'course' ? 'Course' : 'Package'} enrollment updated successfully`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update enrollment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const permissionLabels: Record<keyof EnrollmentPermissions, string> = {
    viewContent: 'View Content',
    attemptQuizzes: 'Attempt Quizzes/Tests',
    downloadNotes: 'Download Notes/Material',
    accessLiveClasses: 'Access Live Classes',
    certificateAccess: 'Certificate Access',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit {type === 'course' ? 'Course' : 'Package'} Enrollment</DialogTitle>
          <DialogDescription>
            Update expiry date and permissions for: <strong>{enrollmentTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Expiry Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !expiryDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, 'PPP') : 'Select expiry date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Permissions</Label>
            <div className="space-y-3">
              {(Object.keys(permissions) as Array<keyof EnrollmentPermissions>).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                    {permissionLabels[key]}
                  </Label>
                  <Switch
                    id={key}
                    checked={permissions[key]}
                    onCheckedChange={() => handlePermissionChange(key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
