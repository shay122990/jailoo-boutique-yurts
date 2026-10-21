import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="bg-pink py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <div className="relative aspect-4/5 overflow-hidden bg-[#e5e1d6]">
          <Image
            src="/about/about-landscape.jpg"
            alt="The vast open landscapes of the Kyrgyz mountains"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="py-4 md:py-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#7c8067]">
            Inspired by the land
          </p>

          <h2 className="font-marcellus text-3xl leading-snug md:text-5xl">
            Where tradition meets stillness.
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-[#686a60] md:text-base">
            <p>
              The word *jailoo* evokes the high mountain pastures where life
              follows the rhythm of the seasons. These open landscapes have long
              been part of Kyrgyz nomadic life, offering space to gather,
              wander, and live close to nature.
            </p>

            <p>
              We carry that spirit into every stay. Our aim is to create a place
              where you can step away from the rush of everyday life, experience
              the warmth of local hospitality, and make meaningful memories in
              the mountains.
            </p>
          </div>

          <div className="mt-8 h-px w-20 bg-[#a7a58d]" />
          <p className="mt-4 font-marcellus text-xl text-[#414938]">
            Come as you are. Leave feeling connected.
          </p>
        </div>
      </div>
    </section>
  );
}
