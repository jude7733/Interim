import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowDownUp,
  Download,
  Files,
  Gamepad,
  MonitorPlay,
  Paintbrush,
  Sliders,
  TerminalSquare,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";

const CarouselComponent = () => {
  const items = {
    Dev: () => <TerminalSquare />,
    Games: () => <Gamepad />,
    Graphics: () => <Paintbrush />,
    Internet: () => <ArrowDownUp />,
    Multimedia: () => <MonitorPlay />,
    Office: () => <Files />,
    System: () => <Sliders />,
  };
  return (
    <Carousel
      className="md:max-w-64 lg:max-w-96"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <Card>
        <CarouselContent>
          {Object.keys(items).map((key: string, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card key={index}>
                  <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center border-2 border-yellow-800 rounded-md">
                    {items[key]()}
                    <Label className="text-foreground">{key}</Label>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Card>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const CategoryCard = ({ title }: { title: string }) => {
  return (
    <Card className="flex items-center justify-center flex-col w-24">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button size="icon">
          <Download />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Categories = () => {
  return (
    <ScrollArea className="w-full h-full flex flex-col items-center justify-start p-2">
      <div className="mb-4 p-2 rounded-lg w-fit border-b-yellow-400 border-b-2">
        <Label className="text-2xl">Categories</Label>
      </div>
      <div className="flex items-start justify-center w-full h-full flex-wrap gap-3 py-5">
        <div className="mx-14">
          <CarouselComponent />
        </div>
        <CategoryCard title="Python" />
        <CategoryCard title="Java" />
        <CategoryCard title="Flutter" />
        <CategoryCard title="React" />
        <CategoryCard title="Rust" />
        <CategoryCard title="Go" />
        <CategoryCard title="Ruby" />
        <CategoryCard title="Node" />
        <CategoryCard title="C++" />
        <CategoryCard title="C#" />
        <CategoryCard title="R" />
        <CategoryCard title="PHP" />
      </div>
    </ScrollArea>
  );
};
export default Categories;
