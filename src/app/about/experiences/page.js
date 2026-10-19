import { getExperiences } from "@/_lib/data-service";

export const metadata = {
  title: "Experiences",
};

export default async function Experiences() {
  const experiences = await getExperiences();

  return (
    <div>
      <h1>Our Experiences</h1>

      {experiences.map((experience) => (
        <div key={experience.id}>
          <h2>{experience.title}</h2>
          <p>{experience.category}</p>
          <p>{experience.description}</p>
        </div>
      ))}
    </div>
  );
}
