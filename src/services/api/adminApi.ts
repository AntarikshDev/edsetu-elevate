import { apiRequest } from './apiClient';
import { LearnerDevice, EnrolledLearner, Enrollment } from '@/types/api';

/**
 * GET /api/admin/learner/device/detail/:student_id
 * Get all devices associated with a student
 */
export const getLearnerDevices = async (studentId: string): Promise<{
  success: boolean;
  data?: LearnerDevice[];
  message?: string;
}> => {
  try {
    const response = await apiRequest<LearnerDevice[]>(`/api/admin/learner/device/detail/${studentId}`, {
      method: 'GET',
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to get devices' };
  }
};

/**
 * DELETE /api/admin/remove/leraner/device/:device_id
 * Remove or deactivate a learner device
 */
export const removeLearnerDevice = async (deviceId: string): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await apiRequest<{ message: string }>(`/api/admin/remove/leraner/device/${deviceId}`, {
      method: 'DELETE',
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to remove device' };
  }
};

/**
 * GET /api/auth/fetch/all/enroll/learner/:course_id
 * Get all enrolled learners for a course
 */
export const getEnrolledLearnersForCourse = async (courseId: string): Promise<{
  success: boolean;
  data?: EnrolledLearner[];
  message?: string;
}> => {
  try {
    const response = await apiRequest<EnrolledLearner[]>(`/api/auth/fetch/all/enroll/learner/${courseId}`, {
      method: 'GET',
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to get enrolled learners' };
  }
};

/**
 * GET /api/auth/fetch/all/enroll/learner/inpackage/:package_id
 * Get all enrolled learners for a package
 */
export const getEnrolledLearnersForPackage = async (packageId: string): Promise<{
  success: boolean;
  data?: EnrolledLearner[];
  message?: string;
}> => {
  try {
    const response = await apiRequest<EnrolledLearner[]>(`/api/auth/fetch/all/enroll/learner/inpackage/${packageId}`, {
      method: 'GET',
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to get enrolled learners' };
  }
};

/**
 * POST /api/auth/update/enroll/learner/coursse/expiry-date
 * Update enrollment expiry date
 */
export const updateEnrollmentExpiryDate = async (
  enrollId: string,
  newExpiryDate: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await apiRequest<{ message: string }>('/api/auth/update/enroll/learner/coursse/expiry-date', {
      method: 'POST',
      body: JSON.stringify({ enroll_id: enrollId, new_expiry_date: newExpiryDate }),
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update expiry date' };
  }
};

/**
 * POST /api/admin/student/enroll
 * Create a new enrollment
 */
export const enrollStudent = async (data: {
  student_id: string;
  course_id?: string;
  package_id?: string;
  start_date?: string;
  expiry_date?: string;
}): Promise<{ success: boolean; data?: Enrollment; message?: string }> => {
  try {
    const response = await apiRequest<Enrollment>('/api/admin/student/enroll', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to enroll student' };
  }
};

/**
 * DELETE /api/admin/remove/enroll/student/:enroll_id
 * Remove an enrollment
 */
export const removeEnrollment = async (enrollId: string): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await apiRequest<{ message: string }>(`/api/admin/remove/enroll/student/${enrollId}`, {
      method: 'DELETE',
    });
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Failed to remove enrollment' };
  }
};