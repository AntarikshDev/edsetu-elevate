import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { User } from './apiSlice';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

// Hydrate initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        accessToken: storedToken,
        role: storedRole,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Failed to hydrate auth state:', error);
  }

  return {
    user: null,
    accessToken: null,
    role: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // New setUser action with user, token, and role
    setUser: (
      state,
      action: PayloadAction<{ user: User; token: string; role: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    // Legacy setCredentials (kept for backward compatibility)
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.isAuthenticated = false;
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

// Export actions
export const { setUser, setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserRole = (state: RootState) => state.auth.role || state.auth.user?.role;

// Export reducer
export default authSlice.reducer;
