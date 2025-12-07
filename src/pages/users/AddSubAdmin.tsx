import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useToast } from '@/hooks/use-toast';
import { getDefaultSubAdminPermissions, PermissionCategory } from '@/types/permissions';
import { ArrowLeft, User, Upload, Loader2 } from 'lucide-react';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
];

export default function AddSubAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    countryCode: '+91',
    notifyUser: true,
  });
  
  const [avatar, setAvatar] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<PermissionCategory[]>(getDefaultSubAdminPermissions());
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const togglePermission = (categoryId: string, permissionId: string) => {
    setPermissions(prev => 
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            permissions: category.permissions.map(perm => {
              if (perm.id === permissionId) {
                return { ...perm, enabled: !perm.enabled };
              }
              return perm;
            }),
          };
        }
        return category;
      })
    );
  };

  const toggleAllInCategory = (categoryId: string, enabled: boolean) => {
    setPermissions(prev =>
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            permissions: category.permissions.map(perm => ({ ...perm, enabled })),
          };
        }
        return category;
      })
    );
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

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call - will be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Sub-Admin Created',
        description: `${formData.name} has been added as a Sub-Admin successfully.`,
      });
      
      navigate('/app/users/sub-admins');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create Sub-Admin. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Back Link */}
        <Button
          variant="link"
          className="p-0 h-auto text-primary"
          onClick={() => navigate('/app/users/sub-admins')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back To SubAdmin home
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Add SubAdmin</h1>
          <p className="text-muted-foreground">
            Add SubAdmin by giving email and password
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
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
                  placeholder="Enter email (e.g., user@domain.com)"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  Validation will occur after you finish editing.
                </p>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="uppercase text-xs font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="uppercase text-xs font-semibold">
                  Phone Number <span className="text-destructive">*</span>
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
                      {countryCodes.map(({ code, country }) => (
                        <SelectItem key={code} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className={`flex-1 ${errors.phone ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Notify Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="notify"
                  checked={formData.notifyUser}
                  onCheckedChange={checked => 
                    setFormData(prev => ({ ...prev, notifyUser: checked as boolean }))
                  }
                />
                <Label htmlFor="notify" className="text-sm cursor-pointer">
                  Notify user about account creation as SubAdmin
                </Label>
              </div>
            </div>

            <Separator />

            {/* Permissions Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-primary">Set Permissions</h2>
              
              {permissions.map(category => (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{category.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        const allEnabled = category.permissions.every(p => p.enabled);
                        toggleAllInCategory(category.id, !allEnabled);
                      }}
                    >
                      {category.permissions.every(p => p.enabled) ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {category.permissions.map(permission => (
                      <div key={permission.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={permission.id}
                          checked={permission.enabled}
                          onCheckedChange={() => togglePermission(category.id, permission.id)}
                          className="mt-0.5"
                        />
                        <Label 
                          htmlFor={permission.id} 
                          className="text-sm cursor-pointer leading-relaxed"
                        >
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/app/users/sub-admins')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add'
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
