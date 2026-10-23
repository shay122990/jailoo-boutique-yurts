export default function Spinner({ size = 56, className = "" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
        style={{ animationDuration: "3s" }}
      >
        <circle cx="50" cy="50" r="43" stroke="#8B2635" strokeWidth="2.5" />

        {/* Four traditional horn-inspired motifs */}
        {[0, 90, 180, 270].map((rotation) => (
          <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
            <path
              d="
                M50 12
                C42 18 39 24 43 29
                C47 33 54 29 54 24
                C54 20 49 19 47 23
                C45 27 49 31 54 32
                C62 34 68 28 65 22
                C63 18 59 18 57 21
                C55 24 58 28 62 27
                C69 26 74 31 71 37
                C68 43 59 44 53 40
                C49 37 49 33 50 30
              "
              stroke="#8B2635"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="50" cy="13" r="2.5" fill="#C9A45C" />
          </g>
        ))}

        <circle cx="50" cy="50" r="9" fill="#8B2635" />
        <circle cx="50" cy="50" r="4" fill="#C9A45C" />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
