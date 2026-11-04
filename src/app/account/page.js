import { auth } from "../../_lib/auth";
import Image from "next/image";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {session.user.name}
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
