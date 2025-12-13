import * as React from "react";
import { Check, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, countryCode: string, dialCode: string) => void;
  defaultCountry?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  preferredCountries?: string[];
}

export function PhoneInput({
  value = "",
  onChange,
  defaultCountry,
  placeholder = "Phone number",
  disabled = false,
  className,
  error = false,
  preferredCountries = ["US", "GB", "IN", "CA", "AU"],
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  // Initialize country on mount
  React.useEffect(() => {
    const countryCode = defaultCountry || detectUserCountry();
    const country = countries.find(c => c.code === countryCode) || countries.find(c => c.code === "US");
    if (country) {
      setSelectedCountry(country);
    }
  }, [defaultCountry]);

  // Parse value if provided
  React.useEffect(() => {
    if (value && selectedCountry) {
      // If value starts with dial code, extract just the number
      if (value.startsWith(selectedCountry.dialCode)) {
        setPhoneNumber(value.slice(selectedCountry.dialCode.length).trim());
      } else if (!value.startsWith("+")) {
        setPhoneNumber(value);
      }
    }
  }, [value, selectedCountry]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(numericValue);
    
    if (selectedCountry && onChange) {
      const fullNumber = numericValue ? `${selectedCountry.dialCode}${numericValue}` : "";
      onChange(fullNumber, selectedCountry.code, selectedCountry.dialCode);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    
    if (onChange) {
      const fullNumber = phoneNumber ? `${country.dialCode}${phoneNumber}` : "";
      onChange(fullNumber, country.code, country.dialCode);
    }
  };

  // Sort countries with preferred ones first
  const sortedCountries = React.useMemo(() => {
    const preferred = preferredCountries
      .map(code => countries.find(c => c.code === code))
      .filter(Boolean) as Country[];
    const rest = countries.filter(c => !preferredCountries.includes(c.code));
    return [...preferred, ...rest];
  }, [preferredCountries]);

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select country"
            disabled={disabled}
            className={cn(
              "w-[120px] justify-between px-3 font-normal",
              error && "border-destructive"
            )}
          >
            {selectedCountry ? (
              <span className="flex items-center gap-2 truncate">
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-muted-foreground">{selectedCountry.dialCode}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Code</span>
              </span>
            )}
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 z-50 bg-popover" align="start">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              {preferredCountries.length > 0 && (
                <CommandGroup heading="Popular">
                  {sortedCountries.slice(0, preferredCountries.length).map((country) => (
                    <CommandItem
                      key={country.code}
                      value={`${country.name} ${country.dialCode}`}
                      onSelect={() => handleCountrySelect(country)}
                      className="cursor-pointer"
                    >
                      <span className="text-lg mr-2">{country.flag}</span>
                      <span className="flex-1 truncate">{country.name}</span>
                      <span className="text-muted-foreground ml-2">{country.dialCode}</span>
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          selectedCountry?.code === country.code
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              <CommandGroup heading="All Countries">
                {sortedCountries.slice(preferredCountries.length).map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => handleCountrySelect(country)}
                    className="cursor-pointer"
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-muted-foreground ml-2">{country.dialCode}</span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        selectedCountry?.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      <Input
        type="tel"
        inputMode="numeric"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex-1",
          error && "border-destructive"
        )}
      />
    </div>
  );
}
