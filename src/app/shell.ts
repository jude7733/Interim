import { addLog } from "@/features/logSlice";
import { setLock } from "@/features/lockSlice";
import { Command } from "@tauri-apps/api/shell";
import { packageManager, systemPackages } from "./constants";
import { addUpdate } from "@/features/updateSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const shellCommands = async (
  dispatch: Dispatch,
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

export const listUpdates = async (dispatch: Dispatch) => {
  dispatch(setLock());
  const pkg: string[] = [];
  const command = new Command(packageManager, ["list", "--upgradable"]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    pkg.push(line.toString().split("/", 1)[0]);
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
  pkg.shift();
  dispatch(addUpdate(pkg));
  return pkg;
};

export const installPackages = async (
  dispatch: Dispatch,
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
          ...(flag ? [flag, ...pkg] : pkg),
          "-y",
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

export type PackageDetails = {
  Description: string;
  Version: string;
  Origin: string;
  Maintainer: string;
  DownloadSize: string;
  InstalledSize: string;
  Homepage: string;
  Section: string;
  Provides: string;
  Info: string;
};

export const getPackageDetails = async (pkg: string) => {
  const details: string[] = [];
  const obj: PackageDetails | Record<string, string> = {};
  const command = new Command(packageManager, ["show", pkg]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    details.push(line);
  });
  await command.execute();

  details.map((line) => {
    if (line.includes(":")) {
      const [keys, ...value] = line.split(":");
      const key = keys.trim().replace("-", "");
      const val = value.join(":").trim();
      if (obj[key]) {
        obj[key] += "\n" + val;
      } else {
        obj[key] = val;
      }
    } else {
      obj["Info"] ? (obj["Info"] += "\n" + line) : (obj["Info"] = line);
    }
  });
  return obj;
};

export type SearchResult = {
  name: string;
  source: string;
  version: string;
  architecture: string;
  installed: boolean;
  description: string;
};

export const searchPackage = async (pkg: string) => {
  const output: string[] = [];
  const command = new Command(packageManager, ["search", "-n", pkg]);
  command.on("error", (error) => console.error(`command error: "${error}"`));
  command.stdout.on("data", (line) => {
    output.push(line);
  });
  await command.execute();

  const packages: SearchResult[] = [];
  output.splice(0, 2);
  if (output.length === 0) {
    return null;
  }

  for (let i = 0; i < output.length; i = i + 3) {
    const [full, version, architecture, status] = output[i].split(" ");
    const [name, source] = full.split("/");
    const description = output[i + 1].trim();

    packages.push({
      name,
      source,
      version,
      architecture,
      installed: status === "[installed]\n" ? true : false,
      description,
    });
  }

  return packages;
};
