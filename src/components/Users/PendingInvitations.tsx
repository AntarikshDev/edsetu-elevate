import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInvitations, useInvitationManagement } from '@/hooks/useInvitations';
import { RoleType, Invitation } from '@/types/user-management';
import { MoreHorizontal, Mail, Clock, XCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PendingInvitationsProps {
  roleToAssign?: RoleType;
  title?: string;
}

export function PendingInvitations({
  roleToAssign,
  title = 'Pending Invitations',
}: PendingInvitationsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data: invitationsData, isLoading } = useInvitations({
    status: 'pending',
    roleToAssign,
  });
  const { revokeInvitation, resendInvitation, isRevoking, isResending } =
    useInvitationManagement();

  const invitations = invitationsData?.data?.data || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (invitations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="secondary" className="rounded-full">
              {invitations.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-3">
            {invitations.map((invitation) => (
              <InvitationRow
                key={invitation.id}
                invitation={invitation}
                onRevoke={() => revokeInvitation(invitation.id)}
                onResend={() => resendInvitation(invitation.id)}
                isRevoking={isRevoking}
                isResending={isResending}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

interface InvitationRowProps {
  invitation: Invitation;
  onRevoke: () => void;
  onResend: () => void;
  isRevoking: boolean;
  isResending: boolean;
}

function InvitationRow({
  invitation,
  onRevoke,
  onResend,
  isRevoking,
  isResending,
}: InvitationRowProps) {
  const expiresIn = formatDistanceToNow(new Date(invitation.expiresAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 group">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{invitation.name || invitation.email}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{invitation.email}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Expires {expiresIn}
            </span>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={isRevoking || isResending}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onResend} disabled={isResending}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Resend Invitation
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRevoke}
            disabled={isRevoking}
            className="text-destructive focus:text-destructive"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Revoke Invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
