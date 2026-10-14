"use client";

import ExperiencesHero from "./_components/ExperiencesHero";
import ExperiencesIntro from "./_components/ExperiencesIntro";
import ExperiencesGrid from "./_components/ExperiencesGrid";
import ExperiencesCTA from "./_components/ExperiencesCTA";

export default function ExperiencesPage() {
  return (
    <main className="bg-[#f8f6f0] text-[#292d25]">
      <ExperiencesHero />
      <ExperiencesIntro />
      <ExperiencesGrid />
      <ExperiencesCTA />
    </main>
  );
}
