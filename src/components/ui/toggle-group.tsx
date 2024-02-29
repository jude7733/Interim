import { Minus, Plus, XCircle } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { shellCommands } from "@/app/shell";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { Separator } from "./separator";

export const ToggleGroup = ({
  title,
  pkg,
  setOpen,
}: {
  title: string;
  pkg: string[];
  setOpen: (open: boolean) => void;
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
    <div className="flex flex-col items-center justify-between gap-5 p-4">
      <div className="flex items-start justify-between w-full">
        <Label className="font-bold pt-3">{title}</Label>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <XCircle className="h-5 w-5" color="red" />
        </Button>
      </div>
      <div>
        {pkg.map((item: string, index: number) => (
          <div
            className={
              list.includes(item)
                ? "flex items-center justify-around p-1 pl-4 gap-6 mb-4 border rounded-xl shadow-md shadow-primary"
                : "flex items-center justify-around p-1 pl-4 gap-6 mb-2 border rounded-xl"
            }
          >
            <Label key={index}>{item}</Label>
            <Separator orientation="vertical" color="yellow" />
            <Toggle onPressedChange={() => handleClick(item)}>
              {list.includes(item) ? (
                <Minus className="h-6 w-6" color="yellow" />
              ) : (
                <Plus className="h-6 w-6" color="yellow" />
              )}
            </Toggle>
          </div>
        ))}
      </div>
      <Button
        size="sm"
        {...(list.length === 0 && { disabled: true })}
        onClick={() => {
          shellCommands(dispatch, "sudo", ["apt", "install", "-y", ...list]);
          setOpen(false);
        }}
      >
        <Label>Install</Label>
      </Button>
    </div>
  );
};
