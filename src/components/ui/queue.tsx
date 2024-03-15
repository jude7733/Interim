import { useAppDispatch, useAppSelector } from "@/app/hooks";
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
import { popQueue } from "@/features/queueSlice";

const Queue = () => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  const dispatch = useAppDispatch();

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
          <ul className="flex flex-col p-2">
            {queue.length > 0 ? (
              queue.map((item: string, index: number) => (
                <>
                  <li
                    key={index}
                    className="flex justify-between items-center group"
                  >
                    <Label>{item}</Label>
                    <Button
                      className="opacity-5 group-hover:opacity-100 transition-opacity duration-100"
                      variant="outline"
                      size="icon"
                      onClick={() => dispatch(popQueue(item))}
                    >
                      <Trash2 className="h-4 w-4" color="red" />
                    </Button>
                  </li>
                  <Separator />
                </>
              ))
            ) : (
              <li className="p-1">
                <Label className="font-light">Select some packages</Label>
              </li>
            )}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Queue;
