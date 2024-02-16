import { Head } from "./ui/head";
import { FolderInput, FolderOutput } from "lucide-react";
import { BigButton } from "./ui/big-button";
import { useAppDispatch } from "@/app/hooks";
import { updateSystem } from "@/app/shell";

const Backup = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-start justify-start m-1 p-1 w-full h-full">
      <Head title="Backup" />
      <div className="flex justify-center items-center w-full gap-10 grow">
        <BigButton
          text="Import"
          icon={<FolderInput size={50} color="yellow" />}
          onClick={() => updateSystem(dispatch)}
        />
        <BigButton
          text="Export"
          icon={<FolderOutput size={50} color="yellow" />}
          onClick={() => updateSystem(dispatch)}
        />
      </div>
    </div>
  );
};
export default Backup;
