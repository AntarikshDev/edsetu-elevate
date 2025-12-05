// User & Auth Types
export type UserRole = 'admin' | 'sub_admin' | 'instructor' | 'student';

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
  onboardingCompleted: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
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
