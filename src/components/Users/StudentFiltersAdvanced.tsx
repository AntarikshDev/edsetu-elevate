import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterType, setFilterType] = useState<'name' | 'email' | 'mobile'>('name');

  const handleFilterTypeSelect = (type: 'name' | 'email' | 'mobile') => {
    setFilterType(type);
    onFiltersChange({ ...filters, filterType: type });
    setShowFilterPanel(true);
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
    // Filters are already applied via onFiltersChange
  };

  const handleClearAll = () => {
    onFiltersChange({});
    setShowFilterPanel(false);
  };

  const handleClearSearch = () => {
    onFiltersChange({ ...filters, search: '' });
  };

  const hasActiveFilters = filters.search || filters.startDate || filters.endDate;

  return (
    <div className="space-y-4">
      {/* Filter Dropdown Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 border-primary text-primary hover:bg-primary/5"
          >
            Add a filter...
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1 bg-popover border shadow-lg z-50" align="start">
          <div className="flex flex-col">
            <Button
              variant={filterType === 'name' ? 'secondary' : 'ghost'}
              className="justify-start h-9 font-normal"
              onClick={() => handleFilterTypeSelect('name')}
            >
              Name
            </Button>
            <Button
              variant={filterType === 'email' ? 'secondary' : 'ghost'}
              className="justify-start h-9 font-normal"
              onClick={() => handleFilterTypeSelect('email')}
            >
              Email
            </Button>
            <Button
              variant={filterType === 'mobile' ? 'secondary' : 'ghost'}
              className="justify-start h-9 font-normal"
              onClick={() => handleFilterTypeSelect('mobile')}
            >
              Mobile
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Filter Panel */}
      {(showFilterPanel || hasActiveFilters) && (
        <div className="bg-card border rounded-lg p-4 space-y-4 shadow-sm">
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Input
              placeholder={`Enter ${filterType === 'mobile' ? 'mobile number' : filterType}`}
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="max-w-xs bg-background"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium mb-3">Date Range</h4>
            <div className="flex items-center gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-40 justify-start text-left font-normal bg-background',
                        !filters.startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? format(filters.startDate, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover border shadow-lg z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-40 justify-start text-left font-normal bg-background',
                        !filters.endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? format(filters.endDate, 'dd/MM/yyyy') : 'dd/mm/yyyy'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover border shadow-lg z-50" align="start">
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
          <div className="flex items-center gap-3 pt-2">
            <Button 
              size="sm"
              onClick={handleApplyFilters}
              className="bg-primary hover:bg-primary/90"
            >
              Apply Filters
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
