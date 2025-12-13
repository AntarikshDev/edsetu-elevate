import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { RoleGuard } from '@/components/Auth/RoleGuard';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';
import { CountrySelect } from '@/components/ui/country-select';
import { TimezoneSelect } from '@/components/ui/timezone-select';
import { LanguageSelect } from '@/components/ui/language-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { getGroupedCurrentlyInOptions } from '@/data/profileData';

export default function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const groupedCurrentlyIn = getGroupedCurrentlyInOptions();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    phoneCountryCode: 'US',
    phoneDialCode: '+1',
    nationality: '',
    timezone: '',
    language: '',
    currentlyIn: '',
  });

  const [notifyUser, setNotifyUser] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string, countryCode: string, dialCode: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value,
      phoneCountryCode: countryCode,
      phoneDialCode: dialCode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Student added successfully');
    navigate('/app/users/students');
    setIsSubmitting(false);
  };

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin', 'instructor']}>
      <div className="space-y-6 max-w-2xl">
        {/* Back Link */}
        <button 
          onClick={() => navigate('/app/users/students')}
          className="flex items-center gap-1 text-primary hover:underline text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Student home
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Add Student</h1>
          <p className="text-muted-foreground text-sm">
            Add Student by giving email and password
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6 space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium uppercase text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium uppercase text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email (e.g., user@domain.com)"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Validation will occur after you finish editing.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium uppercase text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="max-w-sm"
                />
              </div>

              {/* Phone Number with International Support */}
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Nationality
                </Label>
                <CountrySelect
                  value={formData.nationality}
                  onChange={(country) => handleInputChange('nationality', country.code)}
                  placeholder="Select nationality"
                />
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Timezone
                </Label>
                <TimezoneSelect
                  value={formData.timezone}
                  onChange={(tz) => handleInputChange('timezone', tz.value)}
                />
              </div>

              {/* Preferred Language */}
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Preferred Language
                </Label>
                <LanguageSelect
                  value={formData.language}
                  onChange={(lang) => handleInputChange('language', lang.code)}
                />
              </div>

              {/* Currently In */}
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase text-muted-foreground">
                  Currently In
                </Label>
                <Select
                  value={formData.currentlyIn}
                  onValueChange={(value) => handleInputChange('currentlyIn', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select current status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border shadow-lg z-50 max-h-80">
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

              {/* Notify Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="notify"
                  checked={notifyUser}
                  onCheckedChange={(checked) => setNotifyUser(checked as boolean)}
                />
                <Label htmlFor="notify" className="text-sm font-normal cursor-pointer">
                  Notify about account creation as Student
                </Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/app/users/students')}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </RoleGuard>
  );
}