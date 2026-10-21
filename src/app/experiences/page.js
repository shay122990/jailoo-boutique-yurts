import { getExperiences } from "../../_lib/data-service";
import ExperiencesHero from "./_components/ExperiencesHero";
import ExperiencesGrid from "./_components/ExperiencesGrid";
import ExperiencesCTA from "./_components/ExperiencesCTA";

export const metadata = {
  title: "Experiences | Jailoo",
  description:
    "Discover mountain adventures, cultural encounters, and unforgettable experiences in Kyrgyzstan.",
};

export default async function Experiences() {
  const experiences = await getExperiences();

  return (
    <main className="flex flex-col gap-14">
      <ExperiencesHero />
      <ExperiencesGrid experiences={experiences} />
      <ExperiencesCTA />
    </main>
  );
}
