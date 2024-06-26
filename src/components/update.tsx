import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Head } from "./ui/head";
import { MonitorDown } from "lucide-react";
import { BigButton } from "./ui/big-button";
import { shellCommands } from "@/app/shell";
import { packageManager } from "@/app/constants";
import SysPackageList from "./SysPackageList";
import { useState } from "react";
import { LoadingSkeleton } from "./ui/LoadingSkeleton";

const Update = () => {
  const dispatch = useAppDispatch();
  const [checkedUpdates, setCheckedUpdates] = useState(false);
  const [loading, setLoading] = useState(false);
  const updates = useAppSelector((state) => state.update.value);

  return (
    <div className="flex items-start flex-col justify-start h-full w-full m-1 p-1">
      <Head title="Update" />
      <div className="flex flex-col flex-wrap w-full h-full gap-10 justify-center items-center">
        {checkedUpdates || updates.length > 0 ? (
          <SysPackageList mode="update" />
        ) : loading ? (
          <LoadingSkeleton variant="update" />
        ) : (
          <BigButton
            text="Fetch updates"
            icon={<MonitorDown size={50} color="yellow" />}
            onClick={() => {
              if (!checkedUpdates) {
                //Linux
                setLoading(true);
                shellCommands(dispatch, "sudo", [
                  packageManager,
                  "update",
                ]).then(() => {
                  setCheckedUpdates(true);
                  setLoading(false);
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Update;
