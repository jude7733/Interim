import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import SideMenu from "./components/ui/side-menu";

function App() {
  const [output, setOutput] = useState();
  const update = async () => {
    const command = new Command("update", ["install", "Audacity.Audacity"]);
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
    <div className="bg-background text-foreground">
      <div className="flex flex-row justify-between items-center p-4">
        <SideMenu />
      </div>
      <div>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App;
