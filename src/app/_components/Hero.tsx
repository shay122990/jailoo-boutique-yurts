"use client";

import Image from "next/image";
import Link from "next/link";
import heroHome from "../../../public/hero-home.jpg";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-stone-900">
      {/* Background image */}
      <Image
        src={heroHome}
        alt="Luxury traditional yurt overlooking the mountains of Kyrgyzstan"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="max-w-3xl text-white">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-amber-200 sm:text-sm">
            Boutique stays · Kyrgyzstan
          </p>

          <h1 className="font-serif text-5xl font-light leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
            Welcome to
            <span className="mt-2 block italic text-amber-100">Jailoo.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
            Escape to the heart of the Kyrgyz mountains. Discover the quiet
            luxury of traditional yurts, breathtaking landscapes, and
            unforgettable moments shaped by nature and nomadic heritage.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/cabins"
              className="group inline-flex items-center gap-4 bg-amber-100 px-7 py-4 text-sm font-medium text-stone-900 transition-colors duration-300 hover:bg-white"
            >
              Discover our stays
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/about"
              className="border-b border-white/60 pb-2 text-sm text-white transition-colors hover:border-amber-200 hover:text-amber-200"
            >
              Our story
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-8 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/80 md:flex">
        <span className="h-px w-10 bg-amber-200" />
        Kyrgyzstan, Central Asia
      </div>
    </section>
  );
}
