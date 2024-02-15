import { useAppDispatch } from "@/app/hooks";
import { addLog } from "../features/logSlice";
import { Button } from "./ui/button";
import { Command } from "@tauri-apps/api/shell";
import { Head } from "./ui/head";
import { MonitorDown } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";

// const regex = /^\\b (?!_)/;

const Update = () => {
  const dispatch = useAppDispatch();

  const update = async () => {
    const command = new Command("update", [
      "upgrade",
      "-h",
      "--all",
      "--include-unknown",
    ]);
    // command.on("close", (data) => {
    //   setOutput(output + data.signal);
    // });
    command.on("error", (error) => console.error(`command error: "${error}"`));
    command.stdout.on("data", (line) =>
      console.log(`command stdout: "${line}"`)
    );
    command.stdout.on("data", (line) => dispatch(addLog(line)));
    command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    await command.execute();
  };
  return (
    <div className="flex items-start flex-col justify-start h-full w-full m-1 p-1">
      <Head title="Update" />
      <div className="flex w-full h-full justify-center items-center">
        <Button
          onClick={update}
          className="w-40 h-40 flex-col gap-5"
          variant="outline"
        >
          <Label className="text-xl text-yellow-100">Update System</Label>
          <MonitorDown size={50} color="lime" />
        </Button>
      </div>
    </div>
  );
};

export default Update;
