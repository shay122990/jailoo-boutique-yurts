import SignInButton from "../_components/SignInButton";
import { auth } from "../../_lib/auth";
import Image from "next/image";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      <SignInButton />
      <p>Welcome , {session.user.name}</p>
      <Image
        src={session.user.image}
        alt={session.user.name}
        width={60}
        height={60}
      />
    </h2>
  );
}
