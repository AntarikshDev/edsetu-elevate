import * as React from "react";
import { Check, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { timezones, detectUserTimezone, type Timezone } from "@/data/internationalData";

export interface TimezoneSelectProps {
  value?: string;
  onChange?: (timezone: Timezone) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  showCurrentTime?: boolean;
  groupByRegion?: boolean;
}

function getCurrentTimeInTimezone(tz: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());
  } catch {
    return '';
  }
}

export function TimezoneSelect({
  value,
  onChange,
  placeholder = "Select timezone",
  disabled = false,
  className,
  error = false,
  showCurrentTime = true,
  groupByRegion = true,
}: TimezoneSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [currentTimes, setCurrentTimes] = React.useState<Record<string, string>>({});
  
  const selectedTimezone = value ? timezones.find(t => t.value === value) : null;

  // Update current times every minute when popover is open
  React.useEffect(() => {
    if (open && showCurrentTime) {
      const updateTimes = () => {
        const times: Record<string, string> = {};
        timezones.forEach(tz => {
          times[tz.value] = getCurrentTimeInTimezone(tz.value);
        });
        setCurrentTimes(times);
      };
      
      updateTimes();
      const interval = setInterval(updateTimes, 60000);
      return () => clearInterval(interval);
    }
  }, [open, showCurrentTime]);

  const handleSelect = (timezone: Timezone) => {
    onChange?.(timezone);
    setOpen(false);
  };

  // Group timezones by region
  const groupedTimezones = React.useMemo(() => {
    if (!groupByRegion) return null;
    
    const groups: Record<string, Timezone[]> = {};
    timezones.forEach(tz => {
      if (!groups[tz.region]) {
        groups[tz.region] = [];
      }
      groups[tz.region].push(tz);
    });
    
    return groups;
  }, [groupByRegion]);

  const renderTimezoneItem = (tz: Timezone) => (
    <CommandItem
      key={tz.value}
      value={`${tz.label} ${tz.value} ${tz.offset}`}
      onSelect={() => handleSelect(tz)}
      className="cursor-pointer"
    >
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="truncate">{tz.label}</span>
          <span className="text-xs text-muted-foreground">{tz.offset}</span>
        </div>
        {showCurrentTime && currentTimes[tz.value] && (
          <span className="text-xs text-muted-foreground ml-2 shrink-0">
            {currentTimes[tz.value]}
          </span>
        )}
      </div>
      <Check
        className={cn(
          "ml-2 h-4 w-4 shrink-0",
          value === tz.value ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select timezone"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedTimezone && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
        >
          {selectedTimezone ? (
            <span className="flex items-center gap-2 truncate">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="truncate">{selectedTimezone.label}</span>
              <span className="text-muted-foreground shrink-0">({selectedTimezone.offset})</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{placeholder}</span>
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0 z-50 bg-popover" align="start">
        <Command>
          <CommandInput placeholder="Search timezone..." className="h-9" />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            
            {groupByRegion && groupedTimezones ? (
              Object.entries(groupedTimezones).map(([region, regionTimezones]) => (
                <CommandGroup key={region} heading={region}>
                  {regionTimezones.map(renderTimezoneItem)}
                </CommandGroup>
              ))
            ) : (
              <CommandGroup>
                {timezones.map(renderTimezoneItem)}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
