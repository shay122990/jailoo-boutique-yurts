"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../_lib/firebase";

type Experience = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
};

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const snapshot = await getDocs(collection(db, "experiences"));

        const data = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        })) as Experience[];

        setExperiences(data);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <main className="bg-[#f8f6f0] text-[#292d25]">
      {/* Hero */}
      <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/experiences/experiences-hero.jpg"
          alt="Traditional Kyrgyz yurt surrounded by mountain landscapes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
          <p className="mb-5 text-xs uppercase tracking-[0.35em]">
            Discover the spirit of Kyrgyzstan
          </p>

          <h1 className="font-marcellus text-5xl leading-tight md:text-7xl">
            Experiences
            <br />
            Beyond the Ordinary
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            From horseback journeys across alpine meadows to quiet evenings
            beneath the stars, discover a different way to experience the
            mountains.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#7c8067]">
          Life at Jailoo
        </p>

        <h2 className="font-marcellus text-3xl leading-snug md:text-5xl">
          More than a place to stay.
          <br />A way to reconnect.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#686a60] md:text-base">
          Inspired by the nomadic heritage of Kyrgyzstan, our experiences invite
          you to slow down, explore the outdoors, and connect with the culture,
          people, and landscapes that make this place extraordinary.
        </p>
      </section>

      {/* Experiences Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#7c8067]">
              Find your adventure
            </p>

            <h2 className="font-marcellus text-3xl md:text-4xl">
              Explore our experiences
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#686a60]">
            Every experience offers a new perspective on the beauty and
            traditions of Kyrgyzstan.
          </p>
        </div>

        {loading ? (
          <p className="py-12 text-center text-sm text-[#686a60]">
            Loading experiences...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-sm text-[#686a60]">
            We couldn&apos;t load the experiences. Please try again later.
          </p>
        ) : experiences.length === 0 ? (
          <p className="py-12 text-center text-sm text-[#686a60]">
            No experiences are available right now.
          </p>
        ) : (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.id} className="group">
                <div className="relative mb-5 aspect-4/5 overflow-hidden bg-[#e5e1d6]">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7c8067]">
                    {experience.category}
                  </span>

                  <span className="text-xs text-[#77786f]">
                    {experience.duration}
                  </span>
                </div>

                <h3 className="mt-3 font-marcellus text-2xl">
                  {experience.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#686a60]">
                  {experience.description}
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 border-b border-[#858772] pb-1 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#858772]"
                >
                  Enquire about experience
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-[#eae7dc] px-6 py-20 text-center md:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#7c8067]">
          Your journey begins here
        </p>

        <h2 className="font-marcellus text-3xl md:text-5xl">
          Make your stay unforgettable.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#686a60]">
          Whether you seek adventure, cultural discovery, or simply a moment of
          stillness, let us help you plan your time in the mountains.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex bg-[#414938] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#30372a]"
        >
          Plan your experience
        </Link>
      </section>
    </main>
  );
}
