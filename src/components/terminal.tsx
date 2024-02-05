import { DataContext } from "@/context/DataContext";
import { useContext, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Terminal = () => {
  const { output } = useContext(DataContext);
  const lineEnd = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    lineEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);
  return (
    <ScrollArea className="flex h-full w-full rounded-md border-4 p-2 bg-neutral-900">
      {output.map((line) => (
        <p className="text-sm font-mono" ref={lineEnd}>
          {line}
        </p>
      ))}
    </ScrollArea>
  );
};
