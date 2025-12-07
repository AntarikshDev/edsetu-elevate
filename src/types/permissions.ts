// LMS Permission Types for Role-Based Access Control

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: PermissionItem[];
}

export interface PermissionItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Sub-Admin Permissions Structure based on LMS industry standards
export const subAdminPermissionCategories: PermissionCategory[] = [
  {
    id: 'users_learners',
    name: 'Users Learners',
    description: 'Manage student/learner access and data',
    permissions: [
      { id: 'view_learners_info', name: 'Viewing Access To Learners Information', description: 'View student profiles and details', enabled: false },
      { id: 'edit_learners_info', name: 'Edit Access To Learners Information, Change Password, Reset Login Devices', description: 'Modify student data and credentials', enabled: false },
      { id: 'access_learners_progress', name: 'Access To Learners Course Progress, Change Expiry Date, Edit Learner Info', description: 'View and modify student progress', enabled: false },
      { id: 'enroll_learners', name: 'Access To Enroll Learners In Any Course', description: 'Enroll students in courses', enabled: false },
    ],
  },
  {
    id: 'users',
    name: 'Users',
    description: 'Manage other user types',
    permissions: [
      { id: 'view_instructors', name: 'Can View Instructors', description: 'View instructor list and profiles', enabled: false },
      { id: 'view_affiliates', name: 'Can View Affiliates', description: 'View affiliate partners', enabled: false },
      { id: 'view_enquiries', name: 'Can View Enquiries', description: 'View and manage user enquiries', enabled: false },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Website and app customization',
    permissions: [
      { id: 'change_ui', name: 'Can Change Website And App UI', description: 'Modify website appearance', enabled: false },
      { id: 'edit_languages', name: 'Access To Edit Languages And Custom Texts, Change Website App UI', description: 'Edit translations and UI text', enabled: false },
    ],
  },
  {
    id: 'discussions',
    name: 'Discussions',
    description: 'Forum and discussion management',
    permissions: [
      { id: 'manage_forum_posts', name: 'Can Manage Public Forum Posts', description: 'Moderate public discussions', enabled: false },
      { id: 'manage_all_discussions', name: 'Can Manage All Course Wise Discussions', description: 'Manage all course discussions', enabled: false },
      { id: 'manage_specific_discussions', name: 'Can Manage Specific Course Discussions', description: 'Manage assigned course discussions', enabled: false },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'Analytics and reporting access',
    permissions: [
      { id: 'view_bandwidth_reports', name: 'Can View Bandwidth Reports', description: 'Access bandwidth usage data', enabled: false },
      { id: 'view_usage_reports', name: 'Can View Usage Reports', description: 'Access platform usage analytics', enabled: false },
      { id: 'view_live_tests_reports', name: 'Can View Live Tests Reports', description: 'Access test performance data', enabled: false },
      { id: 'view_live_class_reports', name: 'Can View Live Class Reports', description: 'Access live class analytics', enabled: false },
    ],
  },
  {
    id: 'messenger',
    name: 'Messenger',
    description: 'Communication tools access',
    permissions: [
      { id: 'access_sms_notifications', name: 'Can Access SMS And Notifications', description: 'Send SMS and notifications', enabled: false },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing and promotional tools',
    permissions: [
      { id: 'manage_promo_codes', name: 'Can Manage Promo Codes', description: 'Create and manage discount codes', enabled: false },
      { id: 'manage_wallet_refer', name: 'Can Manage Wallet Refer Earn Settings', description: 'Configure referral rewards', enabled: false },
      { id: 'manage_blogs', name: 'Can Manage Blogs', description: 'Create and edit blog posts', enabled: false },
    ],
  },
  {
    id: 'content',
    name: 'Content',
    description: 'Course and content management',
    permissions: [
      { id: 'manage_courses', name: 'Can Create, Edit, Delete Courses', description: 'Full course management', enabled: false },
      { id: 'manage_live_classes', name: 'Can Manage Live Classes', description: 'Schedule and manage live sessions', enabled: false },
      { id: 'manage_assignments', name: 'Can Manage Assignments', description: 'Create and grade assignments', enabled: false },
      { id: 'manage_live_tests', name: 'Can Manage Live Tests', description: 'Create and manage tests', enabled: false },
      { id: 'manage_quiz_reviews', name: 'Can Manage Quiz Reviews', description: 'Review and grade quizzes', enabled: false },
    ],
  },
  {
    id: 'memberships_chat',
    name: 'Memberships And Chat',
    description: 'Membership and chat features',
    permissions: [
      { id: 'manage_membership_chat', name: 'Can Edit, Manage Membership And Chat', description: 'Configure memberships and chat', enabled: false },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Sales and transaction access',
    permissions: [
      { id: 'access_learner_transactions', name: 'Access To Learners Transactions', description: 'View student payment history', enabled: false },
      { id: 'view_sales_dashboard', name: 'Can View Complete Sales Dashboard, Change Transaction Status', description: 'Full sales dashboard access', enabled: false },
      { id: 'view_sales_no_learner', name: 'Can View Course Sales Without Learner Information', description: 'View anonymized sales data', enabled: false },
      { id: 'view_sales_with_learner', name: 'Can View Course Sales With Learner Information', description: 'View full sales with student info', enabled: false },
      { id: 'export_sales_report', name: 'Can Export Complete Sales Report', description: 'Download sales reports', enabled: false },
    ],
  },
];

// Helper function to get fresh copy of permissions
export const getDefaultSubAdminPermissions = (): PermissionCategory[] => {
  return JSON.parse(JSON.stringify(subAdminPermissionCategories));
};

// Instructor permissions (subset of sub-admin)
export const instructorPermissionCategories: PermissionCategory[] = [
  {
    id: 'students',
    name: 'Students',
    description: 'Manage your enrolled students',
    permissions: [
      { id: 'view_enrolled_students', name: 'View Enrolled Students', description: 'View students in your courses', enabled: true },
      { id: 'view_student_progress', name: 'View Student Progress', description: 'Track student performance', enabled: true },
      { id: 'send_announcements', name: 'Send Announcements To Students', description: 'Communicate with students', enabled: true },
    ],
  },
  {
    id: 'content',
    name: 'Content',
    description: 'Manage your course content',
    permissions: [
      { id: 'create_courses', name: 'Create New Courses', description: 'Create and publish courses', enabled: true },
      { id: 'edit_own_courses', name: 'Edit Own Courses', description: 'Modify your courses', enabled: true },
      { id: 'manage_assignments', name: 'Manage Assignments', description: 'Create and grade assignments', enabled: true },
      { id: 'manage_quizzes', name: 'Manage Quizzes', description: 'Create and manage quizzes', enabled: true },
      { id: 'host_live_classes', name: 'Host Live Classes', description: 'Conduct live sessions', enabled: true },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'View your course analytics',
    permissions: [
      { id: 'view_course_analytics', name: 'View Course Analytics', description: 'Access course performance data', enabled: true },
      { id: 'view_earnings', name: 'View Earnings Report', description: 'Track your earnings', enabled: true },
      { id: 'export_reports', name: 'Export Reports', description: 'Download analytics data', enabled: true },
    ],
  },
  {
    id: 'discussions',
    name: 'Discussions',
    description: 'Manage course discussions',
    permissions: [
      { id: 'manage_course_discussions', name: 'Manage Course Discussions', description: 'Moderate your course forums', enabled: true },
      { id: 'respond_queries', name: 'Respond To Student Queries', description: 'Answer student questions', enabled: true },
    ],
  },
];

export const getDefaultInstructorPermissions = (): PermissionCategory[] => {
  return JSON.parse(JSON.stringify(instructorPermissionCategories));
};

// Student permissions (read-only mostly)
export const studentPermissionCategories: PermissionCategory[] = [
  {
    id: 'courses',
    name: 'Courses',
    description: 'Access enrolled courses',
    permissions: [
      { id: 'view_enrolled_courses', name: 'View Enrolled Courses', description: 'Access your courses', enabled: true },
      { id: 'download_resources', name: 'Download Course Resources', description: 'Download materials', enabled: true },
      { id: 'submit_assignments', name: 'Submit Assignments', description: 'Submit coursework', enabled: true },
      { id: 'take_quizzes', name: 'Take Quizzes And Tests', description: 'Participate in assessments', enabled: true },
      { id: 'join_live_classes', name: 'Join Live Classes', description: 'Attend live sessions', enabled: true },
    ],
  },
  {
    id: 'community',
    name: 'Community',
    description: 'Community participation',
    permissions: [
      { id: 'participate_discussions', name: 'Participate In Discussions', description: 'Join course discussions', enabled: true },
      { id: 'ask_questions', name: 'Ask Questions To Instructors', description: 'Seek help from instructors', enabled: true },
      { id: 'rate_courses', name: 'Rate And Review Courses', description: 'Provide feedback', enabled: true },
    ],
  },
  {
    id: 'profile',
    name: 'Profile',
    description: 'Manage your profile',
    permissions: [
      { id: 'edit_profile', name: 'Edit Profile', description: 'Update personal info', enabled: true },
      { id: 'view_progress', name: 'View Learning Progress', description: 'Track your progress', enabled: true },
      { id: 'view_certificates', name: 'View And Download Certificates', description: 'Access earned certificates', enabled: true },
    ],
  },
];

export const getDefaultStudentPermissions = (): PermissionCategory[] => {
  return JSON.parse(JSON.stringify(studentPermissionCategories));
};

// User creation payload with permissions
export interface CreateUserWithPermissions {
  name: string;
  email: string;
  password: string;
  phone?: string;
  countryCode?: string;
  avatar?: string;
  notifyUser: boolean;
  permissions: PermissionCategory[];
}
