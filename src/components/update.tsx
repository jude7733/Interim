import { useDispatch } from "react-redux";
import { addLog } from "../redux/state/logSlice";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Command } from "@tauri-apps/api/shell";

// const regex = /^\\b (?!_)/;

const Update = () => {
    const dispatch = useDispatch();

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
    command.stdout.on("data", (line) =>
      dispatch(addLog())
    );
    command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    await command.execute();
  };
  return (
    <div className="flex align-middle justify-center">
      <Button onClick={update}>
        Update &nbsp;&nbsp;
        <UpdateIcon />
      </Button>
    </div>
  );
};

export default Update;
