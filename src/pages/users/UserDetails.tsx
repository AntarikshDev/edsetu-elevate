import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserStatusBadge } from '@/components/Users/UserStatusBadge';
import { PermissionGuard } from '@/components/Auth/RoleGuard';
import { useUser } from '@/hooks/useUsers';
import { useUsers } from '@/hooks/useUsers';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Trash2,
  Edit,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUser(userId || '');

  const user = userData?.data;
  const userRole = user?.role || 'student';

  const { activateUser, deactivateUser, deleteUser, isUpdating, isDeleting } =
    useUsers(userRole as 'sub_admin' | 'instructor' | 'student');

  const handleActivate = async () => {
    if (userId) {
      await activateUser(userId);
    }
  };

  const handleDeactivate = async () => {
    if (userId) {
      await deactivateUser(userId);
    }
  };

  const handleDelete = async () => {
    if (userId) {
      await deleteUser(userId);
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const roleDisplayNames: Record<string, string> = {
    admin: 'Administrator',
    sub_admin: 'Sub Administrator',
    instructor: 'Instructor',
    student: 'Student',
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* User Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {roleDisplayNames[user.role] || user.role}
                    </Badge>
                    <UserStatusBadge status={user.status} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <PermissionGuard permission="users:manage">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </PermissionGuard>

                  <PermissionGuard permission="users:manage">
                    {user.status !== 'active' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleActivate}
                        disabled={isUpdating}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeactivate}
                        disabled={isUpdating}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
                      </Button>
                    )}
                  </PermissionGuard>

                  <PermissionGuard permission="users:delete">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </PermissionGuard>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {format(new Date(user.joinedAt), 'MMM d, yyyy')}</span>
                </div>
                {user.lastActive && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Active{' '}
                      {formatDistanceToNow(new Date(user.lastActive), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards - Role specific */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.role === 'instructor' && (
          <>
            <StatCard title="Courses Created" value="5" />
            <StatCard title="Total Students" value="127" />
            <StatCard title="Average Rating" value="4.8" />
          </>
        )}
        {user.role === 'student' && (
          <>
            <StatCard title="Courses Enrolled" value="3" />
            <StatCard title="Courses Completed" value="1" />
            <StatCard title="Completion Rate" value="67%" />
          </>
        )}
        {user.role === 'sub_admin' && (
          <>
            <StatCard title="Users Managed" value="45" />
            <StatCard title="Actions Today" value="12" />
            <StatCard title="Active Since" value="3 months" />
          </>
        )}
      </div>

      {/* Activity Timeline Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Activity timeline will be available when connected to the backend.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}
