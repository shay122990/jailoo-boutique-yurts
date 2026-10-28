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
    <article className="group w-full">
      {/* Image */}
      <div className="relative mb-3 aspect-4/3 overflow-hidden bg-[#e5e1d6] sm:mb-5 sm:aspect-[4/5]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Type and location */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] uppercase tracking-widest text-[#7c8067] sm:text-[10px] sm:tracking-[0.2em]">
          {type}
        </span>

        <span className="truncate text-[10px] text-[#77786f] sm:text-xs">
          {location}
        </span>
      </div>

      {/* Name */}
      <h3 className="mt-2 font-heading text-lg sm:mt-3 sm:text-2xl">{name}</h3>

      {/* Description */}
      <p className="mt-2 text-xs leading-5 text-[#686a60] sm:mt-3 sm:text-sm sm:leading-7">
        {description}
      </p>

      {/* Details */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#686a60] sm:mt-4 sm:gap-x-5 sm:text-xs">
        <span>
          {capacity} {capacity === 1 ? "guest" : "guests"}
        </span>

        <span>
          {bedrooms} {bedrooms === 1 ? "bedroom" : "bedrooms"}
        </span>
      </div>

      {/* Price and link */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-5 sm:gap-3">
        <p className="text-xs text-[#686a60]">
          <span className="font-heading text-xl text-[#292b24] sm:text-2xl">
            {price}
          </span>{" "}
          <span className="text-[10px] sm:text-xs">/ night</span>
        </p>

        <Link
          href={`/yurts/${slug}`}
          className="inline-flex items-center gap-1 border-b border-[#858772] pb-1 text-[9px] uppercase tracking-wider transition-colors hover:text-[#858772] sm:gap-2 sm:text-xs sm:tracking-[0.15em]"
        >
          Explore <span className="hidden sm:inline">yurt</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
