import { getExperiences } from "../../../_lib/data-service";
import ExperienceCard from "./ExperienceCard";

export default async function ExperiencesGrid() {
  const experiences = await getExperiences();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#7c8067]">
            Find your adventure
          </p>

          <h2 className="font-heading text-3xl md:text-4xl">
            Explore our experiences
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-[#686a60]">
          Every experience offers a new perspective on the beauty and traditions
          of Kyrgyzstan.
        </p>
      </div>

      {experiences.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#686a60]">
          No experiences are available right now.
        </p>
      ) : (
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </section>
  );
}
