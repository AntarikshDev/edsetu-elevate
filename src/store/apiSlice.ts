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
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  endpoints: (builder) => ({
    // Login mutation with device info
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Get user detail query
    getUserDetail: builder.query<User, void>({
      query: () => '/api/auth/user_detail',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks
export const { useLoginMutation, useGetUserDetailQuery } = apiSlice;
