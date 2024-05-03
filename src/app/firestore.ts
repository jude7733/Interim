import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { osType } from "./constants";
import { toast } from "@/components/ui/use-toast";

export async function setConfig(email: string, config: object) {
  await setDoc(doc(db, "config", email), {
    ...config,
  })
    .then(() =>
      toast({
        description: "Saved to cloud",
      })
    )
    .catch((error) => alert(error));
}

export async function getCloudPackages(email: string) {
  const docSnap = await getDoc(doc(db, "config", email));
  if (docSnap.exists()) {
    return docSnap.data()[osType].map((pkg: { name: string }) => pkg.name);
  } else {
    return [];
  }
}

export async function getSettings(email: string) {
  const docSnap = await getDoc(doc(db, "config", email));
  if (docSnap.exists()) {
    return docSnap.data().settings;
  }
}
