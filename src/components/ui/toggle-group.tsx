import { Minus, Plus, X } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { shellCommands } from "@/app/shell";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { Separator } from "./separator";
import { packageManager } from "@/app/constants";
import { ScrollArea } from "./scroll-area";
import { Checkbox } from "./checkbox";

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
  const dispatch = useAppDispatch();
  const [list, setList] = useState<string[]>(pkg);
  const [toggle, setToggle] = useState<boolean>(false);
  const handleClick = (item: string) => {
    setToggle(!toggle);
    list.includes(item)
      ? setList(list.filter((i) => i !== item))
      : setList([...list, item]);
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
              {checkBox ? (
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
        <Button
          size="sm"
          {...(list.length === 0 && { disabled: true })}
          onClick={() => {
            shellCommands(dispatch, "sudo", [
              packageManager,
              "install",
              "-y",
              ...list,
            ]);
          }}
        >
          <Label>Install</Label>
        </Button>
      </div>
    </ScrollArea>
  );
};
