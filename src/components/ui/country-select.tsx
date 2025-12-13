import * as React from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
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
import { countries, detectUserCountry, type Country } from "@/data/internationalData";

export interface CountrySelectProps {
  value?: string;
  onChange?: (country: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  showFlag?: boolean;
  showDialCode?: boolean;
  groupByRegion?: boolean;
  preferredCountries?: string[];
}

export function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
  disabled = false,
  className,
  error = false,
  showFlag = true,
  showDialCode = false,
  groupByRegion = false,
  preferredCountries = ["US", "GB", "IN", "CA", "AU", "DE", "FR"],
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCountry = value ? countries.find(c => c.code === value) : null;

  const handleSelect = (country: Country) => {
    onChange?.(country);
    setOpen(false);
  };

  // Group countries by region if needed
  const groupedCountries = React.useMemo(() => {
    if (!groupByRegion) return null;
    
    const groups: Record<string, Country[]> = {
      Africa: [],
      Americas: [],
      Asia: [],
      Europe: [],
      Oceania: [],
    };
    
    countries.forEach(country => {
      groups[country.region].push(country);
    });
    
    return groups;
  }, [groupByRegion]);

  // Preferred countries first
  const sortedCountries = React.useMemo(() => {
    const preferred = preferredCountries
      .map(code => countries.find(c => c.code === code))
      .filter(Boolean) as Country[];
    const rest = countries.filter(c => !preferredCountries.includes(c.code));
    return [...preferred, ...rest];
  }, [preferredCountries]);

  const renderCountryItem = (country: Country) => (
    <CommandItem
      key={country.code}
      value={`${country.name} ${country.code}`}
      onSelect={() => handleSelect(country)}
      className="cursor-pointer"
    >
      {showFlag && <span className="text-lg mr-2">{country.flag}</span>}
      <span className="flex-1 truncate">{country.name}</span>
      {showDialCode && (
        <span className="text-muted-foreground ml-2">{country.dialCode}</span>
      )}
      <Check
        className={cn(
          "ml-2 h-4 w-4",
          value === country.code ? "opacity-100" : "opacity-0"
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
          aria-label="Select country"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedCountry && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2 truncate">
              {showFlag && <span className="text-lg">{selectedCountry.flag}</span>}
              <span>{selectedCountry.name}</span>
              {showDialCode && (
                <span className="text-muted-foreground">({selectedCountry.dialCode})</span>
              )}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{placeholder}</span>
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-50 bg-popover" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            
            {groupByRegion && groupedCountries ? (
              Object.entries(groupedCountries).map(([region, regionCountries]) => (
                <CommandGroup key={region} heading={region}>
                  {regionCountries.map(renderCountryItem)}
                </CommandGroup>
              ))
            ) : (
              <>
                {preferredCountries.length > 0 && (
                  <CommandGroup heading="Popular">
                    {sortedCountries.slice(0, preferredCountries.length).map(renderCountryItem)}
                  </CommandGroup>
                )}
                <CommandGroup heading="All Countries">
                  {sortedCountries.slice(preferredCountries.length).map(renderCountryItem)}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
