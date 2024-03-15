import { useAppSelector } from "@/app/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "./label";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { Separator } from "./separator";

const Queue = () => {
  const queue: string[] = useAppSelector((state) => state.queue.value);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Label>Queue</Label>
        </AccordionTrigger>
        <AccordionContent
          // forceMount={queue.length > 0 ? true : undefined}
          className={`${
            queue.length > 0 && "border-[1px] border-primary"
          }  rounded-lg bg-card`}
        >
          {queue.length > 0 ? (
            queue.map((item: string, index: number) => (
              <ul className="flex flex-col p-2 gap-2">
                <li key={index} className="flex justify-between items-center">
                  <Label>{item}</Label>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" color="red" />
                  </Button>
                </li>
                <Separator />
              </ul>
            ))
          ) : (
            <div className="p-1">
              <Label className="font-light">Select some packages</Label>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Queue;
