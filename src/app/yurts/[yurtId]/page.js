import { notFound } from "next/navigation";
import { getYurt } from "../../../_lib/data-service";

import YurtHero from "./_components/YurtHero";
import YurtIntro from "./_components/YurtIntro";
import { Suspense } from "react";
import Reservation from "../../_components/Reservation";
import Spinner from "../../_components/Spinner";

export async function generateMetadata({ params }) {
  const { yurtId } = await params;

  const { name } = await getYurt(yurtId);

  return {
    title: `${name} Yurt`,
  };
}

export default async function Page({ params }) {
  const { yurtId } = await params;
  const yurt = await getYurt(yurtId);

  if (!yurt) notFound();

  return (
    <main className="bg-[#faf9f6] text-[#34382e]">
      <YurtHero yurt={yurt} />

      <YurtIntro yurt={yurt} />

      <section>
        <Suspense fallback={<Spinner />}>
          <Reservation yurt={yurt} />
        </Suspense>
      </section>
    </main>
  );
}
