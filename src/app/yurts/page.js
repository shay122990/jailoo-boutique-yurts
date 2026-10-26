import { getYurts } from "../../_lib/data-service";
import YurtCard from "./_components/YurtCard";

export const metadata = {
  title: "Yurts",
};

export default async function Yurts() {
  const yurts = await getYurts();

  return (
    <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {yurts.map((yurt) => (
        <YurtCard key={yurt.id} yurt={yurt} />
      ))}
    </div>
  );
}
