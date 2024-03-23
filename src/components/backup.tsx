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
  FolderInput,
  FolderOutput,
} from "lucide-react";
import { BigButton } from "./ui/big-button";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
import { ToggleGroup } from "./ui/toggle-group";
import SysPackageList from "./SysPackageList";

const Backup = () => {
  const [jsonData, setJsonData] = useState<string[]>();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileInput = () => {
    fileInput.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e?.target?.result as string);
          setJsonData(
            Object.keys(data.packages).map(
              (key: string) => data.packages[key].windows
            ) as string[]
          );
        } catch (error) {
          console.error("Error parsing JSON file: ", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Backup" />
      <div className="flex justify-center items-center w-full gap-14 grow">
        <Dialog>
          <DialogTrigger>
            <BigButton
              text="Import"
              icon={<FolderInput size={50} color="yellow" />}
            />
          </DialogTrigger>
          <DialogContent>
            {jsonData ? (
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
                    onClick={handleFileInput}
                  >
                    <input
                      type="file"
                      ref={fileInput}
                      id="fileUpload"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Label>From System</Label>
                    <FileDown size={35} color="yellow" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-5 p-5 w-36 h-32 rounded-lg shadow-primary shadow-md"
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
          <DialogContent>
            <SysPackageList mode="export" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default Backup;
