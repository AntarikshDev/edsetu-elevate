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
  emailVerified?: boolean;
  mobileVerified?: boolean;
  deviceId?: string;
  referCode?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  collegeName?: string;
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

export type DateFilterCondition = 'after' | 'before' | 'between' | 'on' | 'never';
export type CourseFilterCondition = 'any' | 'specific';
export type BooleanFilterCondition = 'yes' | 'no';

export interface DateFilter {
  condition: DateFilterCondition;
  startDate?: Date;
  endDate?: Date;
}

export interface CourseFilter {
  condition: CourseFilterCondition;
  courseId?: string;
  courseName?: string;
}

export interface StudentFilters {
  search?: string;
  filterType?: 'name' | 'email' | 'mobile';
  signedUp?: DateFilter;
  lastLogIn?: DateFilter;
  enrolledIn?: CourseFilter;
  notEnrolledIn?: CourseFilter;
  verifiedEmail?: BooleanFilterCondition;
  verifiedMobile?: BooleanFilterCondition;
  deactivated?: BooleanFilterCondition;
  deviceId?: string;
  referCode?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
}

export type FilterType = 
  | 'signedUp' 
  | 'lastLogIn' 
  | 'enrolledIn' 
  | 'notEnrolledIn' 
  | 'verifiedEmail' 
  | 'verifiedMobile' 
  | 'deactivated' 
  | 'deviceId' 
  | 'referCode' 
  | 'source' 
  | 'utmSource' 
  | 'utmMedium';

export interface ImportField {
  key: string;
  label: string;
  required?: boolean;
}

export interface ImportProgress {
  total: number;
  processed: number;
  successful: number;
  failed: number;
  errors: Array<{ row: number; message: string }>;
}
