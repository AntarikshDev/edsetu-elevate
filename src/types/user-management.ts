// User Management Types - Separate file for microservice architecture

export type RoleType = 'admin' | 'sub_admin' | 'instructor' | 'student';

// Role stored in separate table (CRITICAL for security)
export interface Role {
  id: string;
  name: RoleType;
  displayName: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  role: Role;
  assignedAt: string;
  assignedBy: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}

// Invitation system
export interface Invitation {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  roleToAssign: RoleType;
  invitedBy: string;
  invitedByName: string;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  createdAt: string;
  expiresAt: string;
  acceptedAt?: string;
  message?: string;
}

// Extended user with role separation
export interface ManagedUserV2 {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joinedAt: string;
  lastActive?: string;
  roles: UserRole[];
  profile?: UserProfile;
  stats?: UserStats;
}

export interface UserProfile {
  bio?: string;
  expertise?: string[];
  socialLinks?: Record<string, string>;
  timezone?: string;
  language?: string;
  organization?: string;
  designation?: string;
}

export interface UserStats {
  // Instructor stats
  coursesCreated?: number;
  totalStudents?: number;
  totalEarnings?: number;
  averageRating?: number;
  // Student stats
  coursesEnrolled?: number;
  coursesCompleted?: number;
  totalSpent?: number;
  completionRate?: number;
  // Sub-admin stats
  usersManaged?: number;
  actionsPerformed?: number;
}

// Filter options
export interface UserFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'pending' | 'suspended' | 'all';
  role?: RoleType;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'name' | 'email' | 'joinedAt' | 'lastActive';
  sortOrder?: 'asc' | 'desc';
}

// Bulk action types
export interface BulkAction {
  action: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'resend_invite';
  userIds: string[];
}

// Activity log
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
  performedBy: string;
  performedAt: string;
  ipAddress?: string;
}
