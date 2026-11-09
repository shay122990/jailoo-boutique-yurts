import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    yurts: { name, image },
  } = booking;

  const pastBooking =
    isPast(new Date(startDate)) && !isToday(new Date(startDate));

  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-pink bg-white sm:flex-row">
      <div className="relative h-44 w-full shrink-0 sm:h-32 sm:w-32">
        <Image
          src={image}
          alt={`Yurt ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, 128px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-plum sm:text-xl">
            {numNights} nights in Yurt {name}
          </h3>

          <span
            className={`flex h-7 w-fit shrink-0 items-center rounded-md px-3 text-xs font-bold uppercase ${
              pastBooking ? "bg-peach text-plum" : "bg-teal text-white"
            }`}
          >
            {pastBooking ? "Past" : "Upcoming"}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-plum/70 sm:text-base">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-xl font-semibold text-purple">${totalPrice}</p>

          <p className="text-plum/40">&bull;</p>

          <p className="text-sm text-plum/70 sm:text-base">
            {numGuests} guest{numGuests > 1 ? "s" : ""}
          </p>

          <p className="w-full text-xs text-plum/50 sm:ml-auto sm:w-auto sm:text-right">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!pastBooking && (
        <div className="flex shrink-0 flex-row border-t border-pink sm:w-24 sm:flex-col sm:border-l sm:border-t-0">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex flex-1 items-center justify-center gap-2 border-r border-pink px-3 py-3 text-xs font-bold uppercase text-plum/70 transition-colors hover:bg-pink hover:text-plum sm:border-r-0 sm:border-b sm:px-2"
          >
            <PencilSquareIcon className="h-5 w-5 shrink-0 text-purple" />
            <span>Edit</span>
          </Link>

          <div className="flex flex-1 items-center justify-center">
            <DeleteReservation bookingId={id} />
          </div>
        </div>
      )}
    </li>
  );
}

export default ReservationCard;
