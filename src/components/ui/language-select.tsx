import * as React from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
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
import { languages, detectUserLanguage, type Language } from "@/data/internationalData";

export interface LanguageSelectProps {
  value?: string;
  onChange?: (language: Language) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  showNativeName?: boolean;
  preferredLanguages?: string[];
}

export function LanguageSelect({
  value,
  onChange,
  placeholder = "Select language",
  disabled = false,
  className,
  error = false,
  showNativeName = true,
  preferredLanguages = ["en", "es", "fr", "de", "zh", "ja", "ar", "hi"],
}: LanguageSelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectedLanguage = value ? languages.find(l => l.code === value) : null;

  const handleSelect = (language: Language) => {
    onChange?.(language);
    setOpen(false);
  };

  // Sort languages with preferred ones first
  const sortedLanguages = React.useMemo(() => {
    const preferred = preferredLanguages
      .map(code => languages.find(l => l.code === code))
      .filter(Boolean) as Language[];
    const rest = languages.filter(l => !preferredLanguages.includes(l.code));
    return [...preferred, ...rest];
  }, [preferredLanguages]);

  const renderLanguageItem = (language: Language) => (
    <CommandItem
      key={language.code}
      value={`${language.name} ${language.nativeName} ${language.code}`}
      onSelect={() => handleSelect(language)}
      className="cursor-pointer"
    >
      <div className="flex flex-1 items-center gap-2 min-w-0">
        <span className="truncate">{language.name}</span>
        {showNativeName && language.nativeName !== language.name && (
          <span className="text-muted-foreground truncate">({language.nativeName})</span>
        )}
        {language.rtl && (
          <span className="text-xs bg-muted px-1.5 py-0.5 rounded">RTL</span>
        )}
      </div>
      <Check
        className={cn(
          "ml-2 h-4 w-4 shrink-0",
          value === language.code ? "opacity-100" : "opacity-0"
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
          aria-label="Select language"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedLanguage && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
        >
          {selectedLanguage ? (
            <span className="flex items-center gap-2 truncate">
              <Languages className="h-4 w-4 shrink-0" />
              <span>{selectedLanguage.name}</span>
              {showNativeName && selectedLanguage.nativeName !== selectedLanguage.name && (
                <span className="text-muted-foreground">({selectedLanguage.nativeName})</span>
              )}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>{placeholder}</span>
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-50 bg-popover" align="start">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            
            {preferredLanguages.length > 0 && (
              <CommandGroup heading="Popular">
                {sortedLanguages.slice(0, preferredLanguages.length).map(renderLanguageItem)}
              </CommandGroup>
            )}
            <CommandGroup heading="All Languages">
              {sortedLanguages.slice(preferredLanguages.length).map(renderLanguageItem)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
