import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { UserStatusBadge } from './UserStatusBadge';
import { ManagedUser } from '@/types/api';
import { 
  MoreHorizontal, 
  Eye, 
  UserCheck, 
  UserX, 
  Trash2, 
  Pencil, 
  Mail, 
  Key,
  Clock,
  Globe,
  Shield,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { getCountryByCode } from '@/data/internationalData';
import { useLocale } from '@/hooks/useLocale';

// Extended user type with optional international fields
interface ExtendedManagedUser extends ManagedUser {
  countryCode?: string;
  timezone?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

interface UserTableProps {
  users: ExtendedManagedUser[];
  isLoading?: boolean;
  onViewUser?: (user: ExtendedManagedUser) => void;
  onEditUser?: (user: ExtendedManagedUser) => void;
  onActivateUser?: (userId: string) => void;
  onDeactivateUser?: (userId: string) => void;
  onDeleteUser?: (userId: string) => void;
  onResetPassword?: (userId: string) => void;
  onSendEmail?: (user: ExtendedManagedUser) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  showCountry?: boolean;
  showTimezone?: boolean;
}

export function UserTable({
  users,
  isLoading,
  onViewUser,
  onEditUser,
  onActivateUser,
  onDeactivateUser,
  onDeleteUser,
  onResetPassword,
  onSendEmail,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  showCountry = true,
  showTimezone = false,
}: UserTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ExtendedManagedUser | null>(null);
  const { formatDateTime, formatRelativeTime } = useLocale();

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? users.map((u) => u.id) : []);
    }
  };

  const handleSelectOne = (userId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedIds, userId]);
      } else {
        onSelectionChange(selectedIds.filter((id) => id !== userId));
      }
    }
  };

  const handleDeleteClick = (user: ExtendedManagedUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete && onDeleteUser) {
      onDeleteUser(userToDelete.id);
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Timezone-aware last active formatting
  const formatLastActive = (lastActive?: string, userTimezone?: string) => {
    if (!lastActive) return { relative: 'Never', absolute: '' };
    
    const date = new Date(lastActive);
    const relative = formatDistanceToNow(date, { addSuffix: true });
    const absolute = formatDateTime(date);
    
    return { relative, absolute };
  };

  // Get country info with flag
  const getCountryInfo = (countryCode?: string) => {
    if (!countryCode) return null;
    return getCountryByCode(countryCode);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {selectable && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === users.length && users.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                {showCountry && (
                  <TableHead className="hidden lg:table-cell">Country</TableHead>
                )}
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                <TableHead className="w-20 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const countryInfo = getCountryInfo(user.countryCode);
                const lastActiveInfo = formatLastActive(user.lastActive, user.timezone);
                
                return (
                  <TableRow key={user.id} className="group">
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(user.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOne(user.id, checked as boolean)
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {/* Country flag overlay */}
                          {countryInfo && (
                            <span className="absolute -bottom-1 -right-1 text-sm" title={countryInfo.name}>
                              {countryInfo.flag}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{user.name}</p>
                            {/* Verification badges */}
                            {user.emailVerified && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="h-5 px-1.5 text-xs bg-accent/10 border-accent/30">
                                    <Mail className="h-3 w-3 text-accent" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>Email verified</TooltipContent>
                              </Tooltip>
                            )}
                            {user.phoneVerified && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="h-5 px-1.5 text-xs bg-chart-2/10 border-chart-2/30">
                                    <Shield className="h-3 w-3 text-chart-2" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>Phone verified</TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge status={user.status} />
                    </TableCell>
                    {showCountry && (
                      <TableCell className="hidden lg:table-cell">
                        {countryInfo ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{countryInfo.flag}</span>
                            <span className="text-sm text-muted-foreground">{countryInfo.name}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    )}
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {format(new Date(user.joinedAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Tooltip>
                        <TooltipTrigger className="cursor-default">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{lastActiveInfo.relative}</span>
                          </div>
                        </TooltipTrigger>
                        {lastActiveInfo.absolute && (
                          <TooltipContent>
                            <div className="text-xs">
                              <p>{lastActiveInfo.absolute}</p>
                              {user.timezone && (
                                <p className="text-muted-foreground mt-1 flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {user.timezone}
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {/* Quick action buttons on hover */}
                        <div className="hidden group-hover:flex items-center gap-1">
                          {onViewUser && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onViewUser(user)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View</TooltipContent>
                            </Tooltip>
                          )}
                          {onEditUser && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onEditUser(user)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        
                        {/* More menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover border shadow-lg z-50">
                            {onViewUser && (
                              <DropdownMenuItem onClick={() => onViewUser(user)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            )}
                            {onEditUser && (
                              <DropdownMenuItem onClick={() => onEditUser(user)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {onSendEmail && (
                              <DropdownMenuItem onClick={() => onSendEmail(user)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                            )}
                            {onResetPassword && (
                              <DropdownMenuItem onClick={() => onResetPassword(user.id)}>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {user.status !== 'active' && onActivateUser && (
                              <DropdownMenuItem onClick={() => onActivateUser(user.id)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            {user.status === 'active' && onDeactivateUser && (
                              <DropdownMenuItem onClick={() => onDeactivateUser(user.id)}>
                                <UserX className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            {onDeleteUser && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteClick(user)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{' '}
                <span className="font-medium">{userToDelete?.name}</span>? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </TooltipProvider>
  );
}
