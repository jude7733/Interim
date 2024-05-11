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
import { confirmDialog } from "@/app/dialog";
import { clearPipQueue, popPipQueue } from "@/features/pipQueueSlice";
import { packageManager } from "@/app/constants";

const QueueList = () => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  const pipQueue: string[] = useAppSelector((state) => state.pip.value);
  const dispatch = useAppDispatch();
  const empty = queue.length == 0 ? true : false;
  const emptyPip = pipQueue.length == 0 ? true : false;

  const handleClearQueue = async (type?: "default" | "pip") => {
    await confirmDialog(
      "Are you sure you want to clear the list of selected packages?",
      "Clear queue",
      "Clear"
    ).then(
      (confirmation) =>
        confirmation && dispatch(type == "pip" ? clearPipQueue() : clearQueue())
    );
  };

  return (
    <Accordion type="single" collapsible className="mt-2">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Label>
            {packageManager} ({queue.length})
          </Label>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className={`h-72 ${empty && "h-fit"}`}>
            <ul
              className={`flex flex-col p-2 rounded-lg bg-card ${
                empty ? "border" : "border-2"
              }`}
            >
              {!empty && (
                <div className="flex justify-end mb-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-10 h-6"
                    onClick={() => handleClearQueue("default")}
                  >
                    <Label className="font-medium text-sm cursor-pointer">
                      Clear
                    </Label>
                  </Button>
                </div>
              )}
              {!empty ? (
                queue.map((item: string, index: number) => (
                  <>
                    <li
                      key={index}
                      className="flex justify-between items-center group animate-fade-in-down"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Label className="text-xs font-thin max-w-20 overflow-hidden">
                        {item}
                      </Label>
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
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Label>pip ({pipQueue.length})</Label>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className={`h-72 ${emptyPip && "h-fit"}`}>
            <ul
              className={`flex flex-col p-2 rounded-lg bg-card ${
                emptyPip ? "border" : "border-2"
              }`}
            >
              {!emptyPip && (
                <div className="flex justify-end mb-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-10 h-6"
                    onClick={() => handleClearQueue("pip")}
                  >
                    <Label className="font-medium text-sm cursor-pointer">
                      Clear
                    </Label>
                  </Button>
                </div>
              )}
              {!emptyPip ? (
                pipQueue.map((item: string, index: number) => (
                  <>
                    <li
                      key={index}
                      className="flex justify-between items-center group animate-fade-in-down"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Label className="text-xs font-thin max-w-20 overflow-hidden">
                        {item}
                      </Label>
                      <Button
                        className="opacity-20 group-hover:opacity-100 transition-opacity duration-100"
                        variant="outline"
                        size="icon"
                        onClick={() => dispatch(popPipQueue(item))}
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
