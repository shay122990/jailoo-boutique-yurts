import { CalendarDaysIcon, SparklesIcon } from "@heroicons/react/24/outline";

import {
  getBookedDatesByYurtId,
  getYurtSettings,
} from "../../_lib/data-service";

import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ yurt }) {
  const [settings, bookedDates] = await Promise.all([
    getYurtSettings(),
    getBookedDatesByYurtId(yurt.id),
  ]);

  return (
    <section id="reservation" className="bg-pink/20 px-5 py-16 sm:px-8 ">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <SparklesIcon className="h-4 w-4 text-peach" />

            <p className="text-xs uppercase tracking-[0.3em] text-purple">
              Your mountain escape
            </p>

            <SparklesIcon className="h-4 w-4 text-peach" />
          </div>

          <h2 className="text-3xl font-light tracking-wide text-plum sm:text-4xl">
            Make your reservation
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-bg/70">
            Choose your dates and let us take care of the rest. Your mountain
            retreat is just a few steps away.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-teal">
            <CalendarDaysIcon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-xs tracking-wide">
              Select your preferred dates
            </span>
          </div>
        </div>

        {/* Reservation panels */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <DateSelector
            settings={settings}
            bookedDates={bookedDates}
            yurt={yurt}
          />

          <ReservationForm yurt={yurt} />
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs tracking-wide text-bg/60">
          We look forward to welcoming you to Jailoo.
        </p>
      </div>
    </section>
  );
}

export default Reservation;
