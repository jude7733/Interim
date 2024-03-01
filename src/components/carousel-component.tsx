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
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ToggleGroup } from "./ui/toggle-group";

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
const packages = {
  Dev: ["python3", "python3-pip"],
  Pip: ["python3-pip"],
  Games: ["supertux", "supertuxkart"],
  Graphics: ["gimp", "inkscape"],
  Internet: ["firefox", "chromium"],
  Multimedia: ["vlc", "audacity"],
  Office: ["libreoffice"],
  System: ["htop", "neofetch"],
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
                <Dialog>
                  <Card key={index}>
                    <DialogTrigger className="w-full h-full border border-primary shadow-sm shadow-primary rounded-md">
                      <Button className="w-full h-full" variant="outline">
                        <CardContent className="flex flex-col gap-2 p-2 aspect-square items-center justify-center w-full h-full">
                          {(items as { [key: string]: () => JSX.Element })[
                            key
                          ]()}
                          <Label className="text-foreground">{key}</Label>
                        </CardContent>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <ToggleGroup title={key} pkg={packages[key]} setOpen={false} />
                    </DialogContent>
                  </Card>
                </Dialog>
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
