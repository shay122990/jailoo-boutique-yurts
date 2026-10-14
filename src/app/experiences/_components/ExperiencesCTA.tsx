import Link from "next/link";

export default function ExperiencesCTA() {
  return (
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
  );
}
