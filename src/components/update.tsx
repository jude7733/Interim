import { useAppDispatch } from "@/app/hooks";
import { Head } from "./ui/head";
import { MonitorDown } from "lucide-react";
import { BigButton } from "./ui/big-button";
import { shellCommands } from "@/app/shell";
import { packageManager } from "@/app/constants";

const Update = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-start flex-col justify-start h-full w-full m-1 p-1">
      <Head title="Update" />
      <div className="flex w-full h-full justify-center items-center">
        <BigButton
          text="Update System"
          icon={<MonitorDown size={50} color="yellow" />}
          onClick={() =>
            packageManager === "winget"
              ? shellCommands(dispatch, "winget", ["upgrade"]).catch((error) =>
                  console.error(`shellCommands error: "${error}"`)
                )
              : shellCommands(dispatch, "sudo", [packageManager, "update"])
                  .then(() =>
                    shellCommands(dispatch, "sudo", [
                      packageManager,
                      "list",
                      "--upgradable",
                    ])
                  )
                  .catch((error) =>
                    console.error(`shellCommands error: "${error}"`)
                  )
          }
        />
      </div>
    </div>
  );
};

export default Update;
