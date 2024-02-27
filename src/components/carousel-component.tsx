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
  Files,
  Gamepad,
  Library,
  MonitorPlay,
  Paintbrush,
  Sliders,
  TerminalSquare,
} from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "./ui/card";

const items = {
  Dev: () => <TerminalSquare size={40} color="yellow" />,
  Pip: () => <Library size={40} color="yellow" />,
  Games: () => <Gamepad size={40} color="yellow" />,
  Graphics: () => <Paintbrush size={40} color="yellow" />,
  Internet: () => <ArrowDownUp size={40} color="yellow" />,
  Multimedia: () => <MonitorPlay size={40} color="yellow" />,
  Office: () => <Files size={40} color="yellow" />,
  System: () => <Sliders size={40} color="yellow" />,
};
const CarouselComponent = () => {
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
              <CarouselItem key={index} className="md:basis-1/3 xl:basis-1/4">
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

export default CarouselComponent;
