import { Info, Minus, Plus, X } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Checkbox } from "./checkbox";
import QButton from "./Qbutton";
import { useAppSelector } from "@/app/hooks";
import DetailsDrawer from "../DetailsDrawer";

interface ToggleGroupProps {
  title: string;
  pkg: string[];
  setOpen?: boolean | ((value: boolean) => void);
  checkBox?: boolean;
}

export const ToggleGroup = ({
  title,
  pkg,
  setOpen,
  checkBox,
}: ToggleGroupProps) => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  const [list, setList] = useState<string[]>(pkg);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(
    () => setList(pkg.filter((item) => !queue.includes(item))),
    [pkg, queue]
  );

  const handleClick = (item: string) => {
    setToggle(!toggle);
    list.includes(item)
      ? setList(list.filter((i) => i !== item))
      : !queue.includes(item) && setList([...list, item]);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-5 p-1">
      <div className="flex items-start justify-between w-full">
        <Label className="font-bold pt-3">{title}</Label>
        {setOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => typeof setOpen === "function" && setOpen(false)}
          >
            <X className="h-5 w-5" color="red" />
          </Button>
        )}
      </div>
      <ScrollArea className="h-auto max-h-96 w-full px-6">
        {pkg.map((item: string, index: number) => (
          <div
            style={{ animationDelay: `${index * 100}ms` }}
            key={index}
            className={`animate-fade-in-right flex items-center mx-1 justify-between pl-2 p-1 gap-10 mb-4 border rounded-xl shadow-primary ${
              list.includes(item)
                ? checkBox
                  ? "shadow-sm"
                  : "shadow-md"
                : "shadow-none"
            }`}
          >
            <Label>{item}</Label>
            <div className="flex justify-end">
              <DetailsDrawer pkg={item} trigger={<Info color="yellow" />} />
              {queue.includes(item) ? (
                <QButton queue={[item]} manager="default" varient="icon" />
              ) : checkBox ? (
                <Checkbox
                  onCheckedChange={() => handleClick(item)}
                  defaultChecked
                  className="h-5 w-5 m-2"
                />
              ) : (
                <Toggle onPressedChange={() => handleClick(item)}>
                  {list.includes(item) ? (
                    <Minus className="h-6 w-6" color="yellow" />
                  ) : (
                    <Plus className="h-6 w-6" color="yellow" />
                  )}
                </Toggle>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
      <Separator orientation="horizontal" color="yellow" />
      {list.length > 0 && (
        <QButton
          queue={list}
          manager={title === "Pip" ? "pip" : "default"}
          varient="list"
        />
      )}
    </div>
  );
};
