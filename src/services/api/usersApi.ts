import { ManagedUser, ApiResponse, PaginatedResponse, UserRole } from '@/types/api';
import { simulateDelay, generateId, formatDate } from './mockApi';

// Mock users data
const mockSubAdmins: ManagedUser[] = [
  {
    id: '1',
    name: 'Vikram Singh',
    email: 'vikram@edsetu.com',
    phone: '+91 98765 43210',
    role: 'sub_admin',
    status: 'active',
    joinedAt: '2024-01-15T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '2',
    name: 'Neha Sharma',
    email: 'neha@edsetu.com',
    role: 'sub_admin',
    status: 'active',
    joinedAt: '2024-02-20T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

const mockInstructors: ManagedUser[] = [
  {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@instructor.com',
    phone: '+91 99887 76655',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-01-10T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '4',
    name: 'Priya Menon',
    email: 'priya@instructor.com',
    role: 'instructor',
    status: 'active',
    joinedAt: '2024-02-05T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '5',
    name: 'Arjun Verma',
    email: 'arjun@instructor.com',
    role: 'instructor',
    status: 'pending',
    joinedAt: '2024-03-01T00:00:00Z',
  },
];

const mockStudents: ManagedUser[] = [
  {
    id: '6',
    name: 'Rahul Sharma',
    email: 'rahul@student.com',
    role: 'student',
    status: 'active',
    joinedAt: '2024-02-15T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '7',
    name: 'Sneha Gupta',
    email: 'sneha@student.com',
    role: 'student',
    status: 'active',
    joinedAt: '2024-02-20T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: '8',
    name: 'Amit Patel',
    email: 'amit@student.com',
    role: 'student',
    status: 'active',
    joinedAt: '2024-03-01T00:00:00Z',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: '9',
    name: 'Kavya Nair',
    email: 'kavya@student.com',
    role: 'student',
    status: 'inactive',
    joinedAt: '2024-01-05T00:00:00Z',
    lastActive: '2024-02-01T00:00:00Z',
  },
  {
    id: '10',
    name: 'Rohan Desai',
    email: 'rohan@student.com',
    role: 'student',
    status: 'pending',
    joinedAt: '2024-03-10T00:00:00Z',
  },
];

/**
 * GET /api/users/sub-admins
 * Get list of sub-admins
 */
export const getSubAdmins = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<PaginatedResponse<ManagedUser>>> => {
  await simulateDelay();
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = mockSubAdmins.slice(start, end);

  return {
    success: true,
    data: {
      data: paginatedData,
      total: mockSubAdmins.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockSubAdmins.length / pageSize),
    },
  };
};

/**
 * GET /api/users/instructors
 * Get list of instructors
 */
export const getInstructors = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<PaginatedResponse<ManagedUser>>> => {
  await simulateDelay();
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = mockInstructors.slice(start, end);

  return {
    success: true,
    data: {
      data: paginatedData,
      total: mockInstructors.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockInstructors.length / pageSize),
    },
  };
};

/**
 * GET /api/users/students
 * Get list of students
 */
export const getStudents = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<PaginatedResponse<ManagedUser>>> => {
  await simulateDelay();
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = mockStudents.slice(start, end);

  return {
    success: true,
    data: {
      data: paginatedData,
      total: mockStudents.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockStudents.length / pageSize),
    },
  };
};

/**
 * GET /api/users/:id
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<ApiResponse<ManagedUser>> => {
  await simulateDelay();
  
  const allUsers = [...mockSubAdmins, ...mockInstructors, ...mockStudents];
  const user = allUsers.find(u => u.id === userId);

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  return { success: true, data: user };
};

/**
 * POST /api/users
 * Create new user
 */
export const createUser = async (
  userData: {
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
  }
): Promise<ApiResponse<ManagedUser>> => {
  await simulateDelay();

  const newUser: ManagedUser = {
    id: generateId(),
    ...userData,
    status: 'pending',
    joinedAt: formatDate(),
  };

  // Add to appropriate list
  switch (userData.role) {
    case 'subAdmin':
    case 'sub_admin':
      break;
    case 'instructor':
      mockInstructors.push(newUser);
      break;
    case 'student':
      mockStudents.push(newUser);
      break;
  }

  return { success: true, data: newUser, message: 'User created successfully' };
};

/**
 * PUT /api/users/:id
 * Update user
 */
export const updateUser = async (
  userId: string,
  updates: Partial<ManagedUser>
): Promise<ApiResponse<ManagedUser>> => {
  await simulateDelay();

  const allUsers = [...mockSubAdmins, ...mockInstructors, ...mockStudents];
  const userIndex = allUsers.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }

  const updatedUser = { ...allUsers[userIndex], ...updates };
  return { success: true, data: updatedUser, message: 'User updated successfully' };
};

/**
 * DELETE /api/users/:id
 * Delete user
 */
export const deleteUser = async (userId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
  await simulateDelay();

  // Find and remove from appropriate array
  let found = false;
  
  const subAdminIndex = mockSubAdmins.findIndex(u => u.id === userId);
  if (subAdminIndex !== -1) {
    mockSubAdmins.splice(subAdminIndex, 1);
    found = true;
  }

  const instructorIndex = mockInstructors.findIndex(u => u.id === userId);
  if (instructorIndex !== -1) {
    mockInstructors.splice(instructorIndex, 1);
    found = true;
  }

  const studentIndex = mockStudents.findIndex(u => u.id === userId);
  if (studentIndex !== -1) {
    mockStudents.splice(studentIndex, 1);
    found = true;
  }

  if (!found) {
    return { success: false, error: 'User not found' };
  }

  return { success: true, data: { deleted: true }, message: 'User deleted successfully' };
};

/**
 * POST /api/users/:id/activate
 * Activate user
 */
export const activateUser = async (userId: string): Promise<ApiResponse<ManagedUser>> => {
  return updateUser(userId, { status: 'active' });
};

/**
 * POST /api/users/:id/deactivate
 * Deactivate user
 */
export const deactivateUser = async (userId: string): Promise<ApiResponse<ManagedUser>> => {
  return updateUser(userId, { status: 'inactive' });
};
