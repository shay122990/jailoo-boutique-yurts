import Image from "next/image";
import Link from "next/link";

export default function YurtCard({ yurt }) {
  const {
    slug,
    name,
    type,
    capacity,
    price,
    bedrooms,
    description,
    location,
    image,
  } = yurt;

  return (
    <article className="group">
      <div className="relative mb-5 aspect-4/5 overflow-hidden bg-[#e5e1d6]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7c8067]">
          {type}
        </span>

        <span className="text-xs text-[#77786f]">{location}</span>
      </div>

      <h3 className="mt-3 font-heading text-2xl">{name}</h3>

      <p className="mt-3 text-sm leading-7 text-[#686a60]">{description}</p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#686a60]">
        <span>
          {capacity} {capacity === 1 ? "guest" : "guests"}
        </span>

        <span>
          {bedrooms} {bedrooms === 1 ? "bedroom" : "bedrooms"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[#686a60]">
          <span className="font-heading text-2xl text-[#292b24]">{price}</span>{" "}
          <span className="text-xs">/ night</span>
        </p>

        <Link
          href={`/yurts/${slug}`}
          className="inline-flex items-center gap-2 border-b border-[#858772] pb-1 text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#858772]"
        >
          Explore yurt
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
