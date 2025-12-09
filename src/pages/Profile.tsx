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
} from 'lucide-react';
import { ChangePasswordModal } from '@/components/Profile/ChangePasswordModal';
import { TwoFactorModal } from '@/components/Profile/TwoFactorModal';
import { ActiveSessionsModal } from '@/components/Profile/ActiveSessionsModal';
import { DeleteAccountModal } from '@/components/Profile/DeleteAccountModal';

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
    role: 'Student',
    dateJoined: '2024-02-15T00:00:00Z',
    status: 'Active',
    createdBy: '45542',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    nationality: '',
    bio: '',
    gender: '',
    profileCreatedAt: '2024-02-15T00:00:00Z',
    profileCreatedBy: '45542',
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

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    newEnrollments: true,
    paymentAlerts: true,
    marketingEmails: false,
  });

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

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Row 1: Name, Email */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
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
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Role, Primary Number */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="role"
                      value={formData.role}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Date Joined, Status */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateJoined">Date Joined</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateJoined"
                      value={formData.dateJoined}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    className="pl-3"
                    disabled
                  />
                </div>
              </div>

              {/* Row 4: Created By, Address Line 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="createdBy">Created By</Label>
                  <Input
                    id="createdBy"
                    value={formData.createdBy}
                    className="pl-3"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="pl-10"
                      placeholder="Enter address"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Address Line 2, Alternate Number */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="pl-10"
                      placeholder="Enter address"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                      className="pl-10"
                      placeholder="Enter alternate number"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 6: City, State */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Enter state"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Row 7: Postal Code, Country */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="Enter postal code"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="pl-10"
                      placeholder="Enter country"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Row 8: Nationality, Bio */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="pl-10"
                      placeholder="Enter nationality"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Enter bio"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Row 9: Profile Created At, Profile Created By */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profileCreatedAt">Profile Created At</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="profileCreatedAt"
                      value={formData.profileCreatedAt}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileCreatedBy">Profile Created By</Label>
                  <Input
                    id="profileCreatedBy"
                    value={formData.profileCreatedBy}
                    disabled
                  />
                </div>
              </div>

              {/* Row 10: Profile Updated At, Gender */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profileUpdatedAt">Profile Updated At</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="profileUpdatedAt"
                      value={formData.profileUpdatedAt || 'Not Provided'}
                      className="pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    placeholder="Enter gender"
                    disabled={!isEditing}
                  />
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