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
import { StudentFilters } from '@/types/student';
import { format } from 'date-fns';
import { CalendarIcon, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentFiltersAdvancedProps {
  filters: StudentFilters;
  onFiltersChange: (filters: StudentFilters) => void;
}

export function StudentFiltersAdvanced({
  filters,
  onFiltersChange,
}: StudentFiltersAdvancedProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'name' | 'email' | 'mobile'>('name');

  const handleFilterTypeChange = (type: 'name' | 'email' | 'mobile') => {
    setFilterType(type);
    onFiltersChange({ ...filters, filterType: type });
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value, filterType });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    onFiltersChange({ ...filters, startDate: date });
  };

  const handleEndDateChange = (date: Date | undefined) => {
    onFiltersChange({ ...filters, endDate: date });
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleClearAll = () => {
    onFiltersChange({});
    setShowFilters(false);
  };

  const hasActiveFilters = filters.search || filters.startDate || filters.endDate;

  return (
    <div className="space-y-4">
      {/* Filter Dropdown Trigger */}
      <div className="flex items-center gap-4">
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Add a filter...
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1" align="start">
            <div className="flex flex-col">
              <Button
                variant={filterType === 'name' ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => handleFilterTypeChange('name')}
              >
                Name
              </Button>
              <Button
                variant={filterType === 'email' ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => handleFilterTypeChange('email')}
              >
                Email
              </Button>
              <Button
                variant={filterType === 'mobile' ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => handleFilterTypeChange('mobile')}
              >
                Mobile
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filter Inputs */}
      {(filterType || hasActiveFilters) && (
        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Input
              placeholder={`Enter ${filterType === 'mobile' ? 'mobile number' : filterType}`}
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFiltersChange({ ...filters, search: '' })}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium mb-2">Date Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !filters.startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? format(filters.startDate, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !filters.endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? format(filters.endDate, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.endDate}
                      onSelect={handleEndDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
            <Button variant="ghost" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
