"use client";

import Image from "next/image";
import { useReservation } from "../../../../_context/ReservationContext";
import { differenceInDays } from "date-fns";
import { createBooking } from "../../../../_lib/actions";
import SubmitButton from "../../../_components/SubmitButton";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function ReservationForm({ yurt, experiences, user }) {
  const { range, resetRange } = useReservation();
  const { capacity, price, discount, id } = yurt;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const yurtPrice = numNights * (price - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    yurtPrice,
    yurtId: id,
  };
  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="flex h-full min-h-155 flex-col overflow-hidden rounded-2xl border border-plum/15 bg-white shadow-sm">
      {/* Header */}
      <div className="flex min-h-39 flex-col justify-center gap-3 bg-plum px-5 py-5 min-[1000px]:min-h-28 min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-between min-[1000px]:px-10 min-[1000px]:py-6">
        <div className="flex items-center gap-3">
          <UserCircleIcon
            className="h-6 w-6 shrink-0 text-peach"
            strokeWidth={1.5}
          />

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-peach sm:text-xs sm:tracking-[0.25em]">
              Your reservation
            </p>
            <h3 className="mt-1 text-lg font-medium text-white sm:text-xl">
              Guest details
            </h3>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 border-t border-white/15 pt-3 min-[1000px]:border-0 min-[1000px]:pt-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Guest avatar"}
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="h-9 w-9 shrink-0 text-peach" />
          )}

          <span className="truncate text-sm font-medium text-white">
            {user.name}
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="flex flex-1 flex-col gap-7 p-8 sm:p-10"
      >
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
            htmlFor="experienceId"
            className="block text-sm font-semibold text-plum"
          >
            Experience
            <p className="text-xs text-bg/60">
              Optional · Additional experiences are available to book at check
              in with extra charge.
            </p>
          </label>

          <select
            name="experienceId"
            id="experienceId"
            defaultValue=""
            className="w-full rounded-lg border border-plum/15 bg-pink/30 px-4 py-3.5 text-sm text-bg outline-none transition-colors focus:border-purple focus:ring-2 focus:ring-purple/15"
          >
            <option value="">No experience selected</option>

            {experiences.map((experience) => (
              <option value={experience.id} key={experience.id}>
                {experience.title}
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
          {!(startDate && endDate) ? (
            <p className="text-sm text-bg/60">Start by selecting your dates.</p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
