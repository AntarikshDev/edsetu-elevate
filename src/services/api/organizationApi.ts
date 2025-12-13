import { ApiResponse } from '@/types/api';
import { 
  Organization, 
  OrganizationBranding, 
  OrganizationSettings, 
  OrganizationSEO, 
  OrganizationContact,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  defaultOrganizationBranding,
  defaultOrganizationSettings,
  defaultOrganizationSEO,
  defaultOrganizationContact,
} from '@/types/organization';
import { simulateDelay, generateId, formatDate } from './mockApi';

// Mock organizations data
const mockOrganizations: Organization[] = [
  {
    id: 'org_default',
    name: 'EdSetu Academy',
    slug: 'edsetu-academy',
    ownerId: 'admin_1',
    branding: {
      ...defaultOrganizationBranding,
      logo: '/logo.png',
      primaryColor: '#3b82f6',
    },
    settings: {
      ...defaultOrganizationSettings,
      enableRegistration: true,
      features: {
        courses: true,
        liveClasses: true,
        quizzes: true,
        assignments: true,
        certificates: true,
        payments: true,
        analytics: true,
        customBranding: true,
      },
    },
    seo: {
      metaTitle: 'EdSetu Academy - Learn Online',
      metaDescription: 'Your premier destination for online learning',
    },
    contact: {
      email: 'contact@edsetu.com',
      phone: '+91 98765 43210',
      address: '123 Education Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
    status: 'active',
    plan: 'pro',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

/**
 * GET /api/organizations/:id
 * Get organization by ID
 */
export const getOrganizationById = async (
  organizationId: string
): Promise<ApiResponse<Organization>> => {
  await simulateDelay();

  const org = mockOrganizations.find(o => o.id === organizationId);
  if (!org) {
    return { success: false, error: 'Organization not found' };
  }

  return { success: true, data: org };
};

/**
 * GET /api/organizations/slug/:slug
 * Get organization by slug
 */
export const getOrganizationBySlug = async (
  slug: string
): Promise<ApiResponse<Organization>> => {
  await simulateDelay();

  const org = mockOrganizations.find(o => o.slug === slug);
  if (!org) {
    return { success: false, error: 'Organization not found' };
  }

  return { success: true, data: org };
};

/**
 * POST /api/organizations
 * Create new organization
 */
export const createOrganization = async (
  data: CreateOrganizationRequest,
  ownerId: string
): Promise<ApiResponse<Organization>> => {
  await simulateDelay();

  // Generate slug from name if not provided
  const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Check if slug already exists
  const existingOrg = mockOrganizations.find(o => o.slug === slug);
  if (existingOrg) {
    return { success: false, error: 'Organization slug already exists' };
  }

  const newOrg: Organization = {
    id: generateId(),
    name: data.name,
    slug,
    ownerId,
    branding: { ...defaultOrganizationBranding, ...data.branding },
    settings: defaultOrganizationSettings,
    seo: { ...defaultOrganizationSEO, metaTitle: data.name },
    contact: defaultOrganizationContact,
    status: 'trial',
    plan: 'free',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  };

  mockOrganizations.push(newOrg);

  // Store organization ID in localStorage
  localStorage.setItem('organizationId', newOrg.id);
  localStorage.setItem('organizationSlug', newOrg.slug);

  return { success: true, data: newOrg, message: 'Organization created successfully' };
};

/**
 * PUT /api/organizations/:id
 * Update organization
 */
export const updateOrganization = async (
  organizationId: string,
  data: UpdateOrganizationRequest
): Promise<ApiResponse<Organization>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  const org = mockOrganizations[orgIndex];

  // Check slug uniqueness if being changed
  if (data.slug && data.slug !== org.slug) {
    const existingOrg = mockOrganizations.find(o => o.slug === data.slug);
    if (existingOrg) {
      return { success: false, error: 'Organization slug already exists' };
    }
  }

  const updatedOrg: Organization = {
    ...org,
    name: data.name ?? org.name,
    slug: data.slug ?? org.slug,
    customDomain: data.customDomain ?? org.customDomain,
    branding: data.branding ? { ...org.branding, ...data.branding } : org.branding,
    settings: data.settings ? { ...org.settings, ...data.settings } : org.settings,
    seo: data.seo ? { ...org.seo, ...data.seo } : org.seo,
    contact: data.contact ? { ...org.contact, ...data.contact } : org.contact,
    updatedAt: formatDate(),
  };

  mockOrganizations[orgIndex] = updatedOrg;

  return { success: true, data: updatedOrg, message: 'Organization updated successfully' };
};

/**
 * PUT /api/organizations/:id/branding
 * Update organization branding
 */
export const updateOrganizationBranding = async (
  organizationId: string,
  branding: Partial<OrganizationBranding>
): Promise<ApiResponse<OrganizationBranding>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  const org = mockOrganizations[orgIndex];
  org.branding = { ...org.branding, ...branding };
  org.updatedAt = formatDate();

  return { success: true, data: org.branding, message: 'Branding updated successfully' };
};

/**
 * PUT /api/organizations/:id/settings
 * Update organization settings
 */
export const updateOrganizationSettings = async (
  organizationId: string,
  settings: Partial<OrganizationSettings>
): Promise<ApiResponse<OrganizationSettings>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  const org = mockOrganizations[orgIndex];
  org.settings = { ...org.settings, ...settings };
  org.updatedAt = formatDate();

  return { success: true, data: org.settings, message: 'Settings updated successfully' };
};

/**
 * PUT /api/organizations/:id/seo
 * Update organization SEO
 */
export const updateOrganizationSEO = async (
  organizationId: string,
  seo: Partial<OrganizationSEO>
): Promise<ApiResponse<OrganizationSEO>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  const org = mockOrganizations[orgIndex];
  org.seo = { ...org.seo, ...seo };
  org.updatedAt = formatDate();

  return { success: true, data: org.seo, message: 'SEO settings updated successfully' };
};

/**
 * PUT /api/organizations/:id/contact
 * Update organization contact
 */
export const updateOrganizationContact = async (
  organizationId: string,
  contact: Partial<OrganizationContact>
): Promise<ApiResponse<OrganizationContact>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  const org = mockOrganizations[orgIndex];
  org.contact = { ...org.contact, ...contact };
  org.updatedAt = formatDate();

  return { success: true, data: org.contact, message: 'Contact info updated successfully' };
};

/**
 * GET /api/users/:userId/organizations
 * Get organizations for a user
 */
export const getUserOrganizations = async (
  userId: string
): Promise<ApiResponse<Organization[]>> => {
  await simulateDelay();

  // In production, this would query the user's memberships
  const userOrgs = mockOrganizations.filter(o => o.ownerId === userId);
  
  return { success: true, data: userOrgs };
};

/**
 * DELETE /api/organizations/:id
 * Delete organization
 */
export const deleteOrganization = async (
  organizationId: string
): Promise<ApiResponse<{ deleted: boolean }>> => {
  await simulateDelay();

  const orgIndex = mockOrganizations.findIndex(o => o.id === organizationId);
  if (orgIndex === -1) {
    return { success: false, error: 'Organization not found' };
  }

  mockOrganizations.splice(orgIndex, 1);

  return { success: true, data: { deleted: true }, message: 'Organization deleted successfully' };
};
