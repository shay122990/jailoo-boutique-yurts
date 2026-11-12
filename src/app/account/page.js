import { auth } from "../../_lib/auth";
import Image from "next/image";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const { name, email, image } = session.user;
  const firstName = name?.split(" ").at(0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-purple sm:text-3xl">
            Welcome back, {firstName}!
          </h2>
          <p className="text-sm text-plum/60 sm:text-base">
            We&apos;re happy to have you at Jailoo.
          </p>
        </div>

        {image && (
          <Image
            src={image}
            alt={name ?? "Profile"}
            width={60}
            height={60}
            className="h-12 w-12 rounded-full border-2 border-pink object-cover sm:h-14 sm:w-14"
          />
        )}
      </div>

      {/* Guest information */}
      <div className="rounded-lg border border-pink bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-plum">
            Your guest information
          </h3>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:gap-12">
          <div className="flex items-center gap-3">
            <UserIcon className="h-5 w-5 shrink-0 text-purple" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-plum/50">Full name</span>
              <span className="text-sm font-medium text-plum">
                {name || "Not provided"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <EnvelopeIcon className="h-5 w-5 shrink-0 text-purple" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-plum/50">Email address</span>
              <span className="break-all text-sm font-medium text-plum">
                {email || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
