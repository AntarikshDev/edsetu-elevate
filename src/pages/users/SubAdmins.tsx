import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RoleGuard } from '@/components/Auth/RoleGuard';
import { useUsers } from '@/hooks/useUsers';
import { ManagedUser } from '@/types/api';
import { UserPlus, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
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
import { useToast } from '@/hooks/use-toast';

export default function SubAdmins() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const {
    users,
    isLoading,
    deleteUser,
  } = useUsers('sub_admin', {});

  const handleViewUser = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}`);
  };

  const handleRemoveUser = async () => {
    if (!deleteUserId) return;
    
    try {
      await deleteUser(deleteUserId);
      toast({
        title: 'Sub-Admin Removed',
        description: 'The sub-admin has been removed successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove sub-admin. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteUserId(null);
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl font-heading font-medium">Add Sub-Admin</h1>
          <Button onClick={() => navigate('/app/users/sub-admins/add')}>
            <UserPlus className="mr-2 h-4 w-4" />
            + Add Sub-Admin
          </Button>
        </div>

        {/* Sub-Admins Table */}
        <Card>
          <CardHeader>
            <CardTitle>All SubAdmins</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date of Join</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No sub-admins found. Click "+ Add Sub-Admin" to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                          {user.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.joinedAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                          className={user.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {user.status === 'active' ? 'Active' : user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-primary hover:underline text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setDeleteUserId(user.id)}
                            className="text-destructive hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Sub-Admin</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this sub-admin? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleRemoveUser}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  );
}
