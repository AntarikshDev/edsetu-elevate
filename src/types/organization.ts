// Organization Types for Multi-Tenancy

export interface Organization {
  id: string;
  name: string;
  slug: string;
  customDomain?: string;
  ownerId: string;
  branding: OrganizationBranding;
  settings: OrganizationSettings;
  seo: OrganizationSEO;
  contact: OrganizationContact;
  status: OrganizationStatus;
  plan: OrganizationPlan;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationBranding {
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  customCSS?: string;
}

export interface OrganizationSettings {
  enableRegistration: boolean;
  enableSocialLogin: boolean;
  requireEmailVerification: boolean;
  defaultLanguage: string;
  defaultTimezone: string;
  allowedDomains?: string[];
  maxUsersPerRole?: Record<string, number>;
  features: OrganizationFeatures;
}

export interface OrganizationFeatures {
  courses: boolean;
  liveClasses: boolean;
  quizzes: boolean;
  assignments: boolean;
  certificates: boolean;
  payments: boolean;
  analytics: boolean;
  customBranding: boolean;
}

export interface OrganizationSEO {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  favicon?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export interface OrganizationContact {
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  supportEmail?: string;
  supportPhone?: string;
}

export type OrganizationStatus = 'active' | 'suspended' | 'trial' | 'cancelled';
export type OrganizationPlan = 'free' | 'starter' | 'pro' | 'enterprise';

// Organization member with role
export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationMemberRole;
  permissions: string[];
  joinedAt: string;
  invitedBy?: string;
}

export type OrganizationMemberRole = 'owner' | 'admin' | 'member';

// Organization creation/update DTOs
export interface CreateOrganizationRequest {
  name: string;
  slug?: string;
  branding?: Partial<OrganizationBranding>;
}

export interface UpdateOrganizationRequest {
  name?: string;
  slug?: string;
  customDomain?: string;
  branding?: Partial<OrganizationBranding>;
  settings?: Partial<OrganizationSettings>;
  seo?: Partial<OrganizationSEO>;
  contact?: Partial<OrganizationContact>;
}

// Organization context for auth state
export interface OrganizationContext {
  id: string;
  name: string;
  slug: string;
  role: OrganizationMemberRole;
  branding: OrganizationBranding;
  settings: OrganizationSettings;
}

// Default values
export const defaultOrganizationBranding: OrganizationBranding = {
  primaryColor: '#3b82f6',
  secondaryColor: '#64748b',
  accentColor: '#f59e0b',
};

export const defaultOrganizationSettings: OrganizationSettings = {
  enableRegistration: true,
  enableSocialLogin: false,
  requireEmailVerification: true,
  defaultLanguage: 'en',
  defaultTimezone: 'UTC',
  features: {
    courses: true,
    liveClasses: false,
    quizzes: true,
    assignments: true,
    certificates: false,
    payments: false,
    analytics: true,
    customBranding: false,
  },
};

export const defaultOrganizationSEO: OrganizationSEO = {
  metaTitle: '',
  metaDescription: '',
};

export const defaultOrganizationContact: OrganizationContact = {
  email: '',
};
