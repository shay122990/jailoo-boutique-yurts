import { notFound } from "next/navigation";
import { getYurt } from "../../../_lib/data-service";

import Image from "next/image";

export default async function Page({ params }) {
  const { yurtId } = await params;
  const yurt = await getYurt(yurtId);

  if (!yurt) notFound();

  return (
    <main className="bg-[#faf9f6] text-[#34382e]">
      {/* Hero */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden md:min-h-[75vh]">
        <Image
          src={yurt.image}
          alt={yurt.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

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

          <a
            href="#details"
            className="mt-8 inline-block border border-white/70 px-7 py-3 text-sm tracking-wide text-white transition hover:bg-white hover:text-[#34382e]"
          >
            Discover your stay
          </a>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-[#e6e3da]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 md:px-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Guests
            </p>
            <p className="mt-2 text-xl">{yurt.capacity} guests</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Bedrooms
            </p>
            <p className="mt-2 text-xl">
              {yurt.bedrooms} {yurt.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              Setting
            </p>
            <p className="mt-2 text-xl">{yurt.location}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#7c8067]">
              From
            </p>
            <p className="mt-2 text-xl">
              {Number(yurt.price).toLocaleString()}{" "}
              <span className="text-sm">/ night</span>
            </p>
          </div>
        </div>
      </section>

      {/* Details and amenities */}
      <section
        id="details"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_0.7fr] md:px-12 md:py-24"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#7c8067]">
            Your mountain retreat
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight sm:text-4xl">
            A little closer to nature, a little further from everyday life.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-[#696b60]">
            {yurt.description}
          </p>

          <div className="mt-12">
            <h3 className="text-xl font-medium">Amenities & comforts</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(yurt.amenities ?? []).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 border-b border-[#e6e3da] pb-4"
                >
                  <span className="text-[#7c8067]" aria-hidden="true">
                    ✳
                  </span>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stay summary */}
        <aside className="h-fit border border-[#e6e3da] bg-white p-7 md:p-9">
          <p className="text-xs uppercase tracking-[0.25em] text-[#7c8067]">
            Your stay at Jailoo
          </p>

          <h3 className="mt-4 text-2xl font-light">{yurt.name}</h3>

          <p className="mt-2 text-sm text-[#77796f]">
            {yurt.location}, Kyrgyzstan
          </p>

          <div className="my-7 border-t border-[#e6e3da]" />

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-[#696b60]">Price per night</span>
            <span className="text-2xl font-medium">
              {Number(yurt.price).toLocaleString()}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#77796f]">
            A peaceful retreat designed for up to {yurt.capacity}{" "}
            {yurt.capacity === 1 ? "guest" : "guests"}.
          </p>

          <div className="mt-6 border-t border-[#e6e3da] pt-5">
            <p className="text-sm leading-6 text-[#696b60]">
              Ready to experience the mountains? Get in touch to plan your stay.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
