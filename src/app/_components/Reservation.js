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
    <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
      <DateSelector settings={settings} bookedDates={bookedDates} yurt={yurt} />
      <ReservationForm yurt={yurt} />
    </div>
  );
}

export default Reservation;
