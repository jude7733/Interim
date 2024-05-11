import { setLock } from "@/features/lockSlice";
import { addLog } from "@/features/logSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Command } from "@tauri-apps/api/shell";

export const pipInstall = async (dispatch: Dispatch, pkg: string[]) => {
  setLock();
  const command = new Command("pip", ["install", ...pkg]);
  command.stdout.on("data", (line) => {
    dispatch(addLog(line.length > 8 ? line : ""));
  });
  await command.execute().then(() => setLock());
};
