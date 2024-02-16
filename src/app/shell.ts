import { addLog } from "@/features/logSlice";
import { Command } from "@tauri-apps/api/shell";

export const updateSystem = async (dispatch) => {
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
  command.stdout.on("data", (line) => console.log(`command stdout: "${line}"`));
  command.stdout.on("data", (line) =>
    dispatch(addLog(line.length > 5 ? line : ""))
  );
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));
  await command.execute();
};
