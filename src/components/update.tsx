import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Command } from "@tauri-apps/api/shell";
import { DataContext } from "@/context/DataContext";
import { useContext } from "react";

const regex = /^\\b (?!_)/;

const Update = () => {
  const { output, setOutput } = useContext(DataContext);
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
      setOutput((output) => (line.length > 7 ? [...output, line] : output))
    );
    command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    await command.execute();
  };
  console.log(output);
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
