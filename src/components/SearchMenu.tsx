import { CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Head } from "./ui/head";
import { searchPackage, SearchResult } from "@/app/shell";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";

const SearchMenu = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<SearchResult[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length > 2) {
      setLoading(true);
      searchPackage(value)
        .then((data: SearchResult[] | null) => setResult(data))
        .finally(() => setLoading(false));
    }
  }, [value]);

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Search" />
      <div className="flex justify-center items-center w-full h-full p-10">
        <Command className="rounded-lg border">
          <CommandInput
            placeholder="Search packages..."
            value={value}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <CommandList>
            <CommandEmpty>
              {value.length === 0
                ? "Type something to search"
                : !loading && "Not found"}
            </CommandEmpty>
            {loading && <LoadingSkeleton variant="search" />}
            <CommandGroup heading="Results">
              {result?.map((result) => (
                <CommandItem
                  key={result?.name}
                  value={result?.name}
                  className="flex flex-col items-start p-2 border-b mx-5"
                >
                  <div className="flex justify-start gap-14">
                    <Label className="font-bold">{result?.name}</Label>
                    <Label>{result?.version}</Label>
                    <Label>{result?.architecture}</Label>
                    <Label>{result?.source}</Label>
                    {result?.installed && (
                      <CheckIcon size={20} color="yellow" />
                    )}
                  </div>
                  <div>
                    <Label>{result?.description}</Label>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default SearchMenu;
