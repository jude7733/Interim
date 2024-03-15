import { CheckSquare2Icon, Minus, Plus, X } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Checkbox } from "./checkbox";
import QButton from "./Qbutton";
import { useAppSelector } from "@/app/hooks";

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
    <ScrollArea>
      <div className="flex flex-col items-center justify-between gap-5 p-4">
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
        <div>
          {pkg.map((item: string, index: number) => (
            <div
              className={`
                   flex items-center justify-between p-1 pl-4 gap-6 mb-4 border rounded-xl shadow-primary ${
                     list.includes(item)
                       ? checkBox
                         ? "shadow-sm"
                         : "shadow-md"
                       : "shadow-none"
                   }`}
            >
              <Label key={index}>{item}</Label>
              <Separator orientation="vertical" color="yellow" />
              {queue.includes(item) ? (
                <CheckSquare2Icon color="yellow" className="h-6 w-6" />
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
        </div>
        <Separator orientation="horizontal" color="yellow" />
        {list.length > 0 && <QButton queue={list} />}
      </div>
    </ScrollArea>
  );
};
