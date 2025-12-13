import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserTable } from '@/components/Users/UserTable';
import { UserFilters } from '@/components/Users/UserFilters';
import { PendingInvitations } from '@/components/Users/PendingInvitations';
import { BulkActionsBar } from '@/components/Users/BulkActionsBar';
import { RoleGuard } from '@/components/Auth/RoleGuard';
import { useUsers } from '@/hooks/useUsers';
import { UserFilters as UserFiltersType } from '@/types/user-management';
import { ManagedUser } from '@/types/api';
import { UserPlus, ShieldCheck } from 'lucide-react';

export default function SubAdmins() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UserFiltersType>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    users,
    isLoading,
    activateUser,
    deactivateUser,
    deleteUser,
  } = useUsers('sub_admin', filters);

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

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Sub-Admins
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage sub-administrators with limited administrative access.
            </p>
          </div>
          <Button onClick={() => navigate('/app/users/sub-admins/add')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Sub-Admin
          </Button>
        </div>

        {/* Pending Invitations */}
        <PendingInvitations
          roleToAssign="sub_admin"
          title="Pending Sub-Admin Invitations"
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
      </div>
    </RoleGuard>
  );
}
