import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RoleGuard } from '@/components/Auth/RoleGuard';
import { useUser } from '@/hooks/useUsers';
import { toast } from 'sonner';
import { ArrowLeft, User, Upload, Loader2 } from 'lucide-react';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
];

export default function EditUser() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUser(userId || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const user = userData?.data;
  const userRole = user?.role || 'student';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    bio: '',
    organization: '',
    designation: '',
    location: '',
    timezone: 'Asia/Kolkata (GMT+5:30)',
    language: 'English',
    website: '',
    linkedin: '',
    twitter: '',
    // Student-specific fields
    alternatePhone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    gender: '' as '' | 'Male' | 'Female' | 'Other',
    nationality: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone?.replace(/^\+\d+/, '') || '',
        bio: 'wwe',
        organization: 'EdTech Solutions Pvt Ltd',
        designation: userRole === 'instructor' ? 'Senior Instructor' : userRole === 'sub_admin' ? 'Content Manager' : 'Student',
        location: 'Mumbai, India',
        // Student-specific mock data
        alternatePhone: '9810189606',
        addressLine1: 'H-20, Jaypee wish town',
        addressLine2: 'Sector-132',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        postalCode: '201301',
        gender: 'Male',
        nationality: 'Indian',
      }));
      setAvatar(user.avatar || null);
    }
  }, [user, userRole]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('User updated successfully');
      navigate(`/app/users/${userId}`);
    } catch (error) {
      toast.error('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleDisplayName = () => {
    const names: Record<string, string> = {
      admin: 'Administrator',
      sub_admin: 'Sub Administrator',
      instructor: 'Instructor',
      student: 'Student',
    };
    return names[userRole] || userRole;
  };

  const getBackPath = () => {
    if (userRole === 'sub_admin') return '/app/users/sub-admins';
    if (userRole === 'instructor') return '/app/users/instructors';
    return '/app/users/students';
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

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin']}>
      <div className="space-y-6">
        {/* Back Link */}
        <Button
          variant="link"
          className="p-0 h-auto text-primary"
          onClick={() => navigate(`/app/users/${userId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back To {getRoleDisplayName()} Details
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Edit {getRoleDisplayName()}</h1>
          <p className="text-muted-foreground">
            Update {getRoleDisplayName().toLowerCase()} information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="uppercase text-xs font-semibold">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="uppercase text-xs font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="uppercase text-xs font-semibold">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={value => handleInputChange('countryCode', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map(({ code }) => (
                          <SelectItem key={code} value={code}>
                            {code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="uppercase text-xs font-semibold">Role</Label>
                  <div className="px-3 py-2 border rounded-md bg-muted text-sm">
                    {getRoleDisplayName()}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="uppercase text-xs font-semibold">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Enter bio"
                    value={formData.bio}
                    onChange={e => handleInputChange('bio', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Student-specific fields */}
            {userRole === 'student' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone" className="uppercase text-xs font-semibold">
                        Alternate Number
                      </Label>
                      <Input
                        id="alternatePhone"
                        placeholder="Enter alternate number"
                        value={formData.alternatePhone}
                        onChange={e => handleInputChange('alternatePhone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="uppercase text-xs font-semibold">
                        Gender
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={value => handleInputChange('gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="addressLine1" className="uppercase text-xs font-semibold">
                      Address Line 1
                    </Label>
                    <Input
                      id="addressLine1"
                      placeholder="Enter address line 1"
                      value={formData.addressLine1}
                      onChange={e => handleInputChange('addressLine1', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2" className="uppercase text-xs font-semibold">
                      Address Line 2
                    </Label>
                    <Input
                      id="addressLine2"
                      placeholder="Enter address line 2"
                      value={formData.addressLine2}
                      onChange={e => handleInputChange('addressLine2', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="uppercase text-xs font-semibold">
                        City
                      </Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={e => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="uppercase text-xs font-semibold">
                        State
                      </Label>
                      <Input
                        id="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={e => handleInputChange('state', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="uppercase text-xs font-semibold">
                        Country
                      </Label>
                      <Input
                        id="country"
                        placeholder="Enter country"
                        value={formData.country}
                        onChange={e => handleInputChange('country', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="uppercase text-xs font-semibold">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={formData.postalCode}
                        onChange={e => handleInputChange('postalCode', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="uppercase text-xs font-semibold">
                      Nationality
                    </Label>
                    <Input
                      id="nationality"
                      placeholder="Enter nationality"
                      value={formData.nationality}
                      onChange={e => handleInputChange('nationality', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor/Sub-admin specific fields */}
            {(userRole === 'instructor' || userRole === 'sub_admin') && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="uppercase text-xs font-semibold">
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        placeholder="Enter organization"
                        value={formData.organization}
                        onChange={e => handleInputChange('organization', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation" className="uppercase text-xs font-semibold">
                        Designation
                      </Label>
                      <Input
                        id="designation"
                        placeholder="Enter designation"
                        value={formData.designation}
                        onChange={e => handleInputChange('designation', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="uppercase text-xs font-semibold">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={e => handleInputChange('location', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="uppercase text-xs font-semibold">
                        Timezone
                      </Label>
                      <Input
                        id="timezone"
                        placeholder="Enter timezone"
                        value={formData.timezone}
                        onChange={e => handleInputChange('timezone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="uppercase text-xs font-semibold">
                      Language
                    </Label>
                    <Input
                      id="language"
                      placeholder="Enter language"
                      value={formData.language}
                      onChange={e => handleInputChange('language', e.target.value)}
                    />
                  </div>

                  <Separator />

                  <h4 className="font-medium">Social Links</h4>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="uppercase text-xs font-semibold">
                      Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={e => handleInputChange('website', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="uppercase text-xs font-semibold">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={e => handleInputChange('linkedin', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="uppercase text-xs font-semibold">
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="@username"
                        value={formData.twitter}
                        onChange={e => handleInputChange('twitter', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/app/users/${userId}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Avatar Upload */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-40 w-40 border-4 border-primary/20">
                    <AvatarImage src={avatar || undefined} alt="Avatar" />
                    <AvatarFallback className="bg-primary/10">
                      <User className="h-20 w-20 text-primary/40" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="avatar-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose file
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {avatar ? 'File chosen' : 'No file chosen'}
                    </span>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
