import PageHero from "../_components/PageHero";
import ExperiencesGrid from "./_components/ExperiencesGrid";
import ExperiencesCTA from "./_components/ExperiencesCTA";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Experiences | Jailoo",
  description:
    "Discover mountain adventures, cultural encounters, and unforgettable experiences in Kyrgyzstan.",
};

// refresh data every day - for prod at route level
// export const revalidate = 86400;

export default async function Experiences() {
  return (
    <main className="flex flex-col gap-14">
      <PageHero
        image="/experiences-hero.jpg"
        imageAlt="Traditional Kyrgyz yurt surrounded by mountains"
        eyebrow="Discover the spirit of Kyrgyzstan"
        title={
          <>
            Experiences
            <br />
            Beyond the Ordinary
          </>
        }
        description="From horseback journeys across alpine meadows to quiet evenings
          beneath the stars, discover a different way to experience the
          mountains."
      />
      <Suspense fallback={<Spinner />}>
        <ExperiencesGrid />
      </Suspense>
      <ExperiencesCTA />
    </main>
  );
}
