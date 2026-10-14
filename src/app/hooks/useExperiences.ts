import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_lib/firebase";

export type Experience = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
};

async function fetchExperiences(): Promise<Experience[]> {
  const snapshot = await getDocs(collection(db, "experiences"));

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Experience[];
}

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });
}
