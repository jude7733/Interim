import { Command } from "@tauri-apps/api/shell";
import { useState } from "react";
import "./App.css";
import SideMenu from "./components/side-menu";

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
    <div className="bg-background flex text-foreground border rounded-md">
        <SideMenu />
    </div>
  );
}

export default App;
