import { 
  Course, 
  Package, 
  Asset, 
  Category, 
  QuizReview, 
  AssignmentReview,
  LiveClass,
  ApiResponse, 
  PaginatedResponse 
} from '@/types/api';
import { simulateDelay, generateId, formatDate } from './mockApi';

// Mock courses
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Masterclass 2024',
    description: 'Learn React from scratch with hands-on projects',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    price: 4999,
    currency: 'INR',
    status: 'published',
    enrollments: 156,
    rating: 4.8,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JS concepts and design patterns',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    price: 3999,
    currency: 'INR',
    status: 'published',
    enrollments: 89,
    rating: 4.6,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-28T00:00:00Z',
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Complete Python course for aspiring data scientists',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    price: 5999,
    currency: 'INR',
    status: 'draft',
    enrollments: 0,
    rating: 0,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
];

// Mock packages
const mockPackages: Package[] = [
  {
    id: '1',
    title: 'Full Stack Developer Bundle',
    description: 'Complete web development package',
    courses: ['1', '2'],
    price: 7999,
    currency: 'INR',
    status: 'published',
  },
  {
    id: '2',
    title: 'Frontend Mastery',
    description: 'All frontend courses in one package',
    courses: ['1'],
    price: 4499,
    currency: 'INR',
    status: 'draft',
  },
];

// Mock assets
const mockAssets: Asset[] = [
  { id: '1', name: 'Intro Video.mp4', type: 'video', url: '/assets/video1.mp4', size: 52428800, createdAt: '2024-03-01T00:00:00Z' },
  { id: '2', name: 'Course Slides.pdf', type: 'document', url: '/assets/slides.pdf', size: 2097152, createdAt: '2024-03-02T00:00:00Z' },
  { id: '3', name: 'Thumbnail.png', type: 'image', url: '/assets/thumb.png', size: 524288, createdAt: '2024-03-03T00:00:00Z' },
  { id: '4', name: 'Background Music.mp3', type: 'audio', url: '/assets/music.mp3', size: 4194304, createdAt: '2024-03-04T00:00:00Z' },
];

// Mock categories
const mockCategories: Category[] = [
  { id: '1', name: 'Programming', slug: 'programming', description: 'Software development courses', coursesCount: 5 },
  { id: '2', name: 'Data Science', slug: 'data-science', description: 'Analytics and ML courses', coursesCount: 3 },
  { id: '3', name: 'Design', slug: 'design', description: 'UI/UX and graphic design', coursesCount: 2 },
  { id: '4', name: 'Business', slug: 'business', description: 'Entrepreneurship and marketing', coursesCount: 4 },
];

// Mock quiz reviews
const mockQuizReviews: QuizReview[] = [
  { id: '1', quizTitle: 'React Basics Quiz', studentName: 'Rahul Sharma', submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), score: 8, totalQuestions: 10, status: 'pending' },
  { id: '2', quizTitle: 'JavaScript Fundamentals', studentName: 'Sneha Gupta', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), score: 9, totalQuestions: 10, status: 'reviewed' },
  { id: '3', quizTitle: 'CSS Flexbox Test', studentName: 'Amit Patel', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), score: 7, totalQuestions: 10, status: 'pending' },
];

// Mock assignment reviews
const mockAssignmentReviews: AssignmentReview[] = [
  { id: '1', assignmentTitle: 'Build a Todo App', studentName: 'Kavya Nair', submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: 'pending' },
  { id: '2', assignmentTitle: 'REST API Project', studentName: 'Rohan Desai', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'reviewed', grade: 'A' },
  { id: '3', assignmentTitle: 'React Dashboard', studentName: 'Rahul Sharma', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), status: 'returned', grade: 'B+' },
];

// Mock live classes
const mockLiveClasses: LiveClass[] = [
  { id: '1', title: 'React Hooks Deep Dive', scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), duration: 90, status: 'scheduled', attendees: 45, maxAttendees: 100 },
  { id: '2', title: 'Q&A Session: JavaScript', scheduledAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), duration: 60, status: 'scheduled', attendees: 23, maxAttendees: 50 },
  { id: '3', title: 'Introduction to TypeScript', scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), duration: 120, status: 'completed', attendees: 67, maxAttendees: 100 },
];

// Courses API
export const getCourses = async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<Course>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockCourses.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockCourses.length, page, pageSize, totalPages: Math.ceil(mockCourses.length / pageSize) },
  };
};

export const getCourseById = async (id: string): Promise<ApiResponse<Course>> => {
  await simulateDelay();
  const course = mockCourses.find(c => c.id === id);
  if (!course) return { success: false, error: 'Course not found' };
  return { success: true, data: course };
};

export const createCourse = async (data: Partial<Course>): Promise<ApiResponse<Course>> => {
  await simulateDelay();
  const newCourse: Course = {
    id: generateId(),
    title: data.title || 'Untitled Course',
    description: data.description || '',
    price: data.price || 0,
    currency: 'INR',
    status: 'draft',
    enrollments: 0,
    rating: 0,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  };
  mockCourses.push(newCourse);
  return { success: true, data: newCourse, message: 'Course created successfully' };
};

// Packages API
export const getPackages = async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<Package>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockPackages.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockPackages.length, page, pageSize, totalPages: Math.ceil(mockPackages.length / pageSize) },
  };
};

// Assets API
export const getAssets = async (page: number = 1, pageSize: number = 20): Promise<ApiResponse<PaginatedResponse<Asset>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockAssets.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockAssets.length, page, pageSize, totalPages: Math.ceil(mockAssets.length / pageSize) },
  };
};

// Categories API
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  await simulateDelay();
  return { success: true, data: mockCategories };
};

export const createCategory = async (data: { name: string; description?: string }): Promise<ApiResponse<Category>> => {
  await simulateDelay();
  const newCategory: Category = {
    id: generateId(),
    name: data.name,
    slug: data.name.toLowerCase().replace(/\s+/g, '-'),
    description: data.description,
    coursesCount: 0,
  };
  mockCategories.push(newCategory);
  return { success: true, data: newCategory };
};

// Quiz Reviews API
export const getQuizReviews = async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<QuizReview>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockQuizReviews.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockQuizReviews.length, page, pageSize, totalPages: Math.ceil(mockQuizReviews.length / pageSize) },
  };
};

// Assignment Reviews API
export const getAssignmentReviews = async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<AssignmentReview>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockAssignmentReviews.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockAssignmentReviews.length, page, pageSize, totalPages: Math.ceil(mockAssignmentReviews.length / pageSize) },
  };
};

// Live Classes API
export const getLiveClasses = async (page: number = 1, pageSize: number = 10): Promise<ApiResponse<PaginatedResponse<LiveClass>>> => {
  await simulateDelay();
  const start = (page - 1) * pageSize;
  const paginatedData = mockLiveClasses.slice(start, start + pageSize);
  return {
    success: true,
    data: { data: paginatedData, total: mockLiveClasses.length, page, pageSize, totalPages: Math.ceil(mockLiveClasses.length / pageSize) },
  };
};

export const createLiveClass = async (data: Partial<LiveClass>): Promise<ApiResponse<LiveClass>> => {
  await simulateDelay();
  const newClass: LiveClass = {
    id: generateId(),
    title: data.title || 'Untitled Class',
    scheduledAt: data.scheduledAt || formatDate(),
    duration: data.duration || 60,
    status: 'scheduled',
    attendees: 0,
    maxAttendees: data.maxAttendees || 100,
  };
  mockLiveClasses.push(newClass);
  return { success: true, data: newClass };
};
