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
import { Head } from "./ui/head";

const CarouselComponent = () => {
  const items = {
    Dev: () => <TerminalSquare size={40} color="yellow" />,
    Games: () => <Gamepad size={40} color="yellow" />,
    Graphics: () => <Paintbrush size={40} color="yellow" />,
    Internet: () => <ArrowDownUp size={40} color="yellow" />,
    Multimedia: () => <MonitorPlay size={40} color="yellow" />,
    Office: () => <Files size={40} color="yellow" />,
    System: () => <Sliders size={40} color="yellow" />,
  };
  return (
    <Carousel
      className="w-[70%]"
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
      <Card className="p-2">
        <CarouselContent>
          {Object.keys(items).map((key: string, index: number) => {
            return (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <Card key={index}>
                  <CardContent className="flex flex-col gap-2 p-2 aspect-square items-center justify-center border border-yellow-500 rounded-md">
                    {(items as { [key: string]: () => JSX.Element })[key]()}
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
        <Button variant="link" size="icon">
          <Download size={40} />
        </Button>
      </CardFooter>
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
