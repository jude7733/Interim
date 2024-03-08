import { addLog } from "@/features/logSlice";
import { setLock } from "@/features/lockSlice";
import { Command } from "@tauri-apps/api/shell";
import { packageManager } from "./constants";
import { addUpdate } from "@/features/updateSlice";

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
  command.stdout.on("data", (line) => {
    dispatch(addLog(line.length > 8 ? line : ""));
    dispatch(setLock());
  });
  command.stderr.on("data", (line) => console.log(`command stderr: "${line}"`));
  await command.execute().then(() => setLock());
};

export const updateSystem = async (dispatch: any) => {
  dispatch(setLock());
  const command =
    packageManager === "winget"
      ? new Command(packageManager, ["upgrade"])
      : new Command(packageManager, ["list", "--upgradable"]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    dispatch(addUpdate(line));
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
};

export const installPackages = async (dispatch: any, pkg: string[]) => {
  dispatch(setLock());
  const command =
    packageManager === "winget"
      ? new Command(packageManager, ["install", ...pkg])
      : new Command("sudo", [packageManager, "install", "-y", ...pkg]);
  // command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
};
