import { exportFromSystem, installPackages, listUpdates } from "@/app/shell";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { CloudUpload, FileUp } from "lucide-react";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Separator } from "./ui/separator";

const SysPackageList = ({ mode }: { mode: "export" | "update" }) => {
  const [packages, setPackages] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const lock = useAppSelector((state) => state.lock.value);

  useEffect(() => {
    mode == "export"
      ? exportFromSystem().then((data) => setPackages(data))
      : listUpdates(dispatch).then((data) => setPackages(data));
  }, [dispatch, mode]);

  const handleCheck = (item: string) => {
    list.includes(item)
      ? setList(list.filter((i) => i !== item))
      : setList([...list, item]);
  };

  const exportToSystem = () => {
    const data = JSON.stringify(list);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "interim.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5 py-5 px-3">
      {packages.length > 0 ? (
        <DialogHeader>Select packages to {mode}</DialogHeader>
      ) : (
        <Label className="font-medium text-lg">No packages to {mode}</Label>
      )}
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
      {mode === "export" ? (
        <DialogFooter className="flex gap-4">
          <Button size="sm" variant="secondary" onClick={exportToSystem}>
            <Label className="text-primary mr-1">System </Label>
            <FileUp color="yellow" />
          </Button>
          <Button size="sm" variant="secondary">
            <Label className="text-primary mr-1">Cloud </Label>
            <CloudUpload color="yellow" />
          </Button>
        </DialogFooter>
      ) : (
        list.length > 0 && (
          <div className="flex flex-col gap-4 justify-center items-end">
            <Separator />
            <Button
              onClick={() => installPackages(dispatch, list, "--only-upgrade")}
              disabled={lock}
              size="sm"
            >
              <Label>Update</Label>
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default SysPackageList;
