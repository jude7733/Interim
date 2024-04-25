import { exportFromSystem, installPackages, listUpdates } from "@/app/shell";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { CloudUpload, FileUp, RefreshCcw } from "lucide-react";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Separator } from "./ui/separator";
import { osType, packageManager } from "@/app/constants";
import { saveFile } from "@/app/dialog";
import { shellCommands } from "@/app/shell";
import { setConfig } from "@/app/firestore";
import { toast } from "./ui/use-toast";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";

type SysPackageListProps = {
  mode: "export" | "update";
};

const SysPackageList = ({ mode }: SysPackageListProps) => {
  const [packages, setPackages] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCloud, setShowCloud] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const lock = useAppSelector((state) => state.lock.value);
  const updates = useAppSelector((state) => state.update.value);
  const user = useAppSelector((state) => state.user.value);
  const settings = useAppSelector((state) => state.settings.value);

  useEffect(() => {
    if (mode === "export") {
      exportFromSystem().then((data) => {
        setPackages(data);
        setLoading(false);
      });
    } else {
      if (updates.length > 0) {
        setPackages(updates);
        setLoading(false);
      } else {
        listUpdates(dispatch).then((data) => {
          setPackages(data);
          setLoading(false);
        });
      }
    }
  }, []);

  const handleCheck = (item: string) => {
    list.includes(item)
      ? setList(list.filter((i) => i !== item))
      : setList([...list, item]);
  };

  return (
    <>
      {loading ? (
        <LoadingSkeleton variant={mode} />
      ) : (
        <div
          className={`flex flex-col gap-5 py-5 px-3 ${
            mode === "update" && "border-2 rounded-xl shadow-primary shadow-md"
          }`}
        >
          {packages.length > 0 ? (
            <DialogHeader>Select packages to {mode}</DialogHeader>
          ) : (
            <div className="flex flex-col justify-around gap-5 items-center">
              <Label className="font-medium text-lg">
                No packages to {mode}
              </Label>
              <Button
                size="sm"
                onClick={() =>
                  shellCommands(dispatch, "sudo", [
                    packageManager,
                    "update",
                  ]).then(() =>
                    listUpdates(dispatch).then((data) => setPackages(data))
                  )
                }
              >
                <Label className="text-sm mr-2">Refresh</Label>
                <RefreshCcw />
              </Button>
            </div>
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
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  saveFile(
                    JSON.stringify({
                      [osType]: list.map((item) => ({ name: item })),
                      settings: settings,
                    })
                  )
                }
              >
                <Label className="text-primary mr-1">System </Label>
                <FileUp color="yellow" />
              </Button>
              {showCloud && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={async () =>
                    await setConfig((user as { email: string })?.email, {
                      [osType]: list.map((item) => ({ name: item })),
                      settings: settings,
                    })
                      .then(() =>
                        toast({
                          description: "Saved to cloud",
                        })
                      )
                      .then(() => setShowCloud(false))
                  }
                >
                  <Label className="text-primary mr-1">Cloud </Label>
                  <CloudUpload color="yellow" />
                </Button>
              )}
            </DialogFooter>
          ) : (
            list.length > 0 && (
              <div className="flex flex-col gap-4 justify-center items-end">
                <Separator />
                <Button
                  onClick={() =>
                    installPackages(dispatch, list, "--only-upgrade")
                  }
                  disabled={lock}
                  size="sm"
                >
                  <Label>Update</Label>
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default SysPackageList;
