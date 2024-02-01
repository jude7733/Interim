import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";

const Update = () => {
  const [output, setOutput] = useState();
  const update = async () => {
    const command = new Command("update", ["upgrade", "-h", "--all"]);
    command.on("close", (data) => {
      setOutput(data.signal);
    });
    command.on("error", (error) => console.error(`command error: "${error}"`));
    command.stdout.on("data", (line) =>
      console.log(`command stdout: "${line}"`)
    );
    command.stdout.on("data", (line) => setOutput(line));
    command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    await command.execute();
  };
  return (
    <div>
      <Button onClick={update}>
        Update &nbsp;&nbsp;
        <UpdateIcon />
      </Button>
      <p>{output}</p>
    </div>
  );
};

export default Update;
