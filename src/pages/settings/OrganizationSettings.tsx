import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Palette, 
  Search, 
  Mail, 
  Settings, 
  Shield,
  Globe,
  Loader2,
} from 'lucide-react';
import { useOrganization, useOrganizationBranding, useOrganizationSettings, useOrganizationSEO, useOrganizationContact } from '@/hooks/useOrganization';
import { RoleGuard } from '@/components/Auth/RoleGuard';

const OrganizationSettings = () => {
  const { organization, isLoading } = useOrganization();
  const { updateBranding, isUpdating: isUpdatingBranding } = useOrganizationBranding();
  const { updateSettings, isUpdating: isUpdatingSettings } = useOrganizationSettings();
  const { updateSEO, isUpdating: isUpdatingSEO } = useOrganizationSEO();
  const { updateContact, isUpdating: isUpdatingContact } = useOrganizationContact();

  // General form state
  const [generalForm, setGeneralForm] = useState({
    name: organization?.name || '',
    slug: organization?.slug || '',
  });

  // Branding form state
  const [brandingForm, setBrandingForm] = useState({
    primaryColor: organization?.branding?.primaryColor || '#3b82f6',
    secondaryColor: organization?.branding?.secondaryColor || '#64748b',
    logo: organization?.branding?.logo || '',
  });

  // SEO form state
  const [seoForm, setSeoForm] = useState({
    metaTitle: organization?.seo?.metaTitle || '',
    metaDescription: organization?.seo?.metaDescription || '',
    keywords: organization?.seo?.keywords?.join(', ') || '',
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    email: organization?.contact?.email || '',
    phone: organization?.contact?.phone || '',
    address: organization?.contact?.address || '',
    city: organization?.contact?.city || '',
    state: organization?.contact?.state || '',
    country: organization?.contact?.country || '',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    enableRegistration: organization?.settings?.enableRegistration ?? true,
    enableSocialLogin: organization?.settings?.enableSocialLogin ?? false,
    requireEmailVerification: organization?.settings?.requireEmailVerification ?? true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Organization Selected</h2>
        <p className="text-muted-foreground">
          Please create or select an organization to manage settings.
        </p>
      </div>
    );
  }

  const handleSaveBranding = () => {
    updateBranding(brandingForm);
  };

  const handleSaveSEO = () => {
    updateSEO({
      ...seoForm,
      keywords: seoForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
    });
  };

  const handleSaveContact = () => {
    updateContact(contactForm);
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Organization Settings</h1>
            <p className="text-muted-foreground">
              Manage your organization's configuration and preferences
            </p>
          </div>
          <Badge variant={organization.status === 'active' ? 'default' : 'secondary'}>
            {organization.plan.toUpperCase()} Plan
          </Badge>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="general" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={generalForm.name}
                      onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                      placeholder="My Organization"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-slug">URL Slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">app.edsetu.com/</span>
                      <Input
                        id="org-slug"
                        value={generalForm.slug}
                        onChange={(e) => setGeneralForm({ ...generalForm, slug: e.target.value })}
                        placeholder="my-org"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Organization ID</Label>
                  <Input value={organization.id} disabled />
                  <p className="text-xs text-muted-foreground">
                    This is your unique organization identifier
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button disabled>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize your organization's visual identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={brandingForm.logo}
                    onChange={(e) => setBrandingForm({ ...brandingForm, logo: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brandingForm.primaryColor}
                        onChange={(e) => setBrandingForm({ ...brandingForm, primaryColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandingForm.primaryColor}
                        onChange={(e) => setBrandingForm({ ...brandingForm, primaryColor: e.target.value })}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={brandingForm.secondaryColor}
                        onChange={(e) => setBrandingForm({ ...brandingForm, secondaryColor: e.target.value })}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandingForm.secondaryColor}
                        onChange={(e) => setBrandingForm({ ...brandingForm, secondaryColor: e.target.value })}
                        placeholder="#64748b"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveBranding} disabled={isUpdatingBranding}>
                    {isUpdatingBranding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Branding
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your organization for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={seoForm.metaTitle}
                    onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                    placeholder="My Organization - Learn Online"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">
                    {seoForm.metaTitle.length}/60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-desc">Meta Description</Label>
                  <Textarea
                    id="meta-desc"
                    value={seoForm.metaDescription}
                    onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                    placeholder="A brief description of your organization..."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {seoForm.metaDescription.length}/160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={seoForm.keywords}
                    onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                    placeholder="online learning, courses, education"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate keywords with commas
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSEO} disabled={isUpdatingSEO}>
                    {isUpdatingSEO && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save SEO Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Your organization's contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={contactForm.city}
                      onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={contactForm.state}
                      onChange={(e) => setContactForm({ ...contactForm, state: e.target.value })}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={contactForm.country}
                      onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                      placeholder="India"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveContact} disabled={isUpdatingContact}>
                    {isUpdatingContact && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Contact Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure how your platform works
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on your platform
                    </p>
                  </div>
                  <Switch
                    checked={settingsForm.enableRegistration}
                    onCheckedChange={(checked) => setSettingsForm({ ...settingsForm, enableRegistration: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Social Login</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to sign in with Google, GitHub, etc.
                    </p>
                  </div>
                  <Switch
                    checked={settingsForm.enableSocialLogin}
                    onCheckedChange={(checked) => setSettingsForm({ ...settingsForm, enableSocialLogin: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email before accessing the platform
                    </p>
                  </div>
                  <Switch
                    checked={settingsForm.requireEmailVerification}
                    onCheckedChange={(checked) => setSettingsForm({ ...settingsForm, requireEmailVerification: checked })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={isUpdatingSettings}>
                    {isUpdatingSettings && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Enabled Features
                </CardTitle>
                <CardDescription>
                  Features available on your current plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(organization.settings.features).map(([feature, enabled]) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        enabled ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          enabled ? 'bg-primary' : 'bg-muted-foreground'
                        }`}
                      />
                      <span className="capitalize text-sm">
                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  );
};

export default OrganizationSettings;
