import { useAppDispatch } from "@/app/hooks";
import { Head } from "./ui/head";
import { MonitorDown } from "lucide-react";
import { BigButton } from "./ui/big-button";
import { listUpdates, shellCommands } from "@/app/shell";
import { packageManager } from "@/app/constants";
import SysPackageList from "./SysPackageList";
import { useState } from "react";

const Update = () => {
  const dispatch = useAppDispatch();
  const [checkedUpdates, setCheckedUpdates] = useState<boolean>(false);

  return (
    <div className="flex items-start flex-col justify-start h-full w-full m-1 p-1">
      <Head title="Update" />
      <div className="flex flex-col flex-wrap w-full h-full gap-10 justify-center items-center">
        <BigButton
          text="Fetch updates"
          icon={<MonitorDown size={50} color="yellow" />}
          onClick={() =>
            !checkedUpdates &&
            (packageManager === "winget"
              ? listUpdates(dispatch).then(() => setCheckedUpdates(true))
              : shellCommands(dispatch, "sudo", [
                  packageManager,
                  "update",
                ]).then(() => setCheckedUpdates(true)))
          }
        />
        {checkedUpdates && <SysPackageList mode="update" />}
      </div>
    </div>
  );
};

export default Update;
