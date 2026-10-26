import Image from "next/image";
import Link from "next/link";

export default function ExperienceCard({ experience }) {
  const { id, image, title, category, duration, description } = experience;

  return (
    <article key={id} className="group">
      <div className="relative mb-5 aspect-4/5 overflow-hidden bg-[#e5e1d6]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7c8067]">
          {category}
        </span>

        <span className="text-xs text-[#77786f]">{duration}</span>
      </div>

      <h3 className="mt-3 font-heading text-2xl">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[#686a60]">{description}</p>

      <Link
        href="/contact"
        className="mt-5 inline-flex items-center gap-2 border-b border-[#858772] pb-1 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#858772]"
      >
        Enquire about experience
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
