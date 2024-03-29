import { addLog } from "@/features/logSlice";
import { setLock } from "@/features/lockSlice";
import { Command } from "@tauri-apps/api/shell";
import { packageManager, systemPackages } from "./constants";
import { addUpdate } from "@/features/updateSlice";

export const shellCommands = async (
  dispatch: any,
  cmd: string,
  cmdArgs: string[]
) => {
  dispatch(setLock());
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

export const listUpdates = async (dispatch: any) => {
  dispatch(setLock());
  const pkg: string[] = [];
  const command = new Command(packageManager, ["list", "--upgradable"]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    pkg.push(line.toString().split("/", 1)[0]);
    dispatch(addUpdate(line));
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
  pkg.shift();
  return pkg;
};

export const installPackages = async (
  dispatch: any,
  pkg: string[],
  flag?: string
) => {
  dispatch(setLock());
  const command =
    packageManager === "winget"
      ? new Command(packageManager, ["install", ...pkg])
      : new Command("sudo", [
          packageManager,
          "install",
          "-y",
          ...(flag ? [flag, ...pkg] : pkg),
        ]);
  // command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
};

export const exportFromSystem = async () => {
  const data: string[] = [];
  const command = new Command(packageManager, ["list", "--manual-installed"]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    data.push(line.toString().split("/", 1)[0]);
  });
  await command.execute();
  data.shift();

  return data.filter(
    (item) => !systemPackages.some((pkg: string) => item.includes(pkg))
  );
};
