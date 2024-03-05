import { addLog } from "@/features/logSlice";
import { setLock } from "@/features/lockSlice";
import { Command } from "@tauri-apps/api/shell";

export const shellCommands = async (
  dispatch: any,
  cmd: string,
  cmdArgs: string[]
) => {
  const command = new Command(cmd, cmdArgs);
  command.on("close", (data) => {
    dispatch(addLog(data.signal));
  });
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => console.log(`command stdout: "${line}"`));
  command.stdout.on("data", (line) => {
    dispatch(addLog(line.length > 8 ? line : ""));
    dispatch(setLock());
  });
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));
  await command.execute().then(() => setLock());
};
