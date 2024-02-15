import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Head } from "./ui/head";
import { FolderInput, FolderOutput } from "lucide-react";

const Backup = () => {
  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Backup" />
      <div className="flex justify-center items-center w-full gap-10 grow">
        <Button
          size="lg"
          variant="outline"
          className="w-40 h-40 flex-col gap-8"
        >
          <Label className="text-xl text-card-foreground">Import</Label>
          <FolderInput size={50} color="yellow" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-40 h-40 flex-col gap-8"
        >
          <Label className="text-xl text-card-foreground">Export</Label>
          <FolderOutput size={50} color="yellow" />
        </Button>
      </div>
    </div>
  );
};
export default Backup;
