import { confirm, open, save, message } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { osType } from "./constants";

export async function openFile() {
  const selected = await open({
    filters: [
      {
        name: "interim",
        extensions: ["json"],
      },
    ],
  });

  if (selected === null) {
    alert("No file selected");
  } else {
    try {
      const config = await readTextFile(selected as string);
      return JSON.parse(config)[osType].map(
        (pkg: { name: string }) => pkg.name
      );
    } catch (error) {
      alert(error);
    }
  }
}

export const saveFile = async (data: string) => {
  await save({
    defaultPath: "interim.json",
    filters: [{ name: "interim", extensions: ["json"] }],
  }).then((path) => {
    if (path) {
      writeTextFile({ path: path, contents: data });
    }
  });
};

export const confirmDialog = async (
  message: string,
  title: string,
  okLabel?: string
) => {
  return await confirm(message, {
    title: title,
    type: "warning",
    okLabel: okLabel,
  });
};

export const errorDialog = async (errorMsg: string, title: string) => {
  return await message(errorMsg, {
    title: title,
    type: "error",
  });
};
