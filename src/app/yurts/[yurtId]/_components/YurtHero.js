import Image from "next/image";
import BackButton from "../../../_components/BackButton";

function YurtHero({ yurt }) {
  return (
    <section className="relative flex min-h-[65vh] items-end overflow-hidden md:min-h-[75vh]">
      <Image
        src={yurt.image}
        alt={yurt.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-12 md:pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80">
          {yurt.type} · {yurt.location}
        </p>
        <h1 className="max-w-3xl text-4xl font-light tracking-wide text-white sm:text-6xl md:text-7xl">
          {yurt.name}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/90 md:text-lg">
          {yurt.description}
        </p>
        <div className=" mt-4">
          <BackButton
            location="/yurts"
            text="Back to yurts"
            className="mb-8 text-base font-medium py-4 px-4 bg-white"
          />
        </div>
      </div>
    </section>
  );
}

export default YurtHero;
