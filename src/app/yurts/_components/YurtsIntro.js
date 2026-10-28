export default function YurtsIntro() {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <p className="text-xs uppercase tracking-[0.3em] text-[#7c8067]">
        Our stays
      </p>

      <h1 className="mt-3 font-heading text-3xl text-[#292b24] sm:text-4xl">
        Find your place in the mountains.
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#686a60] sm:text-base">
        Thoughtfully chosen yurts in the heart of Kyrgyzstan. A slower pace, a
        deeper connection to nature.
      </p>

      <div
        className="mt-7 flex items-center justify-center gap-3 text-[#858772]"
        aria-hidden="true"
      >
        <span className="h-px w-12 bg-[#858772]/50" />

        <svg
          viewBox="0 0 40 40"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 3 C27 10 30 13 20 20 C10 27 13 30 20 37" />
          <path d="M20 3 C13 10 10 13 20 20 C30 27 27 30 20 37" />
          <path d="M3 20 C10 13 13 10 20 20 C27 30 30 27 37 20" />
          <path d="M3 20 C10 27 13 30 20 20 C27 10 30 13 37 20" />
        </svg>

        <span className="h-px w-12 bg-[#858772]/50" />
      </div>
    </div>
  );
}
