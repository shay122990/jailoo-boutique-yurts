import PageHero from "../_components/PageHero.js";
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
      <PageHero
        image="/about-hero.jpg"
        imageAlt="A peaceful mountain landscape in Kyrgyzstan"
        eyebrow="Our story · Our roots · Our home"
        title={
          <>
            A Place to
            <br />
            Find Your Way Back
          </>
        }
        description="Rooted in the spirit of Kyrgyzstan, Jailoo is an invitation to slow
          down, reconnect with nature, and discover the beauty of a simpler way
          of life."
      />
      <AboutIntro />
      <AboutStory />
    </main>
  );
}
