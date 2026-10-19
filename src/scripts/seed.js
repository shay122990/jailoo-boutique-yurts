import { createClient } from "@supabase/supabase-js";
import { yurts } from "../data/yurts.js";
import { experiences } from "../data/experiences.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

async function seed() {
  const { error: yurtsError } = await supabase
    .from("yurts")
    .upsert(yurts, { onConflict: "slug" });

  if (yurtsError) {
    console.error("Error uploading yurts:", yurtsError.message);
    process.exitCode = 1;
    return;
  }

  console.log("Yurts uploaded successfully.");

  const { error: experiencesError } = await supabase
    .from("experiences")
    .upsert(experiences, { onConflict: "id" });

  if (experiencesError) {
    console.error("Error uploading experiences:", experiencesError.message);
    process.exitCode = 1;
    return;
  }

  console.log("Experiences uploaded successfully.");
}

seed();

// Next.js automatically loads variables from .env.local when you run npm run dev.
// Node.js scripts don't automatically load .env.local in the same way.
// dotenv is a package that reads environment variables from a file and makes them available through process.env.
