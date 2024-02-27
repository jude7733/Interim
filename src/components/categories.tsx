import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Head } from "./ui/head";
import { Download } from "lucide-react";
import CarouselComponent from "./carousel-component";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ToggleGroup } from "./ui/toggle-group";
import { useState } from "react";

const CategoryCard = ({ title, pkg }: { title: string; pkg: string[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Card className="flex items-center justify-center flex-col w-24 pb-5 shadow-sm shadow-primary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <HoverCard open={open}>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            className="p-2"
            onClick={() => setOpen(!open)}
          >
            <Download size={30} color="yellow" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-1 shadow-sm shadow-primary">
          <ToggleGroup title={title} pkg={pkg} setOpen={setOpen} />
        </HoverCardContent>
      </HoverCard>
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
        <CategoryCard title="Python" pkg={["python3"]} />
        <CategoryCard title="Java" pkg={["open-jdk", "open-jre"]} />
        <CategoryCard title="Flutter" pkg={["flutter"]} />
        <CategoryCard title="Rust" pkg={["rustup"]} />
        <CategoryCard title="Go" pkg={["go"]} />
        <CategoryCard title="Ruby" pkg={["ruby"]} />
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
