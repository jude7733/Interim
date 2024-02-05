import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TerminalSquare } from "lucide-react";

const items = [
  "Development",
  "Games",
  "Graphics",
  "Internet",
  "Multimedia",
  "Office",
  "Other",
  "Science",
  "System",
  "Utilities",
];
const Categories = () => {
  return (
    <div className="flex flex-col grow items-center justify-start m-1 p-1 w-full">
      <div>
        <Label className="text-2xl">Categories</Label>
      </div>
      <Carousel
        className="m-5 w-full max-w-48"
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
            {items.map((item, index) => {
              return (
                <CarouselItem key={index}>
                  <Card key={index}>
                    <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center">
                      <TerminalSquare className="w-10 h-10" />
                      <Label className="text-foreground">{item}</Label>
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
    </div>
  );
};
export default Categories;
