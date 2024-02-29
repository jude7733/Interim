import { Head } from "./ui/head";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cloud, FolderInput, FolderOutput } from "lucide-react";
import { BigButton } from "./ui/big-button";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useState } from "react";

const Backup = () => {
  const [jsonData, setJsonData] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setJsonData(content);
      } catch (error) {
        console.error("Error parsing JSON file: ", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Backup" />
      <div className="flex justify-center items-center w-full gap-10 grow">
        <Dialog>
          <DialogTrigger>
            <BigButton
              text="Import"
              icon={<FolderInput size={50} color="yellow" />}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import config.json</DialogTitle>
              <DialogDescription>
                You can import your config from a file or from cloud
              </DialogDescription>
              <div className="flex justify-evenly items-center py-10">
                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-primary shadow-md">
                  <Label>Import from System</Label>
                  <Separator />
                  <input
                    type="file"
                    accept=".json"
                    className="w-5"
                    onChange={handleFileUpload}
                  />
                </div>
                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-primary shadow-md">
                  <Label>Import from Cloud</Label>
                  <Separator />
                  <Button variant="ghost">
                    <Cloud size={30} />
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <BigButton
          text="Export"
          icon={<FolderOutput size={50} color="yellow" />}
        />
      </div>
    </div>
  );
};
export default Backup;
