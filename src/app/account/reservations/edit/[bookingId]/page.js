import { updateReservation } from "../../../../../_lib/actions";
import {
  getBooking,
  getExperiences,
  getYurtById,
} from "../../../../../_lib/data-service";
import { auth } from "../../../../../_lib/auth";
import { redirect, notFound } from "next/navigation";
import SubmitButton from "../../../../_components/SubmitButton";

async function Page({ params }) {
  const session = await auth();

  if (!session?.user?.guestId) redirect("/login");

  const { bookingId } = await params;

  const booking = await getBooking(bookingId, session.user.guestId);

  if (!booking) notFound();

  const { yurtId, numGuests, experienceId } = booking;

  const { capacity } = await getYurtById(yurtId);
  const experiences = await getExperiences();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-plum/60">
          Manage your stay
        </p>

        <h2 className="text-2xl font-semibold text-plum sm:text-3xl">
          Edit your reservation #{bookingId}
        </h2>

        <p className="mt-2 text-plum/60">
          Update your guest details and choose an experience for your stay.
        </p>
      </div>

      <form
        action={updateReservation}
        className="mx-auto flex w-full flex-col gap-6 rounded-xl border border-pink bg-white p-4 shadow-sm sm:gap-7 sm:p-8 lg:p-10"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests" className="font-medium text-plum">
            How many guests?
          </label>

          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            required
            className="w-full rounded-md border border-pink bg-[#fdf8fa] px-4 py-3 text-plum shadow-sm outline-none transition placeholder:text-plum/40 focus:border-purple focus:ring-2 focus:ring-purple/15"
          >
            <option value="">Select number of guests...</option>

            {Array.from({ length: capacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="experienceId" className="font-medium text-plum">
            Choose an experience
          </label>

          <select
            name="experienceId"
            id="experienceId"
            defaultValue={experienceId ?? ""}
            className="w-full rounded-md border border-pink bg-[#fdf8fa] px-4 py-3 text-plum shadow-sm outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/15"
          >
            <option value="">Select an experience...</option>

            {experiences.map((experience) => (
              <option value={experience.id} key={experience.id}>
                {experience.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end border-t border-pink pt-5">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
