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
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {firstName}
      </h2>

      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "Profile"}
          width={60}
          height={60}
          className="rounded-full"
        />
      )}
    </div>
  );
}
