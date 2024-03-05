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
  Dev: ["code", "python3-pip"],
  Pip: [
    "python3-pip",
    "numpy",
    "pandas",
    "matplotlib",
    "seaborn",
    "scipy",
    "scikit-learn",
    "tensorflow",
  ],
  Games: ["supertux", "lutris", "steam", "wine", "playonlinux"],
  Graphics: ["gimp", "inkscape", "blender", "krita"],
  Internet: ["firefox", "chromium"],
  Multimedia: ["vlc", "audacity", "kodi", "handbrake"],
  Office: ["libreoffice"],
  System: [
    "htop",
    "neofetch",
    "gnome-tweaks",
    "timeshift",
    "gparted",
    "bleachbit",
  ],
};
const CarouselComponent = () => {
  return (
    <Carousel
      className="2xl:max-w-[1280px] xl:max-w-[1024px] lg:max-w-[768px] md:max-w-[540px] sm:max-w-[380px] w-full h-full p-2"
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
              <CarouselItem
                key={index}
                className="basis-44 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 max-w-full"
              >
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
                    <DialogContent className="h-auto max-h-screen">
                      <ToggleGroup
                        title={key}
                        pkg={packages[key]}
                        setOpen={false}
                      />
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
