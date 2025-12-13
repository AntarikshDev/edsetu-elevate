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
import { ImportUsersModal } from '@/components/Users/ImportUsersModal';
import { ExportUsersModal } from '@/components/Users/ExportUsersModal';
import { useUsers } from '@/hooks/useUsers';
import { StudentFilters } from '@/types/student';
import { ManagedUser } from '@/types/api';
import { UserPlus, Download, Upload, Eye, UserX, Trash2, MoreHorizontal, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Students() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<StudentFilters>({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToRemove, setUserToRemove] = useState<ManagedUser | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const {
    users,
    isLoading,
    deleteUser,
  } = useUsers('student', {});

  const handleViewStudent = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}`);
  };

  const handleEditStudent = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}/edit`);
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

  const handleExport = (recordCount: number) => {
    const dataToExport = filteredUsers.slice(0, recordCount);
    const headers = ['S.No', 'Name', 'Email', 'Date of Join', 'Status'];
    const rows = dataToExport.map((user, index) => [
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

    toast.success(`${recordCount} records exported successfully`);
  };

  // Filter users based on filters
  const filteredUsers = users.filter(user => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = user.name.toLowerCase().includes(searchLower);
      const matchesEmail = user.email.toLowerCase().includes(searchLower);
      const matchesPhone = user.phone?.includes(filters.search);
      if (!matchesName && !matchesEmail && !matchesPhone) return false;
    }
    
    // Apply deactivated filter
    if (filters.deactivated) {
      if (filters.deactivated === 'yes' && user.status !== 'inactive') return false;
      if (filters.deactivated === 'no' && user.status === 'inactive') return false;
    }

    return true;
  });

  const totalRecords = filteredUsers.length;
  const startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin', 'instructor']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Students ({totalRecords})</h1>
        </div>

        {/* Filters & Actions Row */}
        <div className="flex items-start justify-between gap-4">
          <StudentFiltersAdvanced filters={filters} onFiltersChange={setFilters} />
          
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" onClick={() => setShowExportModal(true)}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => setShowImportModal(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <PermissionGuard permission="users:create">
              <Button onClick={() => navigate('/app/users/students/add')}>
                <UserPlus className="mr-2 h-4 w-4" />
                New
              </Button>
            </PermissionGuard>
          </div>
        </div>

        {/* Entries & Pagination Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="w-20 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-lg z-50">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Showing {startRecord} to {endRecord} of {totalRecords} records
          </span>
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
                            onClick={() => handleEditStudent(user)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
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

        {/* Import Modal */}
        <ImportUsersModal
          open={showImportModal}
          onOpenChange={setShowImportModal}
          userType="student"
        />

        {/* Export Modal */}
        <ExportUsersModal
          open={showExportModal}
          onOpenChange={setShowExportModal}
          userType="student"
          totalRecords={totalRecords}
          onExport={handleExport}
        />

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
