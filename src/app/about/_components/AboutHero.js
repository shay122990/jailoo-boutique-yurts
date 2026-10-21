import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden">
      <Image
        src="/about/about.jpg"
        alt="A peaceful mountain landscape in Kyrgyzstan"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <p className="mb-5 text-xs uppercase tracking-[0.35em]">
          Our story · Our roots · Our home
        </p>

        <h1 className="font-marcellus text-5xl leading-tight md:text-7xl">
          A Place to
          <br />
          Find Your Way Back
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
          Rooted in the spirit of Kyrgyzstan, Jailoo is an invitation to slow
          down, reconnect with nature, and discover the beauty of a simpler way
          of life.
        </p>
      </div>
    </section>
  );
}
