import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
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
