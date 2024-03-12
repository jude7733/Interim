import { useAppSelector } from "@/app/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "./label";

const Queue = () => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  console.log(queue);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Queue</AccordionTrigger>
        <AccordionContent>
          {queue.length > 0 ? (
            queue.map((item: string, index: number) => (
              <ul>
                <li key={index}>{item}</li>
              </ul>
            ))
          ) : (
            <Label className="font-light">Select some packages</Label>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default Queue;
