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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  LogOut,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Session {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ActiveSessionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActiveSessionsModal({ open, onOpenChange }: ActiveSessionsModalProps) {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'MacBook Pro',
      deviceType: 'desktop',
      browser: 'Chrome 120',
      location: 'Mumbai, India',
      ip: '192.168.1.xxx',
      lastActive: 'Current session',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'iPhone 14',
      deviceType: 'mobile',
      browser: 'Safari 17',
      location: 'Mumbai, India',
      ip: '192.168.1.xxx',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: '3',
      device: 'Windows PC',
      deviceType: 'desktop',
      browser: 'Firefox 121',
      location: 'Delhi, India',
      ip: '10.0.0.xxx',
      lastActive: '1 day ago',
      isCurrent: false,
    },
    {
      id: '4',
      device: 'iPad Pro',
      deviceType: 'tablet',
      browser: 'Safari 17',
      location: 'Bangalore, India',
      ip: '172.16.0.xxx',
      lastActive: '3 days ago',
      isCurrent: false,
    },
  ]);

  const [terminatingId, setTerminatingId] = useState<string | null>(null);
  const [showTerminateAll, setShowTerminateAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const handleTerminateSession = async (sessionId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast.success('Session terminated successfully');
    } catch (error) {
      toast.error('Failed to terminate session');
    } finally {
      setIsLoading(false);
      setTerminatingId(null);
    }
  };

  const handleTerminateAllSessions = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSessions(sessions.filter(s => s.isCurrent));
      toast.success('All other sessions terminated');
    } catch (error) {
      toast.error('Failed to terminate sessions');
    } finally {
      setIsLoading(false);
      setShowTerminateAll(false);
    }
  };

  const otherSessions = sessions.filter(s => !s.isCurrent);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Active Sessions
            </DialogTitle>
            <DialogDescription>
              Manage devices where you're currently logged in
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Current Session */}
            {sessions.filter(s => s.isCurrent).map(session => (
              <div key={session.id} className="p-4 border border-accent/20 bg-accent/5 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg text-accent">
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        <Badge variant="default" className="text-xs">Current</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.browser}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {session.ip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {otherSessions.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Other Sessions ({otherSessions.length})</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTerminateAll(true)}
                    className="text-destructive hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign out all
                  </Button>
                </div>

                <Separator />

                {otherSessions.map(session => (
                  <div key={session.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                          {getDeviceIcon(session.deviceType)}
                        </div>
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-muted-foreground">{session.browser}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTerminatingId(session.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {otherSessions.length === 0 && (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">No other active sessions</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terminate Single Session Dialog */}
      <AlertDialog open={!!terminatingId} onOpenChange={() => setTerminatingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminate Session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will sign out this device. The user will need to log in again to access their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => terminatingId && handleTerminateSession(terminatingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Terminating...' : 'Terminate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Terminate All Sessions Dialog */}
      <AlertDialog open={showTerminateAll} onOpenChange={setShowTerminateAll}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Sign Out All Other Sessions?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will sign out all devices except your current session. You'll remain logged in on this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTerminateAllSessions}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Signing out...' : 'Sign Out All'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
