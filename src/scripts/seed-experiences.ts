import "dotenv/config";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { experiences } from "../data/experiences";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

async function seedExperiences() {
  for (const experience of experiences) {
    await setDoc(doc(db, "experiences", String(experience.id)), {
      ...experience,
      image: experience.image ?? "",
    });
    console.log(`Successfully imported ${experiences.length} experiences!`);
  }
}

seedExperiences().catch(console.error);
