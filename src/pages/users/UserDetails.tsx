import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { UserStatusBadge } from '@/components/Users/UserStatusBadge';
import { PermissionGuard } from '@/components/Auth/RoleGuard';
import { useUser } from '@/hooks/useUsers';
import { useUsers } from '@/hooks/useUsers';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Trash2,
  Edit,
  Shield,
  BookOpen,
  Users,
  DollarSign,
  Award,
  Globe,
  Linkedin,
  Twitter,
  Building,
  MapPin,
  Smartphone,
  Package,
  ExternalLink,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUser(userId || '');
  const [deviceToRemove, setDeviceToRemove] = useState<string | null>(null);

  const user = userData?.data;
  const userRole = user?.role || 'student';

  const { activateUser, deactivateUser, deleteUser, isUpdating, isDeleting } =
    useUsers(userRole as 'sub_admin' | 'instructor' | 'student');

  // Mock student-specific data
  const enrolledCourses = [
    { courseId: '115', courseTitle: 'Free GS Quiz', type: 'Free', status: 'Active', expiresAt: '2026-10-30' },
    { courseId: '116', courseTitle: 'Free Geology Quiz', type: 'Free', status: 'Active', expiresAt: '2026-10-08' },
    { courseId: '120', courseTitle: 'IIT-JAM 2025-26 Test Series', type: 'Paid', status: 'Active', expiresAt: '2026-11-01' },
  ];

  const enrolledPackages = [
    { packageId: '201', packageName: 'Complete GATE Package', coursesIncluded: 5, status: 'Active', expiresAt: '2026-12-31' },
  ];

  const activeDevices = [
    { deviceId: '3067', deviceName: 'Android Device', lastLogin: '03/12/2025, 13:41:26', location: 'Not Shared' },
    { deviceId: '3068', deviceName: 'Chrome Browser', lastLogin: '02/12/2025, 10:15:00', location: 'Mumbai, India' },
  ];

  const handleActivate = async () => {
    if (userId) {
      await activateUser(userId);
    }
  };

  const handleDeactivate = async () => {
    if (userId) {
      await deactivateUser(userId);
    }
  };

  const handleDelete = async () => {
    if (userId) {
      await deleteUser(userId);
      navigate(-1);
    }
  };

  const handleRemoveDevice = () => {
    if (deviceToRemove) {
      toast.success('Device removed successfully');
      setDeviceToRemove(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const roleDisplayNames: Record<string, string> = {
    admin: 'Administrator',
    sub_admin: 'Sub Administrator',
    instructor: 'Instructor',
    student: 'Student',
  };

  const roleDescriptions: Record<string, string> = {
    admin: 'Full access to all platform features and settings.',
    sub_admin: 'Manage instructors, students, and content with limited admin access.',
    instructor: 'Create courses, manage students, and track earnings.',
    student: 'Access enrolled courses and track learning progress.',
  };

  // Get role-specific stats
  const getStats = () => {
    if (userRole === 'instructor') {
      return [
        { label: 'Courses Created', value: '8', icon: BookOpen, color: 'text-primary' },
        { label: 'Total Students', value: '342', icon: Users, color: 'text-accent' },
        { label: 'Total Earnings', value: '₹1.2L', icon: DollarSign, color: 'text-chart-1' },
        { label: 'Avg Rating', value: '4.8', icon: Award, color: 'text-chart-2' },
      ];
    }
    if (userRole === 'student') {
      return [
        { label: 'Courses Enrolled', value: '5', icon: BookOpen, color: 'text-primary' },
        { label: 'Completed', value: '2', icon: Award, color: 'text-accent' },
        { label: 'In Progress', value: '3', icon: Clock, color: 'text-chart-1' },
        { label: 'Certificates', value: '2', icon: Award, color: 'text-chart-2' },
      ];
    }
    if (userRole === 'sub_admin') {
      return [
        { label: 'Users Managed', value: '245', icon: Users, color: 'text-primary' },
        { label: 'Actions Today', value: '18', icon: Clock, color: 'text-accent' },
        { label: 'Courses Reviewed', value: '12', icon: BookOpen, color: 'text-chart-1' },
        { label: 'Support Tickets', value: '5', icon: Award, color: 'text-chart-2' },
      ];
    }
    return [];
  };

  // Get role-specific permissions
  const getPermissions = () => {
    if (userRole === 'sub_admin') {
      return [
        'Manage Instructors and Students',
        'Review and approve courses',
        'Access user analytics',
        'Handle support tickets',
        'Moderate content',
      ];
    }
    if (userRole === 'instructor') {
      return [
        'Create and manage own courses',
        'View enrolled students',
        'Track course analytics',
        'Manage course pricing',
        'Access earnings dashboard',
      ];
    }
    if (userRole === 'student') {
      return [
        'Access enrolled courses',
        'Track learning progress',
        'Download certificates',
        'Manage profile settings',
      ];
    }
    return [];
  };

  const stats = getStats();
  const permissions = getPermissions();

  // Mock profile data
  const profileData = {
    bio: 'Passionate educator with 10+ years of experience in online teaching. Specialized in web development and digital marketing.',
    organization: 'EdTech Solutions Pvt Ltd',
    designation: userRole === 'instructor' ? 'Senior Instructor' : userRole === 'sub_admin' ? 'Content Manager' : 'Student',
    location: 'Mumbai, India',
    website: 'https://example.com',
    linkedin: 'linkedin.com/in/johndoe',
    twitter: '@johndoe',
    expertise: userRole === 'instructor' ? ['Web Development', 'React', 'Node.js', 'Digital Marketing'] : [],
    timezone: 'Asia/Kolkata (GMT+5:30)',
    language: 'English, Hindi',
  };

  // Student-specific profile data
  const studentProfileData = {
    primaryNumber: user.phone || '+919810189609',
    alternateNumber: '9810189606',
    createdBy: '45542',
    addressLine1: 'H-20, Jaypee wish town',
    addressLine2: 'Sector-132',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    postalCode: '201301',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    nationality: 'Indian',
    bio: 'wwe',
    profileCreatedAt: user.joinedAt,
    profileUpdatedAt: null as string | null,
  };

  // Mock activity data
  const activities = [
    { action: 'Logged in', time: '2 hours ago', type: 'auth' },
    { action: userRole === 'instructor' ? 'Created new course' : 'Enrolled in course', time: '1 day ago', type: 'course' },
    { action: 'Updated profile', time: '3 days ago', type: 'profile' },
    { action: userRole === 'instructor' ? 'Published assignment' : 'Completed quiz', time: '1 week ago', type: 'activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* User Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{profileData.designation}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {roleDisplayNames[user.role] || user.role}
                    </Badge>
                    <UserStatusBadge status={user.status} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <PermissionGuard permission="users:manage">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/app/users/${userId}/edit`)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </PermissionGuard>

                  <PermissionGuard permission="users:manage">
                    {user.status !== 'active' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleActivate}
                        disabled={isUpdating}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeactivate}
                        disabled={isUpdating}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
                      </Button>
                    )}
                  </PermissionGuard>

                  <PermissionGuard permission="users:delete">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </PermissionGuard>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {format(new Date(user.joinedAt), 'MMM d, yyyy')}</span>
                </div>
                {user.lastActive && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Active{' '}
                      {formatDistanceToNow(new Date(user.lastActive), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
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
      )}

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {userRole === 'student' && (
            <>
              <TabsTrigger value="courses">Enrolled Courses</TabsTrigger>
              <TabsTrigger value="packages">Enrolled Packages</TabsTrigger>
              <TabsTrigger value="devices">Active Devices</TabsTrigger>
            </>
          )}
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Detailed information about this user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Details Section */}
              {userRole === 'student' && (
                <>
                  <div>
                    <h4 className="font-medium mb-4">Student Details</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Role</p>
                          <p className="font-medium capitalize">{roleDisplayNames[user.role] || user.role}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Primary Number</p>
                          <p className="font-medium">{studentProfileData.primaryNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Date Joined</p>
                          <p className="font-medium">{format(new Date(user.joinedAt), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-medium capitalize">{user.status}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Created By</p>
                          <p className="font-medium">{studentProfileData.createdBy}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Address Line 1</p>
                          <p className="font-medium">{studentProfileData.addressLine1}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Address Line 2</p>
                          <p className="font-medium">{studentProfileData.addressLine2}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Alternate Number</p>
                          <p className="font-medium">{studentProfileData.alternateNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* More Details */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium">{studentProfileData.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="font-medium">{studentProfileData.state}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Postal Code</p>
                        <p className="font-medium">{studentProfileData.postalCode}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{studentProfileData.country}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Nationality</p>
                        <p className="font-medium">{studentProfileData.nationality}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Bio</p>
                        <p className="font-medium">{studentProfileData.bio}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Created At</p>
                        <p className="font-medium">{format(new Date(studentProfileData.profileCreatedAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Created By</p>
                        <p className="font-medium">{studentProfileData.createdBy}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Updated At</p>
                        <p className="font-medium">{studentProfileData.profileUpdatedAt ? format(new Date(studentProfileData.profileUpdatedAt), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") : 'Not Provided'}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Gender */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{studentProfileData.gender}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Non-student profile (Instructor/Sub-admin) */}
              {userRole !== 'student' && (
                <>
                  {/* Bio */}
                  <div>
                    <h4 className="font-medium mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                  </div>

                  <Separator />

                  {/* Details Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-medium">{profileData.organization}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{profileData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Timezone</p>
                        <p className="font-medium">{profileData.timezone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">{profileData.language}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Social Links</h4>
                    <div className="flex flex-wrap gap-3">
                      <a href={profileData.website} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Website</span>
                      </a>
                      <a href={`https://${profileData.linkedin}`} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <Linkedin className="h-4 w-4" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <a href={`https://twitter.com/${profileData.twitter.replace('@', '')}`} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <Twitter className="h-4 w-4" />
                        <span className="text-sm">Twitter</span>
                      </a>
                    </div>
                  </div>

                  {/* Expertise (for instructors) */}
                  {profileData.expertise.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-3">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {profileData.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enrolled Courses Tab - Only for Students */}
        {userRole === 'student' && (
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription>Courses this student is enrolled in</CardDescription>
              </CardHeader>
              <CardContent>
                {enrolledCourses.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Course ID</TableHead>
                          <TableHead>Course Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expires At</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrolledCourses.map((course) => (
                          <TableRow key={course.courseId}>
                            <TableCell className="font-medium">{course.courseId}</TableCell>
                            <TableCell>{course.courseTitle}</TableCell>
                            <TableCell>{course.type}</TableCell>
                            <TableCell>
                              <Badge variant="default">{course.status}</Badge>
                            </TableCell>
                            <TableCell>{course.expiresAt}</TableCell>
                            <TableCell className="text-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No enrolled courses found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Enrolled Packages Tab - Only for Students */}
        {userRole === 'student' && (
          <TabsContent value="packages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Enrolled Packages
                </CardTitle>
                <CardDescription>Packages this student has purchased</CardDescription>
              </CardHeader>
              <CardContent>
                {enrolledPackages.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Package ID</TableHead>
                          <TableHead>Package Name</TableHead>
                          <TableHead>Courses Included</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Expires At</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enrolledPackages.map((pkg) => (
                          <TableRow key={pkg.packageId}>
                            <TableCell className="font-medium">{pkg.packageId}</TableCell>
                            <TableCell>{pkg.packageName}</TableCell>
                            <TableCell>{pkg.coursesIncluded}</TableCell>
                            <TableCell>
                              <Badge variant="default">{pkg.status}</Badge>
                            </TableCell>
                            <TableCell>{pkg.expiresAt}</TableCell>
                            <TableCell className="text-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No enrolled packages found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Active Devices Tab - Only for Students */}
        {userRole === 'student' && (
          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  Active Devices
                </CardTitle>
                <CardDescription>Devices where this student is logged in</CardDescription>
              </CardHeader>
              <CardContent>
                {activeDevices.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Device ID</TableHead>
                          <TableHead>Device Name</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeDevices.map((device) => (
                          <TableRow key={device.deviceId}>
                            <TableCell className="font-medium">{device.deviceId}</TableCell>
                            <TableCell>{device.deviceName}</TableCell>
                            <TableCell>{device.lastLogin}</TableCell>
                            <TableCell>{device.location}</TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => setDeviceToRemove(device.deviceId)}
                              >
                                Remove Device
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No active devices found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Role & Permissions
              </CardTitle>
              <CardDescription>
                {roleDescriptions[userRole]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{roleDisplayNames[userRole]}</h3>
                    <p className="text-sm text-muted-foreground">{roleDescriptions[userRole]}</p>
                  </div>
                </div>
              </div>

              {permissions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Granted Permissions</h4>
                  <ul className="space-y-2">
                    {permissions.map((permission, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(userRole === 'sub_admin') && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium mb-3">User Management Capabilities</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Can Invite</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="secondary">Instructor</Badge>
                          <Badge variant="secondary">Student</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Can Manage</p>
                        <div className="flex flex-wrap gap-1 mt-2">
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

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Activity history for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-6">
                Full activity timeline will be available when connected to the backend.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Remove Device Confirmation Dialog */}
      <AlertDialog open={!!deviceToRemove} onOpenChange={() => setDeviceToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Device</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this device? The user will be logged out from this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveDevice} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}