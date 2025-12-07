import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleGuard } from '@/components/Auth/RoleGuard';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface InstructorPermission {
  key: string;
  label: string;
  defaultValue: boolean;
}

const instructorPermissions: InstructorPermission[] = [
  { key: 'can_edit_published_courses', label: 'Can edit published courses', defaultValue: true },
  { key: 'need_approval_for_publishing', label: 'Need Approval for Publishing Courses', defaultValue: false },
  { key: 'access_live_class_recordings', label: 'Access of Live class Recordings', defaultValue: true },
  { key: 'access_sales_dashboard', label: 'Access of Sales Dashboard', defaultValue: true },
  { key: 'access_messenger', label: 'Access of Messenger', defaultValue: false },
  { key: 'access_bandwidth_reports', label: 'Access of Bandwidth Reports', defaultValue: false },
  { key: 'access_usage_reports', label: 'Access of Usage Reports', defaultValue: false },
  { key: 'access_live_tests_reports', label: 'Access of Live tests Reports', defaultValue: false },
  { key: 'access_live_class_reports', label: 'Access of Live class Reports', defaultValue: false },
  { key: 'access_learner_details', label: 'Access to Learner Details', defaultValue: true },
  { key: 'access_download_quiz_live_test', label: 'Access to Download Quiz/Live Test', defaultValue: true },
  { key: 'access_enroll_learners', label: 'Access to enroll learners in any course.', defaultValue: true },
  { key: 'view_enrolled_learner_count', label: 'Can view enrolled learner count and access their details', defaultValue: true },
];

export default function AddInstructor() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    assignCourses: '',
  });

  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    instructorPermissions.reduce((acc, perm) => {
      acc[perm.key] = perm.defaultValue;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [sendEmail, setSendEmail] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (key: string, value: boolean) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      assignCourses: '',
    });
    setPermissions(
      instructorPermissions.reduce((acc, perm) => {
        acc[perm.key] = perm.defaultValue;
        return acc;
      }, {} as Record<string, boolean>)
    );
    setSendEmail(false);
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

    toast.success('Instructor created successfully');
    navigate('/app/users/instructors');
    setIsSubmitting(false);
  };

  return (
    <RoleGuard allowedRoles={['admin', 'sub_admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/app/users/instructors')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Create User
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label htmlFor="mobile">Mobile</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-3 border rounded-md bg-muted text-sm">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <Input
                      id="mobile"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label>Role</Label>
                  <div className="px-3 py-2 border rounded-md bg-muted text-sm">
                    instructor
                  </div>
                </div>

                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <Label htmlFor="assignCourses">Assign Courses</Label>
                  <Input
                    id="assignCourses"
                    placeholder="Search Course"
                    value={formData.assignCourses}
                    onChange={(e) => handleInputChange('assignCourses', e.target.value)}
                  />
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4 pt-4 border-t">
                {instructorPermissions.map((perm) => (
                  <div key={perm.key} className="grid grid-cols-[280px_1fr] items-center gap-4">
                    <Label className="text-sm">{perm.label}</Label>
                    <RadioGroup
                      value={permissions[perm.key] ? 'yes' : 'no'}
                      onValueChange={(value) => handlePermissionChange(perm.key, value === 'yes')}
                      className="flex items-center gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id={`${perm.key}-no`} />
                        <Label htmlFor={`${perm.key}-no`} className="font-normal cursor-pointer">No</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id={`${perm.key}-yes`} />
                        <Label htmlFor={`${perm.key}-yes`} className="font-normal cursor-pointer">Yes</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Send Email */}
              <div className="grid grid-cols-[280px_1fr] items-center gap-4 pt-4 border-t">
                <Label htmlFor="sendEmail">Send Email to User</Label>
                <Switch
                  id="sendEmail"
                  checked={sendEmail}
                  onCheckedChange={setSendEmail}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={handleClear}>
                  Clear
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </RoleGuard>
  );
}
