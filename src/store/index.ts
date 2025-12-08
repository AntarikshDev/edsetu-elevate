// Re-export everything from store modules
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

// API slice exports
export { apiSlice, useLoginMutation, useGetUserDetailQuery } from './apiSlice';
export type { LoginRequest, LoginResponse, LoginUserData, User, UserRole } from './apiSlice';

// Auth slice exports
export {
  setCredentials,
  logout,
  selectCurrentUser,
  selectUserName,
  selectIsAuthenticated,
  selectAccessToken,
  selectUserRole,
} from './authSlice';
export type { AuthState } from './authSlice';
