// Extended Student Types

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  role: 'student';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  bio?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  createdBy?: string;
  joinedAt: string;
  lastActive?: string;
}

export interface EnrolledCourse {
  courseId: string;
  courseTitle: string;
  type: 'Free' | 'Paid';
  status: 'Active' | 'Expired' | 'Pending';
  expiresAt?: string;
}

export interface EnrolledPackage {
  packageId: string;
  packageTitle: string;
  courses: number;
  status: 'Active' | 'Expired';
  expiresAt?: string;
}

export interface ActiveDevice {
  deviceId: string;
  deviceName: string;
  lastLogin: string;
  location: string;
}

export interface StudentDetails extends StudentProfile {
  enrolledCourses: EnrolledCourse[];
  enrolledPackages: EnrolledPackage[];
  activeDevices: ActiveDevice[];
}

export interface StudentFilters {
  search?: string;
  filterType?: 'name' | 'email' | 'mobile';
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'inactive' | 'pending';
}
