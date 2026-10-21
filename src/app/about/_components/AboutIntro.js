import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#7c8067]">
        The spirit of Jailoo
      </p>

      <h2 className="font-marcellus text-3xl leading-snug md:text-5xl">
        Not just somewhere to stay.
        <br />
        Somewhere to feel.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#686a60] md:text-base">
        In Kyrgyzstan, the mountains are more than a backdrop. They are a place
        of belonging, tradition, and quiet wonder. Jailoo was created to bring
        you closer to that feeling, with thoughtful stays that celebrate the
        land, its heritage, and the simple pleasure of being present.
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#686a60] md:text-base">
        From open mountain trails to unforgettable moments beneath the stars,
        discover the experiences that make your stay unique.
      </p>

      <Link
        href="/experiences"
        className="mt-8 inline-flex bg-plum px-8 py-4 text-lg uppercase tracking-[0.2em] text-white transition-colors hover:bg-pink hover:text-plum"
      >
        Explore experiences
      </Link>
    </section>
  );
}
