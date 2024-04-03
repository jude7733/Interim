import { confirm, open, save } from "@tauri-apps/api/dialog";
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
    // user cancelled the selection
  } else {
    try {
      let config = await readTextFile(selected as string);
      config = JSON.parse(config);
      return config[osType].map((pkg: { name: string }) => pkg.name);
    } catch (error) {
      console.error("Error parsing JSON file: ", error);
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
