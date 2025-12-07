import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { RoleGuard, PermissionGuard } from '@/components/Auth/RoleGuard';
import { StudentFiltersAdvanced } from '@/components/Users/StudentFiltersAdvanced';
import { useUsers } from '@/hooks/useUsers';
import { StudentFilters } from '@/types/student';
import { ManagedUser } from '@/types/api';
import { UserPlus, Download, Eye, UserX, Trash2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Students() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<StudentFilters>({});
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToRemove, setUserToRemove] = useState<ManagedUser | null>(null);

  const {
    users,
    isLoading,
    deleteUser,
  } = useUsers('student', {});

  const handleViewStudent = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}`);
  };

  const handleRemoveUser = async () => {
    if (userToRemove) {
      await deleteUser(userToRemove.id);
      setUserToRemove(null);
      toast.success('Student removed successfully');
    }
  };

  const handleDeactivateUser = (user: ManagedUser) => {
    toast.success(`${user.name} has been ${user.status === 'active' ? 'deactivated' : 'activated'}`);
  };

  const handleExportCSV = () => {
    const headers = ['S.No', 'Name', 'Email', 'Date of Join', 'Status'];
    const rows = users.map((user, index) => [
      index + 1,
      user.name,
      user.email,
      format(new Date(user.joinedAt), 'yyyy-MM-dd'),
      user.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `students_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast.success('CSV exported successfully');
  };

  const totalRecords = users.length;
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  // Filter users based on filters
  const filteredUsers = users.filter(user => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (filters.filterType === 'email') {
        return user.email.toLowerCase().includes(searchLower);
      } else if (filters.filterType === 'mobile') {
        return user.phone?.includes(filters.search);
      } else {
        return user.name.toLowerCase().includes(searchLower);
      }
    }
    
    if (filters.startDate || filters.endDate) {
      const joinDate = new Date(user.joinedAt);
      if (filters.startDate && joinDate < filters.startDate) return false;
      if (filters.endDate && joinDate > filters.endDate) return false;
    }

    return true;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin', 'instructor']}>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <StudentFiltersAdvanced filters={filters} onFiltersChange={setFilters} />
          <PermissionGuard permission="users:create">
            <Button onClick={() => navigate('/app/users/students/add')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Learner
            </Button>
          </PermissionGuard>
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">All Students</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show:</span>
                <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-sm text-muted-foreground">
                Showing {startRecord} to {endRecord} of {filteredUsers.length} records
              </span>
            </div>
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date of Join</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{format(new Date(user.joinedAt), 'yyyy-MM-dd')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : user.status === 'inactive' ? 'destructive' : 'secondary'}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 bg-popover border shadow-lg z-50">
                          <DropdownMenuItem 
                            onClick={() => handleViewStudent(user)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeactivateUser(user)}
                            className="cursor-pointer"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setUserToRemove(user)}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Remove Confirmation Dialog */}
        <AlertDialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Student</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {userToRemove?.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveUser} className="bg-destructive text-destructive-foreground">
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RoleGuard>
  );
}
