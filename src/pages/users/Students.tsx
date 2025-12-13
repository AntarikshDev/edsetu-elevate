import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserTable } from '@/components/Users/UserTable';
import { UserFilters } from '@/components/Users/UserFilters';
import { PendingInvitations } from '@/components/Users/PendingInvitations';
import { BulkActionsBar } from '@/components/Users/BulkActionsBar';
import { ImportUsersModal } from '@/components/Users/ImportUsersModal';
import { ExportUsersModal } from '@/components/Users/ExportUsersModal';
import { RoleGuard, PermissionGuard } from '@/components/Auth/RoleGuard';
import { useUsers } from '@/hooks/useUsers';
import { UserFilters as UserFiltersType } from '@/types/user-management';
import { ManagedUser } from '@/types/api';
import { UserPlus, Download, Upload, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Students() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UserFiltersType>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const {
    users,
    isLoading,
    activateUser,
    deactivateUser,
    deleteUser,
  } = useUsers('student', filters);

  const handleViewUser = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}`);
  };

  const handleEditUser = (user: ManagedUser) => {
    navigate(`/app/users/${user.id}/edit`);
  };

  const handleBulkActivate = async () => {
    for (const id of selectedIds) {
      await activateUser(id);
    }
    setSelectedIds([]);
  };

  const handleBulkDeactivate = async () => {
    for (const id of selectedIds) {
      await deactivateUser(id);
    }
    setSelectedIds([]);
  };

  const handleExport = (recordCount: number) => {
    const dataToExport = users.slice(0, recordCount);
    const headers = ['Name', 'Email', 'Date of Join', 'Status'];
    const rows = dataToExport.map((user) => [
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

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin', 'instructor']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Students ({users.length})
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage students enrolled in courses.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
                Add Student
              </Button>
            </PermissionGuard>
          </div>
        </div>

        {/* Pending Invitations */}
        <PendingInvitations
          roleToAssign="student"
          title="Pending Student Invitations"
        />

        {/* Filters */}
        <UserFilters filters={filters} onFiltersChange={setFilters} />

        {/* User Table */}
        <UserTable
          users={users}
          isLoading={isLoading}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onActivateUser={activateUser}
          onDeactivateUser={deactivateUser}
          onDeleteUser={deleteUser}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />

        {/* Bulk Actions */}
        <BulkActionsBar
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          onActivate={handleBulkActivate}
          onDeactivate={handleBulkDeactivate}
        />

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
          totalRecords={users.length}
          onExport={handleExport}
        />
      </div>
    </RoleGuard>
  );
}
