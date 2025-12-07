import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AlertTriangle, Trash2, UserX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';

interface DeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
  const { user, logout } = useAuth();
  const { isAdmin, isInstructor } = usePermissions();
  const [step, setStep] = useState<'warning' | 'confirm' | 'final'>('warning');
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [acknowledgements, setAcknowledgements] = useState({
    dataLoss: false,
    noRecovery: false,
    understand: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const allAcknowledged = Object.values(acknowledgements).every(Boolean);
  const confirmationText = 'DELETE MY ACCOUNT';
  const isConfirmTextValid = confirmText === confirmationText;

  const getWarnings = () => {
    const warnings = [
      'All your personal data and profile information',
      'All notification preferences and settings',
    ];

    if (isAdmin) {
      warnings.push(
        'All platform settings and configurations',
        'All user management data and logs',
        'All billing and payment history'
      );
    }

    if (isInstructor) {
      warnings.push(
        'All your courses will be unpublished',
        'All student enrollments will be removed',
        'All earnings and payment history'
      );
    }

    warnings.push('This action cannot be reversed');

    return warnings;
  };

  const handleProceed = () => {
    if (step === 'warning') {
      setStep('confirm');
    } else if (step === 'confirm' && allAcknowledged) {
      setStep('final');
    }
  };

  const handleDeleteAccount = async () => {
    if (!isConfirmTextValid || !password) {
      toast.error('Please complete all requirements');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Account deleted successfully');
      logout();
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep('warning');
    setConfirmText('');
    setPassword('');
    setAcknowledgements({
      dataLoss: false,
      noRecovery: false,
      understand: false,
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetModal();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <UserX className="w-5 h-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone
          </DialogDescription>
        </DialogHeader>

        {step === 'warning' && (
          <div className="py-4 space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-medium text-destructive">Warning: This cannot be undone</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Deleting your account will permanently remove all your data from our servers.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-3">The following will be deleted:</p>
              <ul className="space-y-2">
                {getWarnings().map((warning, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Trash2 className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> If you're experiencing issues with your account, 
                consider contacting support before deleting. We may be able to help.
              </p>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Please acknowledge the following to proceed:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="data-loss"
                  checked={acknowledgements.dataLoss}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, dataLoss: !!checked })
                  }
                />
                <Label htmlFor="data-loss" className="text-sm leading-relaxed cursor-pointer">
                  I understand that all my data, including personal information, 
                  {isInstructor && ' courses, earnings,'} and activity history will be permanently deleted.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="no-recovery"
                  checked={acknowledgements.noRecovery}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, noRecovery: !!checked })
                  }
                />
                <Label htmlFor="no-recovery" className="text-sm leading-relaxed cursor-pointer">
                  I understand that this action is irreversible and my account cannot be recovered 
                  after deletion.
                </Label>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="understand"
                  checked={acknowledgements.understand}
                  onCheckedChange={(checked) =>
                    setAcknowledgements({ ...acknowledgements, understand: !!checked })
                  }
                />
                <Label htmlFor="understand" className="text-sm leading-relaxed cursor-pointer">
                  I have read and understood all the warnings above and wish to proceed with 
                  account deletion.
                </Label>
              </div>
            </div>
          </div>
        )}

        {step === 'final' && (
          <div className="py-4 space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm font-medium text-destructive text-center">
                Final Step: Confirm Account Deletion
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-text">
                Type <span className="font-mono font-bold">{confirmationText}</span> to confirm
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type the confirmation text"
                className={
                  confirmText && !isConfirmTextValid
                    ? 'border-destructive'
                    : isConfirmTextValid
                    ? 'border-accent'
                    : ''
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Enter your password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your current password"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Account: <span className="font-medium">{user?.email}</span>
            </p>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {step === 'warning' && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleProceed} className="w-full sm:w-auto">
                I Understand, Continue
              </Button>
            </>
          )}

          {step === 'confirm' && (
            <>
              <Button variant="outline" onClick={() => setStep('warning')} className="w-full sm:w-auto">
                Go Back
              </Button>
              <Button
                variant="destructive"
                onClick={handleProceed}
                disabled={!allAcknowledged}
                className="w-full sm:w-auto"
              >
                Proceed to Delete
              </Button>
            </>
          )}

          {step === 'final' && (
            <>
              <Button variant="outline" onClick={() => setStep('confirm')} className="w-full sm:w-auto">
                Go Back
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={!isConfirmTextValid || !password || isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Deleting Account...' : 'Delete My Account Forever'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
