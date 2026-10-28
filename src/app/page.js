import Image from "next/image";
import Link from "next/link";
import hero from "../../public/hero-home.jpg";

export default function Home() {
  return (
    <main className="fixed inset-0 z-0 flex items-center justify-center text-center">
      <Image
        src={hero}
        alt="Mountains and forests with a yurt"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 px-4">
        <h1 className="mb-10 text-5xl font-normal tracking-tight text-white md:text-7xl lg:text-8xl">
          Welcome to Jailoo.
        </h1>

        <Link
          href="/yurts"
          className="bg-white px-8 py-6 text-lg font-semibold text-plum transition-all hover:bg-plum hover:text-white"
        >
          Explore luxury yurts
        </Link>
      </div>
    </main>
  );
}
