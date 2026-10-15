import { getExperiences } from "@/lib/experiences";
import ExperiencesHero from "./_components/ExperiencesHero";
import ExperiencesIntro from "./_components/ExperiencesIntro";
import ExperiencesGrid from "./_components/ExperiencesGrid";
import ExperiencesCTA from "./_components/ExperiencesCTA";

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <>
      <ExperiencesHero />
      <ExperiencesIntro />
      <ExperiencesGrid experiences={experiences} />
      <ExperiencesCTA />
    </>
  );
}
