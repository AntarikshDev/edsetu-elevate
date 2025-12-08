import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

// Types matching actual backend response
export type UserRole = 'Admin' | 'SuperAdmin' | 'Instructor' | 'Student' | 'SubAdmin';

export interface LoginUserData {
  id: number;
  name: string;
  email: string;
  role: UserRole | string;
}

export interface LoginRequest {
  email: string;
  password_hash: string;
  device_unique_id: string;
  device_name: string;
  device_location: string;
}

export interface LoginResponse {
  sucess: boolean; // Note: matches backend typo
  userData: LoginUserData;
  accessToken: string;
  refreshToken: string;
}

// User type for internal use
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Base URL from environment or fallback
const baseUrl = import.meta.env.VITE_API_URL || '';

// Mock user data for development
const mockUsers: Record<string, { password: string; userData: LoginUserData }> = {
  'admin@edsetu.com': {
    password: 'admin123',
    userData: { id: 1, name: 'Admin User', email: 'admin@edsetu.com', role: 'Admin' },
  },
  'subadmin@edsetu.com': {
    password: 'subadmin123',
    userData: { id: 2, name: 'Sub Admin', email: 'subadmin@edsetu.com', role: 'SubAdmin' },
  },
  'instructor@edsetu.com': {
    password: 'instructor123',
    userData: { id: 3, name: 'Instructor User', email: 'instructor@edsetu.com', role: 'Instructor' },
  },
  'student@edsetu.com': {
    password: 'student123',
    userData: { id: 4, name: 'Student User', email: 'student@edsetu.com', role: 'Student' },
  },
};

// Mock base query that handles login locally when no API URL is set
const mockBaseQuery = fetchBaseQuery({ baseUrl });

const baseQueryWithMock: typeof mockBaseQuery = async (args, api, extraOptions) => {
  // If no API URL is configured, use mock data
  if (!import.meta.env.VITE_API_URL) {
    if (typeof args === 'object' && args.url === '/api/auth/login' && args.method === 'POST') {
      const body = args.body as LoginRequest;
      const user = mockUsers[body.email];
      
      if (user && body.password_hash === user.password) {
        return {
          data: {
            sucess: true,
            userData: user.userData,
            accessToken: `mock-token-${Date.now()}`,
            refreshToken: `mock-refresh-${Date.now()}`,
          } as LoginResponse,
        };
      }
      
      return {
        error: {
          status: 401,
          data: { message: 'Invalid email or password' },
        },
      };
    }
    
    // For other endpoints, return empty data
    return { data: {} };
  }
  
  // Use real API if URL is configured
  return mockBaseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile', 'Enrollment', 'Device'],
  endpoints: () => ({}),
});

// Create auth API with mock support
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithMock,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        // If no API URL configured, use mock data directly
        if (!import.meta.env.VITE_API_URL) {
          const user = mockUsers[credentials.email];
          
          if (user && credentials.password_hash === user.password) {
            return {
              data: {
                sucess: true,
                userData: user.userData,
                accessToken: `mock-token-${Date.now()}`,
                refreshToken: `mock-refresh-${Date.now()}`,
              },
            };
          }
          
          return {
            error: {
              status: 401,
              data: { message: 'Invalid email or password' },
            } as any,
          };
        }
        
        // For real API, use fetch
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            return { error: { status: response.status, data: errorData } as any };
          }
          
          const data = await response.json();
          return { data };
        } catch {
          return { error: { status: 'FETCH_ERROR', data: { message: 'Network error' } } as any };
        }
      },
    }),
  }),
});

// Export hooks
export const { useLoginMutation } = authApi;
