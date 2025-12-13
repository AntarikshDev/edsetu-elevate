import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
  showCheckbox?: boolean;
  showActions?: boolean;
}

export function SkeletonTable({
  columns = 5,
  rows = 5,
  showCheckbox = true,
  showActions = true,
}: SkeletonTableProps) {
  const totalColumns = columns + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckbox && (
              <TableHead className="w-12">
                <Skeleton className="h-4 w-4" />
              </TableHead>
            )}
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="w-20">
                <Skeleton className="h-4 w-12" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {showCheckbox && (
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              )}
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  {colIndex === 0 ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ) : colIndex === 1 ? (
                    <Skeleton className="h-6 w-16 rounded-full" />
                  ) : (
                    <Skeleton className="h-4 w-20" />
                  )}
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface SkeletonTableWithFiltersProps extends SkeletonTableProps {
  showSearch?: boolean;
  showFilters?: boolean;
  filterCount?: number;
}

export function SkeletonTableWithFilters({
  showSearch = true,
  showFilters = true,
  filterCount = 3,
  ...tableProps
}: SkeletonTableWithFiltersProps) {
  return (
    <div className="space-y-4">
      {(showSearch || showFilters) && (
        <div className="flex flex-wrap items-center gap-4">
          {showSearch && <Skeleton className="h-10 w-64" />}
          {showFilters &&
            Array.from({ length: filterCount }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          <Skeleton className="h-10 w-24 ml-auto" />
        </div>
      )}
      <SkeletonTable {...tableProps} />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
