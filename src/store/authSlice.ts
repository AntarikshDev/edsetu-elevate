import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { LoginUserData } from './apiSlice';

export interface AuthState {
  user: LoginUserData | null;
  userName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

// Hydrate initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('role');
    const storedUserName = localStorage.getItem('userName');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedToken) {
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        userName: storedUserName,
        accessToken: storedToken,
        refreshToken: storedRefreshToken,
        role: storedRole,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Failed to hydrate auth state:', error);
  }

  return {
    user: null,
    userName: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials after login
    setCredentials: (
      state,
      action: PayloadAction<{
        userData: LoginUserData;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.userData;
      state.userName = action.payload.userData.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.userData.role;
      state.isAuthenticated = true;

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.userData));
      localStorage.setItem('userName', action.payload.userData.name);
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('role', action.payload.userData.role);
    },
    logout: (state) => {
      state.user = null;
      state.userName = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      // Also clear legacy keys
      localStorage.removeItem('token');
    },
  },
});

// Export actions
export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserRole = (state: RootState) => state.auth.role;

// Export reducer
export default authSlice.reducer;
