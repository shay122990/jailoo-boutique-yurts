import { FaSpinner } from "react-icons/fa";

type LoaderProps = {
  label?: string;
  size?: number;
  fullScreen?: boolean;
};

export default function Loader({
  label = "Loading...",
  size = 28,
  fullScreen = false,
}: LoaderProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <FaSpinner
        size={size}
        className="animate-spin text-[#7c8067]"
        aria-hidden="true"
      />

      <span className="text-sm text-[#686a60]">{label}</span>
    </div>
  );
}
