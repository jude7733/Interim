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
import { clearQueue, popQueue } from "@/features/queueSlice";
import { ScrollArea } from "./scroll-area";
import { useEffect, useState } from "react";

const QueueList = () => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  const dispatch = useAppDispatch();
  const [empty, setEmpty] = useState<boolean>(false);
  useEffect(
    () => (queue.length == 0 ? setEmpty(true) : setEmpty(false)),
    [queue]
  );

  return (
    <Accordion type="single" collapsible className="mt-5">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Label>Queue ({queue.length})</Label>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className={`h-80 ${empty && "h-fit"}`}>
            <ul
              className={`flex flex-col p-2 rounded-lg bg-card ${
                empty ? "border" : "border-2"
              }`}
            >
              {!empty && (
                <div className="flex justify-end mb-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-12 h-7"
                    onClick={() => dispatch(clearQueue())}
                  >
                    <Label className="font-medium cursor-pointer">Clear</Label>
                  </Button>
                </div>
              )}
              {!empty ? (
                queue.map((item: string, index: number) => (
                  <>
                    <li
                      key={index}
                      className="flex justify-between items-center group"
                    >
                      <Label>{item}</Label>
                      <Button
                        className="opacity-20 group-hover:opacity-100 transition-opacity duration-100"
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(popQueue(item))}
                      >
                        <Trash2 className="h-4 w-4" color="red" />
                      </Button>
                    </li>
                    <Separator className="bg-secondary" />
                  </>
                ))
              ) : (
                <li>
                  <Label className="font-light inline-block text-xs">
                    Select some packages
                  </Label>
                </li>
              )}
            </ul>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default QueueList;
