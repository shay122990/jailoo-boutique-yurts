import { Suspense } from "react";
import Filter from "../_components/Filter";
import Spinner from "../_components/Spinner";
import YurtList from "./_components/YurtsList";
import YurtsIntro from "./_components/YurtsIntro";

export const metadata = {
  title: "Yurts",
};

export default async function Yurts({ searchParams }) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div className="w-full pt-4 sm:px-6 sm:py-16 flex flex-col justify-center">
      <YurtsIntro />

      <div className="mx-auto mb-8 flex w-full justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <YurtList filter={filter} />
      </Suspense>
    </div>
  );
}
