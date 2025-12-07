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

export default function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [notifyUser, setNotifyUser] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-medium uppercase text-muted-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-3 border rounded-md bg-muted text-sm min-w-[80px]">
                    <span>+91</span>
                    <span className="text-muted-foreground">▾</span>
                  </div>
                  <Input
                    id="phone"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
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
