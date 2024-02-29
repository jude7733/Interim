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
import { PopoverArrow} from "@radix-ui/react-popover";

const CategoryCard = ({ title, pkg }: { title: string; pkg: string[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card className="flex items-center justify-center flex-col w-24 pb-5 shadow-sm shadow-primary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Popover open={open} modal>
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
          <PopoverArrow color="yellow" />
          <ToggleGroup title={title} pkg={pkg} setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    </Card>
  );
};

const Categories = () => {
  return (
    <ScrollArea className="w-full h-full flex flex-col items-center justify-start p-2 gap-10">
      <Head title="Categories" />
      <div className="flex items-center justify-center py-5 border-b rounded-xl border-b-primary w-full">
        <CarouselComponent />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 my-5 mx-1">
        <CategoryCard title="Python" pkg={["python3", "python3-pip"]} />
        <CategoryCard title="Java" pkg={["default-jdk"]} />
        {/* <CategoryCard title="Flutter" pkg={["flutter"]} /> */}
        <CategoryCard title="Rust" pkg={["rustc"]} />
        <CategoryCard title="Go" pkg={["golang-go"]} />
        <CategoryCard title="Ruby" pkg={["ruby-full"]} />
        <CategoryCard title="Node" pkg={["nodejs"]} />
        <CategoryCard title="C++" pkg={["g++"]} />
        <CategoryCard title="R" pkg={["r-base"]} />
        <CategoryCard title="PHP" pkg={["php"]} />
        <CategoryCard title="Lua" pkg={["lua"]} />
      </div>
    </ScrollArea>
  );
};
export default Categories;
