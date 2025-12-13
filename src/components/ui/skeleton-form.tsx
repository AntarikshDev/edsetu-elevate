import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SkeletonFormFieldProps {
  labelWidth?: string;
  inputType?: 'text' | 'select' | 'textarea' | 'checkbox';
}

function SkeletonFormField({ labelWidth = 'w-20', inputType = 'text' }: SkeletonFormFieldProps) {
  return (
    <div className="space-y-2">
      <Skeleton className={`h-4 ${labelWidth}`} />
      {inputType === 'textarea' ? (
        <Skeleton className="h-24 w-full" />
      ) : inputType === 'checkbox' ? (
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      ) : (
        <Skeleton className="h-10 w-full" />
      )}
    </div>
  );
}

interface SkeletonFormProps {
  fields?: number;
  columns?: 1 | 2 | 3;
  showHeader?: boolean;
  showActions?: boolean;
}

export function SkeletonForm({
  fields = 6,
  columns = 2,
  showHeader = true,
  showActions = true,
}: SkeletonFormProps) {
  const gridClass = columns === 1 
    ? 'grid-cols-1' 
    : columns === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        <div className={`grid ${gridClass} gap-4`}>
          {Array.from({ length: fields }).map((_, i) => (
            <SkeletonFormField 
              key={i} 
              labelWidth={i % 3 === 0 ? 'w-24' : i % 3 === 1 ? 'w-16' : 'w-20'}
            />
          ))}
        </div>
        
        {showActions && (
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface SkeletonFormSectionProps {
  title?: boolean;
  fields?: number;
  columns?: 1 | 2;
}

export function SkeletonFormSection({
  title = true,
  fields = 4,
  columns = 2,
}: SkeletonFormSectionProps) {
  const gridClass = columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className="space-y-4">
      {title && <Skeleton className="h-5 w-32" />}
      <div className={`grid ${gridClass} gap-4`}>
        {Array.from({ length: fields }).map((_, i) => (
          <SkeletonFormField key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonProfileForm() {
  return (
    <div className="space-y-6">
      {/* Avatar section */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      
      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonFormField key={i} />
        ))}
      </div>
      
      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
