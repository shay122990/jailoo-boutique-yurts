import Image from "next/image";

function PageHero({ image, imageAlt, eyebrow, title, description }) {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <p className="mb-5 text-xs uppercase tracking-[0.35em]">{eyebrow}</p>

        <h1 className="font-marcellus text-5xl leading-tight md:text-7xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}

export default PageHero;
