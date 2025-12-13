export interface EnrollmentPermissions {
  viewContent: boolean;
  attemptQuizzes: boolean;
  downloadNotes: boolean;
  accessLiveClasses: boolean;
  certificateAccess: boolean;
}

export interface EnrolledCourseWithPermissions {
  courseId: string;
  courseTitle: string;
  type: 'Free' | 'Paid';
  status: 'Active' | 'Expired' | 'Pending';
  enrolledAt?: string;
  expiresAt: string;
  permissions: EnrollmentPermissions;
}

export interface EnrolledPackageWithPermissions {
  packageId: string;
  packageName: string;
  coursesIncluded: number;
  status: 'Active' | 'Expired';
  enrolledAt?: string;
  expiresAt: string;
  permissions: EnrollmentPermissions;
}

export const defaultEnrollmentPermissions: EnrollmentPermissions = {
  viewContent: true,
  attemptQuizzes: true,
  downloadNotes: true,
  accessLiveClasses: true,
  certificateAccess: true,
};
