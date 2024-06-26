import { useEffect, useState } from "react";
import { Head } from "./ui/head";
import { searchPackage, SearchResult } from "@/app/shell";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Check, Library, Search } from "lucide-react";
import DetailsDrawer from "./DetailsDrawer";

const SearchMenu = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<SearchResult[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (value.length > 2) {
        setLoading(true);
        try {
          const data = await searchPackage(value);
          if (isMounted) {
            setResult(data);
            setLoading(false);
          }
        } catch (error) {
          if (isMounted) {
            console.error(error);
            setLoading(false);
          }
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [value]);

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full gap-3">
      <Head title="Search" />
      <div className="flex justify-center items-center w-1/3 mx-5 gap-2">
        <Search strokeWidth={4} color="yellow" />
        <Input
          placeholder="Search packages..."
          value={value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          className="border-2"
        />
      </div>
      <Table className="m-5 w-[95%]">
        <TableCaption>
          {value.length < 2
            ? "Type any package name to search"
            : !loading && result?.length + " results found"}
        </TableCaption>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Arch</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Installed</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <LoadingSkeleton variant="search" />
          ) : (
            result?.map((result) => (
              <TableRow
                key={result?.name}
                className="hover:bg-secondary cursor-pointer"
              >
                <TableCell className="font-semibold">{result?.name}</TableCell>
                <TableCell>{result?.version}</TableCell>
                <TableCell>{result?.architecture}</TableCell>
                <TableCell>{result?.source}</TableCell>
                <TableCell>
                  {result?.installed ? <Check color="yellow" /> : "No"}
                </TableCell>
                <TableCell>{result?.description}</TableCell>
                <TableCell>
                  <DetailsDrawer
                    pkg={result?.name}
                    trigger={<Library color="yellow" />}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchMenu;
