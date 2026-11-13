"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../../_context/ReservationContext";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}
function DateSelector({ settings, yurt, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { minBookingLength, maxBookingLength } = settings;

  // Use the current yurts table column names
  const regularPrice = Number(yurt.price) || 0;
  const discount = Number(yurt.discount) || 0;

  const discountedPrice = regularPrice * (1 - discount / 100);

  // Only calculate when both dates are selected
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const yurtPrice = numNights > 0 ? numNights * discountedPrice : 0;

  return (
    <div className="flex h-full min-h-155 flex-col overflow-hidden rounded-2xl border border-plum/15 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-plum px-8 py-5 sm:px-10">
        <p className="text-xs uppercase tracking-[0.25em] text-peach">
          Plan your stay
        </p>

        <div className="mt-1 flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-peach" strokeWidth={1.5} />
          <h3 className="text-xl font-medium text-white">Select your dates</h3>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex flex-1 items-center justify-center bg-white px-3 py-6 sm:px-5">
        <DayPicker
          className="reservation-calendar"
          mode="range"
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          hideNavigation
          onSelect={setRange}
          selected={displayRange}
          disabled={(curDate) =>
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          }
        />
      </div>

      {/* Pricing */}
      <div className="mt-auto flex min-h-22 items-center justify-between gap-3 border-t border-plum/15 bg-pink/30 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-semibold text-plum">
                  ${discountedPrice}
                </span>

                <span className="text-sm text-purple/60 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-plum">
                ${regularPrice}
              </span>
            )}

            <span className="text-sm text-bg/60">/night</span>
          </p>

          {numNights > 0 && (
            <>
              <span className="rounded-md bg-peach/30 px-3 py-2 text-sm font-semibold text-plum">
                × {numNights} nights
              </span>

              <p className="flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-bg/60">
                  Total
                </span>

                <span className="text-xl font-semibold text-plum">
                  ${yurtPrice}
                </span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            type="button"
            onClick={resetRange}
            className="shrink-0 rounded-lg border border-purple/40 px-4 py-2 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-white"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
