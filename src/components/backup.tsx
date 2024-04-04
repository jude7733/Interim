import { Head } from "./ui/head";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DownloadCloud,
  FileDown,
  FileX,
  FolderInput,
  FolderOutput,
} from "lucide-react";
import { BigButton } from "./ui/big-button";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { ToggleGroup } from "./ui/toggle-group";
import SysPackageList from "./SysPackageList";
import { openFile } from "@/app/dialog";
import { getConfig } from "@/app/firestore";
import { useAppSelector } from "@/app/hooks";

const Backup = () => {
  const [jsonData, setJsonData] = useState<string[]>([]);
  const user = useAppSelector((state) => state.user?.value);

  const handleFileOpen = async () => {
    openFile().then((data) => setJsonData(data));
  };

  const handleCloudOpen = async () => {
    getConfig(user?.email).then((data) => setJsonData(data));
  };

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Backup" />
      <div className="flex justify-center items-center w-full gap-14 grow">
        <Dialog>
          <DialogTrigger>
            {jsonData?.length > 0 ? (
              <BigButton
                text="Clear Import"
                icon={<FileX size={50} color="yellow" />}
                onClick={() => setJsonData([])}
              />
            ) : (
              <BigButton
                text="Import"
                icon={<FolderInput size={50} color="yellow" />}
              />
            )}
          </DialogTrigger>
          <DialogContent>
            {jsonData.length > 0 ? (
              <ToggleGroup title="Select Packages" pkg={jsonData} />
            ) : (
              <DialogHeader>
                <DialogTitle>Import config</DialogTitle>
                <DialogDescription>
                  You can import your config.json from ...
                </DialogDescription>
                <div className="flex justify-evenly items-center py-10">
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-5 p-5 w-36 h-32 rounded-lg shadow-primary shadow-md"
                    onClick={handleFileOpen}
                  >
                    <Label>From System</Label>
                    <FileDown size={35} color="yellow" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-5 p-5 w-36 h-32 rounded-lg shadow-primary shadow-md"
                    onClick={handleCloudOpen}
                  >
                    <Label>From Cloud</Label>
                    <DownloadCloud size={35} color="yellow" />
                  </Button>
                </div>
              </DialogHeader>
            )}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <BigButton
              text="Export"
              icon={<FolderOutput size={50} color="yellow" />}
            />
          </DialogTrigger>
          <DialogContent className="w-fit">
            <SysPackageList mode="export" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default Backup;
