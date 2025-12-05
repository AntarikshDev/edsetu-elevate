import { 
  DashboardStats, 
  QuickAction, 
  ChecklistItem, 
  ActivityItem,
  ApiResponse 
} from '@/types/api';
import { simulateDelay, STORAGE_KEYS, getStoredData } from './mockApi';
import { User } from '@/types/api';

// Mock dashboard data
const mockStats: DashboardStats = {
  totalCourses: 12,
  activeStudents: 234,
  revenueThisMonth: 45000,
  engagementRate: 78,
  coursesChange: 8,
  studentsChange: 12,
  revenueChange: 23,
  engagementChange: -3,
};

const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Create Course',
    description: 'Build your first course with our easy editor',
    icon: 'BookOpen',
    href: '/app/courses/new',
    color: 'primary',
  },
  {
    id: '2',
    title: 'Upload Content',
    description: 'Add videos, PDFs, and other assets',
    icon: 'Upload',
    href: '/app/assets',
    color: 'accent',
  },
  {
    id: '3',
    title: 'Set Up Pricing',
    description: 'Configure your course pricing and packages',
    icon: 'DollarSign',
    href: '/app/packages',
    color: 'secondary',
  },
  {
    id: '4',
    title: 'Invite Students',
    description: 'Share your course link or invite directly',
    icon: 'UserPlus',
    href: '/app/users/students',
    color: 'primary',
  },
  {
    id: '5',
    title: 'Schedule Live Class',
    description: 'Host live sessions with your students',
    icon: 'Video',
    href: '/app/live-class',
    color: 'accent',
  },
  {
    id: '6',
    title: 'AI Avatar Setup',
    description: 'Create your AI-powered avatar for courses',
    icon: 'Bot',
    href: '/app/ai-avatar',
    color: 'secondary',
  },
];

const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Create your account',
    description: 'Sign up and verify your email',
    completed: true,
  },
  {
    id: '2',
    title: 'Set up your brand',
    description: 'Add your brand name and logo',
    completed: false,
    href: '/onboarding',
  },
  {
    id: '3',
    title: 'Create your first course',
    description: 'Build engaging content for your students',
    completed: false,
    href: '/app/courses/new',
  },
  {
    id: '4',
    title: 'Add payment method',
    description: 'Connect your bank account to receive payments',
    completed: false,
    href: '/app/settings/payments',
  },
  {
    id: '5',
    title: 'Publish and share',
    description: 'Make your course live and invite students',
    completed: false,
    href: '/app/courses',
  },
];

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'enrollment',
    title: 'New enrollment',
    description: 'Rahul Sharma enrolled in "Advanced JavaScript"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: { name: 'Rahul Sharma' },
  },
  {
    id: '2',
    type: 'purchase',
    title: 'Course purchased',
    description: 'Priya Patel purchased "React Masterclass"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user: { name: 'Priya Patel' },
  },
  {
    id: '3',
    type: 'review',
    title: 'New review',
    description: 'Amit Kumar left a 5-star review',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    user: { name: 'Amit Kumar' },
  },
  {
    id: '4',
    type: 'upload',
    title: 'Content uploaded',
    description: 'You uploaded "Module 5: State Management"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '5',
    type: 'comment',
    title: 'New comment',
    description: 'Student asked a question in "Python Basics"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    user: { name: 'Sneha Gupta' },
  },
];

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics
 */
export const getStats = async (): Promise<ApiResponse<DashboardStats>> => {
  await simulateDelay();
  
  const user = getStoredData<User>(STORAGE_KEYS.USER);
  
  // Return different stats based on user state
  if (!user?.onboardingCompleted) {
    return {
      success: true,
      data: {
        totalCourses: 0,
        activeStudents: 0,
        revenueThisMonth: 0,
        engagementRate: 0,
        coursesChange: 0,
        studentsChange: 0,
        revenueChange: 0,
        engagementChange: 0,
      },
    };
  }

  return { success: true, data: mockStats };
};

/**
 * GET /api/dashboard/quick-actions
 * Get quick action cards
 */
export const getQuickActions = async (): Promise<ApiResponse<QuickAction[]>> => {
  await simulateDelay();
  return { success: true, data: mockQuickActions };
};

/**
 * GET /api/dashboard/checklist
 * Get getting started checklist
 */
export const getChecklist = async (): Promise<ApiResponse<ChecklistItem[]>> => {
  await simulateDelay();
  
  const user = getStoredData<User>(STORAGE_KEYS.USER);
  const checklist = [...mockChecklist];
  
  // Update checklist based on user state
  if (user?.onboardingCompleted) {
    checklist[1].completed = true;
  }
  if (user?.brandName) {
    checklist[1].completed = true;
  }

  return { success: true, data: checklist };
};

/**
 * GET /api/dashboard/activity
 * Get recent activity
 */
export const getActivity = async (limit: number = 5): Promise<ApiResponse<ActivityItem[]>> => {
  await simulateDelay();
  return { success: true, data: mockActivity.slice(0, limit) };
};

/**
 * POST /api/dashboard/checklist/:id/complete
 * Mark checklist item as complete
 */
export const completeChecklistItem = async (itemId: string): Promise<ApiResponse<ChecklistItem>> => {
  await simulateDelay();
  
  const item = mockChecklist.find(i => i.id === itemId);
  if (!item) {
    return { success: false, error: 'Item not found' };
  }
  
  item.completed = true;
  return { success: true, data: item };
};

/**
 * GET /api/dashboard/tips
 * Get quick tips for the user
 */
export const getTips = async (): Promise<ApiResponse<string[]>> => {
  await simulateDelay();
  
  const tips = [
    '💡 Tip: Add subtitles to your videos to increase engagement by 40%',
    '🎯 Pro tip: Bundle courses into packages to increase average order value',
    '📈 Students who complete quizzes have 3x higher completion rates',
    '🎥 Live classes create stronger community bonds with your students',
    '✨ Use AI Avatar to scale your course creation without extra recording',
  ];

  return { success: true, data: tips };
};
