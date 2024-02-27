import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Head } from "./ui/head";
import { Download } from "lucide-react";
import CarouselComponent from "./carousel-component";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";
import { useAppDispatch } from "@/app/hooks";
import { shellCommands } from "@/app/shell";

const CategoryCard = ({ title, pkg }: { title: string, pkg: string[] }) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="flex items-center justify-center flex-col w-24">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" size="icon">
            <Download size={40} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <Card className="flex items-center justify-center flex-col p-2 gap-1">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              {pkg.map((item: string, index: number) => (
                <Label key={index} className="text-foreground block">
                  {item}
                </Label>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                size="sm"
                onClick={() =>
                  shellCommands(dispatch, "sudo", ["apt", "install", "-y", ...pkg])
                }
              >
                Download
              </Button>
            </CardFooter>
          </Card>
        </HoverCardContent>
      </HoverCard>
    </Card>
  );
};

const Categories = () => {
  return (
    <ScrollArea className="w-full h-full flex flex-col items-center justify-start p-2">
      <Head title="Categories" />
      <div className="flex items-start justify-center w-full h-full flex-wrap gap-5">
        <div className="w-full flex items-start justify-center py-5 mx-3 border-b rounded-xl border-b-yellow-900">
          <CarouselComponent />
        </div>
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
      </div>
    </ScrollArea>
  );
};
export default Categories;
