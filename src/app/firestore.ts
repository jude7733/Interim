import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { settings } from "./config";

export async function setConfig(email: string, pkg: object) {
  await setDoc(doc(db, "config", email), {
    ...pkg,
    settings,
  });
  console.log("Config saved!");
}
