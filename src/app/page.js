import Image from "next/image";
import Link from "next/link";
import hero from "../../public/hero-home.jpg";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={hero}
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with a yurt"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to Jailoo.
        </h1>
        <Link
          href="/yurts"
          className="px-8 py-6 text-pink bg-plum hover:bg-salmon text-lg font-semibold transition-all"
        >
          Explore luxury yurts
        </Link>
      </div>
    </main>
  );
}
