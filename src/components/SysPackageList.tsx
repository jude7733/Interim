import { exportFromSystem } from "@/app/shell";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { CloudUpload, FileUp } from "lucide-react";
import { DialogFooter, DialogHeader } from "./ui/dialog";

const SysPackageList = ({ mode }: { mode: string }) => {
  const [packages, setPackages] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    mode == "export" && exportFromSystem().then((data) => setPackages(data));
  }, [mode]);

  const handleCheck = (item: string) => {
    list.includes(item)
      ? setList(list.filter((i) => i !== item))
      : setList([...list, item]);
  };

  return (
    <div className="flex flex-col gap-5 py-5 px-3">
      <DialogHeader>Select packages to {mode}</DialogHeader>
      <ScrollArea className="h-auto max-h-80 w-full px-6">
        {packages.map((pkg, index) => (
          <div
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-fade-in-right flex items-center mx-1 justify-between pl-2 p-1 gap-8 mb-4 border rounded-lg shadow-primary shadow-sm"
          >
            <Label key={index}>{pkg}</Label>
            <Checkbox
              onCheckedChange={() => handleCheck(pkg)}
              className="h-5 w-5 m-2"
            />
          </div>
        ))}
      </ScrollArea>
      <DialogFooter className="flex gap-4">
        <Button size="sm" variant="secondary">
          <Label>System </Label>
          <FileUp />
        </Button>
        <Button size="sm" variant="secondary">
          <Label>Cloud </Label>
          <CloudUpload />
        </Button>
      </DialogFooter>
    </div>
  );
};

export default SysPackageList;
