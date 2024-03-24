import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Head } from "./ui/head";
import { Download } from "lucide-react";
import CarouselComponent from "./carousel-component";
import { ToggleGroup } from "./ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const CategoryCard = ({ title, pkg }: { title: string; pkg: string[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card className="flex items-center justify-center flex-col w-28 pb-5 shadow-md shadow-primary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="p-2"
            onClick={() => setOpen(!open)}
          >
            <Download size={30} color="yellow" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1 shadow-sm shadow-primary">
          <ToggleGroup title={title} pkg={pkg} setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    </Card>
  );
};

const Categories = () => {
  return (
    <ScrollArea className="w-full h-full flex flex-col items-center justify-center p-2 gap-10">
      <Head title="Categories" />
      <div className="flex items-center justify-center py-5 border-b-2 rounded-xl">
        <CarouselComponent />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-7 my-5 sm:px-10 md:px-14 lg:px-20">
        <CategoryCard title="Python" pkg={["python3", "python3-pip"]} />
        <CategoryCard title="Java" pkg={["default-jdk", "default-jre"]} />
        <CategoryCard title="Rust" pkg={["rustc"]} />
        <CategoryCard title="Go" pkg={["golang-go"]} />
        <CategoryCard title="Ruby" pkg={["ruby-full"]} />
        <CategoryCard title="Node" pkg={["nodejs", "npm"]} />
        <CategoryCard title="C++" pkg={["g++"]} />
        <CategoryCard title="R" pkg={["r-base"]} />
        <CategoryCard title="PHP" pkg={["php"]} />
        <CategoryCard title="Lua" pkg={["lua5.3"]} />
        <CategoryCard title="Perl" pkg={["perl"]} />
        <CategoryCard title="MySQL" pkg={["mysql-server"]} />
        <CategoryCard title="MongoDB" pkg={["mongodb-org"]} />
        <CategoryCard title="SQLite" pkg={["sqlite3"]} />
        <CategoryCard title="Dart" pkg={["dart"]} />
      </div>
    </ScrollArea>
  );
};
export default Categories;
