import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { settings } from "./config";
import { osType } from "./constants";

export async function setConfig(email: string, pkg: object) {
  await setDoc(doc(db, "config", email), {
    ...pkg,
    settings,
  });
  console.log("Config saved!");
}

export async function getConfig(email: string) {
  const docSnap = await getDoc(doc(db, "config", email));
  if (docSnap.exists()) {
    return docSnap.data()[osType].map((pkg: { name: string }) => pkg.name);
  } else {
    console.log("No such document!");
  }
}
