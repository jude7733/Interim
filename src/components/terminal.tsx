import { useRef, useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Terminal = () => {
  const lineEnd = useRef<HTMLParagraphElement>(null);
  const output = useAppSelector((state) => state.log.value);

  useEffect(() => {
    lineEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <ScrollArea className="flex h-full w-full rounded-md border-4 p-2 bg-accent">
      {output.map((line, storageKey) => (
        <p className="text-sm font-mono" ref={lineEnd} key={storageKey}>
          {line}
        </p>
      ))}
    </ScrollArea>
  );
};
