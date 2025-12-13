import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/authSlice';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Building,
  Globe,
  Linkedin,
  Twitter,
  Camera,
  Save,
  Shield,
  Bell,
  Key,
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Calendar,
  Flag,
  Palette,
  Building2,
  Settings,
  Upload,
  CreditCard,
  Languages,
  Image as ImageIcon,
  Chrome,
  GraduationCap,
  Briefcase,
  UserCog,
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/Profile/ChangePasswordModal';
import { TwoFactorModal } from '@/components/Profile/TwoFactorModal';
import { ActiveSessionsModal } from '@/components/Profile/ActiveSessionsModal';
import { DeleteAccountModal } from '@/components/Profile/DeleteAccountModal';
import { nationalities, currentlyInOptions, userTypeOptions, roleOptions, getGroupedCurrentlyInOptions } from '@/data/profileData';
import { countries, genderOptions, states, cities, getStatesForCountry, getCitiesForState } from '@/data/locationData';

export default function Profile() {
  const user = useAppSelector(selectCurrentUser);
  const { currentRole, isAdmin, isSubAdmin, isInstructor, isStudent } = usePermissions();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Security modal states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    alternatePhone: '',
    role: 'student',
    userType: 'learner',
    dateJoined: '2024-02-15T00:00:00Z',
    status: 'active',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
    nationality: 'IN',
    currentlyIn: 'undergraduate',
    gender: '',
    profileCreatedAt: '2024-02-15T00:00:00Z',
    profileUpdatedAt: '',
    organization: '',
    designation: '',
    website: '',
    linkedin: '',
    twitter: '',
    expertise: [] as string[],
    timezone: 'Asia/Kolkata',
    language: 'en',
  });

  // Get grouped currently in options
  const groupedCurrentlyIn = getGroupedCurrentlyInOptions();

  // Handle phone number input - only allow numeric
  const handlePhoneChange = (field: 'phone' | 'alternatePhone', value: string) => {
    const numericValue = value.replace(/[^0-9+\-\s()]/g, '');
    setFormData({ ...formData, [field]: numericValue });
  };

  // Handle country change - reset state and city
  const handleCountryChange = (countryCode: string) => {
    setFormData({
      ...formData,
      country: countryCode,
      state: '',
      city: '',
    });
  };

  // Handle state change - reset city
  const handleStateChange = (stateCode: string) => {
    setFormData({
      ...formData,
      state: stateCode,
      city: '',
    });
  };

  // Get available states and cities based on selection
  const availableStates = getStatesForCountry(formData.country);
  const availableCities = getCitiesForState(formData.state);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    newEnrollments: true,
    paymentAlerts: true,
    marketingEmails: false,
  });

  // White Labelling States (Admin only)
  const [platformName, setPlatformName] = useState(user?.name ? `${user.name}'s Platform` : 'EduInstitute');
  const [platformLogo, setPlatformLogo] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
  const [footerText, setFooterText] = useState('© 2024 All Rights Reserved');
  const [customCSS, setCustomCSS] = useState('');

  // Organization Details (Admin only)
  const [orgName, setOrgName] = useState('EduInstitute Learning');
  const [orgEmail, setOrgEmail] = useState('admin@eduinstitute.com');
  const [orgPhone, setOrgPhone] = useState('+91 98765 43210');
  const [orgAddress, setOrgAddress] = useState('123 Education Street, Mumbai, Maharashtra 400001');
  const [orgWebsite, setOrgWebsite] = useState('www.eduinstitute.com');
  const [orgDescription, setOrgDescription] = useState('Leading online learning platform');

  // Platform Settings (Admin only)
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [enableSocialLogin, setEnableSocialLogin] = useState(false);
  const [enableMultiLanguage, setEnableMultiLanguage] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enablePayments, setEnablePayments] = useState(true);
  const [currency, setCurrency] = useState('INR');
  const [platformTimezone, setPlatformTimezone] = useState('Asia/Kolkata');

  // SEO Settings (Admin only)
  const [metaTitle, setMetaTitle] = useState('EduInstitute - Leading Online Learning Platform');
  const [metaDescription, setMetaDescription] = useState('Transform your learning experience with our comprehensive courses');
  const [metaKeywords, setMetaKeywords] = useState('online learning, courses, education');
  const [ogImage, setOgImage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement profile update via RTK Query mutation
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlatformLogo(reader.result as string);
        toast.success('Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const roleDisplayNames: Record<string, string> = {
    admin: 'Administrator',
    sub_admin: 'Sub Administrator',
    instructor: 'Instructor',
    student: 'Student',
  };

  const roleDescriptions: Record<string, string> = {
    admin: 'Full access to all platform features, user management, and settings.',
    sub_admin: 'Manage instructors, students, and content. Limited access to platform settings.',
    instructor: 'Create and manage courses, view enrolled students, track earnings.',
    student: 'Access enrolled courses, track progress, and manage learning.',
  };

  // Mock stats based on role
  const getStats = () => {
    if (isAdmin) {
      return [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'text-primary' },
        { label: 'Total Courses', value: '56', icon: BookOpen, color: 'text-accent' },
        { label: 'Revenue', value: '₹4.5L', icon: DollarSign, color: 'text-chart-1' },
        { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'text-chart-2' },
      ];
    }
    if (isSubAdmin) {
      return [
        { label: 'Users Managed', value: '245', icon: Users, color: 'text-primary' },
        { label: 'Actions Today', value: '18', icon: Clock, color: 'text-accent' },
        { label: 'Courses Reviewed', value: '12', icon: BookOpen, color: 'text-chart-1' },
        { label: 'Support Tickets', value: '5', icon: Award, color: 'text-chart-2' },
      ];
    }
    if (isInstructor) {
      return [
        { label: 'Courses Created', value: '8', icon: BookOpen, color: 'text-primary' },
        { label: 'Total Students', value: '342', icon: Users, color: 'text-accent' },
        { label: 'Total Earnings', value: '₹1.2L', icon: DollarSign, color: 'text-chart-1' },
        { label: 'Avg Rating', value: '4.8', icon: Award, color: 'text-chart-2' },
      ];
    }
    return [
      { label: 'Courses Enrolled', value: '5', icon: BookOpen, color: 'text-primary' },
      { label: 'Completed', value: '2', icon: Award, color: 'text-accent' },
      { label: 'In Progress', value: '3', icon: Clock, color: 'text-chart-1' },
      { label: 'Certificates', value: '2', icon: Award, color: 'text-chart-2' },
    ];
  };

  const stats = getStats();

  // Role-specific permissions display
  const getPermissions = () => {
    if (isAdmin) {
      return [
        'Manage all users (Sub-Admins, Instructors, Students)',
        'Create and manage courses and content',
        'Access all analytics and reports',
        'Configure platform settings',
        'Manage billing and payments',
        'Access audit logs',
      ];
    }
    if (isSubAdmin) {
      return [
        'Manage Instructors and Students',
        'Review and approve courses',
        'Access user analytics',
        'Handle support tickets',
        'Moderate content',
      ];
    }
    if (isInstructor) {
      return [
        'Create and manage own courses',
        'View enrolled students',
        'Track course analytics',
        'Manage course pricing',
        'Access earnings dashboard',
      ];
    }
    return [
      'Access enrolled courses',
      'Track learning progress',
      'Download certificates',
      'Manage profile settings',
    ];
  };

  const permissions = getPermissions();

  // Determine tabs based on role
  const getTabsList = () => {
    if (isAdmin) {
      return (
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto gap-1">
          <TabsTrigger value="personal" className="text-xs sm:text-sm">
            <User className="w-4 h-4 mr-1 hidden sm:inline" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="permissions" className="text-xs sm:text-sm">
            <Shield className="w-4 h-4 mr-1 hidden sm:inline" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">
            <Bell className="w-4 h-4 mr-1 hidden sm:inline" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">
            <Key className="w-4 h-4 mr-1 hidden sm:inline" />
            Security
          </TabsTrigger>
          <TabsTrigger value="white-label" className="text-xs sm:text-sm">
            <Palette className="w-4 h-4 mr-1 hidden sm:inline" />
            White Label
          </TabsTrigger>
          <TabsTrigger value="organization" className="text-xs sm:text-sm">
            <Building2 className="w-4 h-4 mr-1 hidden sm:inline" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="platform" className="text-xs sm:text-sm">
            <Settings className="w-4 h-4 mr-1 hidden sm:inline" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="seo" className="text-xs sm:text-sm">
            <Globe className="w-4 h-4 mr-1 hidden sm:inline" />
            SEO
          </TabsTrigger>
        </TabsList>
      );
    }
    return (
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
        <TabsTrigger value="personal">
          <User className="w-4 h-4 mr-2 hidden sm:inline" />
          Personal
        </TabsTrigger>
        <TabsTrigger value="permissions">
          <Shield className="w-4 h-4 mr-2 hidden sm:inline" />
          Permissions
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="w-4 h-4 mr-2 hidden sm:inline" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security">
          <Key className="w-4 h-4 mr-2 hidden sm:inline" />
          Security
        </TabsTrigger>
      </TabsList>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-heading font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">{roleDisplayNames[currentRole]}</Badge>
                    <Badge variant="outline" className="text-accent border-accent">Active</Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{roleDescriptions[currentRole]}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        {getTabsList()}

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Row 1: Name, Email (Admin can edit email) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing || !isAdmin}
                    />
                  </div>
                  {!isAdmin && <p className="text-xs text-muted-foreground">Contact admin to change email</p>}
                </div>
              </div>

              {/* Row 2: Role (Admin editable), User Type */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  {isAdmin && isEditing ? (
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select role" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="role"
                        value={roleOptions.find(r => r.value === formData.role)?.label || formData.role}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    value={formData.userType}
                    onValueChange={(value) => setFormData({ ...formData, userType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <UserCog className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select user type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {userTypeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex flex-col">
                            <span>{type.label}</span>
                            <span className="text-xs text-muted-foreground">{type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3: Primary Phone, Alternate Phone (Numeric only) */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange('phone', e.target.value)}
                      className="pl-10"
                      placeholder="+91 98765 43210"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="alternatePhone"
                      type="tel"
                      inputMode="tel"
                      value={formData.alternatePhone}
                      onChange={(e) => handlePhoneChange('alternatePhone', e.target.value)}
                      className="pl-10"
                      placeholder="+91 98765 43210"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Gender, Currently In */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentlyIn">Currently In</Label>
                  <Select
                    value={formData.currentlyIn}
                    onValueChange={(value) => setFormData({ ...formData, currentlyIn: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select current status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-popover max-h-80">
                      {Object.entries(groupedCurrentlyIn).map(([category, options]) => (
                        <SelectGroup key={category}>
                          <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {category}
                          </SelectLabel>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 5: Nationality (with flags), Organization/Institution */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select nationality">
                          {formData.nationality && (
                            <span className="flex items-center gap-2">
                              <span>{nationalities.find(n => n.code === formData.nationality)?.flag}</span>
                              <span>{nationalities.find(n => n.code === formData.nationality)?.name}</span>
                            </span>
                          )}
                        </SelectValue>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-popover max-h-80">
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality.code} value={nationality.code}>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{nationality.flag}</span>
                            <span>{nationality.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization / Institution</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="pl-10"
                      placeholder="Company, University, School..."
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 6: Designation, Status */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation / Role</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="pl-10"
                      placeholder="Student, Engineer, Manager..."
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
                  <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-muted/50">
                    <Badge variant={formData.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {formData.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Since {new Date(formData.dateJoined).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Section */}
              <div>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address Information
                </h3>
                
                {/* Address Lines */}
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="Street address, P.O. box"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      placeholder="Apartment, suite, unit"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Country, State, City, Postal Code */}
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={handleCountryChange}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country">
                          {formData.country && (
                            <span className="flex items-center gap-2">
                              <span>{countries.find(c => c.code === formData.country)?.flag}</span>
                              <span className="truncate">{countries.find(c => c.code === formData.country)?.name}</span>
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-80">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span className="text-lg">{country.flag}</span>
                              <span>{country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Select
                      value={formData.state}
                      onValueChange={handleStateChange}
                      disabled={!isEditing || availableStates.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={availableStates.length > 0 ? "Select state" : "N/A"} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-60">
                        {availableStates.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                      disabled={!isEditing || availableCities.length === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={availableCities.length > 0 ? "Select city" : "N/A"} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-60">
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value.replace(/[^0-9A-Za-z\s-]/g, '') })}
                      placeholder="123456"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Timestamps Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Profile Created</Label>
                  <p className="text-sm">{new Date(formData.profileCreatedAt).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Last Updated</Label>
                  <p className="text-sm">{formData.profileUpdatedAt ? new Date(formData.profileUpdatedAt).toLocaleString() : 'Never'}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Social Links</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="pl-10"
                        placeholder="https://yourwebsite.com"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="pl-10"
                        placeholder="linkedin.com/in/username"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        className="pl-10"
                        placeholder="@username"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Role & Permissions
              </CardTitle>
              <CardDescription>
                Your current role and what you can do on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{roleDisplayNames[currentRole]}</h3>
                    <p className="text-sm text-muted-foreground">{roleDescriptions[currentRole]}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Your Permissions</h4>
                <ul className="space-y-2">
                  {permissions.map((permission, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              {(isAdmin || isSubAdmin) && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium mb-3">User Management Capabilities</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Can Invite</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {isAdmin && <Badge variant="secondary">Sub-Admin</Badge>}
                          <Badge variant="secondary">Instructor</Badge>
                          <Badge variant="secondary">Student</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Can Manage</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {isAdmin && <Badge variant="secondary">Sub-Admin</Badge>}
                          <Badge variant="secondary">Instructor</Badge>
                          <Badge variant="secondary">Student</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Course Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about course changes and updates</p>
                  </div>
                  <Switch
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                  />
                </div>
                {(isAdmin || isSubAdmin || isInstructor) && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Enrollments</p>
                        <p className="text-sm text-muted-foreground">Get notified when students enroll</p>
                      </div>
                      <Switch
                        checked={notifications.newEnrollments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newEnrollments: checked })}
                      />
                    </div>
                  </>
                )}
                {(isAdmin || isInstructor) && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Alerts</p>
                        <p className="text-sm text-muted-foreground">Notifications about payments and earnings</p>
                      </div>
                      <Switch
                        checked={notifications.paymentAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                      />
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive tips, product updates and offers</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Key className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setShowChangePassword(true)}>
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${twoFactorEnabled ? 'bg-accent/10' : 'bg-muted'}`}>
                      <Shield className={`w-5 h-5 ${twoFactorEnabled ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Two-Factor Authentication</p>
                        {twoFactorEnabled && (
                          <Badge variant="outline" className="text-accent border-accent text-xs">
                            Enabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorEnabled
                          ? 'Your account is protected with 2FA'
                          : 'Add an extra layer of security to your account'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={twoFactorEnabled ? 'outline' : 'default'}
                    onClick={() => setShowTwoFactor(true)}
                  >
                    {twoFactorEnabled ? 'Manage' : 'Enable'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage devices where you're logged in</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setShowActiveSessions(true)}>
                    View Sessions
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-destructive mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Danger Zone
                </h4>
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={() => setShowDeleteAccount(true)}>
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin-only tabs */}
        {isAdmin && (
          <>
            {/* White Label Settings */}
            <TabsContent value="white-label" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Brand Identity
                  </CardTitle>
                  <CardDescription>
                    Customize your platform's appearance and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input
                        id="platform-name"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        placeholder="Your Platform Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input
                        id="support-email"
                        type="email"
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        placeholder="support@example.com"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Platform Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted overflow-hidden">
                          {platformLogo ? (
                            <img src={platformLogo} alt="Logo" className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <Button size="sm" variant="outline" asChild>
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                              <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoUpload}
                              />
                            </label>
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Recommended: 200x50px, PNG/SVG
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Favicon</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded border-2 border-dashed flex items-center justify-center bg-muted">
                          <Chrome className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <Button size="sm" variant="outline">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Favicon
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            32x32px or 64x64px
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Brand Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="h-10 w-20"
                        />
                        <Input
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          placeholder="#6366f1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Brand Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="h-10 w-20"
                        />
                        <Input
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          placeholder="#8b5cf6"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Footer Copyright Text</Label>
                    <Input
                      id="footer-text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      placeholder="© 2024 Your Platform"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
                    <Textarea
                      id="custom-css"
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="/* Your custom CSS here */"
                      rows={6}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add custom CSS to further customize your platform's appearance
                    </p>
                  </div>

                  <Button onClick={() => handleSectionSave("White Label")} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Branding Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organization Settings */}
            <TabsContent value="organization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Information
                  </CardTitle>
                  <CardDescription>
                    Manage your organization's details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="org-email">Organization Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="org-email"
                          type="email"
                          value={orgEmail}
                          onChange={(e) => setOrgEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-phone">Organization Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="org-phone"
                          value={orgPhone}
                          onChange={(e) => setOrgPhone(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="org-website"
                        value={orgWebsite}
                        onChange={(e) => setOrgWebsite(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="org-address"
                        value={orgAddress}
                        onChange={(e) => setOrgAddress(e.target.value)}
                        rows={3}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-description">Organization Description</Label>
                    <Textarea
                      id="org-description"
                      value={orgDescription}
                      onChange={(e) => setOrgDescription(e.target.value)}
                      rows={4}
                      placeholder="Brief description of your organization..."
                    />
                  </div>

                  <Button onClick={() => handleSectionSave("Organization")} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Organization Details
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platform Settings */}
            <TabsContent value="platform" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      User Registration & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-registration">Enable User Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
                      </div>
                      <Switch
                        id="enable-registration"
                        checked={enableRegistration}
                        onCheckedChange={setEnableRegistration}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-verification">Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">Users must verify their email</p>
                      </div>
                      <Switch
                        id="email-verification"
                        checked={requireEmailVerification}
                        onCheckedChange={setRequireEmailVerification}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="social-login">Social Login</Label>
                        <p className="text-sm text-muted-foreground">Google, Facebook, LinkedIn</p>
                      </div>
                      <Switch
                        id="social-login"
                        checked={enableSocialLogin}
                        onCheckedChange={setEnableSocialLogin}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Localization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="multi-language">Multi-Language Support</Label>
                        <p className="text-sm text-muted-foreground">Enable multiple languages</p>
                      </div>
                      <Switch
                        id="multi-language"
                        checked={enableMultiLanguage}
                        onCheckedChange={setEnableMultiLanguage}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="default-language">Default Language</Label>
                        <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                          <SelectTrigger id="default-language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={platformTimezone} onValueChange={setPlatformTimezone}>
                          <SelectTrigger id="timezone">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                            <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payments & Monetization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-payments">Enable Payments</Label>
                        <p className="text-sm text-muted-foreground">Accept course payments</p>
                      </div>
                      <Switch
                        id="enable-payments"
                        checked={enablePayments}
                        onCheckedChange={setEnablePayments}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Platform Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-notifications">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">Email & in-app notifications</p>
                      </div>
                      <Switch
                        id="enable-notifications"
                        checked={enableNotifications}
                        onCheckedChange={setEnableNotifications}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={() => handleSectionSave("Platform")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Platform Settings
                </Button>
              </div>
            </TabsContent>

            {/* SEO Settings */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    SEO & Meta Information
                  </CardTitle>
                  <CardDescription>
                    Optimize your platform for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground">
                      {metaTitle.length}/60 characters - Keep under 60 for optimal display
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground">
                      {metaDescription.length}/160 characters - Keep under 160 for optimal display
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-keywords">Meta Keywords</Label>
                    <Input
                      id="meta-keywords"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-muted-foreground">
                      Comma-separated keywords relevant to your platform
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Open Graph Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-32 w-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
                        {ogImage ? (
                          <img src={ogImage} alt="OG" className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          1200x630px recommended for social sharing
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSectionSave("SEO")} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save SEO Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Security Modals */}
      <ChangePasswordModal
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />
      <TwoFactorModal
        open={showTwoFactor}
        onOpenChange={setShowTwoFactor}
        isEnabled={twoFactorEnabled}
        onToggle={setTwoFactorEnabled}
      />
      <ActiveSessionsModal
        open={showActiveSessions}
        onOpenChange={setShowActiveSessions}
      />
      <DeleteAccountModal
        open={showDeleteAccount}
        onOpenChange={setShowDeleteAccount}
      />
    </div>
  );
}
