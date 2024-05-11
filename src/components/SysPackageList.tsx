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
import { LoadingSkeleton } from "./ui/LoadingSkeleton";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";

const SysPackageList = ({ mode }: { mode: "export" | "update" }) => {
  const [packages, setPackages] = useState<string[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCloud, setShowCloud] = useState(true);
  const [includeQueue, setIncludeQueue] = useState(false);
  const dispatch = useAppDispatch();
  const lock = useAppSelector((state) => state.lock.value);
  const updates = useAppSelector((state) => state.update.value);
  const user = useAppSelector((state) => state.user.value);
  const queue = useAppSelector((state) => state.queue.value);

  const config = {
    [osType]: includeQueue
      ? [...new Set([...list, ...queue])].map((item) => ({ name: item }))
      : list.map((item) => ({ name: item })),
    settings: useAppSelector((state) => state.settings.value),
  };

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

  const ExportButton = ({ mode }: { mode: "System" | "Cloud" }) => (
    <Button
      size="sm"
      variant="secondary"
      onClick={async () =>
        mode == "System"
          ? await saveFile(JSON.stringify(config)).then(() =>
              toast({
                description: "Successfully created a backup file",
              })
            )
          : await setConfig((user as { email: string })?.email, config)
              .then(() => setShowCloud(false))
              .finally(() =>
                toast({
                  description: "Successfully saved to cloud",
                })
              )
      }
    >
      <Label className="text-primary mr-1">{mode} </Label>
      {mode == "System" ? (
        <FileUp color="yellow" />
      ) : (
        <CloudUpload color="yellow" />
      )}
    </Button>
  );

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
            <DialogFooter className="flex flex-wrap gap-4">
              <ExportButton mode="System" />
              {showCloud && <ExportButton mode="Cloud" />}
              <div className="space-x-3">
                <Label htmlFor="queue">Include current queue items:</Label>
                <Switch
                  id="queue"
                  checked={includeQueue}
                  onCheckedChange={setIncludeQueue}
                />
              </div>
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
