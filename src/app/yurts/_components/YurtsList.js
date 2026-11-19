import { connection } from "next/server";
import { getYurts } from "../../../_lib/data-service";

import YurtCard from "./YurtCard";

async function YurtList({ filter }) {
  // opt out of caching
  await connection();
  const yurts = await getYurts();

  if (!yurts.length) return null;

  let displayYurts;

  switch (filter) {
    case "all":
      displayYurts = yurts;
      break;
    case "small":
      displayYurts = yurts.filter((yurt) => yurt.capacity <= 3);
      break;
    case "medium":
      displayYurts = yurts.filter(
        (yurt) => yurt.capacity >= 4 && yurt.capacity <= 7,
      );
      break;
    default:
      displayYurts = yurts;
      break;
  }
  return (
    <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayYurts.map((yurt) => (
        <YurtCard key={yurt.id} yurt={yurt} />
      ))}
    </div>
  );
}

export default YurtList;
