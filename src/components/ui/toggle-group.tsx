import { Minus, Plus, Trash2, X } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Checkbox } from "./checkbox";
import QButton from "./Qbutton";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { popQueue } from "@/features/queueSlice";

export const ToggleGroup = ({
  title,
  pkg,
  setOpen,
  checkBox,
}: {
  title: string;
  pkg: string[];
  setOpen?: boolean | ((value: boolean) => void);
  checkBox?: boolean;
}) => {
  const queue: string[] = useAppSelector((state) => state.queue.value);
  const [list, setList] = useState<string[]>(pkg);
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
            className={`
                   flex items-center justify-between px-2 p-1 gap-8 mb-4 border rounded-xl shadow-primary ${
                     list.includes(item)
                       ? checkBox
                         ? "shadow-sm"
                         : "shadow-md"
                       : "shadow-none"
                   }`}
          >
            <Label key={index}>{item}</Label>
            {queue.includes(item) ? (
              <Button
                className="opacity-100"
                variant="outline"
                size="icon"
                onClick={() => dispatch(popQueue(item))}
              >
                <Trash2 className="h-4 w-4" color="red" />
              </Button>
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
        ))}
      </ScrollArea>
      <Separator orientation="horizontal" color="yellow" />
      {list.length > 0 && <QButton queue={list} />}
    </div>
  );
};
