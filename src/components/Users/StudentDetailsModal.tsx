import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { StudentDetails, EnrolledCourse, EnrolledPackage, ActiveDevice } from '@/types/student';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface StudentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentDetails | null;
  onEdit?: (student: StudentDetails) => void;
}

export function StudentDetailsModal({
  open,
  onOpenChange,
  student,
  onEdit,
}: StudentDetailsModalProps) {
  const [deviceToRemove, setDeviceToRemove] = useState<string | null>(null);

  if (!student) return null;

  const handleRemoveDevice = () => {
    if (deviceToRemove) {
      toast.success('Device removed successfully');
      setDeviceToRemove(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Student Details</DialogTitle>
          </DialogHeader>

          {/* Avatar */}
          <div className="flex justify-center py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span>
              <span className="ml-1">{student.name}</span>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <span className="ml-1 text-muted-foreground">{student.email}</span>
            </div>
            <div>
              <span className="font-medium">Role:</span>
              <span className="ml-1">Student</span>
            </div>
            <div>
              <span className="font-medium">Primary Number:</span>
              <span className="ml-1">{student.phone || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Date Joined:</span>
              <span className="ml-1">{student.joinedAt}</span>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <Badge 
                variant={student.status === 'active' ? 'default' : 'secondary'}
                className="ml-1"
              >
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Created By:</span>
              <span className="ml-1">{student.createdBy || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Address Line 1:</span>
              <span className="ml-1">{student.addressLine1 || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Address Line 2:</span>
              <span className="ml-1">{student.addressLine2 || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Alternate Number:</span>
              <span className="ml-1">{student.alternatePhone || 'Not Provided'}</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium">Bio:</span>
              <span className="ml-1">{student.bio || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">City:</span>
              <span className="ml-1">{student.city || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Country:</span>
              <span className="ml-1">{student.country || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Gender:</span>
              <span className="ml-1">{student.gender || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">Postal Code:</span>
              <span className="ml-1">{student.postalCode || 'Not Provided'}</span>
            </div>
            <div>
              <span className="font-medium">State:</span>
              <span className="ml-1">{student.state || 'Not Provided'}</span>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Enrolled Courses</h3>
            {student.enrolledCourses.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course ID</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.enrolledCourses.map((course) => (
                      <TableRow key={course.courseId}>
                        <TableCell>{course.courseId}</TableCell>
                        <TableCell>{course.courseTitle}</TableCell>
                        <TableCell>{course.type}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === 'Active' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.expiresAt || '-'}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No enrolled courses found.</p>
            )}
          </div>

          {/* Enrolled Packages */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Enrolled Packages</h3>
            {student.enrolledPackages.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package ID</TableHead>
                      <TableHead>Package Title</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.enrolledPackages.map((pkg) => (
                      <TableRow key={pkg.packageId}>
                        <TableCell>{pkg.packageId}</TableCell>
                        <TableCell>{pkg.packageTitle}</TableCell>
                        <TableCell>{pkg.courses}</TableCell>
                        <TableCell>
                          <Badge variant={pkg.status === 'Active' ? 'default' : 'secondary'}>
                            {pkg.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{pkg.expiresAt || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No enrolled packages found.</p>
            )}
          </div>

          {/* Active Devices */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Active Devices</h3>
            {student.activeDevices.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device ID</TableHead>
                      <TableHead>Device Name</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.activeDevices.map((device) => (
                      <TableRow key={device.deviceId}>
                        <TableCell>{device.deviceId}</TableCell>
                        <TableCell>{device.deviceName}</TableCell>
                        <TableCell>{device.lastLogin}</TableCell>
                        <TableCell>{device.location}</TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="text-destructive p-0 h-auto"
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
              <p className="text-sm text-muted-foreground">No active devices found.</p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between mt-6">
            <Button variant="default" onClick={() => onEdit?.(student)}>
              Edit
            </Button>
            <Button variant="default" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Device Confirmation */}
      <AlertDialog open={!!deviceToRemove} onOpenChange={() => setDeviceToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Device</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this device? The user will need to log in again on this device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveDevice} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
