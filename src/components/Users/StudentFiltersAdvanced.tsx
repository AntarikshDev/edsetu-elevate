import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  StudentFilters, 
  FilterType, 
  DateFilterCondition, 
  CourseFilterCondition,
  BooleanFilterCondition 
} from '@/types/student';
import { format } from 'date-fns';
import { CalendarIcon, X, ChevronDown, Search, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentFiltersAdvancedProps {
  filters: StudentFilters;
  onFiltersChange: (filters: StudentFilters) => void;
}

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'signedUp', label: 'Signed Up' },
  { key: 'lastLogIn', label: 'Last Log In' },
  { key: 'enrolledIn', label: 'Enrolled In' },
  { key: 'notEnrolledIn', label: 'Not Enrolled In' },
  { key: 'verifiedEmail', label: 'Verified Email' },
  { key: 'verifiedMobile', label: 'Verified Mobile' },
  { key: 'deactivated', label: 'Deactivated' },
  { key: 'deviceId', label: 'Device ID' },
  { key: 'source', label: 'SOURCE' },
  { key: 'referCode', label: 'Refer Code' },
  { key: 'utmSource', label: 'UTM SOURCE' },
  { key: 'utmMedium', label: 'UTM Medium' },
];

export function StudentFiltersAdvanced({
  filters,
  onFiltersChange,
}: StudentFiltersAdvancedProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const addFilter = (filterType: FilterType) => {
    if (!activeFilters.includes(filterType)) {
      setActiveFilters([...activeFilters, filterType]);
    }
    setIsFilterMenuOpen(false);
  };

  const removeFilter = (filterType: FilterType) => {
    setActiveFilters(activeFilters.filter(f => f !== filterType));
    const newFilters = { ...filters };
    delete newFilters[filterType];
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setActiveFilters([]);
    onFiltersChange({});
  };

  const handleSearch = () => {
    // Trigger search - filters are already updated
  };

  const updateDateFilter = (
    filterKey: 'signedUp' | 'lastLogIn',
    field: 'condition' | 'startDate' | 'endDate',
    value: DateFilterCondition | Date | undefined
  ) => {
    const current = filters[filterKey] || { condition: 'after' as DateFilterCondition };
    onFiltersChange({
      ...filters,
      [filterKey]: { ...current, [field]: value },
    });
  };

  const updateCourseFilter = (
    filterKey: 'enrolledIn' | 'notEnrolledIn',
    field: 'condition' | 'courseName',
    value: CourseFilterCondition | string
  ) => {
    const current = filters[filterKey] || { condition: 'any' as CourseFilterCondition };
    onFiltersChange({
      ...filters,
      [filterKey]: { ...current, [field]: value },
    });
  };

  const updateBooleanFilter = (
    filterKey: 'verifiedEmail' | 'verifiedMobile' | 'deactivated',
    value: BooleanFilterCondition | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    });
  };

  const updateTextFilter = (
    filterKey: 'deviceId' | 'referCode' | 'source' | 'utmSource' | 'utmMedium',
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    });
  };

  const renderDateFilter = (filterKey: 'signedUp' | 'lastLogIn', label: string) => {
    const filter = filters[filterKey];
    const showSecondDate = filter?.condition === 'between';
    const showNever = filterKey === 'lastLogIn';

    return (
      <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
        <span className="text-sm font-medium text-muted-foreground w-32 uppercase tracking-wide">
          {label}
        </span>
        <Select
          value={filter?.condition || ''}
          onValueChange={(v) => updateDateFilter(filterKey, 'condition', v as DateFilterCondition)}
        >
          <SelectTrigger className="w-32 bg-background">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-lg z-50">
            <SelectItem value="after">After</SelectItem>
            <SelectItem value="before">Before</SelectItem>
            <SelectItem value="between">Between</SelectItem>
            <SelectItem value="on">On</SelectItem>
            {showNever && <SelectItem value="never">Never</SelectItem>}
          </SelectContent>
        </Select>

        {filter?.condition && filter.condition !== 'never' && (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-40 justify-start text-left font-normal bg-background',
                    !filter.startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filter.startDate ? format(filter.startDate, 'yyyy-MM-dd') : 'yyyy-mm-dd'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover border shadow-lg z-50" align="start">
                <Calendar
                  mode="single"
                  selected={filter.startDate}
                  onSelect={(date) => updateDateFilter(filterKey, 'startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {showSecondDate && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-40 justify-start text-left font-normal bg-background',
                      !filter.endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filter.endDate ? format(filter.endDate, 'yyyy-MM-dd') : 'yyyy-mm-dd'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border shadow-lg z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={filter.endDate}
                    onSelect={(date) => updateDateFilter(filterKey, 'endDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
          onClick={() => removeFilter(filterKey)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderCourseFilter = (filterKey: 'enrolledIn' | 'notEnrolledIn', label: string) => {
    const filter = filters[filterKey];

    return (
      <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
        <span className="text-sm font-medium text-muted-foreground w-32 uppercase tracking-wide">
          {label}
        </span>
        <Select
          value={filter?.condition || ''}
          onValueChange={(v) => updateCourseFilter(filterKey, 'condition', v as CourseFilterCondition)}
        >
          <SelectTrigger className="w-40 bg-background">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-lg z-50">
            <SelectItem value="any">Any Course</SelectItem>
            <SelectItem value="specific">Specific Course</SelectItem>
          </SelectContent>
        </Select>

        {filter?.condition === 'specific' && (
          <Input
            placeholder="Search Course"
            value={filter.courseName || ''}
            onChange={(e) => updateCourseFilter(filterKey, 'courseName', e.target.value)}
            className="w-64 bg-background"
          />
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
          onClick={() => removeFilter(filterKey)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderBooleanFilter = (
    filterKey: 'verifiedEmail' | 'verifiedMobile' | 'deactivated',
    label: string
  ) => {
    const value = filters[filterKey];

    return (
      <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
        <span className="text-sm font-medium text-muted-foreground w-32 uppercase tracking-wide">
          {label}
        </span>
        <Select
          value={value || ''}
          onValueChange={(v) => updateBooleanFilter(filterKey, v as BooleanFilterCondition)}
        >
          <SelectTrigger className="w-32 bg-background">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-lg z-50">
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
          onClick={() => removeFilter(filterKey)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderTextFilter = (
    filterKey: 'deviceId' | 'referCode' | 'source' | 'utmSource' | 'utmMedium',
    label: string,
    isDropdown?: boolean
  ) => {
    const value = filters[filterKey];

    return (
      <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
        <span className="text-sm font-medium text-muted-foreground w-32 uppercase tracking-wide">
          {label}
        </span>
        {isDropdown ? (
          <Select
            value={value || ''}
            onValueChange={(v) => updateTextFilter(filterKey, v)}
          >
            <SelectTrigger className="w-40 bg-background">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent className="bg-popover border shadow-lg z-50">
              <SelectItem value="referral">Referral</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder=""
            value={value || ''}
            onChange={(e) => updateTextFilter(filterKey, e.target.value)}
            className="w-64 bg-background"
          />
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
          onClick={() => removeFilter(filterKey)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-4">
      {/* Top Row: Add Filters + Search */}
      <div className="flex items-center gap-3">
        <Popover open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Add Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1 bg-popover border shadow-lg z-50" align="start">
            <div className="flex flex-col">
              {FILTER_OPTIONS.map((option) => (
                <Button
                  key={option.key}
                  variant="ghost"
                  className="justify-start h-9 font-normal"
                  onClick={() => addFilter(option.key)}
                  disabled={activeFilters.includes(option.key)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Search by Name or Email or Mobile"
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="flex-1 max-w-lg bg-background"
        />
      </div>

      {/* Active Filters Panel */}
      {activeFilters.length > 0 && (
        <div className="bg-card border rounded-lg p-4 space-y-0">
          {activeFilters.includes('signedUp') && renderDateFilter('signedUp', 'Signed Up')}
          {activeFilters.includes('lastLogIn') && renderDateFilter('lastLogIn', 'Last Log In')}
          {activeFilters.includes('enrolledIn') && renderCourseFilter('enrolledIn', 'Enrolled In')}
          {activeFilters.includes('notEnrolledIn') && renderCourseFilter('notEnrolledIn', 'Not Enrolled In')}
          {activeFilters.includes('verifiedEmail') && renderBooleanFilter('verifiedEmail', 'Verified Email')}
          {activeFilters.includes('verifiedMobile') && renderBooleanFilter('verifiedMobile', 'Verified Mobile')}
          {activeFilters.includes('deactivated') && renderBooleanFilter('deactivated', 'Deactivated')}
          {activeFilters.includes('deviceId') && renderTextFilter('deviceId', 'Device ID')}
          {activeFilters.includes('referCode') && renderTextFilter('referCode', 'Refer Code')}
          {activeFilters.includes('source') && renderTextFilter('source', 'Source', true)}
          {activeFilters.includes('utmSource') && renderTextFilter('utmSource', 'UTM Source')}
          {activeFilters.includes('utmMedium') && renderTextFilter('utmMedium', 'UTM Medium')}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSearch} className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
