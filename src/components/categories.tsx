import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Head } from "./ui/head";
import { Download } from "lucide-react";
import CarouselComponent from "./carousel-component";


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
