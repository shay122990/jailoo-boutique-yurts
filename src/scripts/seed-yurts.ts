import "dotenv/config";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { yurts } from "../data/yurts";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

async function seedYurts() {
  for (const yurt of yurts) {
    await setDoc(doc(db, "yurts", String(yurt.id)), yurt);
    console.log("Imported:", yurt.name);
  }

  console.log(`Successfully imported ${yurts.length} yurts!`);
}

seedYurts().catch(console.error);
