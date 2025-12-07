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
import { toast } from 'sonner';
import { Shield, Smartphone, Copy, Check, QrCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TwoFactorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function TwoFactorModal({ open, onOpenChange, isEnabled, onToggle }: TwoFactorModalProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'backup' | 'disable'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock secret key and backup codes
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const backupCodes = [
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1234-STUV',
    'WXYZ-5678-ABCD',
    'EFGH-9012-IJKL',
  ];

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Secret key copied to clipboard');
  };

  const handleVerify = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('backup');
    } catch (error) {
      toast.error('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    onToggle(true);
    toast.success('Two-factor authentication enabled');
    onOpenChange(false);
    resetModal();
  };

  const handleDisable = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onToggle(false);
      toast.success('Two-factor authentication disabled');
      onOpenChange(false);
      resetModal();
    } catch (error) {
      toast.error('Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setStep('setup');
    setVerificationCode('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetModal();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            {isEnabled
              ? 'Manage your two-factor authentication settings'
              : 'Add an extra layer of security to your account'}
          </DialogDescription>
        </DialogHeader>

        {isEnabled ? (
          <div className="py-4 space-y-4">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-full">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">2FA is Enabled</p>
                  <p className="text-sm text-muted-foreground">
                    Your account is protected with two-factor authentication
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => setStep('backup')}>
                <QrCode className="w-4 h-4 mr-2" />
                View Backup Codes
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => setStep('disable')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Disable Two-Factor Authentication
              </Button>
            </div>

            {step === 'disable' && (
              <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg space-y-3">
                <p className="text-sm font-medium text-destructive">
                  Are you sure you want to disable 2FA?
                </p>
                <p className="text-sm text-muted-foreground">
                  This will make your account less secure.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setStep('setup')}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisable}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Disabling...' : 'Disable 2FA'}
                  </Button>
                </div>
              </div>
            )}

            {step === 'backup' && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Backup Codes</p>
                <p className="text-sm text-muted-foreground">
                  Store these codes safely. Each can be used once if you lose access to your authenticator.
                </p>
                <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <span key={index}>{code}</span>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep('setup')}>
                  Close
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4">
            {step === 'setup' && (
              <div className="space-y-4">
                <Tabs defaultValue="app" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="app">Authenticator App</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                  </TabsList>

                  <TabsContent value="app" className="space-y-4 mt-4">
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-40 h-40 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scan this QR code with your authenticator app
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Or enter this key manually</Label>
                      <div className="flex gap-2">
                        <Input value={secretKey} readOnly className="font-mono" />
                        <Button variant="outline" size="icon" onClick={handleCopySecret}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => setStep('verify')}>
                      Continue
                    </Button>
                  </TabsContent>

                  <TabsContent value="sms" className="space-y-4 mt-4">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Smartphone className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Receive verification codes via SMS
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                    <Button className="w-full" onClick={() => setStep('verify')}>
                      Send Verification Code
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium">Enter Verification Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep('setup')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleVerify} disabled={isLoading} className="flex-1">
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>
            )}

            {step === 'backup' && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-medium">Save Your Backup Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Store these codes safely. Each can be used once if you lose access to your authenticator.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <span key={index}>{code}</span>
                  ))}
                </div>

                <Button className="w-full" onClick={handleComplete}>
                  I've Saved My Backup Codes
                </Button>
              </div>
            )}
          </div>
        )}

        {!isEnabled && step === 'setup' && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
