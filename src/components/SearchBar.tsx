import { CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { useEffect, useState } from "react";
import { PackageResult, searchPackage } from "@/app/shell";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<PackageResult | null>(null);

  useEffect(() => {
    if (value.length > 1) {
      setOpen(true);
      handleSearch(value);
    } else {
      setOpen(false);
    }
  }, [value]);

  const handleSearch = async (pkg: string) => {
    searchPackage(pkg).then((data: PackageResult) => setResult(data));
  };

  return (
    <>
      <Command>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <CommandInput
              placeholder="Search packages..."
              className="h-9"
              value={value}
              onValueChange={handleSearch}
            />
          </PopoverTrigger>
          <PopoverContent>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key={result?.name}
                value={result?.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <div className="flex gap-5 items-center">
                  <Label>{result?.name}</Label>
                  <Label>{result?.candidate}</Label>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === result?.installed ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              ))
            </CommandGroup>
          </PopoverContent>
        </Popover>
      </Command>
    </>
  );
};
