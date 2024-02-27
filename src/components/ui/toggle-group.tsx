import { MinusSquare, PlusSquare } from "lucide-react";
import { Label } from "./label";
import { Toggle } from "./toggle";
import { Button } from "./button";
import { shellCommands } from "@/app/shell";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";

export const ToggleGroup = ({
  title,
  pkg,
}: {
  title: string;
  pkg: string[];
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
      <Label className="font-bold">{title}</Label>
      <div>
        {pkg.map((item: string, index: number) => (
          <div
            className={
              list.includes(item)
                ? "flex items-center justify-around p-1 gap-5 mb-2 border-2 rounded-lg border-x-primary "
                : "flex items-center justify-around p-1 gap-5 mb-2 border-2 rounded-lg border-destructive"
            }
          >
            <Label key={index}>{item}</Label>
            <Toggle onClick={() => handleClick(item)}>
              {list.includes(item) ? (
                <MinusSquare className="h-5 w-5" color="yellow" />
              ) : (
                <PlusSquare className="h-5 w-5" color="yellow" />
              )}
            </Toggle>
          </div>
        ))}
      </div>
      <Button
        size="sm"
        onClick={() =>
          shellCommands(dispatch, "sudo", ["apt", "install", "-y", ...list])
        }
      >
        Download
      </Button>
    </div>
  );
};
