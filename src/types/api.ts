// User & Auth Types
// Note: Backend uses camelCase (subAdmin), legacy code uses snake_case (sub_admin)
// Both formats are supported for backward compatibility
export type UserRole = 'superAdmin' | 'admin' | 'subAdmin' | 'sub_admin' | 'instructor' | 'student';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
  role: UserRole;
  brandName?: string;
  brandLogo?: string;
  createdAt: string;
  updatedAt?: string;
  onboardingCompleted: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  token?: string; // Legacy support
  message?: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface PermissionCheckResponse {
  allowed: boolean;
  role: UserRole;
}

// Profile Types
export interface UserProfile {
  id?: string;
  userId?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  avatarUrl?: string;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  studentId: string;
  courseId?: string;
  packageId?: string;
  startDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: string;
}

export interface EnrolledLearner {
  id: string;
  name: string;
  email: string;
  enrollmentId: string;
  enrolledAt: string;
  expiryDate?: string;
  status: string;
}

// Device Types
export interface LearnerDevice {
  id: string;
  deviceId: string;
  deviceName: string;
  lastLogin: string;
  location?: string;
  isActive: boolean;
}

// Onboarding Types
export interface OnboardingBrandData {
  brandName: string;
  brandLogo?: string;
  tagline?: string;
}

export interface ExpertiseField {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface OnboardingExpertiseData {
  fields: string[];
}

export interface OnboardingSocialsData {
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface OnboardingPreferencesData {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
  analyticsOptIn: boolean;
}

export interface OnboardingStatus {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  brand?: OnboardingBrandData;
  expertise?: OnboardingExpertiseData;
  socials?: OnboardingSocialsData;
  preferences?: OnboardingPreferencesData;
}

// Dashboard Types
export interface DashboardStats {
  totalCourses: number;
  activeStudents: number;
  revenueThisMonth: number;
  engagementRate: number;
  coursesChange: number;
  studentsChange: number;
  revenueChange: number;
  engagementChange: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href?: string;
}

export interface ActivityItem {
  id: string;
  type: 'enrollment' | 'upload' | 'purchase' | 'review' | 'comment';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

// Content Types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  currency: string;
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  courses: string[];
  price: number;
  currency: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Asset {
  id: string;
  name: string;
  type: 'video' | 'image' | 'document' | 'audio';
  url: string;
  size: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coursesCount: number;
}

export interface QuizReview {
  id: string;
  quizTitle: string;
  studentName: string;
  submittedAt: string;
  score: number;
  totalQuestions: number;
  status: 'pending' | 'reviewed';
}

export interface AssignmentReview {
  id: string;
  assignmentTitle: string;
  studentName: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'returned';
  grade?: string;
}

export interface LiveClass {
  id: string;
  title: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  attendees: number;
  maxAttendees: number;
}

// User Management Types
export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActive?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}