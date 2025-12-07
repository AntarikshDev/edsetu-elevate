import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ImportField, ImportProgress } from '@/types/student';
import { Upload, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImportUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'student' | 'instructor' | 'sub_admin';
}

const IMPORT_FIELDS: ImportField[] = [
  { key: 'email', label: 'Email', required: true },
  { key: 'password', label: 'Password' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role [student]' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'city', label: 'City' },
  { key: 'presently', label: 'Presently a' },
  { key: 'collegeName', label: 'College/Institute Name' },
  { key: 'state', label: 'State/Union Territory' },
  { key: 'sendWelcomeEmail', label: 'Send Welcome Email (yes/no)' },
];

export function ImportUsersModal({ open, onOpenChange, userType }: ImportUsersModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>(['email']);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleField = (fieldKey: string) => {
    const field = IMPORT_FIELDS.find(f => f.key === fieldKey);
    if (field?.required) return; // Can't unselect required fields
    
    setSelectedFields(prev =>
      prev.includes(fieldKey)
        ? prev.filter(f => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
        toast.error('Please upload a CSV or Excel file');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = selectedFields.map(key => {
      const field = IMPORT_FIELDS.find(f => f.key === key);
      return field?.label || key;
    });

    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${userType}_import_template.csv`;
    link.click();

    toast.success('Template downloaded successfully');
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setProgress({ total: 100, processed: 0, successful: 0, failed: 0, errors: [] });

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(prev => prev ? {
        ...prev,
        processed: i,
        successful: Math.floor(i * 0.95),
        failed: Math.floor(i * 0.05),
      } : null);
    }

    setIsUploading(false);
    toast.success('Import completed successfully');
  };

  const handleClose = () => {
    setFile(null);
    setProgress(null);
    setIsUploading(false);
    onOpenChange(false);
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'student': return 'Students';
      case 'instructor': return 'Instructors';
      case 'sub_admin': return 'Sub-Admins';
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import {getUserTypeLabel()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload */}
          <div className="flex items-center gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="flex-1 bg-background"
            />
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Please choose the fields from below and then download the template. Enter the data in excel and then upload the excel. To import custom fields, add custom fields from settings menu before importing.
          </p>

          {/* Field Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              Choose Excel Fields - Choose User information fields to be imported
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {IMPORT_FIELDS.map((field) => (
                <div key={field.key} className="flex items-center gap-3">
                  <Checkbox
                    id={field.key}
                    checked={selectedFields.includes(field.key)}
                    onCheckedChange={() => toggleField(field.key)}
                    disabled={field.required}
                  />
                  <label
                    htmlFor={field.key}
                    className="text-sm cursor-pointer"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Download Template */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
          </div>

          {/* Progress */}
          {progress && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Processing...</span>
                <span>{progress.processed}%</span>
              </div>
              <Progress value={progress.processed} className="h-2" />
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{progress.successful} successful</span>
                </div>
                {progress.failed > 0 && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{progress.failed} failed</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
