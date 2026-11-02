"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function BackButton({
  location,
  text = "Go back",
  className = "",
  type = "button",
}) {
  const router = useRouter();

  function handleBack() {
    if (location) {
      router.push(location);
    } else {
      router.back();
    }
  }

  return (
    <button
      type={type}
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm text-purple transition-colors hover:text-teal ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {text}
    </button>
  );
}

export default BackButton;
