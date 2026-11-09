import { auth } from "../../_lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const firstName = session.user.name?.split(" ").at(0);

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-2xl font-semibold text-purple sm:text-3xl">
        Welcome, {firstName}
      </h2>

      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "Profile"}
          width={60}
          height={60}
          className="h-12 w-12 rounded-full border-2 border-pink object-cover sm:h-14 sm:w-14"
        />
      )}
    </div>
  );
}
