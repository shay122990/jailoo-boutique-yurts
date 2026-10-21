import AboutHero from "./_components/AboutHero.js";
import AboutIntro from "./_components/AboutIntro.js";
import AboutStory from "./_components/AboutStory.js";

export const metadata = {
  title: "About | Jailoo",
  description:
    "Discover Jailoo, a mountain retreat inspired by the landscapes and nomadic heritage of Kyrgyzstan.",
};

export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <AboutStory />
    </main>
  );
}
