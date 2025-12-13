import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { LoginUserData } from './apiSlice';
import type { Organization, OrganizationContext } from '@/types/organization';

export interface AuthState {
  user: LoginUserData | null;
  userName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  // Multi-tenancy organization context
  organizationId: string | null;
  organizationSlug: string | null;
  organization: OrganizationContext | null;
}

// Hydrate initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('role');
    const storedUserName = localStorage.getItem('userName');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedOrgId = localStorage.getItem('organizationId');
    const storedOrgSlug = localStorage.getItem('organizationSlug');
    const storedOrg = localStorage.getItem('organization');

    if (storedToken) {
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        userName: storedUserName,
        accessToken: storedToken,
        refreshToken: storedRefreshToken,
        role: storedRole,
        isAuthenticated: true,
        organizationId: storedOrgId,
        organizationSlug: storedOrgSlug,
        organization: storedOrg ? JSON.parse(storedOrg) : null,
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
    organizationId: null,
    organizationSlug: null,
    organization: null,
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
        organizationId?: string;
        organizationSlug?: string;
      }>
    ) => {
      state.user = action.payload.userData;
      state.userName = action.payload.userData.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.userData.role;
      state.isAuthenticated = true;

      // Set organization if provided
      if (action.payload.organizationId) {
        state.organizationId = action.payload.organizationId;
        localStorage.setItem('organizationId', action.payload.organizationId);
      }
      if (action.payload.organizationSlug) {
        state.organizationSlug = action.payload.organizationSlug;
        localStorage.setItem('organizationSlug', action.payload.organizationSlug);
      }

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.userData));
      localStorage.setItem('userName', action.payload.userData.name);
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('role', action.payload.userData.role);
    },

    // Set organization context
    setOrganization: (
      state,
      action: PayloadAction<{
        organizationId: string;
        organizationSlug: string;
        organization: OrganizationContext;
      }>
    ) => {
      state.organizationId = action.payload.organizationId;
      state.organizationSlug = action.payload.organizationSlug;
      state.organization = action.payload.organization;

      // Persist to localStorage
      localStorage.setItem('organizationId', action.payload.organizationId);
      localStorage.setItem('organizationSlug', action.payload.organizationSlug);
      localStorage.setItem('organization', JSON.stringify(action.payload.organization));
    },

    // Clear organization context
    clearOrganization: (state) => {
      state.organizationId = null;
      state.organizationSlug = null;
      state.organization = null;

      localStorage.removeItem('organizationId');
      localStorage.removeItem('organizationSlug');
      localStorage.removeItem('organization');
    },

    // Update organization settings
    updateOrganizationSettings: (
      state,
      action: PayloadAction<Partial<OrganizationContext>>
    ) => {
      if (state.organization) {
        state.organization = { ...state.organization, ...action.payload };
        localStorage.setItem('organization', JSON.stringify(state.organization));
      }
    },

    logout: (state) => {
      state.user = null;
      state.userName = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;
      state.organizationId = null;
      state.organizationSlug = null;
      state.organization = null;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('organizationId');
      localStorage.removeItem('organizationSlug');
      localStorage.removeItem('organization');
      // Also clear legacy keys
      localStorage.removeItem('token');
    },
  },
});

// Export actions
export const { 
  setCredentials, 
  setOrganization, 
  clearOrganization, 
  updateOrganizationSettings, 
  logout 
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserRole = (state: RootState) => state.auth.role;
export const selectOrganizationId = (state: RootState) => state.auth.organizationId;
export const selectOrganizationSlug = (state: RootState) => state.auth.organizationSlug;
export const selectOrganization = (state: RootState) => state.auth.organization;

// Export reducer
export default authSlice.reducer;
