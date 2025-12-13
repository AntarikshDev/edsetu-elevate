import * as React from 'react';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getCitiesForState, City } from '@/data/internationalData';

interface CitySelectProps {
  value?: string;
  countryCode?: string;
  stateCode?: string;
  onChange?: (city: string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowCustom?: boolean;
}

export function CitySelect({
  value,
  countryCode,
  stateCode,
  onChange,
  placeholder = 'Select city',
  disabled = false,
  allowCustom = true,
}: CitySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const cities = React.useMemo(() => {
    if (!countryCode || !stateCode) return [];
    return getCitiesForState(countryCode, stateCode);
  }, [countryCode, stateCode]);

  const handleSelect = (cityName: string) => {
    onChange?.(cityName);
    setOpen(false);
    setSearchValue('');
  };

  const handleCustomCity = () => {
    if (searchValue.trim() && allowCustom) {
      onChange?.(searchValue.trim());
      setOpen(false);
      setSearchValue('');
    }
  };

  // If no cities available for this state, show text input behavior
  if (cities.length === 0) {
    return (
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className={cn(!value && "text-muted-foreground")}>
              {value || placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-popover border shadow-lg z-50" align="start">
        <Command>
          <CommandInput
            placeholder="Search or type city..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              {allowCustom && searchValue.trim() ? (
                <button
                  onClick={handleCustomCity}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-accent cursor-pointer"
                >
                  Use "{searchValue.trim()}"
                </button>
              ) : (
                <span className="text-muted-foreground">No city found</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.name}
                  value={city.name}
                  onSelect={() => handleSelect(city.name)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === city.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
