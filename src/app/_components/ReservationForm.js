"use client";

import Image from "next/image";
import { useReservation } from "../../_context/ReservationContext";
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

function ReservationForm({ yurt, user }) {
  const { range } = useReservation();
  const { capacity } = yurt;

  return (
    <div className="flex h-full min-h-155 flex-col overflow-hidden rounded-2xl border border-plum/15 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-plum px-8 py-5 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-peach">
            Your reservation
          </p>
          <div className="flex space-x-10 justify-between items-center">
            <h3 className="mt-1 text-xl font-medium text-white">
              Guest details
            </h3>
            <span className=" flex gap-2 mt-1 text-xl font-medium text-white">
              <Image
                src={user.image}
                alt="user avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              {user.name}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-1 flex-col gap-7 p-8 sm:p-10">
        <div className="space-y-3">
          <label
            htmlFor="numGuests"
            className="block text-sm font-semibold text-plum"
          >
            Number of guests
          </label>

          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-lg border border-plum/15 bg-pink/30 px-4 py-3.5 text-sm text-bg outline-none transition-colors focus:border-purple focus:ring-2 focus:ring-purple/15"
            required
          >
            <option value="">Select number of guests...</option>

            {Array.from({ length: capacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="observations"
            className="block text-sm font-semibold text-plum"
          >
            Special requests
            <span className="ml-2 font-normal text-bg/50">(Optional)</span>
          </label>

          <textarea
            name="observations"
            id="observations"
            rows={5}
            className="w-full resize-none rounded-lg border border-plum/15 bg-pink/30 px-4 py-3.5 text-sm text-bg outline-none transition-colors placeholder:text-bg/40 focus:border-purple focus:ring-2 focus:ring-purple/15"
            placeholder="Any pets, allergies, or special requirements?"
          />
        </div>

        {/* Bottom */}
        <div className="mt-auto flex flex-col gap-4 border-t border-plum/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-bg/60">Start by selecting your dates.</p>

          <button
            type="submit"
            className="rounded-lg bg-teal px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-aqua hover:text-plum disabled:cursor-not-allowed disabled:bg-bg/30 disabled:text-bg/50"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
