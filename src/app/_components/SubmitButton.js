"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full  bg-aqua  border-plum px-7 py-3 font-semibold text-white transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
